<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use ReflectionClass;
use hg\apidoc\exception\ErrorException;
use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;

class ParseApiDetail
{

    protected $config = [];

    protected $currentApp = [];

    protected $appKey;

    public function __construct($config)
    {
        $this->config = $config;
    }

    /**
     * 生成api接口数据
     * @param string $appKey
     * @param string $apiKey
     * @return array
     */
    public function renderApiDetail(string $appKey,string $apiKey)
    {

        $this->appKey = $appKey;
        $pathArr   = explode("@", $apiKey);
        $classPath = $pathArr[0];
        $methodName = $pathArr[1];
        $currentAppConfig = Helper::getCurrentAppConfig($appKey);
        $this->currentApp  = $currentAppConfig['appConfig'];

        try {
            $refClass  = new ReflectionClass($classPath);
            $refMethod= $refClass->getMethod($methodName);
            $methodItem = $this->parseApiMethod($refClass,$refMethod);
            return $methodItem;
        } catch (\ReflectionException $e) {
            throw new ErrorException($e->getMessage());
        }
    }


    public function parseApiMethod($refClass,$refMethod,$currentAppData = null){
        $config  = $this->config;
        if (!empty($currentAppData)){
            $currentApp = $currentAppData;
            $this->currentApp = $currentAppData;
            $this->appKey = $currentAppData['appKey'];
        }else{
            $currentApp = $this->currentApp;

        }
        if (empty($refMethod->name)) {
            return [];
        }
        $classTextAnnotations = ParseAnnotation::parseTextAnnotation($refClass);
        $classAnnotations = (new ParseAnnotation($config))->getClassAnnotation($refClass);

        $textAnnotations = ParseAnnotation::parseTextAnnotation($refMethod);
        // 标注不解析的方法
        if (in_array("NotParse", $textAnnotations)) {
            return [];
        }
        $methodAnnotations = $this->getMethodAnnotation($refMethod);
        $methodAnnotations = self::handleApiBaseInfo($methodAnnotations,$refClass->name,$refMethod->name,$textAnnotations,$config);
        // 是否开启debug
        if (
            in_array("NotDebug", $textAnnotations) ||
            (isset($config['notDebug']) && $config['notDebug']===true) ||
            (isset($currentApp['notDebug']) && $currentApp['notDebug']===true) ||
            isset($methodAnnotations['notDebug']) ||
            in_array("NotDebug", $classTextAnnotations) ||
            isset($classAnnotations['notDebug'])
        ) {
            $methodAnnotations['notDebug'] = true;
        }

        if(!empty($methodAnnotations['md'])){
            $methodAnnotations['md'] = $this->getFieldMarkdownContent($methodAnnotations['md']);
        }
        if(!empty($methodAnnotations['responseSuccessMd'])){
            $methodAnnotations['responseSuccessMd'] = $this->getFieldMarkdownContent($methodAnnotations['responseSuccessMd']);
        }
        if(!empty($methodAnnotations['responseErrorMd'])){
            $methodAnnotations['responseErrorMd'] = $this->getFieldMarkdownContent($methodAnnotations['responseErrorMd']);
        }

        // 合并全局请求参数-header
        if (
            (
                (!empty($config['params']) && !empty($config['params']['header']))  ||
                (!empty($currentApp['params']) && !empty($currentApp['params']['header']))
            ) &&
            !in_array("NotHeaders", $textAnnotations) &&
            !isset($methodAnnotations['notHeaders'])
        )
        {
            $headers = !empty($methodAnnotations['header'])?$methodAnnotations['header']:[];
            $methodAnnotations['header'] = $this->mergeGlobalOrAppParams($headers,'header');
        }

        // 合并全局请求参数-query
        if (
            (
                (!empty($config['params']) && !empty($config['params']['query']))  ||
                (!empty($this->currentApp['params']) && !empty($this->currentApp['params']['query']))
            ) &&
            !in_array("NotQuerys", $textAnnotations) &&
            !isset($methodAnnotations['notQuerys'])
            )
        {
            $querys = !empty($methodAnnotations['query'])?$methodAnnotations['query']:[];
            $methodAnnotations['query'] = $this->mergeGlobalOrAppParams($querys,'query');
        }

        // 合并全局请求参数-body
        if (
            (
                (!empty($config['params']) && !empty($config['params']['body']))  ||
                (!empty($this->currentApp['params']) && !empty($this->currentApp['params']['body']))
            ) &&
            !in_array("NotParams", $textAnnotations) &&
            !isset($methodAnnotations['notParams'])
            )
        {
            $params = !empty($methodAnnotations['param'])?$methodAnnotations['param']:[];
            $methodAnnotations['param'] = $this->mergeGlobalOrAppParams($params,'body');
        }

        //添加成功响应体
        $methodAnnotations['responseSuccess'] = $this->handleApiResponseSuccess($methodAnnotations,$textAnnotations);
        //添加异常响应体
        $methodAnnotations['responseError'] = $this->handleApiResponseError($methodAnnotations,$textAnnotations);

        // 合并全局事件after
        if (
            (
                (!empty($config['debug_events']) && !empty($config['debug_events']['after']))  ||
                (!empty($this->currentApp['debug_events']) && !empty($this->currentApp['debug_events']['after']))
            ) &&
            !in_array("NotEvent", $textAnnotations))
        {
            $debugAfterEvents = !empty($methodAnnotations['after'])?$methodAnnotations['after']:[];
            $methodAnnotations['after'] = $this->mergeGlobalOrAppEvents($debugAfterEvents,'after');
        }

        // 合并全局事件before
        if (
            (
                (!empty($config['debug_events']) && !empty($config['debug_events']['before']))  ||
                (!empty($this->currentApp['debug_events']) && !empty($this->currentApp['debug_events']['before']))
            ) &&
            !in_array("NotEvent", $textAnnotations))
        {
            $debugBeforeEvents = !empty($methodAnnotations['before'])?$methodAnnotations['before']:[];
            $methodAnnotations['before'] = $this->mergeGlobalOrAppEvents($debugBeforeEvents,'before');
        }

        return $methodAnnotations;
    }

    /**
     * 获取md注解内容
     * @param $mdAnnotations
     * @return mixed|string
     */
    protected function getFieldMarkdownContent($mdAnnotations){
        if(!empty($mdAnnotations['name'])){
            return $mdAnnotations['name'];
        }else if(!empty($mdAnnotations['ref'])){
            return ParseMarkdown::getContent($this->appKey,$mdAnnotations['ref']);
        }
        return $mdAnnotations;
    }

    /**
     * 获取方法的注解，并处理参数
     * @param $refMethod
     * @param string $refField ref时指定处理的参数
     * @return array
     */
    protected function getMethodAnnotation($refMethod,$refField=""){
        $annotations = (new ParseAnnotation($this->config))->getMethodAnnotation($refMethod);
        // 需要处理的注解字段
        if (!empty($refField)){
            $handleFields =  [$refField];
        }else{
            $handleFields = ["header","query","param","routeParam","returned","before","after","responseSuccess","responseError"];
        }
        foreach ($handleFields as $field) {
            if (!empty($annotations[$field])){
                $annotations[$field]=$this->handleMethodParams($annotations[$field],$field);
            }
        }
        return $annotations;
    }


    protected function mergeGlobalOrAppParams($params,$paramType='param'){
        $config  = $this->config;
        $currentApp = $this->currentApp;
        $globalParams = [];
        if (!empty($currentApp['params']) && !empty($currentApp['params'][$paramType])){
            // 不合并global的处理方式
            $globalParams = $currentApp['params'][$paramType];
            // 合并global的处理方式
            // $globalHeaders = Helper::arrayMergeAndUnique("name", $globalHeaders, $this->currentApp['params'][$paramType]);
        }else if(!empty($config['params']) && !empty($config['params'][$paramType])){
            $globalParams = $config['params'][$paramType];
        }

        if (!empty($params) && count($params) && count($globalParams)) {
            return Helper::arrayMergeAndUnique("name", $globalParams, $params);
        }
        return $globalParams;
    }

    protected function mergeGlobalOrAppEvents($events,$eventType='after'){
        $config  = $this->config;
        $globalEvents = [];
        if (!empty($this->currentApp['debug_events']) && !empty($this->currentApp['debug_events'][$eventType])){
            $globalEvents = $this->currentApp['debug_events'][$eventType];
        }else if(!empty($config['debug_events']) && !empty($config['debug_events'][$eventType])){
            $globalEvents = $config['debug_events'][$eventType];
        }
        $mergeEvents = [];
        foreach ($globalEvents as $item){
            if (!empty($item['desc'])){
                $item['desc'] = Lang::getLang($item['desc']);
            }
            $mergeEvents[] = $item;
        }
        if (!empty($events) && count($events)){
            foreach ($events as $event) {
                $mergeEvents[] = $event;
            }
        }
        return $mergeEvents;
    }

    /**
     * 处理接口成功响应参数
     * @param $methodAnnotations
     * @param $textAnnotations
     * @return array|mixed
     */
    protected function handleApiResponseSuccess($methodAnnotations,$textAnnotations){
        $returned = !empty($methodAnnotations['returned'])?$methodAnnotations['returned']:"";
        $currentApp = $this->currentApp;
        $config  = $this->config;
        $mergeParams = [];
        $paramType='success';
        if (
            in_array("NotResponses", $textAnnotations) ||
            in_array("NotResponseSuccess", $textAnnotations) || 
            isset($methodAnnotations['notResponses']) || 
            isset($methodAnnotations['notResponseSuccess'])
        ) {
            // 注解了不使用全局响应
            $mergeParams = [];
        }else if (!empty($currentApp['responses']) && !empty($currentApp['responses'][$paramType])){
            $mergeParams = $currentApp['params'][$paramType];
        }else if(!empty($config['responses']) && !empty($config['responses'][$paramType])){
            $mergeParams = $config['responses'][$paramType];
        }

        if (!empty($methodAnnotations['responseSuccess'])){
            if (!is_int(Helper::arrayKeyFirst($methodAnnotations['responseSuccess']))){
                $methodResponseSuccess = [$methodAnnotations['responseSuccess']];
            }else{
                $methodResponseSuccess = $methodAnnotations['responseSuccess'];
            }
            $mergeParams = Helper::arrayMergeAndUnique("name", $mergeParams,$methodResponseSuccess);
        }

        return $this->mergeResponseSuccessParam($mergeParams,$returned);

    }

    protected function mergeResponseSuccessParam($mergeParams,$returned){
        if (!empty($mergeParams) && count($mergeParams)){
            $resData = [];
            foreach ($mergeParams as $item) {
                if (!empty($item['main']) && $item['main'] === true){
                    $item['children'] = $returned;
                }
                //支持到二级的挂载
                if (isset($item['children']) && !empty($item['children'])) {
                    $item['children'] = $this->mergeResponseSuccessParam($item['children'],$returned);
                }
                if (!empty($item['desc'])){
                    $item['desc'] = Lang::getLang($item['desc']);
                }
                if (!empty($item['md'])){
                    $item['md'] = ParseMarkdown::getContent($this->appKey,$item['md']);
                }
                $resData[]=$item;
            }
            return $resData;
        }
        return $returned;
    }

    /**
     * 处理接口异常响应参数
     * @param $methodAnnotations
     * @param $textAnnotations
     * @return array|mixed|void
     */
    protected function handleApiResponseError($methodAnnotations,$textAnnotations){
        $config  = $this->config;
        $currentApp = $this->currentApp;
        $responseErrors = [];
        $paramType = "error";
        $mergeParams = [];
        if (
            in_array("NotResponses", $textAnnotations) ||
            in_array("NotResponseError", $textAnnotations) || 
            isset($methodAnnotations['notResponses']) || 
            isset($methodAnnotations['notResponseError'])
        ) {
            // 注解了不使用全局响应
            $mergeParams = [];
        }else if (!empty($currentApp['responses']) && !empty($currentApp['responses'][$paramType])){
            $mergeParams = $currentApp['params'][$paramType];
        }else if(!empty($config['responses']) && !empty($config['responses'][$paramType])){
            $mergeParams = $config['responses'][$paramType];
        }

        if (!empty($methodAnnotations['responseError'])){
            if (!is_int(Helper::arrayKeyFirst($methodAnnotations['responseError']))){
                $methodResponseError = [$methodAnnotations['responseError']];
            }else{
                $methodResponseError = $methodAnnotations['responseError'];
            }
            $mergeParams = Helper::arrayMergeAndUnique("name", $mergeParams,$methodResponseError);
        }

        if (!empty($mergeParams) && count($mergeParams)){
            $resData = [];
            foreach ($mergeParams as $item) {
                $item['desc'] = Lang::getLang($item['desc']);
                if (!empty($item['md'])){
                    $item['md'] = ParseMarkdown::getContent($this->appKey,$item['md']);
                }
                $resData[]=$item;
            }
            return $resData;
        }
        return [];
    }



    public static function handleApiBaseInfo($methodInfo,$className,$methodName,$textAnnotations,$config){
        // 无标题，且有文本注释
        if (empty($methodInfo['title']) && !empty($textAnnotations) && count($textAnnotations) > 0) {
            $methodInfo['title'] = Lang::getLang($textAnnotations[0]);
        }else if (!empty($methodInfo['title'])){
            $methodInfo['title'] = Lang::getLang($methodInfo['title']);
        }

        // 默认method
        if (!empty($methodInfo['method'])) {
            $apiMethods = Helper::handleApiMethod($methodInfo['method']);
            $methodInfo['method'] = count($apiMethods)==1?$apiMethods[0]:$apiMethods;
        }else{
            $methodInfo['method'] = !empty($config['default_method']) ? strtoupper($config['default_method']) : '*';
        }

        // 默认default_author
        if (
            empty($methodInfo['author']) && 
            !empty($config['default_author']) && 
            !in_array("NotDefaultAuthor", $textAnnotations) &&
            !isset($methodInfo['notDefaultAuthor'])
        ) {
            $methodInfo['author'] = $config['default_author'];
        }

        if (!empty($methodInfo['tag'])){
            $methodInfo['tag'] = static::handleTags($methodInfo['tag']);
        }
        // 无url,自动生成
        if (empty($methodInfo['url'])) {
            $methodInfo['url'] = static::autoCreateUrl($className,$methodName,$config);
        } else if (!empty($methodInfo['url']) && is_string($methodInfo['url']) && substr($methodInfo['url'], 0, 1) != "/") {
            $methodInfo['url'] = "/" . $methodInfo['url'];
        }
        $methodInfo['name']     = $methodName;
        $methodInfo['menuKey'] = Helper::createApiKey($className,$methodName);
        return $methodInfo;
    }

    /**
     * 处理方法的注解参数
     * @param $params array 注解参数
     * @param $field string 指定处理的参数字段名
     * @return array
     */
    protected function handleMethodParams($params,$field){
        // 不处理合并的注解字段
        $notMergeNameFields=['before','after'];
        $data=[];
        if (!empty($params)){
            // 处理单个注解为对象的参数
            if (!is_int(Helper::arrayKeyFirst($params))){
                $params = [$params];
            }
            foreach ($params as $param) {
                $item=$this->handleAnnotationsParamItem($param,$field);
                if (!empty($item) && is_int(Helper::arrayKeyFirst($item))){
                    if (in_array($field,$notMergeNameFields)){
                        $data = $item;
                    }else{
                        $data = Helper::arrayMergeAndUnique("name",$data,$item);
                    }
                }else if ($item!==false){
                    $data[]=$item;
                }
            }
        }
        return $data;
    }


    /**
     * 处理注解某一参数
     * @param $param array 参数
     * @param $field string 处理的字段名
     * @return array|array[]|mixed
     */
    protected function handleAnnotationsParamItem($param,$field){
        // 事件字段，不处理ref的数据过滤
        $eventFields=['before','after'];
        $data   = [];
        if (!empty($param['ref'])){
            $refParams = $this->renderRef($param['ref'],$field);
            if (!empty($refParams[$field])){
                if (in_array($field,$eventFields)){
                    $data=$refParams[$field];
                }else{
                    $data = $this->handleRefData($param,$refParams[$field],$field);
                }
            }else{
                return false;
            }
        }else if(!empty($param['table'])){
            $tableParams = (new ParseModel($this->config))->getTableDocument($param['table'],[]);
            $data = $this->handleRefData($param,$tableParams,$field);
        } else{
            $data = $param;
        }
        if (!empty($data['desc'])){
            $data['desc'] = Lang::getLang($data['desc']);
        }
        if (!empty($data['md'])){
            $data['md'] = ParseMarkdown::getContent($this->appKey,$data['md']);
        }
        if (!empty($data['children']) && is_array($data['children'])){
            $childrenData = [];
            foreach ($data['children'] as $child) {
                $paramItem=$this->handleAnnotationsParamItem($child,$field);

                if ($paramItem!==false){
                    if (!empty($paramItem) && is_array($paramItem) && Helper::arrayKeyFirst($paramItem)===0){
                        $childrenData = Helper::arrayMergeAndUnique("name",$childrenData,$paramItem);
                    }else{
                        $childrenData[] = $paramItem;
                    }
                }
            }
            $data['children'] = $childrenData;
        }
        if (!empty($data['type']) && $data['type'] === 'tree' ) {
            // 类型为tree的
            $data['children'][] = [
                'children' => $data['children'],
                'name'   =>!empty($data['childrenField']) ?$data['childrenField']:'children',
                'type'   => 'array',
                'desc'   => !empty($data['childrenDesc'])?Lang::getLang($data['childrenDesc']):"",
            ];
        }

        // 自定义解析
        if (!empty($this->config['parsesAnnotation'])){
            $callback = $this->config['parsesAnnotation']($data);
            if (!empty($callback)){
                $data = $callback;
            }
        }
        return $data;
    }

    public static function handleTags($tagStr){
        if (!empty($tagStr)) {
            $tagStr = Lang::getLang($tagStr);
            $tagList = [];
            if (is_string($tagStr) && strpos($tagStr, ',') !== false) {
                $tagArr = explode(",", $tagStr);
                foreach ($tagArr as $tag) {
                    $tagList[]=Lang::getLang($tag);
                }
            } else {
                $tagList = [Lang::getLang($tagStr)];
            }
            return $tagList;
        }
        return $tagStr;
    }

    /**
     * 自动生成url
     * @param $method
     * @return string
     */
    public static function autoCreateUrl($className,$methodName,$config): string
    {

        $pathArr = explode("\\", $className);
        $filterPathNames = !empty($config['auto_url']) && !empty($config['auto_url']['filter_keys'])?$config['auto_url']['filter_keys']:[];
        $classUrlArr = [];
        foreach ($pathArr as $item) {
            if (!in_array($item, $filterPathNames)) {
                if (!empty($config['auto_url'])){
                    $key = $item;
                    if (!empty($config['auto_url']['letter_rule'])){
                        switch ($config['auto_url']['letter_rule']) {
                            case 'lcfirst':
                                $key = lcfirst($item);
                                break;
                            case 'ucfirst':
                                $key = ucfirst($item);
                                break;
                            default:
                                $key = $item;
                        }
                    }
                    if (!empty($config['auto_url']['handle_key'])){
                        $classUrlArr[] = $config['auto_url']['handle_key']($key);
                    }else{
                        $classUrlArr[] = $key;
                    }
                }else{
                    $classUrlArr[] = $item;
                }
            }
        }
        $classUrl = implode('/', $classUrlArr);
        $prefix = !empty($config['auto_url']) && !empty($config['auto_url']['prefix'])?$config['auto_url']['prefix']:"";
        $url = $prefix . '/' . $classUrl . '/' . $methodName;
        if (!empty($config['auto_url']) && !empty($config['auto_url']['custom']) && is_callable($config['auto_url']['custom'])){
            return $config['auto_url']['custom']($className,$methodName,$url);
        }
        return $url;
    }

    /**
     * ref引用
     */
    public function renderRef($refPath,$field): array
    {
        $res = ['type' => 'model'];
        $config      = $this->config;
        $methodName ="";
        if (is_string($refPath)){
            if (strpos($refPath, '\\') === false) {
                // 引入通用注解
                $classPath     = $config['definitions'];
                $methodName    = $refPath;
            }else if (class_exists($refPath)) {
                // use类
                $classPath  = $refPath;
            }else if (strpos($refPath, '@') !== false){
                // 带@指定方法
                $pathArr   = explode("@", $refPath);
                $classPath = $pathArr[0];
                $methodName =  $pathArr[1];
            }else{
                // 直接指定方法
                $pathArr    = explode("\\", $refPath);
                $methodName = $pathArr[count($pathArr) - 1];
                unset($pathArr[count($pathArr) - 1]);
                $classPath    = implode("\\", $pathArr);
            }
        }else if(is_array($refPath)){
            $classPath = $refPath[0];
            $methodName = !empty($refPath[1])?$refPath[1]:"";
        }else{
            // 未知ref
        }
        try {
            $modelClass =  ParseModel::getModelClass($classPath);
            $classReflect = new \ReflectionClass($classPath);
            if (!empty($modelClass)){
                // 模型解析
                $modelParams = (new ParseModel($config))->parseModelTable($modelClass,$classReflect,$methodName);
                return [$field=>$modelParams];
            }else{
                // 类ref引用
                if (!empty($methodName)){
                    // 指定引入类的方法注解
                    $methodName   = trim($methodName);
                    $refMethod    = $classReflect->getMethod($methodName);
                    $res = $this->getMethodAnnotation($refMethod,$field);
                    return $res;
                }else{
                    // 类的参数property
                    $private_properties = (new ParseAnnotation($config))->getClassPropertiesy($classReflect);
                    return [$field=>$private_properties];
                }
            }

        } catch (\ReflectionException $e) {
            throw new ErrorException($e->getMessage());
        }
    }



    public function handleRefData($annotation,$refParams, string $field): array
    {
        // 过滤field
        if (!empty($annotation['field'])) {
            $refParams = static::filterParamsField($refParams, $annotation['field'], 'field');
        }
        // 过滤withoutField
        if (!empty($annotation['withoutField'])) {
            $refParams = static::filterParamsField($refParams, $annotation['withoutField'], 'withoutField');
        }

        if (!empty($annotation['name'])) {
            if (!empty($annotation['children'])) {
                $annotation['children'] = Helper::arrayMergeAndUnique("name",$refParams,$annotation['children']);
            }else{
                $annotation['children'] = $refParams;
            }
            return $annotation;
        }
//        else{
//            if (!empty($annotation[$field])) {
//                $annotation[$field] = Helper::arrayMergeAndUnique("name",$refParams,$annotation[$field]);
//            }
//        }
        return $refParams;
    }
    
    



    public function handleEventAnnotation($annotation,$type){
        $config      = $this->config;
        if (!empty($annotation->ref)){
            if (strpos($annotation->ref, '\\') === false && !empty($config['definitions']) ) {
                $refPath     = $config['definitions'] . '\\' . $annotation->ref;
                $data        = $this->renderService($refPath);
                if (!empty($data[$type])){
                    return $data[$type];
                }
                return [];
            }
        }
        if (!empty($annotation->value) && is_array($annotation->value)){
            $beforeInfo = Helper::objectToArray($annotation);
            $valueList = [];
            foreach ($annotation->value as $valueItem){
                $valueItemInfo = Helper::objectToArray($valueItem);
                if ($valueItem instanceof Before){
                    $valueItemInfo['type'] = "before";
                }else if ($valueItem instanceof After){
                    $valueItemInfo['type'] = "after";
                }
                $valueList[] = $valueItemInfo;
            }
            $beforeInfo['value'] = $valueList;
            return [$beforeInfo];
        }
        else if (!empty($annotation->value) && is_object($annotation->value)){
            $valueItemInfo = Helper::objectToArray($annotation->value);
            if ($annotation->value instanceof Before){
                $valueItemInfo['type'] = "before";
            }else if ($annotation->value instanceof After){
                $valueItemInfo['type'] = "after";
            }
            $annotation->value = [$valueItemInfo];
            return [$annotation];
        }else{
            return [$annotation];
        }
    }



    /**
     * 过滤指定字段、或只取指定字段
     * @param $data 参数
     * @param $fields 指定字段
     * @param string $type 处理类型
     * @return array
     */
    public static function filterParamsField(array $data, $fields, string $type = "field"): array
    {
        if (!empty($fields) && is_string($fields)){
            if (strpos($fields, ',') !== false){
                $fieldArr = explode(',', $fields);
            }else{
                $fieldArr = [$fields];
            }
        }else if (!empty($fields) && is_array($fields)){
            if (Helper::arrayKeyFirst($fields)=="name"){
                $fieldArr = $fields['name'];
            }else{
                $fieldArr = $fields;
            }
        }else{
            return $data;
        }
        $dataList = [];
        foreach ($data as $item) {
            $has = !empty($item['name']) && in_array($item['name'], $fieldArr);
            if ($has && $type === 'field') {
                $dataList[] = $item;
            } else if (!($has) && $type == "withoutField") {
                $dataList[] = $item;
            }
        }
        return $dataList;
    }



}
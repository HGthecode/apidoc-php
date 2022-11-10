<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use ReflectionClass;
use Doctrine\Common\Annotations\AnnotationReader;
use hg\apidoc\exception\ErrorException;
use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;
use hg\apidoc\annotation\Group;
use hg\apidoc\annotation\Sort;
use hg\apidoc\annotation\Param;
use hg\apidoc\annotation\Query;
use hg\apidoc\annotation\ResponseSuccess;
use hg\apidoc\annotation\ResponseError;
use hg\apidoc\annotation\Title;
use hg\apidoc\annotation\Desc;
use hg\apidoc\annotation\Md;
use hg\apidoc\annotation\RouteParam;
use hg\apidoc\annotation\Author;
use hg\apidoc\annotation\Tag;
use hg\apidoc\annotation\Header;
use hg\apidoc\annotation\Returned;
use hg\apidoc\annotation\ParamType;
use hg\apidoc\annotation\Url;
use hg\apidoc\annotation\Method;
use hg\apidoc\annotation\Before;
use hg\apidoc\annotation\After;
use hg\apidoc\annotation\ContentType;

class ParseApiDetail
{

    protected $config = [];

    protected $reader;


    protected $currentApp = [];

    protected $basePath = "";

    protected $parseModel;

    protected $appKey;

    public function __construct($config)
    {
        $this->reader = new AnnotationReader();
        if (!empty($config['ignored_annitation'])){
            foreach ($config['ignored_annitation'] as $item) {
                AnnotationReader::addGlobalIgnoredName($item);
            }
        }
        $this->config = $config;
        $this->basePath = APIDOC_ROOT_PATH;
        $this->parseModel = new ParseModel($this->reader,$config);

    }

    /**
     * 生成api接口数据
     * @param string $classPath
     * @param string $methodName
     * @return array
     */
    public function renderApiDetail(string $appKey,string $classPath,string $methodName)
    {

        $this->appKey = $appKey;
        $currentAppConfig = Helper::getCurrentAppConfig($appKey);
        $this->currentApp  = $currentAppConfig['appConfig'];
        $json =DirAndFile::formatPath( $this->basePath . $classPath,"/");

        try {
            $refClass  = new ReflectionClass($classPath);
            $classTextAnnotations =ParseAnnotation::parseTextAnnotation($refClass);

            $refMethod= $refClass->getMethod($methodName);
            $methodItem = $this->parseApiMethod($refClass,$refMethod);
            if ($methodItem===false){
                return "no";
            }
            if (in_array("NotDebug", $classTextAnnotations)) {
                $methodItem['notDebug'] = true;
            }
            $methodItem['menuKey'] =Helper::createApiKey($refClass->name,$refMethod->name);
            return $methodItem;
        } catch (\ReflectionException $e) {
            throw new ErrorException($e->getMessage());
        }
    }

    protected function mergeGlobalOrAppParams($params,$paramType='param'){
        $config  = $this->config;
        $globalParams = [];
        if (!empty($this->currentApp['params']) && !empty($this->currentApp['params'][$paramType])){
            // 不合并global的处理方式
            $globalParams = $this->currentApp['params'][$paramType];
            // 合并global的处理方式
            // $globalHeaders = Helper::arrayMergeAndUnique("name", $globalHeaders, $this->currentApp['params'][$paramType]);
        }else if(!empty($config['params']) && !empty($config['params'][$paramType])){
            $globalParams = $config['params'][$paramType];
        }
        $mergeParams = [];
        foreach ($globalParams as $item){
            if (!empty($item['desc'])){
                $item['desc'] = Lang::getLang($item['desc']);
            }
            if (!empty($item['md'])){
                $item['md'] = ParseMarkdown::getContent($this->appKey,$item['md']);
            }
            $mergeParams[] = $item;
        }
        if (!empty($params) && count($params)) {
            return Helper::arrayMergeAndUnique("name", $mergeParams, $params);
        }
        return $mergeParams;
    }


    /**
     * 处理接口成功响应参数
     * @param $apiInfo
     * @param $textAnnotations
     * @return array|mixed
     */
    protected function handleApiResponseSuccess($apiInfo,$textAnnotations){
        $returned = $apiInfo['returned'];
        if (
            in_array("NotResponses", $textAnnotations) ||
            in_array("NotResponseSuccess", $textAnnotations)
        ) {
            return $returned;
        }
        $config  = $this->config;
        $mergeParams = [];
        $paramType='success';
        if (!empty($apiInfo['responseSuccess']) && count($apiInfo['responseSuccess'])){
            $mergeParams = $apiInfo['responseSuccess'];
        }else if (!empty($this->currentApp['responses']) && !empty($this->currentApp['responses'][$paramType])){
            $mergeParams = $this->currentApp['params'][$paramType];
        }else if(!empty($config['responses']) && !empty($config['responses'][$paramType])){
            $mergeParams = $config['responses'][$paramType];
        }
        if (!empty($mergeParams) && count($mergeParams)){
            $resData = [];
            foreach ($mergeParams as $item) {
                if (!empty($item['main']) && $item['main'] === true){
                    $item['children'] = $returned;
                }
                $item['desc'] = Lang::getLang($item['desc']);
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
     * @param $apiInfo
     * @param $textAnnotations
     * @return array|mixed|void
     */
    protected function handleApiResponseError($apiInfo,$textAnnotations){
        $config  = $this->config;
        $responseErrors = [];
        if (
            in_array("NotResponses", $textAnnotations) ||
            in_array("NotResponseError", $textAnnotations)
        ){
            $responseErrors = [];
        }else if (!empty($apiInfo['responseError']) && count($apiInfo['responseError'])){
            $responseErrors = $apiInfo['responseError'];
        }else if (
            !empty($this->currentApp['responses']) &&
            !empty($this->currentApp['responses']['error']) &&
            count($this->currentApp['responses']['error'])
        ){
            $responseErrors = $this->currentApp['responses']['error'];
        }else if (
            !empty($config['responses']) &&
            !empty($config['responses']['error']) &&
            count($config['responses']['error'])
        ){
            $responseErrors = $config['responses']['error'];
        }

        $data = [];
        foreach ($responseErrors as $item) {
            $item['desc'] = Lang::getLang($item['desc']);
            if (!empty($item['md'])){
                $item['md'] = ParseMarkdown::getContent($this->appKey,$item['md']);
            }
            $data[]=$item;
        }
        return $data;
    }


    protected function parseApiMethod($refClass,$refMethod){
        $config  = $this->config;
        if (empty($refMethod->name)) {
            return false;
        }

        $textAnnotations = ParseAnnotation::parseTextAnnotation($refMethod);
        // 标注不解析的方法
        if (in_array("NotParse", $textAnnotations)) {
            return false;
        }
        $methodInfo = $this->parseAnnotation($refMethod, true,"controller");
        if (empty($methodInfo)){
            return false;
        }
        $methodInfo = $this->handleApiBaseInfo($methodInfo,$refClass,$refMethod,$textAnnotations);

        // 是否开启debug
        if (
            in_array("NotDebug", $textAnnotations) ||
            (isset($config['notDebug']) && $config['notDebug']===true) ||
            (isset($this->currentApp['notDebug']) && $this->currentApp['notDebug']===true)
        ) {
            $methodInfo['notDebug'] = true;
        }


        // 合并全局请求头参数
        if (
            (
                (!empty($config['params']) && !empty($config['params']['header']))  ||
                (!empty($this->currentApp['params']) && !empty($this->currentApp['params']['header']))
            ) &&
            !in_array("NotHeaders", $textAnnotations))
        {
            $headers = !empty($methodInfo['header'])?$methodInfo['header']:[];
            $methodInfo['header'] = $this->mergeGlobalOrAppParams($headers,'header');
        }

        // 合并全局请求参数-query
        if (
            (
                (!empty($config['params']) && !empty($config['params']['query']))  ||
                (!empty($this->currentApp['params']) && !empty($this->currentApp['params']['query']))
            ) &&
            !in_array("NotQuerys", $textAnnotations))
        {
            $querys = !empty($methodInfo['query'])?$methodInfo['query']:[];
            $methodInfo['query'] = $this->mergeGlobalOrAppParams($querys,'query');
        }

        // 合并全局请求参数-body
        if (
            (
                (!empty($config['params']) && !empty($config['params']['body']))  ||
                (!empty($this->currentApp['params']) && !empty($this->currentApp['params']['body']))
            ) &&
            !in_array("NotParams", $textAnnotations))
        {
            $querys = !empty($methodInfo['param'])?$methodInfo['param']:[];
            $methodInfo['param'] = $this->mergeGlobalOrAppParams($querys,'body');
        }

        //添加成功响应体
        $methodInfo['responseSuccess'] = $this->handleApiResponseSuccess($methodInfo,$textAnnotations);
        //添加异常响应体
        $methodInfo['responseError'] = $this->handleApiResponseError($methodInfo,$textAnnotations);

        return $methodInfo;
    }


    public function handleApiBaseInfo($methodInfo,$refClass,$refMethod,$textAnnotations){
        $config  = $this->config;
        // 无标题，且有文本注释
        if (empty($methodInfo['title']) && !empty($textAnnotations) && count($textAnnotations) > 0) {
            $methodInfo['title'] = Lang::getLang($textAnnotations[0]);
        }

        // 默认method
        if (empty($methodInfo['method'])) {
            $methodInfo['method'] = !empty($config['default_method']) ? strtoupper($config['default_method']) : 'GET';
        }

        // 默认default_author
        if (empty($methodInfo['author']) && !empty($config['default_author']) && !in_array("NotDefaultAuthor", $textAnnotations)) {
            $methodInfo['author'] = $config['default_author'];
        }

        if (!empty($methodInfo['tag'])){
            $methodInfo['tag'] = static::handleTags($methodInfo['tag']);
        }
        // 无url,自动生成
        if (empty($methodInfo['url'])) {
            $methodInfo['url'] = static::autoCreateUrl($refClass->name,$refMethod,$config);
        } else if (!empty($methodInfo['url']) && substr($methodInfo['url'], 0, 1) != "/") {
            $methodInfo['url'] = "/" . $methodInfo['url'];
        }
        $methodInfo['name']     = $refMethod->name;
        $methodInfo['menuKey'] = Helper::createApiKey($refClass->name,$refMethod->name);
        return $methodInfo;
    }

    public static function handleTags($tagStr){
        if (!empty($tagStr)) {
            $tagStr = Lang::getLang($tagStr);
            $tagList = [];
            if (strpos($tagStr, ',') !== false) {
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
    public static function autoCreateUrl($classPath,$method,$config): string
    {
        if (!empty($config['auto_url']) && !empty($config['auto_url']['custom']) && is_callable($config['auto_url']['custom'])){
           return $config['auto_url']['custom']($classPath,$method->name);
        }

        $pathArr = explode("\\", $classPath);
        $filterPathNames = !empty($config['auto_url']) && !empty($config['auto_url']['filter_keys'])?$config['auto_url']['filter_keys']:[];
        $classUrlArr = [];
        foreach ($pathArr as $item) {
            if (!in_array($item, $filterPathNames)) {
                if (!empty($config['auto_url']) && !empty($config['auto_url']['letter_rule'])){
                    switch ($config['auto_url']['letter_rule']) {
                        case 'lcfirst':
                            $classUrlArr[] = lcfirst($item);
                            break;
                        case 'ucfirst':
                            $classUrlArr[] = ucfirst($item);
                            break;
                        default:
                            $classUrlArr[] = $item;
                    }
                }else{
                    $classUrlArr[] = $item;
                }
            }
        }
        $classUrl = implode('/', $classUrlArr);
        $prefix = !empty($config['auto_url']) && !empty($config['auto_url']['prefix'])?$config['auto_url']['prefix']:"";
        return $prefix . '/' . $classUrl . '/' . $method->name;
    }

    /**
     * ref引用
     * @param $refPath
     * @param bool $enableRefService
     * @return false|string[]
     */
    protected function renderRef(string $refPath, bool $enableRefService = true): array
    {
        $res = ['type' => 'model'];
        $config      = $this->config;
        // 通用定义引入
        if (strpos($refPath, '\\') === false) {
            $refPath     = $config['definitions'] . '\\' . $refPath;
            $data        = $this->renderService($refPath);
            $res['type'] = "service";
            $res['data'] = $data;
            return $res;
        }
        // 模型引入
        $modelData = $this->parseModel->renderModel($refPath);
        if ($modelData !== false) {
            $res['data'] = $modelData;
            return $res;
        }
        if ($enableRefService === false) {
            return false;
        }
        $data        = $this->renderService($refPath);
        $res['type'] = "service";
        $res['data'] = $data;
        return $res;
    }

    /**
     * 解析注释引用
     * @param $refPath
     * @return array
     * @throws \ReflectionException
     */
    protected function renderService(string $refPath)
    {
        $pathArr    = explode("\\", $refPath);
        $methodName = $pathArr[count($pathArr) - 1];
        unset($pathArr[count($pathArr) - 1]);
        $classPath    = implode("\\", $pathArr);
        if (!class_exists($classPath)){
            throw new ErrorException("ref file not exists",  [
                'path' => $classPath
            ]);
        }
        try {
            $classReflect = new \ReflectionClass($classPath);
            $methodName   = trim($methodName);
            $refMethod    = $classReflect->getMethod($methodName);
            $res          = $this->parseAnnotation($refMethod, true);
            return $res;
        } catch (\ReflectionException $e) {
            throw new ErrorException('Class '.$classPath.' '.$e->getMessage());
        }

    }

    /**
     * 处理Param/Returned的字段名name、params子级参数
     * @param $values
     * @return array
     */
    protected function handleParamValue($values, string $field = 'param'): array
    {
        $name   = "";
        $params = [];
        if (!empty($values) && is_array($values) && count($values) > 0) {
            foreach ($values as $item) {
                if (is_string($item)) {
                    $name = $item;
                } else if (is_object($item)) {
                    if (!empty($item->ref)) {
                        $refRes = $this->renderRef($item->ref, true);
                        $params = $this->handleRefData($params, $refRes, $item, $field);
                    } else {
                        $param         = [
                            "name"    => "",
                            "type"    => $item->type,
                            "desc"    => Lang::getLang($item->desc),
                            "default" => $item->default,
                            "require" => $item->require,
                            "childrenType"=> $item->childrenType
                        ];
                        if (!empty($item->mock)){
                            $param['mock']=$item->mock;
                        }
                        $children      = $this->handleParamValue($item->value);
                        $param['name'] = $children['name'];
                        if (count($children['params']) > 0) {
                            $param['children'] = $children['params'];
                        }
                        $params[] = $param;
                    }
                }
            }
        } else if(!empty($values) && is_object($values)) {
            $item = $values;
            if (!empty($item->ref)) {
                $refRes = $this->renderRef($item->ref, true);
                $params = $this->handleRefData($params, $refRes, $item, $field);
            } else {
                $param         = [
                    "name"    => "",
                    "type"    => $item->type,
                    "desc"    => Lang::getLang($item->desc),
                    "default" => $item->default,
                    "require" => $item->require,
                    "childrenType"=> $item->childrenType
                ];
                if (!empty($item->mock)){
                    $param['mock']=$item->mock;
                }
                $children      = $this->handleParamValue($item->value);
                $param['name'] = $children['name'];
                if (count($children['params']) > 0) {
                    $param['children'] = $children['params'];
                }
                $params[] = $param;
            }
        } else {
            $name = $values;
        }
        return ['name' => $name, 'params' => $params];
    }

    /**
     * 解析注释
     * @param $refMethod
     * @param bool $enableRefService 是否终止service的引入
     * @param string $source 注解来源
     * @return array
     */
    protected function parseAnnotation($refMethod, bool $enableRefService = true,$source=""): array
    {

        $data = [];
        if ($annotations = $this->reader->getMethodAnnotations($refMethod)) {
            $headers = [];
            $querys = [];
            $params  = [];
            $returns = [];
            $before = [];
            $after = [];
            $responseErrors=[];
            $routeParams=[];
            $responseSuccess=[];

            foreach ($annotations as $annotation) {
                switch (true) {
                    case $annotation instanceof ResponseSuccess:
                        $responseSuccess = $this->handleParamAndReturned($responseSuccess,$annotation,'responseSuccess',$enableRefService);
                        break;
                    case $annotation instanceof Query:
                        $querys = $this->handleParamAndReturned($querys,$annotation,'query',$enableRefService);
                        break;
                    case $annotation instanceof Param:
                        $params = $this->handleParamAndReturned($params,$annotation,'param',$enableRefService);
                        break;
                    case $annotation instanceof Returned:
                        $returns = $this->handleParamAndReturned($returns,$annotation,'returned',$enableRefService,$source);
                        break;
                    case $annotation instanceof ResponseError:
                        $responseErrors = $this->handleParamAndReturned($responseErrors,$annotation,'responseError',$enableRefService,$source);
                        break;
                    case $annotation instanceof RouteParam:
                        $routeParams = $this->handleParamAndReturned($routeParams,$annotation,'routeParam',$enableRefService,$source);
                        break;
                    case $annotation instanceof Header:
                        if (!empty($annotation->ref)) {
                            $refRes  = $this->renderRef($annotation->ref, $enableRefService);
                            $headers = $this->handleRefData($headers, $refRes, $annotation, 'header');
                        } else {
                            $param     = [
                                "name"    => $annotation->value,
                                "desc"    => Lang::getLang($annotation->desc),
                                "require" => $annotation->require,
                                "type"    => $annotation->type,
                                "default" => $annotation->default,
                            ];
                            $headers[] = $param;
                        }
                        break;

                    case $annotation instanceof Author:
                        $data['author'] = $annotation->value;
                        break;

                    case $annotation instanceof Title:
                        $data['title'] = Lang::getLang($annotation->value);
                        break;
                    case $annotation instanceof Desc:
                        $data['desc'] = Lang::getLang($annotation->value);
//                        if (!empty($annotation->mdRef)){
//                            $data['md'] = $annotation->mdRef;
//                        }
                        break;
                    case $annotation instanceof Md:
                        $data['md'] = $annotation->value;
                        if (!empty($annotation->ref)){
                            $data['md'] = ParseMarkdown::getContent("",$annotation->ref);
                        }
                        break;
//                    case $annotation instanceof ParamMd:
//                        $data['paramMd'] = $annotation->value;
//                        if (!empty($annotation->ref)){
//                            $data['paramMd'] = ParseMarkdown::getContent("",$annotation->ref);
//                        }
//                        break;
//                    case $annotation instanceof ReturnedMd:
//                        $data['returnMd'] = $annotation->value;
//                        if (!empty($annotation->ref)){
//                            $data['returnMd'] = ParseMarkdown::getContent("",$annotation->ref);
//                        }
//                        break;
                    case $annotation instanceof ParamType:
                        $data['paramType'] = $annotation->value;
                        break;
                    case $annotation instanceof Url:
                        $data['url'] = $annotation->value;
                        break;
                    case $annotation instanceof Method:
                        if ($annotation->value && strpos($annotation->value, ',') !== false){
                            $data['method'] =  explode(",", $annotation->value);
                        }else{
                            $data['method'] = strtoupper($annotation->value);
                        }
                        break;
                    case $annotation instanceof Tag:
                        $data['tag'] = $annotation->value;
                        break;
                    case $annotation instanceof ContentType:
                    $data['contentType'] = $annotation->value;
                    break;
                    case $annotation instanceof Before:
                        $beforeAnnotation = $this->handleEventAnnotation($annotation,'before');
                        $before =  array_merge($before,$beforeAnnotation);
                        break;
                    case $annotation instanceof After:
                        $afterAnnotation = $this->handleEventAnnotation($annotation,'after');
                        $after =array_merge($after,$afterAnnotation);
                        break;
                }
            }
            if ($headers && count($headers) > 0) {
                $data['header'] = $headers;
            }
            $data['query'] = $querys;
            $data['param']  = $params;
            $data['returned'] = $returns;
            $data['responseSuccess'] = $responseSuccess;
            $data['responseError'] = $responseErrors;
            $data['routeParam'] = $routeParams;
            $data['before'] = $before;
            $data['after'] = $after;
        }
        return $data;
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
        }else{
            return [$annotation];
        }
    }


    /**
     * 处理请求参数与返回参数
     * @param $params
     * @param $annotation
     * @param string $type
     * @param false $enableRefService
     * @param string $source 注解来源
     * @return array
     */
    protected function handleParamAndReturned($params,$annotation,$type="param",$enableRefService=false,$source=""){
        if (!empty($annotation->ref)) {
            $refRes = $this->renderRef($annotation->ref, $enableRefService);
            $params = $this->handleRefData($params, $refRes, $annotation, $type,$source);
        } else {

            $param =  Helper::objectToArray($annotation);
            $param["source"] = $source;
            $param["desc"] = Lang::getLang($param['desc']);

            $children      = $this->handleParamValue($annotation->value, $type);
            $param['name'] = $children['name'];
            if (count($children['params']) > 0) {
                $param['children'] = $children['params'];
            }
            if (!empty($param['mdRef'])){
                $param['md'] = ParseMarkdown::getContent("",$param['mdRef']);
            }
            if ($annotation->type === 'tree' ) {
                // 类型为tree的
                $param['children'][] = [
                    'children' => $children['params'],
                    'name'   => !empty($annotation->childrenField)?$annotation->childrenField:"children",
                    'type'   => 'array',
                    'desc'   => Lang::getLang($annotation->childrenDesc),
                ];
            }
            // 合并同级已有的字段
            $params = Helper::arrayMergeAndUnique("name", $params, [$param]);
        }
            return $params;
    }




    /**
     * 处理param、returned 参数
     * @param $params
     * @param $refRes
     * @param $annotation
     * @param string|null $source 注解来源
     * @return array
     */
    protected function handleRefData($params, $refRes, $annotation, string $field,$source=""): array
    {
        if ($refRes['type'] === "model" && count($refRes['data']) > 0) {
            // 模型引入
            $data = $refRes['data'];
        } else if ($refRes['type'] === "service" && !empty($refRes['data']) && !empty($refRes['data'][$field])) {
            // service引入
            $data = $refRes['data'][$field];
        } else {
            return $params;
        }
        // 过滤field
        if (!empty($annotation->field)) {
            $data = static::filterParamsField($data, $annotation->field, 'field');
        }
        // 过滤withoutField
        if (!empty($annotation->withoutField)) {
            $data = static::filterParamsField($data, $annotation->withoutField, 'withoutField');
        }

        if (!empty($annotation->value)) {
            $item =  Helper::objectToArray($annotation);
            $item['children'] = $data;
            $item['source'] = $source;
            $param["desc"] = Lang::getLang($item['desc']);

            $children      = $this->handleParamValue($annotation->value, 'param');
            $item['name'] = $children['name'];
            if (count($children['params']) > 0) {
                $item['children'] = Helper::arrayMergeAndUnique("name",$data,$children['params']);
            }
            if ($annotation->type === 'tree' ) {
                // 类型为tree的
                $item['children'][] = [
                    'children' => $item['children'],
                    'name'   =>!empty($annotation->childrenField) ?$annotation->childrenField:'children',
                    'type'   => 'array',
                    'desc'   => Lang::getLang($annotation->childrenDesc),
                ];
            }
            if (!empty($item['name']) ){
                $params[] = $item;
            }else{
                if (count($children['params']) > 0) {
                    $data = Helper::arrayMergeAndUnique("name",$data,$children['params']);
                }
                $params = Helper::arrayMergeAndUnique("name",$params,$data);
            }
        } else {
            $params = Helper::arrayMergeAndUnique("name",$params,$data);
        }
        return $params;
    }

    /**
     * Params、Returned过滤指定字段、或只取指定字段
     * @param $data 参数
     * @param $fields 指定字段
     * @param string $type 处理类型
     * @return array
     */
    public static function filterParamsField(array $data, $fields, string $type = "field"): array
    {
        if ($fields && strpos($fields, ',') !== false){
            $fieldArr = explode(',', $fields);
        }else{
            $fieldArr = [$fields];
        }
        $dataList = [];
        foreach ($data as $item) {
            if (!empty($item['name']) && in_array($item['name'], $fieldArr) && $type === 'field') {
                $dataList[] = $item;
            } else if (!(!empty($item['name']) && in_array($item['name'], $fieldArr)) && $type == "withoutField") {
                $dataList[] = $item;
            }
        }
        return $dataList;
    }



}
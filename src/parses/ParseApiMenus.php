<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use Doctrine\Common\Annotations\AnnotationException;
use hg\apidoc\exception\ErrorException;
use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;
use ReflectionClass;
use ReflectionAttribute;

class ParseApiMenus
{

    protected $config = [];

    //tags，当前应用/版本所有的tag
    protected $tags = array();

    //groups,当前应用/版本的分组name
    protected $groups = array();

    protected $controller_layer = "app";

    protected $currentApp = [];


    public function __construct($config)
    {
        $this->config = $config;
    }

    /**
     * 生成api接口数据
     * @param string $appKey
     * @param bool $isParseDetail 是否解析接口明细
     * @return array
     */
    public function renderApiMenus(string $appKey,bool $isParseDetail=false): array
    {
        $currentAppConfig = Helper::getCurrentAppConfig($appKey);
        $currentApp = $currentAppConfig['appConfig'];
        $this->currentApp  = $currentApp;

        $controllers = [];
        if (!empty($currentApp['controllers']) && count($currentApp['controllers']) > 0) {
            // 配置的控制器列表
            $controllers = $this->getConfigControllers($currentApp['path'],$currentApp['controllers']);
        }else if(!empty($currentApp['path']) && is_array($currentApp['path']) && count($currentApp['path'])){
            // 读取paths的
            foreach ($currentApp['path'] as $path) {
                $controllersList = $this->getDirControllers($path);
                $controllers = array_merge($controllers,$controllersList);
            }
        } else if(!empty($currentApp['path']) && is_string($currentApp['path'])){
            // 默认读取path下所有的
            $controllers = $this->getDirControllers($currentApp['path']);
        }
        $apiData = [];
        if (!empty($controllers) && count($controllers) > 0) {
            foreach ($controllers as $class) {
                $classData = $this->parseController($class,$isParseDetail);
                if ($classData !== false) {
                    $apiData[] = $classData;
                }
            }
        }
        // 排序
        $apiList = Helper::arraySortByKey($apiData);

        // 接口分组
        if (!empty($currentApp['groups'])){
            $apiList = ParseApiMenus::mergeApiGroup($apiList,$currentApp['groups']);
        }

        $json = array(
            "data"   => $apiList,
            "tags"   => $this->tags,
            "groups" => $this->groups,
        );
        return $json;
    }

    /**
     * 获取生成文档的控制器列表
     * @param string $path
     * @return array
     */
    public function getConfigControllers(string $path,$appControllers): array
    {
        $controllers = [];
        if (!empty($appControllers) && count($appControllers) > 0) {
            foreach ($appControllers as $item) {
                $classPath = $path."\\".$item;
                if ( class_exists($classPath)) {
                    $controllers[] = $classPath;
                }
            }
        }
        return $controllers;
    }

    /**
     * 获取目录下的控制器列表
     * @param string $path
     * @return array
     */
    public function getDirControllers(string $path): array
    {

        if ($path) {
            if (strpos(APIDOC_ROOT_PATH, '/') !== false) {
                $pathStr = str_replace("\\", "/", $path);
            } else {
                $pathStr = $path;
            }
            $dir = APIDOC_ROOT_PATH . $pathStr;
        } else {
            $dir = APIDOC_ROOT_PATH . $this->controller_layer;
        }
        $controllers = [];
        if (is_dir($dir)) {
            $controllers = $this->scanDir($dir, $path);
        }
        return $controllers;
    }



    protected function scanDir($dir) {

        $classList= DirAndFile::getClassList($dir);
        $list=[];

        $configFilterController = !empty($this->config['filter_controllers']) ? $this->config['filter_controllers'] : [];
        $currentAppFilterController =  !empty($this->currentApp['filter_controllers']) ? $this->currentApp['filter_controllers'] : [];
        $filterControllers = array_merge($configFilterController,$currentAppFilterController);

        $configFilterDir = !empty($this->config['filter_dirs']) ? $this->config['filter_dirs'] : [];
        $currentAppFilterDir =  !empty($this->currentApp['filter_dirs']) ? $this->currentApp['filter_dirs'] : [];
        $filterDirList = array_merge($configFilterDir,$currentAppFilterDir);
        $filterDirs=[];
        foreach ($filterDirList as $dirItem) {
            $dirItemPath = DirAndFile::formatPath($dirItem,"/");
            $filterDirs[]=$dirItemPath;
        }

        foreach ($classList as $item) {
            $classNamespace = $item['name'];

            $isFilterDir = false;
            foreach ($filterDirs as $dirItem) {
                if (strpos($item['path'], $dirItem) !== false){
                    $isFilterDir=true;
                }
            }
            if ($isFilterDir){
                continue;
            }else if (
                !in_array($classNamespace, $filterControllers) &&
                $this->config['definitions'] != $classNamespace

            ) {
                $list[] = $classNamespace;
            }
        }

        return $list;
    }

    public function parseController($class,$isParseDetail=false)
    {

        $refClass             = new ReflectionClass($class);
        $classTextAnnotations = ParseAnnotation::parseTextAnnotation($refClass);
        $data = (new ParseAnnotation($this->config))->getClassAnnotation($refClass);
        if (in_array("NotParse", $classTextAnnotations) || isset($data['notParse'])) {
            return false;
        }
        $controllersName    = $refClass->getShortName();
        $data['controller'] = $controllersName;
        $data['path'] = $class;
        if (!empty($data['group']) && !in_array($data['group'], $this->groups)) {
            $this->groups[] = $data['group'];
        }

        if (empty($data['title'])) {
            if (!empty($classTextAnnotations) && count($classTextAnnotations) > 0) {
                $data['title'] = $classTextAnnotations[0];
            } else {
                $data['title'] = $controllersName;
            }
        }
        $data['title'] = Lang::getLang($data['title']);
        $methodList       = [];
        $data['menuKey'] = Helper::createRandKey($data['controller']);
        $isNotDebug = in_array("NotDebug", $classTextAnnotations) || isset($data['notDebug']);
        $parseApiDetail = new ParseApiDetail($this->config);
        foreach ($refClass->getMethods(\ReflectionMethod::IS_PUBLIC) as $refMethod) {
            if ($isParseDetail){
                $methodItem = $parseApiDetail->parseApiMethod($refClass,$refMethod,$this->currentApp);
            }else{
                $methodItem = $this->parseApiMethod($refClass,$refMethod);
            }
            if ($methodItem===false){
                continue;
            }
            if ($isNotDebug) {
                $methodItem['notDebug'] = true;
            }
            $methodList[] = $methodItem;
        }
        $data['children'] = $methodList;
        if (count($methodList)===0){
            return false;
        }
        return $data;
    }


    protected function parseApiMethod($refClass,$refMethod){
        $config               = $this->config;
        if (empty($refMethod->name)) {
            return false;
        }

        try {
            $textAnnotations = ParseAnnotation::parseTextAnnotation($refMethod);

            $methodInfo = (new ParseAnnotation($this->config))->getMethodAnnotation($refMethod);
            // 标注不解析的方法
            if (in_array("NotParse", $textAnnotations) || isset($methodInfo['notParse']) || empty($methodInfo)) {
                return false;
            }
            $methodInfo = ParseApiDetail::handleApiBaseInfo($methodInfo,$refClass->name,$refMethod->name,$textAnnotations,$config);
            $methodInfo['appKey'] = !empty($this->currentApp['appKey'])?$this->currentApp['appKey']:"";
            return Helper::getArrayValuesByKeys($methodInfo,['title','method','url','author','tag','name','menuKey','appKey']);
        }catch (AnnotationException $e) {
            throw new ErrorException($e->getMessage());
        }

    }



    /**
     * 对象分组到tree
     * @param $tree
     * @param $objectData
     * @param string $childrenField
     * @return array
     */
    public static function objtctGroupByTree($tree,$objectData,$childrenField='children'){
        $data = [];
        foreach ($tree as $node){
            if (!empty($node[$childrenField])){
                $node[$childrenField] = static::objtctGroupByTree($node[$childrenField],$objectData);
            }else if (!empty($objectData[$node['name']])){
                $node[$childrenField] =  $objectData[$node['name']];
            }
            $node['menuKey'] = Helper::createRandKey( $node['name']);
            $data[] = $node;
        }
        return $data;
    }

    protected static function getAppGroupNames($groups){
        $groupNames = [];
        foreach ($groups as $item) {
            if (!empty($item['name'])){
                $groupNames[]=$item['name'];
            }
            if (!empty($item['children']) && count($item['children'])){
               $childrenNames = self::getAppGroupNames($item['children']);
                foreach ($childrenNames as $childrenName) {
                    $groupNames[]=$childrenName;
               }
            }
        }
        return $groupNames;
    }

    /**
     * 合并接口到应用分组
     * @param $apiData
     * @param $groups
     * @return array
     */
    public static function mergeApiGroup($apiData,$groups){
        if (empty($groups) || count($apiData)<1){
            return $apiData;
        }
        $groupNames = static::getAppGroupNames($groups);
        $apiObject = [];
        foreach ($apiData as $controller){
            if (!empty($controller['group']) && in_array($controller['group'],$groupNames)){
                if (!empty($apiObject[$controller['group']])){
                    $apiObject[$controller['group']][] = $controller;
                }else{
                    $apiObject[$controller['group']] = [$controller];
                }
            }else{
                if (!empty($apiObject['notGroup'])){
                    $apiObject['notGroup'][] = $controller;
                }else{
                    $apiObject['notGroup'] = [$controller];
                }
            }
        }
        if (!empty($apiObject['notGroup'])){
            array_unshift($groups,['title'=>'未分组','name'=>'notGroup']);
        }
        $res = static::objtctGroupByTree($groups,$apiObject);
        return $res;
    }
}
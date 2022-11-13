<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use Doctrine\Common\Annotations\AnnotationReader;
use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;
use ReflectionClass;
use Symfony\Component\ClassLoader\ClassMapGenerator;
use hg\apidoc\annotation\Group;
use hg\apidoc\annotation\Sort;
use hg\apidoc\annotation\Title;
use hg\apidoc\annotation\Desc;
use hg\apidoc\annotation\Author;
use hg\apidoc\annotation\Tag;
use hg\apidoc\annotation\Header;
use hg\apidoc\annotation\ParamType;
use hg\apidoc\annotation\Url;
use hg\apidoc\annotation\Method;
use hg\apidoc\annotation\ContentType;

class ParseApiMenus
{

    protected $config = [];

    protected $reader;

    //tags，当前应用/版本所有的tag
    protected $tags = array();

    //groups,当前应用/版本的分组name
    protected $groups = array();

    protected $controller_layer = "App";

    protected $currentApp = [];

    protected $parseApiDetail;

    public function __construct($config)
    {
        $this->reader = new AnnotationReader();
        if (!empty($config['ignored_annitation'])){
            foreach ($config['ignored_annitation'] as $item) {
                AnnotationReader::addGlobalIgnoredName($item);
            }
        }
        $this->config = $config;
    }

    /**
     * 生成api接口数据
     * @param string $appKey
     * @return array
     */
    public function renderApiMenus(string $appKey): array
    {
        $currentAppConfig = Helper::getCurrentAppConfig($appKey);
        $currentApp = $currentAppConfig['appConfig'];
        $this->currentApp  = $currentApp;

        if (!empty($currentApp['controllers']) && count($currentApp['controllers']) > 0) {
            // 配置的控制器列表
            $controllers = $this->getConfigControllers($currentApp['path'],$currentApp['controllers']);
        } else {
            // 默认读取所有的
            $controllers = $this->getDirControllers($currentApp['path']);
        }


        $apiData = [];
        if (!empty($controllers) && count($controllers) > 0) {
            foreach ($controllers as $class) {
                $classData = $this->parseController($class);
                if ($classData !== false) {
                    $apiData[] = $classData;
                }
            }
        }
        // 排序
        $apiList = Helper::arraySortByKey($apiData);
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
    protected function getConfigControllers(string $path,$appControllers): array
    {
        $controllers = [];
        $configControllers = $appControllers;
        if (!empty($configControllers) && count($configControllers) > 0) {
            foreach ($configControllers as $item) {
                if ( strpos($item, $path) !== false && class_exists($item)) {
                    $controllers[] = $item;
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
    protected function getDirControllers(string $path): array
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

    public function parseController($class)
    {

        $data                 = [];
        $refClass             = new ReflectionClass($class);
        $classTextAnnotations = ParseAnnotation::parseTextAnnotation($refClass);
        if (in_array("NotParse", $classTextAnnotations)) {
            return false;
        }
        $title = $this->reader->getClassAnnotation($refClass, Title::class);
        $group = $this->reader->getClassAnnotation($refClass, Group::class);
        $sort = $this->reader->getClassAnnotation($refClass, Sort::class);
        $routeGroup         = $this->reader->getClassAnnotation($refClass, RouteGroup::class);

        $controllersNameArr = explode("\\", $class);
        $controllersName    = $controllersNameArr[count($controllersNameArr) - 1];
        $data['controller'] = $controllersName;
        $data['path'] = $class;
        $data['group']      = !empty($group->value) ? $group->value : null;
        $data['sort']      = !empty($sort->value) ? $sort->value : null;
        if (!empty($data['group']) && !in_array($data['group'], $this->groups)) {
            $this->groups[] = $data['group'];
        }
        $data['title'] = !empty($title) && !empty($title->value) ? $title->value : "";

        if (empty($title)) {
            if (!empty($classTextAnnotations) && count($classTextAnnotations) > 0) {
                $data['title'] = $classTextAnnotations[0];
            } else {
                $data['title'] = $controllersName;
            }
        }
        $data['title'] = Lang::getLang($data['title']);
        $methodList       = [];
        $data['menuKey'] = Helper::createRandKey($data['controller']);
        $isNotDebug = in_array("NotDebug", $classTextAnnotations);

        foreach ($refClass->getMethods(\ReflectionMethod::IS_PUBLIC) as $refMethod) {
            $methodItem = $this->parseApiMethod($refClass,$refMethod,$routeGroup);
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


    protected function parseApiMethod($refClass,$refMethod,$routeGroup){
        $config               = $this->config;
        if (empty($refMethod->name)) {
            return false;
        }
        if (empty($this->parseApiDetail)){
            $this->parseApiDetail = new ParseApiDetail($config);
        }
        $textAnnotations = ParseAnnotation::parseTextAnnotation($refMethod);
        $methodInfo = $this->parseMethodAnnotation($refMethod);
        if (empty($methodInfo)){
            return false;
        }
        $methodInfo = $this->parseApiDetail->handleApiBaseInfo($methodInfo,$refClass,$refMethod,$textAnnotations);
        return $methodInfo;

    }


    /**
     * 解析方法注释
     * @param $refMethod
     * @return array
     */
    protected function parseMethodAnnotation($refMethod): array
    {
        $data = [];
        if ($annotations = $this->reader->getMethodAnnotations($refMethod)) {
            foreach ($annotations as $annotation) {
                switch (true) {
                    case $annotation instanceof Author:
                        $data['author'] = $annotation->value;
                        break;

                    case $annotation instanceof Title:
                        $data['title'] = Lang::getLang($annotation->value);
                        break;
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
                }
            }

        }
        return $data;
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
        $apiObject = [];
        foreach ($apiData as $controller){
            if (!empty($controller['group'])){
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
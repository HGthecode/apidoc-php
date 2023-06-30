<?php
declare(strict_types = 1);

namespace hg\apidoc\utils;

//use Doctrine\Common\Annotations\AnnotationReader;
use hg\apidoc\parses\ParseAnnotation;
use hg\apidoc\utils\Helper;
use ReflectionClass;
use hg\apidoc\annotation\Url;
use hg\apidoc\annotation\Method;
use hg\apidoc\annotation\RouteMiddleware;
use hg\apidoc\parses\ParseApiDetail;
use hg\apidoc\parses\ParseApiMenus;

class AutoRegisterRouts
{

    protected $config = [];


    protected $filterMethods = [
        '__construct',
    ];

    public function __construct($config)
    {
        $this->config = $config;
    }

    /**
     * 解析所有应用的api
     * @return array
     */
    public function getAppsApis(){
        $apps = Helper::getAllApps($this->config['apps']);
        $apiList = [];
        if (!empty($apps) && count($apps)){
            foreach ($apps as $app) {
               $apis = $this->getAppApis($app);
               $apiList=array_merge($apiList,$apis);
            }
        }
        return $apiList;

    }

    /**
     * 生成api接口数据
     * @param array $app
     * @return array
     */
    public function getAppApis($app)
    {
        $controllers = [];
        if (!empty($app['controllers']) && count($app['controllers']) > 0) {
            // 配置的控制器列表
            $controllers = (new ParseApiMenus($this->config))->getConfigControllers($app['path'],$app['controllers']);
        }else if(!empty($app['path']) && is_array($app['path']) && count($app['path'])){
            $parseApiMenus = new ParseApiMenus($this->config);
            foreach ($app['path'] as $path) {
                $controllersList = $parseApiMenus->getDirControllers($path);
                $controllers = array_merge($controllers,$controllersList);
            }
        } else if(!empty($app['path']) && is_string($app['path'])) {
            // 默认读取所有的
            $controllers = (new ParseApiMenus($this->config))->getDirControllers($app['path']);
        }

        $routeData = [];
        if (!empty($controllers) && count($controllers) > 0) {
            foreach ($controllers as $class) {
                $classData = $this->parseController($class);
                if ($classData !== false) {
                    $routeData[] = $classData;
                }
            }
        }
        return $routeData;
    }


    public function parseController($class)
    {
        $refClass             = new ReflectionClass($class);
        $classTextAnnotations = ParseAnnotation::parseTextAnnotation($refClass);
        $classAnnotations = (new ParseAnnotation($this->config))->getClassAnnotation($refClass);
        if (in_array("NotParse", $classTextAnnotations) || isset($classAnnotations['notParse'])) {
            return false;
        }


        $methodList = [];
        foreach ($refClass->getMethods(\ReflectionMethod::IS_PUBLIC) as $refMethod) {
            $methodItem = $this->parseApiMethod($refClass,$refMethod);
            if ($methodItem===false){
                continue;
            }
            $methodList[] = $methodItem;
        }
        if (count($methodList)===0){
            return false;
        }
        $data = [
            'name'=>$refClass->name,
            'methods'=>$methodList,
        ];

        //控制器中间件
        if (!empty($classAnnotations['routeMiddleware']) && !empty($classAnnotations['routeMiddleware'])) {
            $data['middleware'] = $classAnnotations['routeMiddleware'];
        }
        return $data;
    }


    protected function parseApiMethod($refClass,$refMethod){
        if (empty($refMethod->name) || in_array($refMethod->name,$this->filterMethods)) {
            return false;
        }
        $config               = $this->config;
        $textAnnotations = ParseAnnotation::parseTextAnnotation($refMethod);
        $methodAnnotation = (new ParseAnnotation($config))->getMethodAnnotation($refMethod);
        if (in_array("NotParse", $textAnnotations) || isset($methodAnnotation['notParse'])) {
            return false;
        }

        if (empty($methodAnnotation['method'])) {
            $method = !empty($config['default_method']) ? strtoupper($config['default_method']) : '*';
        }else{
            $method = $methodAnnotation['method'];
        }
        if (empty($methodAnnotation['url'])) {
            $url = ParseApiDetail::autoCreateUrl($refClass->name,$refMethod->name,$config);
        }else{
            $url = $methodAnnotation['url'];
        }
        if (!empty($url) && substr($url, 0, 1) != "/") {
            $url = "/" . $url;
        }
        $data = [
            'url'=>$url,
            'method'=>$method,
            'name'=>$refMethod->name,
            'controller'=>$refClass->name,
        ];
        if (!empty($methodAnnotation['routeMiddleware']) && !empty($methodAnnotation['routeMiddleware'])) {
            $data['middleware'] = $methodAnnotation['routeMiddleware'];
        }
        return $data;

    }

}
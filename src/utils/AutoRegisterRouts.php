<?php
declare(strict_types = 1);

namespace hg\apidoc\utils;

use Doctrine\Common\Annotations\AnnotationReader;
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

    protected $reader;

    protected $currentApp = [];

    protected $filterMethods = [
        '__construct',
    ];

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
        $appKey = $app['appKey'];
        $currentAppConfig = Helper::getCurrentAppConfig($appKey, $this->config);
        $currentApp = $currentAppConfig['appConfig'];
        $this->currentApp  = $currentApp;

        if (!empty($app['controllers']) && count($app['controllers']) > 0) {
            // 配置的控制器列表
            $controllers = (new ParseApiMenus($this->config))->getConfigControllers($app['path'],$app['controllers']);
        } else {
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
        if (in_array("NotParse", $classTextAnnotations)) {
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
        if ($routeMiddleware = $this->reader->getClassAnnotation($refClass, RouteMiddleware::class)){
            $data['middleware'] = $routeMiddleware->value;
        }

        return $data;
    }


    protected function parseApiMethod($refClass,$refMethod){
        if (empty($refMethod->name) || in_array($refMethod->name,$this->filterMethods)) {
            return false;
        }
        $config               = $this->config;
        $textAnnotations = ParseAnnotation::parseTextAnnotation($refMethod);
        if (in_array("NotParse", $textAnnotations)) {
            return false;
        }

        $url = $this->reader->getMethodAnnotation($refMethod, Url::class);
        $method = $this->reader->getMethodAnnotation($refMethod, Method::class);
        if (empty($method)) {
            $method = !empty($config['default_method']) ? strtoupper($config['default_method']) : '*';
        }else{
            $method = $method->value;
        }
        if (empty($url)) {
            $url = ParseApiDetail::autoCreateUrl($refClass->name,$refMethod,$config);
        }else{
            $url = $url->value;
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
        if ($middleware = $this->reader->getMethodAnnotation($refMethod, RouteMiddleware::class)) {
            $data['middleware'] = $middleware->value;
        }
        return $data;

    }

}
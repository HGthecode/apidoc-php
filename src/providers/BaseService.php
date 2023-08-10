<?php

namespace hg\apidoc\providers;

use hg\apidoc\utils\AutoRegisterRouts;
use hg\apidoc\utils\Cache;
use hg\apidoc\utils\ConfigProvider;
use hg\apidoc\utils\Helper;

trait BaseService
{

    static $routes = [
        ['rule'=>'config','route'=>'getConfig'],
        ['rule'=>'apiMenus','route'=>'getApiMenus'],
        ['rule'=>'apiDetail','route'=>'getApiDetail'],
        ['rule'=>'docMenus','route'=>'getMdMenus'],
        ['rule'=>'docDetail','route'=>'getMdDetail'],
        ['rule'=>'verifyAuth','route'=>'verifyAuth'],
        ['rule'=>'generator','route'=>'createGenerator'],
        ['rule'=>'cancelAllCache','route'=>'cancelAllCache'],
        ['rule'=>'createAllCache','route'=>'createAllCache'],
        ['rule'=>'renderCodeTemplate','route'=>'renderCodeTemplate'],
        ['rule'=>'allApiMenus','route'=>'getAllApiMenus'],
        ['rule'=>'addApiShare','route'=>'addApiShare'],
        ['rule'=>'getApiShareList','route'=>'getApiShareList'],
        ['rule'=>'getApiShareDetail','route'=>'getApiShareDetail'],
        ['rule'=>'deleteApiShare','route'=>'deleteApiShare'],
        ['rule'=>'handleApiShareAction','route'=>'handleApiShareAction'],
    ];



    /**
     * 获取apidoc配置
     * @return array 返回apidoc配置
     */
    abstract static function getApidocConfig();


    /**
     * 注册apidoc路由
     * @param $route 路由参数
     * @return mixed
     */
    abstract static function registerRoute($route);

    /**
     * 执行Sql语句
     * @return mixed
     */
    abstract static function databaseQuery($sql);

    /**
     * 获取项目根目录
     * @return string 返回项目根目录
     */
    abstract static function getRootPath();

    /**
     * 获取缓存目录
     * @return string 返回项目缓存目录
     */
    abstract static function getRuntimePath();


    /**
     * 设置当前语言
     * @param $locale 语言标识
     * @return mixed
     */
    abstract static function setLang($locale);

    /**
     * 获取语言定义
     * @param $lang
     * @return string
     */
    abstract static function getLang($lang);


    /**
     * 处理apidoc接口响应的数据
     * @return mixed
     */
    abstract static function handleResponseJson($res);

    abstract static function getTablePrefix();

    // 自动注册api路由
    static public function autoRegisterRoutes($routeFun,$config=""){
        if (empty($config)){
            $config = self::getApidocConfig();
        }
        if (isset($config['auto_register_routes']) && $config['auto_register_routes']===true) {
            $cacheKey = "apis/autoRegisterRoutes";
            if (!empty($config['cache']) && $config['cache']['enable']) {
                $cacheData = (new Cache())->get($cacheKey);
                if (!empty($cacheData)) {
                    $autoRegisterApis = $cacheData;
                } else {
                    $autoRegisterApis = (new AutoRegisterRouts($config))->getAppsApis();
                    (new Cache())->set($cacheKey, $autoRegisterApis);
                }
            } else {
                $autoRegisterApis = (new AutoRegisterRouts($config))->getAppsApis();
            }
            $routeFun($autoRegisterApis);
        }
    }

    public function initConfig(){
        ! defined('APIDOC_ROOT_PATH') && define('APIDOC_ROOT_PATH', $this->getRootPath());
        ! defined('APIDOC_STORAGE_PATH') && define('APIDOC_STORAGE_PATH', $this->getRuntimePath());
        $config = self::getApidocConfig();
        if (empty($config['database_query_function'])){
            $config['database_query_function'] = function ($sql){
                return self::databaseQuery($sql);
            };
        }
        if (empty($config['lang_register_function'])){
            $config['lang_register_function'] = function ($sql){
                return self::setLang($sql);
            };
        }
        if (empty($config['lang_get_function'])){
            $config['lang_get_function'] = function ($lang){
                return self::getLang($lang);
            };
        }
        $config['handle_response_json'] = function ($res){
            return self::handleResponseJson($res);
        };
        $table_prefix = self::getTablePrefix();
        if (!empty($config['database'])){
            if (empty($config['prefix'])){
                $config['database']['prefix'] = $table_prefix;
            }
        }else{
            $config['database']=[
                'prefix'=>$table_prefix
            ];
        }
        ConfigProvider::set($config);
    }

    /**
     * @param null $routeFun
     */
    static public function registerApidocRoutes($routeFun=null){
        $routes = static::$routes;
        $controller_namespace = '\hg\apidoc\Controller@';
        $route_prefix = "/apidoc";
        $config = self::getApidocConfig();
        if (!empty($config) && !empty($config['route_prefix'])){
            $route_prefix = $config['route_prefix'];
        }
        foreach ($routes as $item) {
            $route = [
                'uri'=>$route_prefix."/".$item['rule'],
                'callback'=>$controller_namespace.$item['route'],
                'route'=>$item['route'],
            ];
            if (!empty($routeFun)){
                $routeFun($route);
            }else{
                self::registerRoute($route);
            }
        }
    }

}
<?php

namespace hg\apidoc\providers;

use hg\apidoc\utils\ConfigProvider;

trait CommonService
{


    static $routes = [
        ['rule'=>'config','route'=>'getConfig','method'=>'GET'],
        ['rule'=>'apiMenus','route'=>'getApiMenus','method'=>'POST'],
        ['rule'=>'apiDetail','route'=>'getApiDetail','method'=>'POST'],
        ['rule'=>'docMenus','route'=>'getMdMenus','method'=>'POST'],
        ['rule'=>'docDetail','route'=>'getMdDetail','method'=>'POST'],
        ['rule'=>'verifyAuth','route'=>'verifyAuth','method'=>'POST'],
        ['rule'=>'generator','route'=>'createGenerator','method'=>'POST'],
        ['rule'=>'cancelAllCache','route'=>'cancelAllCache','method'=>'POST'],
        ['rule'=>'createAllCache','route'=>'createAllCache','method'=>'POST'],
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
    abstract static function getLang($lang):string;


    /**
     * 处理apidoc接口响应的数据
     * @return mixed
     */
    abstract function handleResponseJson();

    abstract static function getTablePrefix():string;


    public function register()
    {
        ! defined('APIDOC_ROOT_PATH') && define('APIDOC_ROOT_PATH', $this->getRootPath());
        ! defined('APIDOC_STORAGE_PATH') && define('APIDOC_STORAGE_PATH', $this->getRuntimePath());
        static::registerApidocRoutes();
        $config = self::getApidocConfig();
        $config['database_query_function'] = function ($sql){
            return self::databaseQuery($sql);
        };
        $config['lang_register_function'] = function ($sql){
            return self::setLang($sql);
        };
        $config['lang_get_function'] = function ($lang){
            return self::getLang($lang);
        };
        $config['handle_response_json'] = function ($res){
            return self::handleResponseJson($res);
        };
        $config['table_prefix'] = self::getTablePrefix();


        ConfigProvider::set($config);
    }

    /**
     * @param null $routeFun
     */
    static public function registerApidocRoutes($routeFun=null){
        $routes = static::$routes;
        $controller_namespace = '\hg\apidoc\Controller@';
        $route_prefix = "/apidoc/";
        foreach ($routes as $item) {
            $route = [
                'uri'=>$route_prefix.$item['rule'],
                'callback'=>$controller_namespace.$item['route'],
                'route'=>$item['route'],
                'method'=>$item['method']
            ];
            if (!empty($routeFun)){
                $routeFun($route);
            }else{
                self::registerRoute($route);
            }
        }
    }

}
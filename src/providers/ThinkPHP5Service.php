<?php

namespace hg\apidoc\providers;

use hg\apidoc\utils\Helper;
use think\facade\App;
use think\facade\Route;
use think\facade\Request;
use think\facade\Lang;
use think\Db;
use Exception;

class ThinkPHP5Service
{
    use BaseService;

    public function run(){
        $this->initConfig();
        self::registerApidocRoutes();
        // 自动注册路由
        self::autoRegisterRoutes(function ($routeData){
            $appRoute = app('route');
            $routeGroup = $appRoute->getGroup();
            foreach ($routeData as $controller) {
                $routeGroup = $appRoute->getGroup();
                if (!empty($controller['middleware'])){
                    $routeGroup->middleware($controller['middleware']);
                }
                if (count($controller['methods'])){
                    foreach ($controller['methods'] as $method) {
                        $apiMethods = Helper::handleApiMethod($method['method']);
                        $apiMethods = implode("|",$apiMethods);
                        $route = $routeGroup->addRule($method['url'],$method['controller']."@".$method['name'],$apiMethods);
                        if (!empty($method['middleware'])){
                            $route->middleware($method['middleware']);
                        }
                    }
                }
            }
        });
    }

    static function getApidocConfig()
    {
        $config = config("apidoc.");
        if (!(!empty($config['auto_url']) && !empty($config['auto_url']['filter_keys']))){
            $config['auto_url']['filter_keys'] = ['app','controller'];
        }
        $config['app_frame'] = "thinkphp5";
        return $config;
    }

    static function registerRoute($route){
        $config = self::getApidocConfig();
        $registerRoute = Route::rule($route['uri'], $route['callback'],"*");
        if (!empty($config['allowCrossDomain'])) {
            $registerRoute->allowCrossDomain();
        }
    }

    static function databaseQuery($sql){
        return Db::query($sql);
    }

    static function getTablePrefix(){
        $driver = config('database.default');
        $table_prefix=config('database.connections.'.$driver.'.prefix');
        return $table_prefix;
    }

    static function getRootPath()
    {
        return App::getRootPath();
    }

    static function getRuntimePath()
    {
        return App::getRuntimePath();
    }

    static function setLang($locale){
        Lang::setLangCookieVar($locale);
    }

    static function getLang($lang){
        return Lang::get($lang);
    }

    static function handleResponseJson($res){
        return json($res);
    }


}
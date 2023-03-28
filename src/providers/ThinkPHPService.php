<?php

namespace hg\apidoc\providers;

use hg\apidoc\middleware\ThinkPHPMiddleware;
use hg\apidoc\utils\Helper;
use think\facade\App;
use think\facade\Route;
use think\facade\Request;
use think\facade\Lang;
use think\facade\Db;

class ThinkPHPService extends \think\Service
{
    use BaseService;

    static function getApidocConfig()
    {
        $config = config("apidoc");
        if (!(!empty($config['auto_url']) && !empty($config['auto_url']['filter_keys']))){
            $config['auto_url']['filter_keys'] = ['app','controller'];
        }
        $config['app_frame'] = "thinkphp6";
        return $config;
    }
    
    public function register()
    {
        $config = static::getApidocConfig();
        $this->initConfig();

        $this->registerRoutes(function () use($config){
            //注册apidoc所需路由
            self::registerApidocRoutes(function ($route)use ($config){
                $registerRoute = Route::any($route['uri'], $route['callback']);
                $registerRoute->middleware([ThinkPHPMiddleware::class]);
                if (!empty($config['allowCrossDomain'])) {
                    $registerRoute->allowCrossDomain();
                }
            });

            // 自动注册路由
            self::autoRegisterRoutes(function ($routeData){
                $appRoute = $this->app->route;
                $appName = $this->app->http->getName();
                foreach ($routeData as $controller) {
                    $routeGroup = $appRoute->getGroup();
                    if (!empty($controller['middleware'])){
                        $routeGroup->middleware($controller['middleware']);
                    }
                    if (count($controller['methods'])){
                        foreach ($controller['methods'] as $method) {
                            if (!empty($appName)){
                                $method['url'] = str_replace("/".$appName,'',$method['url']);
                            }
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
        });
    }

    static function registerRoute($route){
        $registerRoute = Route::any($route['uri'], $route['callback']);
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
        \think\facade\App::loadLangPack($locale);
        Lang::setLangSet($locale);
    }

    static function getLang($lang){
        return Lang::get($lang);
    }

    static function handleResponseJson($res){
        return json($res);
    }


}
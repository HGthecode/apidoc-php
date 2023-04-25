<?php

namespace hg\apidoc\providers;

use hg\apidoc\utils\ConfigProvider;
use hg\apidoc\utils\Helper;
use Webman\Route;
use hg\apidoc\middleware\WebmanMiddleware;

class WebmanService
{

    static function register(){
        ! defined('APIDOC_ROOT_PATH') && define('APIDOC_ROOT_PATH', WebmanMiddleware::getRootPath());
        ! defined('APIDOC_STORAGE_PATH') && define('APIDOC_STORAGE_PATH', WebmanMiddleware::getRuntimePath());

        CommonService::registerApidocRoutes(function ($item){
            Route::any($item['uri'],$item['callback'])->middleware([WebmanMiddleware::class]);
        });

        // 自动注册路由
        CommonService::autoRegisterRoutes(function ($routeData){
            foreach ($routeData as $controller) {
                if (count($controller['methods'])){
                    $methods= $controller['methods'];
                    $routeCallback = function ()use ($methods){
                        foreach ($methods as $method) {
                            $apiMethods = Helper::handleApiMethod($method['method']);
                            $route = Route::add([...$apiMethods,'OPTIONS'],$method['url'], $method['controller']."@".$method['name']);
                            if (!empty($method['middleware'])){
                                $route->middleware($method['middleware']);
                            }
                        }
                    };
                    $routeGroup = Route::group("",$routeCallback);
                    if (!empty($controller['middleware'])){
                        $routeGroup->middleware($controller['middleware']);
                    }
                }
            }
        }, WebmanMiddleware::getApidocConfig());
    }
}
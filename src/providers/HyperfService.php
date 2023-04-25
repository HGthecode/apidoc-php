<?php

namespace hg\apidoc\providers;

use hg\apidoc\utils\ConfigProvider;
use hg\apidoc\utils\Helper;
use Hyperf\DbConnection\Db;
use Hyperf\HttpServer\Router\Router;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use hg\apidoc\middleware\HyperfMiddleware;



class HyperfService
{


    static function register(){
        ! defined('APIDOC_ROOT_PATH') && define('APIDOC_ROOT_PATH', HyperfMiddleware::getRootPath());
        ! defined('APIDOC_STORAGE_PATH') && define('APIDOC_STORAGE_PATH', HyperfMiddleware::getRuntimePath());

        CommonService::registerApidocRoutes(function ($item){
            Router::addRoute(['GET','POST'],$item['uri'],$item['callback'],['middleware' => [HyperfMiddleware::class]]);
        });

        // 自动注册路由
        CommonService::autoRegisterRoutes(function ($routeData){
            foreach ($routeData as $controller) {
                if (count($controller['methods'])){
                    $methods= $controller['methods'];
                    $routeCallback = function ()use ($methods){
                        foreach ($methods as $method) {
                            $apiMethods = Helper::handleApiMethod($method['method']);
                            $options = [];
                            if (!empty($method['middleware'])){
                                $options['middleware']= $method['middleware'];
                            }
                            Router::addRoute([...$apiMethods,'OPTIONS'],$method['url'], $method['controller']."@".$method['name'],$options);
                        }
                    };
                    $groupOptions = [];
                    if (!empty($controller['middleware'])){
                        $groupOptions['middleware'] = $controller['middleware'];
                    }
                    Router::addGroup("",$routeCallback,$groupOptions);
                }
            }
        }, HyperfMiddleware::getApidocConfig());
    }
}
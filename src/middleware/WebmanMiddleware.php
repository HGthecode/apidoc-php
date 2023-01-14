<?php

namespace hg\apidoc\middleware;

use hg\apidoc\providers\BaseService;
use hg\apidoc\utils\ConfigProvider;
use support\Db;
use Webman\MiddlewareInterface;
use Webman\Http\Response;
use Webman\Http\Request;

class WebmanMiddleware implements MiddlewareInterface
{
    use BaseService;

    public function process(Request $request, callable $handler) : Response
    {

        $this->initConfig();
        $params = $request->all();
        $config =  ConfigProvider::get();
        $config['request_params'] = $params;
        ConfigProvider::set($config);

        $response = $handler($request);
        return $response;
    }

    static function getApidocConfig()
    {
        $config = config('plugin.hg.apidoc.app.apidoc');
        if (!(!empty($config['auto_url']) && !empty($config['auto_url']['filter_keys']))){
            $config['auto_url']['filter_keys'] = ['app','controller'];
        }
        $config['app_frame'] = "webman";
        return $config;
    }

    static function registerRoute($route)
    {
        return "";
    }

    static function databaseQuery($sql)
    {
        return Db::select($sql);
    }

    static function getRootPath()
    {
        return BASE_PATH."/";
    }

    static function getRuntimePath()
    {
        return BASE_PATH."/runtime/";
    }

    static function setLang($locale)
    {
        locale($locale);
    }

    static function getLang($lang): string
    {
        return $lang;
    }

    static function handleResponseJson($res)
    {
        return json($res);
    }

    static function getTablePrefix(){
        $driver = config('database.default');
        $table_prefix=config('database.connections.'.$driver.'.prefix');
        return $table_prefix;
    }
}
<?php

namespace hg\apidoc\providers;

use hg\apidoc\utils\ConfigProvider;
use Hyperf\DbConnection\Db;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class HyperfService
{
    use CommonService;

    static $langLocale="zh_CN";

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $this->register();

        if ($request->getMethod() == "GET"){
            $params = $request->getQueryParams();
        }else{
            $params = $request->getParsedBody();
        }
        $config =  ConfigProvider::get();
        $config['request_params'] = $params;
        ConfigProvider::set($config);
        return $handler->handle($request);
    }

    static function getApidocConfig()
    {
        $config = config("apidoc");
        if (!(!empty($config['auto_url']) && !empty($config['auto_url']['filter_keys']))){
            $config['auto_url']['filter_keys'] = ['App','Controller'];
        }
        return $config;
    }

    static function registerRoute($route)
    {
        // TODO: Implement registerRoute() method.
    }

    static function databaseQuery($sql)
    {
        return Db::select($sql);
    }

    static function getTablePrefix(){
        return config('databases.default.prefix','');
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
        static::$langLocale = $locale;
    }

    static function getLang($lang): string
    {
        return trans($lang);
    }

    static function handleResponseJson($res)
    {
        return $res;
    }
}
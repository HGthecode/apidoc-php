<?php

namespace hg\apidoc\providers;

use hg\apidoc\middleware\LaravelMiddleware;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Exception;
use hg\apidoc\utils\ApiCrossDomain;
use Illuminate\Support\Facades\DB;

class LaravelService extends ServiceProvider
{

    use BaseService;

    public function boot()
    {
        $this->publishes([
            __DIR__.'/../config.php' => config_path('apidoc.php'),
        ]);
    }

    public function register()
    {
        $config = static::getApidocConfig();
        $this->initConfig();
        self::registerApidocRoutes();
    }

    static function getApidocConfig()
    {
        $config = config("apidoc");
        if (!(!empty($config['auto_url']) && !empty($config['auto_url']['filter_keys']))){
            $config['auto_url']['filter_keys'] = ['App','Http','Controllers'];
        }
        return $config;
    }

    static function registerRoute($route){
        $config = self::getApidocConfig();
        $registerRoute =  Route::match([$route['method']],$route['uri'], $route['callback']);
        $registerRoute->middleware([LaravelMiddleware::class]);
        if (!empty($config['allowCrossDomain'])) {
            $registerRoute->middleware([ApiCrossDomain::class]);
        }
    }

    static function databaseQuery($sql){
        return DB::select($sql);
    }

    static function getTablePrefix(){
        $driver = config('database.default');
        $table_prefix=config('database.connections.'.$driver.'.prefix');
        return $table_prefix;
    }

    static function getRootPath()
    {
        return base_path()."/";
    }

    static function getRuntimePath()
    {
        return storage_path()."/";
    }

    static function setLang($locale){
        Lang::setLocale($locale);
    }

    static function getLang($lang){
        return trans($lang);
    }

    static function handleResponseJson($res){
        return $res;
    }


}
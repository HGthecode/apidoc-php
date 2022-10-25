<?php

namespace hg\apidoc\utils;

class ConfigProvider
{

    protected static  $defaultConfig = [
        'cache'=>[
            'folder'=>'apidoc'
        ]
    ];
    protected static $config = [];


    public static function get($field="",$isFilter=false){

        if (!empty(static::$config)) {
            $config = static::$config;
        }else{
//            $config = [];
//            if (function_exists('config')) {
//                $key = !empty(APIDOC_CONFIG_KEY)?APIDOC_CONFIG_KEY:"apidoc";
//                $config = config($key);
//            }
//            static::$config = $config;

        }
        if ($isFilter){
            $config = static::handleConfig($config);
        }

        return Helper::getObjectFindByField($config,$field);
    }

    public static function set($config){
        if (!(!empty($config['cache']) && !empty($config['cache']['folder']))){
            if (!empty($config['cache'])){
                $config['cache']['folder'] =static::$defaultConfig['cache']['folder'];
            }
        }
        static::$config = $config;
    }

    protected static function handleConfig($config){
        if (!empty($config['auth'])){
            unset($config['auth']);
        }

        if (!empty($config['apps']) && count($config['apps'])){
            // 清除apps配置中的password
            $config['apps'] = Helper::handleAppsConfig($config['apps'],true);
        }

        return $config;
    }


}
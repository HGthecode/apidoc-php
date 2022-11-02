<?php

namespace hg\apidoc\utils;

use hg\apidoc\exception\ErrorException;

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
            throw new ErrorException('ConfigProvider get error');
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

    public static function getFeConfig(){
        $config = static::$config;

        $feConfig = [
            'title'  =>!empty($config['title'])?Lang::getLang($config['title'] ):'',
            'desc' =>!empty($config['title'])?Lang::getLang($config['desc']):'',
            'apps'=>!empty($config['apps'])?$config['apps']:[],
            'cache'=>!empty($config['cache'])?$config['cache']:[],
            'params'=>!empty($config['params'])?$config['params']:[],
            'responses'=>!empty($config['responses'])?$config['responses']:[],
            'generator'=>!empty($config['generator'])?$config['generator']:[],
        ];
        if (!empty($feConfig['apps']) && count($feConfig['apps'])){
            // 清除apps配置中的password
            $feConfig['apps'] = Helper::handleAppsConfig($feConfig['apps'],true);
        }

        if (!empty($feConfig['params']) && !empty($feConfig['params']['header'])){
            $feConfig['params']['header'] = Lang::getArrayLang($feConfig['params']['header'],"desc");
        }
        if (!empty($feConfig['params']) && !empty($feConfig['params']['query'])){
            $feConfig['params']['query'] = Lang::getArrayLang($feConfig['params']['query'],"desc");
        }
        if (!empty($feConfig['params']) && !empty($feConfig['params']['body'])){
            $feConfig['params']['body'] = Lang::getArrayLang($feConfig['params']['body'],"desc");
        }
        if (!empty($feConfig['responses']) && !empty($feConfig['responses']['success'])){
            $feConfig['responses']['success'] = Lang::getArrayLang($feConfig['responses']['success'],"desc");
        }
        if (!empty($feConfig['responses']) && !empty($feConfig['responses']['error'])){
            $feConfig['responses']['error'] = Lang::getArrayLang($feConfig['responses']['error'],"desc");
        }
        if (!empty($feConfig['generator'])){
            $generatorList = [];
            $generators= Lang::getArrayLang($feConfig['generator'],"title");
            foreach ($generators as $item) {
                if (!empty($item['form']) && !empty($item['form']['items']) && count($item['form']['items'])){
                    $item['form']['items'] = Lang::getArrayLang( $item['form']['items'],"title");
                }
                $generatorList[]=$item;
            }
            $feConfig['generator'] = $generatorList;
        }
        return $feConfig;
    }


}
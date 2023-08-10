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


    public static function get($field=""){

        if (!empty(static::$config)) {
            $config = static::$config;
        }else{
            throw new ErrorException('ConfigProvider get error');
        }

        return Helper::getObjectFindByField($config,$field);
    }

    public static function set($config){
        if (!(!empty($config['cache']) && !empty($config['cache']['folder']))){
            if (!empty($config['cache'])){
                $config['cache']['folder'] =static::$defaultConfig['cache']['folder'];
            }
        }
        $config = static::handleConfig($config);
        static::$config = $config;
    }

    public static function handleConfig($config){
        if (!empty($config['params'])){
            if (!empty($config['params']['header'])){
                $config['params']['header'] = Helper::handleArrayParams($config['params']['header'],"desc",$config);
            }
            if (!empty($config['params']['query'])){
                $config['params']['query'] = Helper::handleArrayParams($config['params']['query'],"desc",$config);
            }
            if (!empty($config['params']['body'])){
                $config['params']['body'] = Helper::handleArrayParams($config['params']['body'],"desc",$config);
            }
        }
        if (!empty($config['responses'])){
            if (!empty($config['responses']['success'])){
                $config['responses']['success'] = Helper::handleArrayParams($config['responses']['success'],"desc",$config);
            }
            if (!empty($config['responses']['error'])){
                $config['responses']['error'] = Helper::handleArrayParams($config['responses']['error'],"desc",$config);
            }
        }
        return $config;
    }

    public static function getFeConfig($filterAppKeys=[]){
        $config = static::$config;

        $feConfig = [
            'title'  =>!empty($config['title'])?Lang::getLang($config['title'] ):'',
            'desc' =>!empty($config['title'])?Lang::getLang($config['desc']):'',
            'apps'=>!empty($config['apps'])?$config['apps']:[],
            'cache'=>!empty($config['cache'])?$config['cache']:[],
            'params'=>!empty($config['params'])?$config['params']:[],
            'responses'=>!empty($config['responses'])?$config['responses']:[],
            'generator'=>!empty($config['generator'])?$config['generator']:[],
            'code_template'=>!empty($config['code_template'])?$config['code_template']:[],
            'share'=>!empty($config['share'])?$config['share']:[],
        ];
        if (!empty($feConfig['apps']) && count($feConfig['apps'])){
            // 清除apps配置中的password
            $feConfig['apps'] = Helper::handleAppsConfig($feConfig['apps'],true,"","",$filterAppKeys);
        }

        if (!empty($feConfig['generator'])){
            $generatorList = [];
            $generators= Helper::handleArrayParams($feConfig['generator'],"title");
            foreach ($generators as $item) {
                if (isset($item['enable']) && $item['enable'] === false){
                    continue;
                }
                if (!empty($item['form']) && !empty($item['form']['items']) && count($item['form']['items'])){
                    $item['form']['items'] = Helper::handleArrayParams( $item['form']['items'],"title");
                }
                $generatorList[]=$item;
            }
            $feConfig['generator'] = $generatorList;
        }
        return $feConfig;
    }


}
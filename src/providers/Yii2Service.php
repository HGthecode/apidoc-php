<?php

namespace hg\apidoc\providers;

use Yii;

class Yii2Service
{
    use BaseService;

    public function run()
    {
        $this->initConfig();
    }

    static function getApidocConfig()
    {
        $config = require \Yii::getAlias('@common') . '/config/apidoc.php';

        if (!(!empty($config['auto_url']) && !empty($config['auto_url']['filter_keys']))){
            $config['auto_url']['filter_keys'] = ['app','controller'];
        }
        $config['app_frame'] = "yii2";
        return $config;
    }

    static function registerRoute($route)
    {
        // TODO: Implement registerRoute() method.
    }

    static function databaseQuery($sql)
    {
        // TODO: Implement databaseQuery() method.
    }

    static function getRootPath()
    {
        //dd(Yii::getAlias('@app'));
        return Yii::getAlias('@app');
    }

    static function getRuntimePath()
    {
        //dd(Yii::getAlias('@runtime'));
        return Yii::getAlias('@runtime');
    }

    static function setLang($locale)
    {
        // TODO: Implement setLang() method.
    }

    static function getLang($lang)
    {
        // TODO: Implement getLang() method.
    }

    static function handleResponseJson($res)
    {
        return $res;
    }

    static function getTablePrefix()
    {
        // TODO: Implement getTablePrefix() method.
    }
}
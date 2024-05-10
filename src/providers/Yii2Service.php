<?php

namespace hg\apidoc\providers;

use Yii;
use yii\base\Component;
use yii\base\InvalidConfigException;
use yii\helpers\Inflector;

class Yii2Service extends Component
{
    use BaseService;

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->initConfig();
        self::registerApidocRoutes();

        Yii::$app->controllerMap = [
            'apidoc' => [
                'class' => '\hg\apidoc\controllers\Yii2Controller',
                'enableCsrfValidation' => false,
            ],
        ];
    }

    /**
     * @inheritdoc
     * @return array|mixed
     */
    static function getApidocConfig()
    {
        $config = require \Yii::getAlias('@common') . '/config/apidoc.php';

        if (!(!empty($config['auto_url']) && !empty($config['auto_url']['filter_keys']))){
            $config['auto_url']['filter_keys'] = ['app','controller'];
        }
        $config['app_frame'] = "yii2";
        return $config;
    }

    /**
     * @inheritdoc
     * @throws InvalidConfigException
     */
    static function registerRoute($route)
    {
        $k = mb_substr($route['uri'], 1);
        $v = Inflector::camel2id($k);
        $url_manager = Yii::$app->urlManager;
        $url_manager->rules[$k] = $v;
        $url_manager->init();
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
        return Yii::$app->db->tablePrefix;
    }
}
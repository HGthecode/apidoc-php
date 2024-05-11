<?php

namespace hg\apidoc\providers;

use Yii;
use yii\base\Component;
use yii\base\InvalidConfigException;
use yii\db\Exception;
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
        $rule_key = mb_substr($route['uri'], 1);
        $rule_val = Inflector::camel2id($rule_key);
        $url_manager = Yii::$app->urlManager;
        $url_manager->rules[$rule_key] = $rule_val;
        $url_manager->init();
    }

    /**
     * @throws Exception
     */
    static function databaseQuery($sql)
    {
        Yii::$app->db->createCommand($sql)->execute();
    }

    static function getRootPath()
    {
        //dd(Yii::getAlias('@app'));
        return Yii::getAlias('@app') . DIRECTORY_SEPARATOR;
    }

    static function getRuntimePath()
    {
        return Yii::getAlias('@runtime');
    }

    static function setLang($locale)
    {
        Yii::$app->language = $locale;
    }

    static function getLang($lang)
    {
        return Yii::t('apidoc', mb_substr($lang, mb_strlen('apidoc.')));
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
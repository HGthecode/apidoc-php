<?php

namespace hg\apidoc\controllers;

use hg\apidoc\Auth;
use hg\apidoc\exception\ErrorException;
use hg\apidoc\parses\ParseApiMenus;
use hg\apidoc\providers\Yii2Service;
use hg\apidoc\utils\ApiShare;
use hg\apidoc\utils\Cache;
use hg\apidoc\utils\ConfigProvider;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Request;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use yii\rest\Controller;
use yii\web\Response;

class Yii2Controller extends Controller
{
    protected $config;

    protected $requestParams = [];

    protected $lang = "";

    public function init($checkAuth = false)
    {
        $provider = new Yii2Service();
        $provider->run();

        $this->config = ConfigProvider::get();
        if (isset($this->config['enable']) && $this->config['enable'] === false) {
            throw new ErrorException("apidoc close");
        }
        if (!empty($this->config['request_params'])) {
            $this->requestParams = $this->config['request_params'];
        } else {
            $this->requestParams = (new Request())->param();
        }
        if (!empty($this->requestParams['lang']) && !empty($this->config['lang_register_function'])) {
            $this->lang = $this->requestParams['lang'];
            $this->config['lang_register_function']($this->lang);
        }
        if ($checkAuth) {
            (new Auth($this->config))->checkAuth($this->requestParams);
        }
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        unset($behaviors['authenticator']);

        //跨域
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                // restrict access to
                'Origin' => ['*'],
                // Allow methods
                'Access-Control-Request-Method' => ['POST', 'GET', 'OPTIONS', 'HEAD'],
                // Allow only headers 'X-Wsse'
                'Access-Control-Request-Headers' => ['*'],
                // Allow credentials (cookies, authorization headers, etc.) to be exposed to the browser
                'Access-Control-Allow-Credentials' => false,
                // Allow OPTIONS caching
                'Access-Control-Max-Age' => 3600,
                // Allow the X-Pagination-Current-Page header to be exposed to the browser.
                //'Access-Control-Expose-Headers' => ['access-token', 'app-id'],
            ],
        ];

        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON
            ]
        ];

        return $behaviors;
    }

    public function actionConfig()
    {
        $this->init();

        $params = $this->requestParams;
        if (!empty($params['shareKey'])) {
            // 接口分享
            $shareData = (new ApiShare())->checkShareAuth($this->config, $params);
            if (!empty($shareData['appKeys'])) {
                $config = ConfigProvider::getFeConfig($shareData['appKeys']);
            } else {
                $config = ConfigProvider::getFeConfig();
            }
        } else {
            (new Auth($this->config))->checkAuth($params);
            $config = ConfigProvider::getFeConfig();
        }
        return Helper::showJson(0, "", $config);
    }

    public function actionApiMenus()
    {
        $this->init();
        //$config = $this->config;
        $params = $this->requestParams;
        if (empty($params['appKey'])) {
            throw new ErrorException("appkey not found");
        }
        $appKey = $params['appKey'];
        $shareData = $this->checkAuth();
        $currentAppConfig = Helper::getCurrentAppConfig($appKey);
        $currentApp = $currentAppConfig['appConfig'];
        $apiData = $this->getApiMenusByAppKey($appKey);
        $groups = !empty($currentApp['groups']) ? $currentApp['groups'] : [];
        if (!empty($params['shareKey']) && $shareData['type'] == 'api') {
            $apiData['data'] = Helper::filterTreeNodesByKeys($apiData['data'], $shareData['apiKeys'], 'menuKey');
        }
        $json = [
            'data' => $apiData['data'],
            'app' => $currentApp,
            'groups' => $groups,
            'tags' => $apiData['tags'],
        ];
        return Helper::showJson(0, "", $json);
    }

    /**
     * 验证权限
     */
    protected function checkAuth()
    {
        $config = $this->config;
        $params = $this->requestParams;
        if (!empty($params['shareKey'])) {
            //分享
            $shareData = (new ApiShare())->checkShareAuth($config, $params);
            $appKey = !empty($params['appKey']) ? $params['appKey'] : "";
            if (!empty($shareData['appKeys']) && !in_array($appKey, $shareData['appKeys'])) {
                throw new ErrorException("share not exists");
            }
            return $shareData;
        } else {
            (new Auth($config))->checkAuth($params);
        }
    }

    protected function getApiMenusByAppKey($appKey)
    {
        $config = $this->config;
        if (!empty($config['cache']) && $config['cache']['enable']) {
            $cacheKey = Helper::getCacheKey('apiMenu', $appKey, $this->lang);
            $cacheData = (new Cache())->get($cacheKey);
            if ($cacheData && empty($params['reload'])) {
                $apiData = $cacheData;
            } else {
                // 生成数据并缓存
                $apiData = (new ParseApiMenus($config))->renderApiMenus($appKey);
                (new Cache())->set($cacheKey, $apiData);
            }
        } else {
            // 生成数据
            $apiData = (new ParseApiMenus($config))->renderApiMenus($appKey);
        }
        return $apiData;
    }
}
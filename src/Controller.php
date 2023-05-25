<?php
declare(strict_types=1);

namespace hg\apidoc;

use hg\apidoc\parses\ParseApiDetail;
use hg\apidoc\parses\ParseCodeTemplate;
use hg\apidoc\parses\ParseApiMenus;
use hg\apidoc\parses\ParseMarkdown;
use hg\apidoc\utils\ApiShare;
use hg\apidoc\utils\Cache;
use hg\apidoc\utils\ConfigProvider;
use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;
use hg\apidoc\utils\Request;
use hg\apidoc\exception\ErrorException;

class Controller
{

    protected $config;

    protected $requestParams = [];

    protected $lang = "";

    public function init($checkAuth = false)
    {
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
     * 验证权限
     * @param $config
     * @param $params
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


    /**
     * 获取配置
     * @return \think\response\Json
     */
    public function getConfig()
    {
        $this->init(false);
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

    /**
     * 验证密码
     */
    public function verifyAuth()
    {
        $this->init();
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['password'])) {
            throw new ErrorException("password not found");
        }
        $appKey = !empty($params['appKey']) ? $params['appKey'] : "";
        if (!empty($params['shareKey'])) {
            // 接口分享
            $shareData = (new ApiShare())->getShareDetailByKey($params['shareKey']);
            if (!empty($shareData['password']) && $params['password'] === md5($shareData['password'])) {
                $hasAuth = (new Auth($config))->createToken($params['password']);
            } else {
                throw new ErrorException("password error");
            }
        } else {
            if (!$appKey && !(!empty($config['auth']) && $config['auth']['enable'])) {
                throw new ErrorException("password error");
            }
            $hasAuth = (new Auth($config))->verifyAuth($params['password'], $appKey);
        }
        $res = [
            "token" => $hasAuth
        ];
        return Helper::showJson(0, "", $res);
    }

    /**
     * 获取api文档菜单
     */
    public function getApiMenus()
    {
        $this->init(false);
        $config = $this->config;
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


    /**
     * 获取所有api文档菜单
     */
    public function getAllApiMenus()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $configApps = Helper::handleAppsConfig($config['apps'], false, $config);
        $data = ApiShare::getAppShareApis($config, $configApps, "", [], false);
        return Helper::showJson(0, "", $data);
    }

    /**
     * 获取接口明细
     * @return array
     */
    public function getApiDetail()
    {
        $this->init(false);
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['path'])) {
            throw new ErrorException("path not found");
        }
        $appKey = !empty($params['appKey']) ? $params['appKey'] : "";
        $apiKey = urldecode($params['path']);
        $this->checkAuth();
        if (!empty($config['cache']) && $config['cache']['enable']) {
            $cacheKey = Helper::getCacheKey('apiDetail', $appKey, $this->lang, $params['path']);
            $cacheData = (new Cache())->get($cacheKey);
            if ($cacheData && empty($params['reload'])) {
                $res = $cacheData;
            } else {
                // 生成数据并缓存
                $res = (new ParseApiDetail($config))->renderApiDetail($appKey, $apiKey);
                (new Cache())->set($cacheKey, $res);
            }
        } else {
            // 生成数据
            $res = (new ParseApiDetail($config))->renderApiDetail($appKey, $apiKey);
        }
        $res['appKey'] = $appKey;
        return Helper::showJson(0, "", $res);
    }


    /**
     * 获取md菜单
     * @return array
     */
    public function getMdMenus()
    {
        $this->init(false);
        $config = $this->config;
        $params = $this->requestParams;
        $appKey = "";
        if (!empty($params['appKey'])) {
            // 获取指定应用
            $appKey = $params['appKey'];
        }
        $this->checkAuth();
        $docs = (new ParseMarkdown($config))->getDocsMenu($appKey, $this->lang);
        return Helper::showJson(0, "", $docs);

    }

    /**
     * 获取md文档内容
     * @return \think\response\Json
     */
    public function getMdDetail()
    {
        $this->init(false);
        $config = $this->config;
        $params = $this->requestParams;
        $this->checkAuth();
        try {
            if (empty($params['path'])) {
                throw new ErrorException("mdPath not found");
            }
            if (empty($params['appKey'])) {
                throw new ErrorException("appkey not found");
            }

            $path = urldecode($params['path']);
            $content = (new ParseMarkdown($config))->getContent($params['appKey'], $path, $this->lang);
            $res = [
                'content' => $content,
            ];
            return Helper::showJson(0, "", $res);

        } catch (ErrorException $e) {
            return Helper::showJson($e->getCode(), $e->getMessage());
        }
    }


    /**
     * 创建代码生成器
     * @return array
     */
    public function createGenerator()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $res = (new generator\Index($config))->create($params);
        return Helper::showJson(0, "", $res);
    }

    /**
     * 删除所有接口缓存
     * @return array
     */
    public function cancelAllCache()
    {
        $this->init(true);
        $config = $this->config;
        $path = APIDOC_STORAGE_PATH . $config['cache']['folder']. '/apis';
        $res = DirAndFile::deleteDir($path);
        return Helper::showJson(0, "", $path);
    }

    /**
     * 生成所有接口缓存
     * @return array
     */
    public function createAllCache()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $apps = Helper::getAllApps($config['apps']);
        $cache = new Cache();
        DirAndFile::deleteDir(APIDOC_STORAGE_PATH . $config['cache']['folder'] . '/' . 'apis');
        if (!empty($apps) && count($apps)) {
            try {
                foreach ($apps as $app) {
                    // 缓存菜单
                    $appKey = $app['appKey'];
                    $controllerData = (new ParseApiMenus($config))->renderApiMenus($appKey);
                    if (!empty($controllerData['data']) && count($controllerData['data'])) {
                        foreach ($controllerData['data'] as $controller) {
                            if (!empty($controller['children']) && count($controller['children'])) {
                                foreach ($controller['children'] as $item) {
                                    if (!empty($item['url']) && !empty($item['menuKey'])) {
                                        $apiDetail = (new ParseApiDetail($config))->renderApiDetail($appKey, urldecode($item['menuKey']));
                                        $apiDetailCacheKey = Helper::getCacheKey('apiDetail', $appKey, $this->lang, $item['menuKey']);
                                        $cache->set($apiDetailCacheKey, $apiDetail);
                                    }
                                }
                            }
                        }
                    }
                    $cacheKey = Helper::getCacheKey('apiMenu', $appKey, $this->lang);
                    $cache->set($cacheKey, $controllerData);
                }
            } catch (\ReflectionException $e) {
                DirAndFile::deleteDir(APIDOC_STORAGE_PATH . $config['cache']['folder'] . '/' . 'apis');
                throw new ErrorException($e->getMessage());
            }
        }
        return Helper::showJson(0, "", true);
    }

    /**
     * 生成代码模板内容
     * @return array
     */
    public function renderCodeTemplate()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $code = (new ParseCodeTemplate($config))->renderCode($params);
        return Helper::showJson(0, "", [
            'code' => $code
        ]);

    }


    /**
     * 添加接口分享
     * @return array
     */
    public function addApiShare()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['name'])) {
            throw new ErrorException('field not found', ['field' => 'name']);
        }
        if (empty($params['type'])) {
            throw new ErrorException('field not found', ['field' => 'type']);
        }
        if ($params['type'] == 'app' && empty($params['appKeys'])) {
            throw new ErrorException('field not found', ['field' => 'appKeys']);
        }
        if ($params['type'] == 'api' && empty($params['apiKeys'])) {
            throw new ErrorException('field not found', ['field' => 'apiKeys']);
        }
        $res = (new ApiShare())->addApiShare($params);
        return Helper::showJson(0, "", $res);
    }

    /**
     * 获取接口分享分页列表
     * @return array
     */
    public function getApiShareList()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $pageIndex = !empty($params['pageIndex']) ? $params['pageIndex'] : 1;
        $pageSize = 5;
        $res = (new ApiShare())->getSharePageList($config, $pageIndex, $pageSize);
        return Helper::showJson(0, "", $res);
    }

    /**
     * 获取接口分享记录明细
     * @return array
     */
    public function getApiShareDetail()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['key'])) {
            throw new ErrorException('field not found', ['field' => 'key']);
        }
        $cacheData = (new ApiShare())->getShareDetailByKey($params['key']);
        return Helper::showJson(0, "", $cacheData);
    }

    /**
     * 删除接口分享记录
     * @return array
     */
    public function deleteApiShare()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['key'])) {
            throw new ErrorException('field not found', ['field' => 'key']);
        }
        $cacheKey = ApiShare::getShareCacheKey($params['key']);
        $res = (new Cache())->delete($cacheKey);
        return Helper::showJson(0, "", $res);
    }

    /**
     * 处理接口分享操作
     * @return array
     */
    public function handleApiShareAction()
    {
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['key'])) {
            throw new ErrorException('field not found', ['field' => 'key']);
        }
        if (!isset($params['index'])) {
            throw new ErrorException('field not found', ['field' => 'index']);
        }
        $res = (new ApiShare())->handleApiShareAction($config, $params['key'], $params['index']);
        return Helper::showJson(0, "", $res);
    }

}
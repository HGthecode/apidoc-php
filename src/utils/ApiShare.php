<?php
declare(strict_types=1);

namespace hg\apidoc\utils;

use hg\apidoc\Auth;
use hg\apidoc\exception\ErrorException;
use hg\apidoc\parses\ParseApiMenus;

class ApiShare
{

    public static function getShareCacheKey($key)
    {
        return "share/apiShare_" . $key;
    }

    public function addApiShare($params){
        if (!empty($params['key'])) {
            //编辑
            $cacheKey = "share/apiShare_" . $params['key'];
        } else {
            //新增
            $cacheKey = "share/apiShare_" . time();
        }

        $data = [
            'name' => $params['name'],
            'type' => $params['type'],
        ];
        if (!empty($params['appKeys'])) {
            $data['appKeys'] = $params['appKeys'];
        }
        if (!empty($params['apiKeys'])) {
            $data['apiKeys'] = $params['apiKeys'];
        }
        if (!empty($params['password'])) {
            $data['password'] = $params['password'];
        }
        $data['create_at'] = date('Y-m-d h:i:s');
        $data['create_time'] = time();
        $res = (new Cache())->set($cacheKey, $data);
        return $res;
    }

    public function getSharePageList($config,$pageIndex,$pageSize){
        $path = APIDOC_STORAGE_PATH . $config['cache']['folder'] . "/share";

        $list = DirAndFile::getFileList($path);
        $data = [];
        $cache = new Cache();

        foreach ($list as $item) {
            $fileNameArr = explode("_", $item['name']);
            $cacheKey = "share/" . $fileNameArr[0] . "_" . $fileNameArr[1];
            $cacheData = $cache->get($cacheKey);
            $itemData = [
                'key' => $fileNameArr[1],
                'name' => $cacheData['name'],
                'type' => $cacheData['type'],
                'create_time' => $cacheData['create_time'],
                'create_at' => $cacheData['create_at'],
            ];
            $data[] = $itemData;
        }
        $data = Helper::arraySortByKey($data, 'create_time', SORT_DESC);
        $page = $pageIndex-1;
        $res = array_slice($data,$page*$pageSize,$pageSize);
        return [
            'total'=>count($data),
            'data'=>$res
        ];
    }


    public function getShareDetailByKey($shareKey)
    {
        if (empty($shareKey)) {
            throw new ErrorException('field not found', ['field' => 'shareKey']);
        }
        $cache = new Cache();
        $cacheKey = static::getShareCacheKey($shareKey);
        $cacheData = $cache->get($cacheKey);
        if (empty($cacheData)) {
            throw new ErrorException("share not exists");
        }
        return $cacheData;
    }

    public function checkShareAuth($config, $params)
    {
        if (empty($params['shareKey'])) {
            throw new ErrorException('field not found', ['field' => 'shareKey']);
        }
        $cacheData = $this->getShareDetailByKey($params['shareKey']);

        if (!empty($cacheData['password'])) {
            //验证密码
            if (empty($params['token'])) {
                throw new ErrorException("token not found");
            }
            $password = md5($cacheData['password']);
            $cacheData['pass'] = $password;
            $checkAuth = (new Auth($config))->checkToken($params['token'], $password);
            if (!$checkAuth) {
                throw new ErrorException("token error");
            }
        }
        return $cacheData;
    }

    public static function getAppShareApis(array $config, array $apps, $parentKey = "", $filterAppKeys = [], $isParseDetail = false)
    {
        $appList = [];
        $separ = !empty($parentKey) ? ',' : '';
        foreach ($apps as $app) {
            $appKey = $parentKey . $separ . $app['key'];
            if (!empty($app['items']) && count($app['items'])) {
                $items = static::getAppShareApis($config, $app['items'], $appKey, $filterAppKeys, $isParseDetail);
                $app['children'] = $items;
            } else {
                $app['appKey'] = $appKey;
                $apiData = (new ParseApiMenus($config))->renderApiMenus($appKey, $isParseDetail);
                $app['children'] = $apiData['data'];
            }
            if (!empty($filterAppKeys) && count($filterAppKeys) && !in_array($appKey, $filterAppKeys) && empty($app['items'])) {
                continue;
            }
            $app['menuKey'] = $appKey;
            $appList[] = $app;
        }

        return $appList;
    }

    public function getShareData($config, $key)
    {
        $shareData = $this->getShareDetailByKey($key);
        $filterAppKeys = !empty($shareData['appKeys']) ? $shareData['appKeys'] : [];
        $configApps = Helper::handleAppsConfig($config['apps'], false, $config);
        $appList = static::getAppShareApis($config, $configApps, "", $filterAppKeys, true);
        if ($shareData['type'] == 'api') {
            $appList = Helper::filterTreeNodesByKeys($appList, $shareData['apiKeys'], 'menuKey');
        }
        return [
            'shareData' => $shareData,
            'apiData' => $appList,
        ];
    }

    public function handleApiShareAction($config, $key, $index)
    {

        $actionConfig = $config['share']['actions'][$index];
        if (!empty($actionConfig['click'])) {
            $data = $this->getShareData($config, $key);
            $res = $actionConfig['click']($data['shareData'], $data['apiData']);
            return $res;
        }
        return false;

    }


}
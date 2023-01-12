<?php
declare(strict_types = 1);

namespace hg\apidoc;

use hg\apidoc\parses\ParseApiDetail;
use hg\apidoc\parses\ParseCodeTemplate;
use hg\apidoc\parses\ParseApiMenus;
use hg\apidoc\parses\ParseMarkdown;
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

    protected $requestParams=[];

    protected $lang="";


    public function init($checkAuth=false){
        $this->config = ConfigProvider::get();
        if (isset($this->config['enable']) && $this->config['enable']===false){
            throw new ErrorException("apidoc close");
        }
        if (!empty($this->config['request_params'])){
            $this->requestParams = $this->config['request_params'];
        }else{
            $this->requestParams = (new Request())->param();
        }
        if (!empty($this->requestParams['lang']) && !empty($this->config['lang_register_function'])){
            $this->lang = $this->requestParams['lang'];
            $this->config['lang_register_function']($this->lang);
        }
        if($checkAuth){
            (new Auth($this->config))->checkAuth($this->requestParams);
        }
    }



    /**
     * 获取配置
     * @return \think\response\Json
     */
    public function getConfig(){
        $this->init(true);
        $config = ConfigProvider::getFeConfig();
        return Helper::showJson(0,"",$config);
    }

    /**
     * 验证密码
     */
    public function verifyAuth(){
        $this->init();
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['password'])){
            throw new ErrorException( "password not found");
        }
        $appKey = !empty($params['appKey'])?$params['appKey']:"";

        if (!$appKey && !(!empty($config['auth']) && $config['auth']['enable'])) {
            return false;
        }
        $hasAuth = (new Auth($config))->verifyAuth($params['password'],$appKey);
        $res = [
            "token"=>$hasAuth
        ];
        return Helper::showJson(0,"",$res);


    }

    /**
     * 获取api文档菜单
     */
    public function getApiMenus(){
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;


        if (!empty($params['appKey'])){
            $appKey = $params['appKey'];
        }
        $currentAppConfig = Helper::getCurrentAppConfig($appKey);
        $currentApp  = $currentAppConfig['appConfig'];

        if (!empty($config['cache']) && $config['cache']['enable']){
            $cacheKey = Helper::getCacheKey('apiMenu',$appKey,$this->lang);
            $cacheData = (new Cache())->get($cacheKey);
            if ($cacheData && empty($params['reload'])){
                $apiData = $cacheData;
            }else{
                // 生成数据并缓存
                $apiData = (new ParseApiMenus($config))->renderApiMenus($appKey);
                (new Cache())->set($cacheKey,$apiData);
            }
        }else{
            // 生成数据
            $apiData = (new ParseApiMenus($config))->renderApiMenus($appKey);
        }


        // 接口分组
        if (!empty($currentApp['groups'])){
            $data = ParseApiMenus::mergeApiGroup($apiData['data'],$currentApp['groups']);
        }else{
            $data = $apiData['data'];
        }
        $groups=!empty($currentApp['groups'])?$currentApp['groups']:[];
        $json=[
            'data'=>$data,
            'app'=>$currentApp,
            'groups'=>$groups,
            'tags'=>$apiData['tags'],
        ];

        return Helper::showJson(0,"",$json);
    }


    public function getApiDetail(){
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        if (empty($params['path'])){
            throw new ErrorException("path not found");
        }
        $appKey = $params['appKey'];
        $apiKey = urldecode($params['path']);
        $pathArr   = explode("@", $apiKey);
        $classPath = $pathArr[0];
        $method = $pathArr[1];

        if (!empty($config['cache']) && $config['cache']['enable']){
            $cacheKey = Helper::getCacheKey('apiDetail',$appKey,$this->lang,$params['path']);
            $cacheData = (new Cache())->get($cacheKey);
            if ($cacheData && empty($params['reload'])){
                $res = $cacheData;
            }else{
                // 生成数据并缓存
                $res = (new ParseApiDetail($config))->renderApiDetail($appKey,$classPath,$method);
                (new Cache())->set($cacheKey,$res);
            }
        }else{
            // 生成数据
            $res = (new ParseApiDetail($config))->renderApiDetail($appKey,$classPath,$method);
        }
        $res['appKey']=$appKey;
        return Helper::showJson(0,"",$res);
    }


    public function getMdMenus(){
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $appKey = "";
        if (!empty($params['appKey'])){
            // 获取指定应用
            $appKey = $params['appKey'];
        }
        $docs = (new ParseMarkdown($config))->getDocsMenu($appKey,$this->lang);
        return Helper::showJson(0,"",$docs);

    }

    /**
     * 获取md文档内容
     * @return \think\response\Json
     */
    public function getMdDetail(){
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        try {
            if (empty($params['path'])){
                throw new ErrorException("mdPath not found");
            }
            if (empty($params['appKey'])){
                throw new ErrorException("appkey not found");
            }

            $path = urldecode($params['path']);
            $content = (new ParseMarkdown($config))->getContent($params['appKey'],$path,$this->lang);
            $res = [
                'content'=>$content,
            ];
            return Helper::showJson(0,"",$res);

        } catch (ErrorException $e) {
            return Helper::showJson($e->getCode(),$e->getMessage());
        }
    }


    public function createGenerator(){
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $res = (new generator\Index($config))->create($params);
        return Helper::showJson(0,"",$res);
    }

    public function cancelAllCache(){
        $this->init(true);
        $config = $this->config;
        $res = DirAndFile::deleteDir(APIDOC_STORAGE_PATH . $config['cache']['folder'].'/'.'apis');
        return Helper::showJson(0,"",$res);
    }

    public function createAllCache(){
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;
        $apps = Helper::getAllApps($config['apps']);
        $cache = new Cache();
        DirAndFile::deleteDir(APIDOC_STORAGE_PATH . $config['cache']['folder'].'/'.'apis');
        if (!empty($apps) && count($apps)){
            try {
                foreach ($apps as $app) {
                    // 缓存菜单
                    $appKey = $app['appKey'];
                    $controllerData = (new ParseApiMenus($config))->renderApiMenus($appKey);
                    if (!empty($controllerData['data']) && count($controllerData['data'])){
                        foreach ($controllerData['data'] as $controller) {
                            if (!empty($controller['children']) && count($controller['children'])){
                                foreach ($controller['children'] as $item) {
                                    if (!empty($item['url']) && !empty($item['menuKey'])){
                                        $pathArr   = explode("@", urldecode($item['menuKey']));
                                        $classPath = $pathArr[0];
                                        $method = $pathArr[1];
                                        $apiDetail = (new ParseApiDetail($config))->renderApiDetail($appKey,$classPath,$method);
                                        $apiDetailCacheKey = Helper::getCacheKey('apiDetail',$appKey,$this->lang,$item['menuKey']);
                                        $cache->set($apiDetailCacheKey,$apiDetail);
                                    }
                                }
                            }
                        }
                    }
                    $cacheKey = Helper::getCacheKey('apiMenu',$appKey,$this->lang);
                    $cache->set($cacheKey,$controllerData);
                }
            } catch (\ReflectionException $e) {
                DirAndFile::deleteDir(APIDOC_STORAGE_PATH . $config['cache']['folder'].'/'.'apis');
                throw new ErrorException($e->getMessage());
            }
        }

        return Helper::showJson(0,"",true);
    }

    public function renderCodeTemplate(){
        $this->init(true);
        $config = $this->config;
        $params = $this->requestParams;

        $code = (new ParseCodeTemplate($config))->renderCode($params);

        return Helper::showJson(0,"",[
            'code'=>$code
        ]);

    }


}
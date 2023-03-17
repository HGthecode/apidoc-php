<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use Doctrine\Common\Annotations\AnnotationReader;
use hg\apidoc\exception\ErrorException;
use hg\apidoc\generator\ParseTemplate;
use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;

class ParseCodeTemplate
{

    protected $config = [];

    protected $currentApp = [];


    public function __construct($config)
    {

        $this->config = $config;
    }

    public function renderCode($params)
    {
        $appKey = $params['appKey'];
        $currentAppConfig = Helper::getCurrentAppConfig($appKey);
        $currentApp = $currentAppConfig['appConfig'];
        $this->currentApp  = $currentApp;

        $codeTemplate = $params['template'];

        //验证参数

        //验证模板文件是否存在

        //解析接口数据
        $tplData = [];
        if ($codeTemplate['select_mode'] == 'controller'){
            $parseApiMenusService = new ParseApiMenus($this->config);
            $controllers = $params['selected'];
            if (!empty($controllers) && count($controllers) > 0) {
                $controllerList = [];
                foreach ($controllers as $class) {
                    $classData = $parseApiMenusService->parseController($class);
                    if ($classData !== false) {
                        $controllerList[] = $classData;
                    }
                }
                if (empty($codeTemplate['multiple'])){
                    $tplData = $controllerList[0];
                }else{
                    $tplData = $controllerList;
                }
            }
        }else{
            // api
            $apis = $params['selected'];
            if (!empty($apis) && count($apis) > 0) {
                $parseApiDetailService = new ParseApiDetail($this->config);
                $apiList = [];
                foreach ($apis as $key) {
                    $apiKey = urldecode($key);
                    $apiDetail = $parseApiDetailService->renderApiDetail($appKey,$apiKey);
                    if ($apiDetail !== false) {
                        $apiList[] = $apiDetail;
                    }
                }
                if (empty($codeTemplate['multiple'])){
                    $tplData = $apiList[0];
                }else{
                    $tplData = $apiList;
                }
            }
        }


        // 读取模板
        $templatePath =DirAndFile::formatPath( APIDOC_ROOT_PATH . $codeTemplate['template'],"/");
        if (is_readable($templatePath) == false) {
            throw new ErrorException("template not found",  [
                'template' => $template
            ]);
        }
        $tplParams = [
            'form'=>  $params['form'],
            'data'=>$tplData
        ];
        $html = (new ParseTemplate())->compile($templatePath,$tplParams);



        return $html;
    }


}
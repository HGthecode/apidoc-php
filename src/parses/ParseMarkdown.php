<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;


use hg\apidoc\utils\DirAndFile;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;

class ParseMarkdown
{
    protected $config = [];

    public function __construct($config)
    {
        $this->config = $config;
    }

    /**
     * 获取md文档菜单
     * @return array
     */
    public function getDocsMenu($appKey,string $lang): array
    {
        $config  = $this->config;
        $docData = [];
        if (!empty($config['docs']) && count($config['docs']) > 0) {
            $docData = $this->handleDocsMenuData($config['docs'],$appKey,$lang);
        }
        return $docData;
    }

    /**
     * 处理md文档菜单数据
     * @param array $menus
     * @return array
     */
    protected function handleDocsMenuData(array $menus,$appKey,string $lang): array
    {
        $list = [];
        foreach ($menus as $item) {
            $item['title']     = Lang::getLang($item['title']);
            if (!empty($item['appKey']) && $item['appKey'] != $appKey){
                continue;
            }

            if (!empty($item['children']) && count($item['children']) > 0) {
                $item['children']    = $this->handleDocsMenuData($item['children'],$appKey,$lang);
                $item['menuKey'] = Helper::createRandKey("md_group");
            } else {
                $filePath    = static::getFilePath($appKey,$item['path'],$lang);
                if (!file_exists($filePath['filePath'])) {
                    continue;
                }

                if(!empty($item['path'])){
                    $item['path'] = Helper::replaceTemplate($item['path'],['lang'=>$lang]);
                }
                $item['type']     = 'md';
                $item['menuKey'] = Helper::createApiKey($item['path']);
            }
            $list[]           = $item;
        }
        return $list;
    }

    public static function getFilePath(string $appKey, string $path,$lang=""){
        if (!empty($appKey)){
            $currentAppConfig = Helper::getCurrentAppConfig($appKey);
            $currentApps = $currentAppConfig['apps'];
            $fullPath      = Helper::replaceCurrentAppTemplate($path, $currentApps);
        }else{
            $fullPath = $path;
        }
        $fullPath = Helper::replaceTemplate($fullPath,[
            'lang'=>$lang
        ]);

        if (strpos($fullPath, '#') !== false) {
            $mdPathArr = explode("#", $fullPath);
            $mdPath=$mdPathArr[0];
            $mdAnchor =$mdPathArr[1];
        } else {
            $mdPath = $fullPath;
            $mdAnchor="";
        }
        $fileSuffix = "";
        if (strpos($fullPath, '.md') === false) {
            $fileSuffix = ".md";
        }
        $filePath    = APIDOC_ROOT_PATH . $mdPath . $fileSuffix;
        return [
            'filePath'=>$filePath,
            'anchor'=>$mdAnchor
        ];
    }


    /**
     * 获取md文档内容
     * @param string $appKey
     * @param string $path
     * @return string
     */
    public static function getContent(string $appKey, string $path,$lang="")
    {
        $filePathArr    = static::getFilePath($appKey,$path,$lang);
        $mdAnchor = $filePathArr['anchor'];
        $filePath = $filePathArr['filePath'];
        if (!file_exists($filePath)) {
            return $path;
        }
        $contents    = DirAndFile::getFileContent($filePath);
        // 获取指定h2标签内容
        if (!empty($mdAnchor)){
            if (strpos($contents, '## ') !== false) {
                $contentArr = explode("\r\n", $contents);
                $contentText = "";
                foreach ($contentArr as $line){
                    $contentText.="\r\n".trim($line);
                }
                $contentArr = explode("\r\n## ", $contentText);
                $content="";
                foreach ($contentArr as $item){
                    $itemArr = explode("\r\n", $item);
                    if (!empty($itemArr) && $itemArr[0] && $mdAnchor===$itemArr[0]){
                        $content = str_replace($itemArr[0]."\r\n", '', $item);
                        break;
                    }
                }
                return $content;
            }
        }
        return $contents;
    }


}
<?php

namespace hg\apidoc\utils;

class DirAndFile
{


    public static function getDirTree($path){
        $arr = [];
        if(is_dir($path)){
            $dir = scandir($path);
            foreach ($dir as $value){
                $sub_path =static::formatPath($path .'/'.$value,"/");
                if($value == '.' || $value == '..'){
                    continue;
                }else if(is_dir($sub_path)){
                    $item = [
                        'name'=>$value,
                        'path'=>$sub_path,
                    ];
                    $children = static::getDirTree($sub_path);
                    if (count($children)){
                        $item['children'] = $children;
                    }
                    $arr[] = $item;
                }
            }
        }
        return $arr;
    }

    public static function getClassList($dir){
        if ($handle = opendir($dir)) {
            $file_list=[];
            while (false !== ($file = readdir($handle))) {
                if($file=='..' || $file=='.') continue;
                $filePath = static::formatPath($dir.'/'.$file,"/");
                if(is_file($filePath)) {
                    if ('php' !== pathinfo($filePath, \PATHINFO_EXTENSION)) {
                        continue;
                    }
                    $classes = self::findClasses($filePath);
                    if (!empty($classes) && count($classes)){
                        $file_list[] = [
                            'name'=>$classes[0],
                            'path'=>$filePath
                        ];
                    }else{
                        $file_list=[];
                    }
                    continue;
                }
                $file_list[$file] = static::getClassList($filePath);
                foreach($file_list[$file] as $infile) {
                    $file_list[] = $infile;
                }
                unset($file_list[$file]);
            }
            closedir($handle);
            return $file_list;
        }
        return [];
    }
    public static function getFileList($path){
        if(is_dir($path)) {
            $dirList = scandir($path);
            $list = [];
            foreach ($dirList as $dir) {
                if ($dir == '.' || $dir == '..') {
                    continue;
                }
                $sub_path = DirAndFile::formatPath($path . '/' . $dir, "/");
                if (is_file($sub_path)){
                    $list[]=[
                        'name'=>$dir,
                        'path'=>$sub_path
                    ];;
                }
            }
            return $list;
        }
        return [];
    }

    public static function formatPath($path,$type="/"){
        if ($type==="/"){
            $path = str_replace("\\","/",$path);
        }else{
            $path = str_replace("/","\\",$path);
            $path = str_replace("\\\\","\\",$path);
            $endStr = substr($path, -1);
            if ($endStr=='\\'){
                $path = substr($path,0,strlen($path)-1);
            }
        }
        return $path;
    }

    private static function findClasses($path)
    {
        $contents = file_get_contents($path);
        $tokens = token_get_all($contents);

        $nsTokens = [\T_STRING => true, \T_NS_SEPARATOR => true];
        if (\defined('T_NAME_QUALIFIED')) {
            $nsTokens[T_NAME_QUALIFIED] = true;
        }

        $classes = [];

        $namespace = '';
        for ($i = 0; isset($tokens[$i]); ++$i) {
            $token = $tokens[$i];

            if (!isset($token[1])) {
                continue;
            }

            $class = '';

            switch ($token[0]) {
                case \T_NAMESPACE:
                    $namespace = '';
                    // If there is a namespace, extract it
                    while (isset($tokens[++$i][1])) {
                        if (isset($nsTokens[$tokens[$i][0]])) {
                            $namespace .= $tokens[$i][1];
                        }
                    }
                    $namespace .= '\\';
                    break;
                case \T_CLASS:
                case \T_INTERFACE:
                case \T_TRAIT:
                    // Skip usage of ::class constant
                    $isClassConstant = false;
                    for ($j = $i - 1; $j > 0; --$j) {
                        if (!isset($tokens[$j][1])) {
                            break;
                        }

                        if (\T_DOUBLE_COLON === $tokens[$j][0]) {
                            $isClassConstant = true;
                            break;
                        } elseif (!\in_array($tokens[$j][0], [\T_WHITESPACE, \T_DOC_COMMENT, \T_COMMENT])) {
                            break;
                        }
                    }

                    if ($isClassConstant) {
                        break;
                    }

                    // Find the classname
                    while (isset($tokens[++$i][1])) {
                        $t = $tokens[$i];
                        if (\T_STRING === $t[0]) {
                            $class .= $t[1];
                        } elseif ('' !== $class && \T_WHITESPACE === $t[0]) {
                            break;
                        }
                    }

                    $classes[] = ltrim($namespace.$class, '\\');
                    break;
                default:
                    break;
            }
        }

        return $classes;
    }


    /**
     * 读取文件内容
     * @param $fileName
     * @return false|string
     */
    public static function getFileContent(string $fileName): string
    {
        $content = "";
        if (file_exists($fileName)) {
            $handle  = fopen($fileName, "r");
            $content = fread($handle, filesize($fileName));
            fclose($handle);
        }
        return $content;
    }

    /**
     * 保存文件
     * @param $path
     * @param $str_tmp
     * @return bool
     */
    public static function createFile(string $path, string $str_tmp): bool
    {
        $pathArr = explode("/", $path);
        unset($pathArr[count($pathArr) - 1]);
        $dir = implode("/", $pathArr);
        if (!file_exists($dir)) {
            mkdir($dir, 0775, true);
        }
        $fp = fopen($path, "w") or die("Unable to open file!");
        fwrite($fp, $str_tmp); //存入内容
        fclose($fp);
        return true;
    }

    /**
     * 判断文件是否存在后，删除
     * @access private
     * @param string $path
     * @return bool
     */
    public static function unlink(string $path): bool
    {
        try {
            return is_file($path) && unlink($path);
        } catch (\Exception $e) {
            return false;
        }
    }

    public static function checkFileExist(string $path)
    {
        try {
            return $path;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public static function deleteDir($path) {
        if (!is_dir($path)) {
            return false;
        }
        $open = opendir($path);
        if (!$open) {
            return false;
        }
        while (($v = readdir($open)) !== false) {
            if ('.' == $v || '..' == $v) {
                continue;
            }
            $item = $path . '/' . $v;
            if (is_file($item)) {
                unlink($item);
                continue;
            }
           static::deleteDir($item);
        }
        closedir($open);
        return rmdir($path);
    }
}
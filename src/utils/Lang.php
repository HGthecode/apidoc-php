<?php
declare(strict_types = 1);

namespace hg\apidoc\utils;

use hg\apidoc\exception\ErrorException;

class Lang
{

    /**
     * 获取多语言变量值
     * @param $string
     * @return mixed
     */
    public static function getLang($string,$config="") {
        if (!$string){
            return $string;
        }
        if (empty($config)){
            $config = ConfigProvider::get();
        }
        if (empty($config["lang_get_function"])){
            return $string;
        }
        $langGetFunction = $config["lang_get_function"];
        if (empty($langGetFunction)){
            return $string;
        }
        if (is_string($string) && strpos($string, 'lang(') !== false) {
            if (preg_match('#lang\((.*)\)#s', $string, $key) !== false){
                $langKey = $key && count($key)>1 ? trim($key[1]):"";
                if (!empty($langKey)){
                    return $langGetFunction($langKey);
                }
            }
        }
        return $string;
    }

    /**
     * 二维数组设置指定字段的多语言
     * @param $array
     * @param $field
     * @return array
     */
    public static function getArrayLang($array,$field,$config=[]){
        $data = [];
        if (!empty($array) && is_array($array)){
            foreach ($array as $item){
                $item[$field] = static::getLang($item[$field],$config);
                $data[]=$item;
            }
        }
        return $data;
    }


}
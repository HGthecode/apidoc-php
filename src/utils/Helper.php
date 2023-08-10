<?php
declare(strict_types = 1);

namespace hg\apidoc\utils;

use hg\apidoc\exception\ErrorException;
use hg\apidoc\parses\ParseMarkdown;

class Helper
{
    protected static $snakeCache = [];
    /**
     * 统一返回json格式
     * @param int $code
     * @param string $msg
     * @param string $data
     */
    public static function showJson(int $code = 0, string $msg = "", $data = "")
    {
        $res = [
            'code' => $code,
            'message'  => $msg,
            'data' => $data,
        ];
        $handle_response_json = ConfigProvider::get("handle_response_json");
        if (!empty($handle_response_json) && is_callable($handle_response_json)){
            return $handle_response_json($res);
        }
        return $res;
    }



    /**
     * 将tree树形数据转成list数据
     * @param array $tree tree数据
     * @param string $childName 子节点名称
     * @return array  转换后的list数据
     */
    public static function treeToList(array $tree, string $childName = 'children',string $key = "id",string $parentField = "parent")
    {
        $array = array();
        foreach ($tree as $val) {
            $array[] = $val;
            if (isset($val[$childName])) {
                $children = static::treeToList($val[$childName], $childName);
                if ($children) {
                    $newChildren = [];
                    foreach ($children as $item) {
                        $item[$parentField] = $val[$key];
                        $newChildren[]      = $item;
                    }
                    $array = array_merge($array, $newChildren);
                }
            }
        }
        return $array;
    }



    /**
     * 根据一组keys获取所有关联节点
     * @param $tree
     * @param $keys
     */
    public static function getTreeNodesByKeys(array $tree, array $keys, string $field = "id", string $childrenField = "children")
    {
        $list = static::TreeToList($tree, $childrenField, "key");
        $data = [];
        foreach ($keys as $k => $v) {
            $parent = !$k ? "" : $keys[$k - 1];
            foreach ($list as $item) {
                if (((!empty($item['parent']) && $item['parent'] === $parent) || empty($item['parent'])) && $item[$field] == $v) {
                    $data[] = $item;
                    break;
                }
            }
        }
        return $data;

    }

    /**
     * 根据一组keys过滤树形数据
     * @param $tree
     * @param $keys
     */
    public static function filterTreeNodesByKeys(array $tree, array $keys, string $field = "id", string $childrenField = "children")
    {
        $data=[];
        foreach ($tree as $k => $item) {
            if (!empty($item[$childrenField])){
                $childrenList = static::filterTreeNodesByKeys($item[$childrenField],$keys,$field,$childrenField);
                if (!empty($childrenList) && count($childrenList)){
                    $item[$childrenField] = $childrenList;
                    $data[]=$item;
                }
            }else if(!empty($item[$field]) && in_array($item[$field],$keys)){
                $data[]=$item;
            }
        }
        return $data;
    }

    /**
     * 替换模板变量
     * @param $temp
     * @param $data
     * @param $prefix
     * @return string|string[]
     */
    public static function replaceTemplate(string $temp, array $data, string $prefix = ""):string
    {
        $str = $temp;
        foreach ($data as $k => $v) {
            $key = '${'. $prefix . $k . '}';
            if (strpos($str, $key) !== false) {
                $str = str_replace($key, $v, $str);
            }
        }
        return $str;
    }

    /**
     * 替换当前所选应用/版本的变量
     * @param $temp
     * @param $currentApps
     * @return string|string[]
     */
    public static function replaceCurrentAppTemplate(string $temp,array $currentApps):string
    {
        $str = $temp;
        if (!empty($currentApps) && count($currentApps) > 0) {
            $data = [];
            for ($i = 0; $i <= 3; $i++) {
                if (isset($currentApps[$i])) {
                    $appItem = $currentApps[$i];
                    foreach ($appItem as $k => $v) {
                        $key        = 'app[' . $i . '].' . $k;
                        $data[$key] = $v;
                    }
                } else {
                    $appItem = $currentApps[0];
                    foreach ($appItem as $k => $v) {
                        $key        = 'app[' . $i . '].' . $k;
                        $data[$key] = "";
                    }
                }
            }
            $str = static::replaceTemplate($str, $data);
        }
        return $str;
    }

    /**
     * 根据条件获取数组中的值
     * @param array $array
     * @param $query
     * @return mixed|null
     */
    public static function getArrayFind(array $array, $query)
    {
        $res = null;
        if (is_array($array)) {
            foreach ($array as $item) {
                if ($query($item)) {
                    $res = $item;
                    break;
                }
            }
        }
        return $res;
    }

    /**
     * 根据条件获取数组中的index
     * @param array $array
     * @param $query
     * @return mixed|null
     */
    public static function getArrayFindIndex(array $array, $query)
    {
        $res = null;
        if (is_array($array)) {
            foreach ($array as $k=>$item) {
                if ($query($item)) {
                    $res = $k;
                    break;
                }
            }
        }
        return $res;
    }

    /**
     * 查询符合条件的数组
     * @param array $array
     * @param $query
     * @return array
     */
    public static function getArraybyQuery(array $array, $query)
    {
        $res = [];
        if (is_array($array)) {
            foreach ($array as $item) {
                if ($query($item)) {
                    $res[] = $item;
                }
            }
        }
        return $res;
    }

    /**
     * 对象转为数组
     * @param $object
     * @return mixed
     */
    public static function objectToArray($object) {
        $object =  json_decode( json_encode($object),true);
        return  $object;
    }

    /**
     * 合并对象数组并根据key去重
     * @param string $key
     * @param mixed ...$array
     * @return array
     */
    public static function arrayMergeAndUnique(string $key = "name", ...$array):array
    {
        $arrayByKey = [];
        foreach ($array as $k => $arr) {
            if (!empty($arr) && count($arr)){
                foreach ($arr as $item) {
                    if (!empty($item[$key])){
                        $arrayByKey[$item[$key]] = $item;
                    }
                }
            }
        }
        $newArray = [];
        foreach ($arrayByKey as $item) {
            $newArray[]=$item;
        }
        return $newArray;
    }

    /**
     * 初始化当前所选的应用/版本数据
     * @param $appKey
     */
    public static function getCurrentAppConfig(string $appKey,$config=""):array
    {
        if (empty($config)){
            $config = ConfigProvider::get();
        }
        $config['apps'] = static::handleAppsConfig($config['apps'],false,$config);
        if (!(!empty($config['apps']) && count($config['apps']) > 0)) {
            throw new ErrorException("no config apps");
        }
        if (strpos($appKey, ',') !== false) {
            $keyArr = explode(",", $appKey);
        } else {
            $keyArr = [$appKey];
        }
        $currentApps = static::getTreeNodesByKeys($config['apps'], $keyArr, 'key', 'items');
        if (!$currentApps) {
            throw new ErrorException("appKey error",  [
                'appKey' => $appKey
            ]);
        }
        return [
            'appConfig'=>$currentApps[count($currentApps) - 1],
            'apps'=>$currentApps
        ];

    }

    public static function getCacheKey($type,$appKey,$lang="",$key="",$folder="apis"){
        return $folder."/".$type."_".$appKey."_".$lang."_".$key;
    }

    /**
     * 处理apps配置参数
     * @param array $apps
     * @return array
     */
    public static function handleAppsConfig(array $apps,$isHandlePassword=false,$config="", $parentKey = "",$filterAppKeys=[]):array
    {
        $appsConfig = [];
        $separ = !empty($parentKey) ? ',' : '';
        foreach ($apps as $app) {
            if (!empty($app['key'])){
                $appKey = $parentKey . $separ . $app['key'];
                $app['appKey'] = $appKey;
            }
            if (!empty($app['password']) && $isHandlePassword===true) {
                unset($app['password']);
                $app['hasPassword'] = true;
            }
            if (!empty($app['title'])){
                $app['title'] = Lang::getLang($app['title'],$config);
            }
            if (!empty($app['items']) && count($app['items']) > 0) {
                $app['items'] = static::handleAppsConfig($app['items'],$isHandlePassword,$config,$appKey,$filterAppKeys);
            }else if (!empty($filterAppKeys) && count($filterAppKeys) && !in_array($appKey,$filterAppKeys)){
                continue;
            }
            if (!empty($app['groups']) && count($app['groups']) > 0){
                $app['groups'] = static::handleGroupsConfig($app['groups']);
            }
            if (!empty($app['params'])){
                if (!empty($app['params']['header']) && count($app['params']['header']) > 0){
                    $app['params']['header'] = static::handleArrayParams($app['params']['header'],"desc");
                }
                if (!empty($app['params']['query']) && count($app['params']['query']) > 0){
                    $app['params']['query'] = static::handleArrayParams($app['params']['query'],"desc");
                }
                if (!empty($app['params']['body']) && count($app['params']['body']) > 0){
                    $app['params']['body'] = static::handleArrayParams($app['params']['body'],"desc");
                }
            }
            $appsConfig[] = $app;
        }
        return $appsConfig;
    }

    public static function handleArrayParams($array,$field,$config=""){
        $data = [];
        if (!empty($array) && is_array($array)){
            foreach ($array as $item){
                $item[$field] = Lang::getLang($item[$field],$config);
                if (!empty($item['md'])){
                    $item['md'] = ParseMarkdown::getContent("",$item['md']);
                }
                $data[]=$item;
            }
        }
        return $data;
    }

    public static function getAllApps(array $apps,$parentKey=""){
        $appList = [];
        $separ = !empty($parentKey)?',':'';
        foreach ($apps as $app) {
            $appKey = $parentKey.$separ.$app['key'];
            if (!empty($app['items']) && count($app['items'])){
               $items = static::getAllApps($app['items'],$appKey);
               $appList = array_merge($appList,$items);
            }else{
                $app['appKey'] = $appKey;
                $appList[]=$app;
            }
        }
        return $appList;
    }

    /**
     * 处理groups配置参数
     * @param array $groups
     * @return array
     */
    public static function handleGroupsConfig(array $groups):array
    {
        $groupConfig = [];
        foreach ($groups as $group) {
            if (!empty($group['title'])){
                $group['title'] = Lang::getLang($group['title']);
            }
            if (!empty($group['children']) && count($group['children']) > 0) {
                $group['children'] = static::handleAppsConfig($group['children']);
            }
            $groupConfig[] = $group;
        }
        return $groupConfig;
    }

    /**
     * 驼峰转下划线
     *
     * @param  string $value
     * @param  string $delimiter
     * @return string
     */
    public static function snake(string $value, string $delimiter = '_'): string
    {
        $key = $value;

        if (isset(static::$snakeCache[$key][$delimiter])) {
            return static::$snakeCache[$key][$delimiter];
        }

        if (!ctype_lower($value)) {
            $value = preg_replace('/\s+/u', '', $value);

            $value = static::lower(preg_replace('/(.)(?=[A-Z])/u', '$1' . $delimiter, $value));
        }

        return static::$snakeCache[$key][$delimiter] = $value;
    }

    /**
     * 下划线转驼峰(首字母小写)
     *
     * @param  string $value
     * @return string
     */
    public static function camel(string $value): string
    {
        return  lcfirst(static::studly($value));
    }


    /**
     * 下划线转驼峰(首字母大写)
     *
     * @param  string $value
     * @return string
     */
    public static function studly(string $value): string
    {
        $value = ucwords(str_replace(['-', '_'], ' ', $value));
        return  str_replace(' ', '', $value);
    }

    /**
     * 字符串转小写
     *
     * @param  string $value
     * @return string
     */
    public static function lower(string $value): string
    {
        return mb_strtolower($value, 'UTF-8');
    }

    /**
     * 创建随机key
     * @param string $prefix
     * @return string
     */
    public static function createRandKey(string $prefix=""): string{
       return uniqid($prefix);
    }

    /**
     * 创建api的key
     * @param string $path
     * @param string $name
     * @return string
     */
    public static function createApiKey(string $path,string $name=""): string{
        if ($name){
            $key = $path."@".$name;
        }else{
            $key = $path;
        }
        $res = urlencode($key);
        return $res;
    }


    /**
     * 二维数组根据key排序
     * @param $array
     * @param string $field
     * @param int $order
     * @return mixed
     */
    public static function arraySortByKey($array, $field="sort",$order=SORT_ASC){
        $sorts = [];
        foreach ($array as $key => $row) {
            $sorts[$key]  = isset($row[$field])?$row[$field]:"";
        }
        array_multisort($sorts, $order,  $array);
        return $array;
    }


    /**
     * 过滤所有空格换行符
     * @param $str
     * @return array|string|string[]
     */
    public static function trimEmpty($str){
        $search = array(" ","　","\n","\r","\t");
        $replace = array("","","","","");
        return str_replace($search, $replace, $str);
    }


    public static function getObjectFindByField(array $data,string $name = null)
    {
        // 无参数时获取所有
        if (empty($name)) {
            return $data;
        }
        if (false === strpos($name, '.')) {
            $name = strtolower($name);
            return $data[$name] ?? [];
        }
        $name    = explode('.', $name);
        $name[0] = strtolower($name[0]);
        $result  = $data;
        // 按.拆分成多维数组进行判断
        foreach ($name as $val) {
            if (isset($result[$val])) {
                $result = $result[$val];
            } else {
                return [];
            }
        }
        return $result;
    }


    public static function inArrayBuyKeyword(array $arr,string $keyword):bool{
        $is = false;
        foreach ($arr as $item) {
            if (strpos($item, $keyword) !== false){
                $is=true;
                break;
            }
        }
        return $is;
    }

    /**
     * 处理接口请求类型为数组
     * @param $method
     * @return array|false|string[]
     */
    public static function handleApiMethod($method){
        if (is_array($method)){
            return $method;
        }else if (strpos($method, ',') !== false){
            return explode(",", strtoupper($method));
        }else {
            return [strtoupper($method)];
        }
    }


    /**
     * 获取数组中指定keys的值为新数组
     * @param array $array
     * @param array $keys
     * @return array
     */
    public static function getArrayValuesByKeys(array $array,array $keys){
        $data = [];
        foreach ($keys as $key) {
            if (isset($array[$key])){
                $data[$key]=$array[$key];
            }else{
                $data[$key]="";
            }
        }
        return $data;
    }
    public static function arrayKeyFirst($array){
        if (function_exists('array_key_first')) {
            return array_key_first($array);
        }else{
            foreach($array as $key => $unused) {
                return $key;
            }
            return NULL;
        }
    }





}
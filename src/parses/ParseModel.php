<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use Doctrine\Common\Annotations\Reader;
use hg\apidoc\exception\ErrorException;
use hg\apidoc\annotation\Field;
use hg\apidoc\annotation\WithoutField;
use hg\apidoc\annotation\AddField;
use hg\apidoc\utils\Helper;
use hg\apidoc\utils\Lang;


class ParseModel
{
    protected static $reader;
    protected static $config=[];

    public function __construct(Reader $reader,$config=[])
    {
         self::$reader = $reader;
         self::$config = $config;
    }

    /**
     * 生成模型数据
     * @param string $path
     * @return array|false
     * @throws \ReflectionException
     */
    public function renderModel(string $path)
    {
            if (class_exists($path)) {

                $model = static::getModelClass($path);
                return static::parseModelTable($model,$path,"");
            } else {
                if (strpos($path, '@') !== false){
                    $pathArr   = explode("@", $path);
                    $modelClassPath = $pathArr[0];
                    $methodName =  $pathArr[1];
                }else{
                    $modelClassArr   = explode("\\", $path);
                    $methodName = $modelClassArr[count($modelClassArr) - 1];
                    unset($modelClassArr[count($modelClassArr) - 1]);
                    $modelClassPath  = implode("\\", $modelClassArr);
                }
                if (class_exists($modelClassPath)){
                    $model = static::getModelClass($modelClassPath);
                    return static::parseModelTable($model,$modelClassPath,$methodName);
                }else{
                    throw new ErrorException("ref file not exists",  [
                        'path' => $path
                    ]);
                }
            }
    }

    protected static function parseModelTable($model,$path,$methodName=""){
        if (!is_callable(array($model, 'getTable'))) {
            return false;
        }
        $reader=static::$reader;
        try {
            $classReflect    = new \ReflectionClass($path);
            // 获取所有模型属性
            $propertys = $classReflect->getDefaultProperties();
            $table =static::getTableDocument($model, $propertys);
            if (empty($methodName)){
                return $table;
            }

            $methodAction    = $classReflect->getMethod($methodName);
            // 模型注释-field
            if ($fieldAnnotations = $reader->getMethodAnnotation($methodAction, Field::class)) {
                $table = ParseApiDetail::filterParamsField($table, $fieldAnnotations->value, 'field');
            }
            // 模型注释-withoutField
            if ($fieldAnnotations = $reader->getMethodAnnotation($methodAction, WithoutField::class)) {
                $table = ParseApiDetail::filterParamsField($table, $fieldAnnotations->value, 'withoutField');
            }
            // 模型注释-addField
            if ($annotations = $reader->getMethodAnnotations($methodAction)) {
                foreach ($annotations as $annotation) {
                    switch (true) {
                        case $annotation instanceof AddField:
                            $param         = [
                                "name"    => "",
                                "desc"    => $annotation->desc,
                                "require" => $annotation->require,
                                "type"    => $annotation->type,
                                "default" => $annotation->default,
                            ];
                            if (!empty($annotation->mdRef)){
                                $param['md'] = ParseMarkdown::getContent("",$annotation->mdRef);
                            }
                            if (!empty($annotation->md)){
                                $param['md'] = $annotation->md;
                            }
                            $children      = static::handleParamValue($annotation->value);
                            $param['name'] = $children['name'];
                            if (count($children['params']) > 0) {
                                $param['children'] = $children['params'];
                            }
                            $isExists = false;
                            $newTable = [];
                            foreach ($table as $item) {
                                if ($param['name'] === $item['name']) {
                                    $isExists   = true;
                                    $newTable[] = $param;
                                } else {
                                    $newTable[] = $item;
                                }
                            }
                            $table = $newTable;
                            if (!$isExists) {
                                $table[] = $param;
                            }
                            break;
                    }
                }
            }
            return $table;
        } catch (\ReflectionException $e) {
            throw new ErrorException('Class '.$path.' '.$e->getMessage());
        }

    }
    /**
     * 处理字段参数
     * @param $values
     * @return array
     */
    protected static function handleParamValue($values): array
    {
        $name   = "";
        $params = [];
        if (!empty($values) && is_array($values) && count($values) > 0) {
            foreach ($values as $item) {
                if (is_string($item)) {
                    $name = $item;
                } else if (is_object($item)) {
                    $param         = [
                        "name"    => "",
                        "type"    => $item->type,
                        "desc"    => $item->desc,
                        "default" => $item->default,
                        "require" => $item->require,
                    ];
                    $children      = static::handleParamValue($item->value);
                    $param['name'] = $children['name'];
                    if (count($children['params']) > 0) {
                        $param['children'] = $children['params'];
                    }
                    $params[] = $param;
                }
            }
        } else {
            $name = $values;
        }
        return ['name' => $name, 'params' => $params];
    }

    /**
     * 获取模型实例
     * @param $method
     * @return mixed|null
     */
    public static function getModelClass($namespaceName)
    {
        if (!empty($namespaceName) && class_exists($namespaceName)) {
            $modelInstance = new $namespaceName();
            return $modelInstance;
        } else {
            return null;
        }
    }




    /**
     * 获取模型注解数据
     * @param $model
     * @param $propertys
     * @return array
     */
    public static function getTableDocument($model,array $propertys):array
    {
        $config = static::$config;
        if (empty($config['database_query_function'])){
            throw new ErrorException("not datatable_query_function config");
        }
        $sqlRes = $config['database_query_function']("show create table " . $model->getTable());
        $createTableObj = $sqlRes[0];
        $createTableArray = Helper::objectToArray($createTableObj);
        $createTable = "";
        if (!empty($createTableArray['Create Table'])){
            $createTable = $createTableArray['Create Table'];
        }else  if(!empty($createTableArray['create table'])){
            $createTable = $createTableArray['create table'];
        }else{
            throw new ErrorException("datatable not exists",  $createTableArray);
        }
        preg_match_all("#[^KEY]`(.*?)` (.*?) (.*?),\n#", $createTable, $matches);
        $fields       = $matches[1];
        $types        = $matches[2];
        $contents     = $matches[3];
        $fieldComment = [];
        //组织注释
        for ($i = 0; $i < count($matches[0]); $i++) {
            $key     = $fields[$i];
            $type    = $types[$i];
            $default = "";
            $require = "";
            $desc    = "";
            $mock = "";
            $md="";
            $content = $contents[$i];
            if (strpos($type, '(`') !== false) {
                continue;
            }
            if (strpos($content, 'COMMENT') !== false) {
                // 存在字段注释
                preg_match_all("#COMMENT\s*'(.*?)'#", $content, $edscs);
                if (!empty($edscs[1]) && !empty($edscs[1][0])){
                    $desc = Lang::getLang($edscs[1][0]);
                    if (strpos($desc, 'mock(') !== false){
                        // 存在mock
                        preg_match('#mock\((.*)\)#s', $content, $mocks);
                        if (!empty($mocks[1])) {
                            $mock = $mocks[1];
                            $desc = str_replace($mocks[0],"",$desc);
                        }
                    }
                    if (strpos($desc, 'mdRef="') !== false){
                        // 存在mdRef
                        preg_match('#mdRef="(.*)"#s', $content, $mdRefs);
                        if (!empty($mdRefs[1])) {
                            $md = ParseMarkdown::getContent("",$mdRefs[1]);
                            $desc = str_replace($mdRefs[0],"",$desc);
                        }
                    }
                }

            }
            if (strpos($content, 'DEFAULT') !== false) {
                // 存在字段默认值
                preg_match_all("#DEFAULT\s*'(.*?)'#", $content, $defaults);
                $default = $defaults[1] && is_array($defaults[1])?$defaults[1][0]:"";
            }

            if (strpos($content, 'NOT NULL') !== false) {
                // 必填字段
                $require = "1";
            }

            $name = $key;
            // 转换字段名为驼峰命名（用于输出）
            if (isset($propertys['convertNameToCamel']) && $propertys['convertNameToCamel'] === true) {
                $name = Helper::camel($key);
            }
            $fieldComment[] = [
                "name"    => $name,
                "type"    => $type,
                "desc"    => $desc,
                "default" => $default,
                "require" => $require,
                "mock"=>$mock,
                "md"=>$md
            ];
        }
        return $fieldComment;
    }

}
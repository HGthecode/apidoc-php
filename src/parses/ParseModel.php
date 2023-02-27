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
        $fieldComment = [];
        if (empty($config['database_query_function'])){
            throw new ErrorException("not datatable_query_function config");
        }
        $tableName = $model->getTable();
        $configTablePrefix = !empty($config['database']) && !empty($config['database']['prefix'])?$config['database']['prefix']:"";
        if (!empty($configTablePrefix) && strpos($tableName, $configTablePrefix) === false){
            $tableName = $configTablePrefix.$model->getTable();
        }
        $tableColumns = $config['database_query_function']("SHOW FULL COLUMNS FROM " . $tableName);
        foreach ($tableColumns as $columns) {
            $columns = Helper::objectToArray($columns);
            $name = $columns['Field'];
            $desc = $columns['Comment'];
            $mock="";
            $md = "";
            if (isset($propertys['convertNameToCamel']) && $propertys['convertNameToCamel'] === true) {
                $name = Helper::camel($name);
            }
            if (!empty($desc)) {
                // 存在字段注释
                $desc = Lang::getLang($desc);
                if (strpos($desc, 'mock(') !== false){
                    // 存在mock
                    preg_match('#mock\((.*)\)#s', $desc, $mocks);
                    if (!empty($mocks[1])) {
                        $mock = $mocks[1];
                        $desc = str_replace($mocks[0],"",$desc);
                    }
                }
                if (strpos($desc, 'mdRef="') !== false){
                    // 存在mdRef
                    preg_match('#mdRef="(.*)"#s', $desc, $mdRefs);
                    if (!empty($mdRefs[1])) {
                        $md = ParseMarkdown::getContent("",$mdRefs[1]);
                        $desc = str_replace($mdRefs[0],"",$desc);
                    }
                }
            }
            $fieldComment[] = [
                "name"    => $name,
                "type"    => $columns['Type'],
                "desc"    => $desc,
                "default" => $columns['Default'],
                "require" => $columns['Null'] != "YES",
                "mock"=>$mock,
                "md"=>$md,
            ];
        }
        return $fieldComment;


    }

}
<?php
declare(strict_types=1);

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
    protected $config = [];

    public function __construct($config = [])
    {
        $this->config = $config;
    }

    public function parseModelTable($model, $classReflect, $methodName = "")
    {
        if (!is_callable(array($model, 'getTable'))) {
            return false;
        }
        $config = $this->config;
        try {
            // 获取所有模型属性
            $propertys = $classReflect->getDefaultProperties();
            $tableName = $model->getTable();
            $configTablePrefix = !empty($config['database']) && !empty($config['database']['prefix']) ? $config['database']['prefix'] : "";
            if (!empty($configTablePrefix) && strpos($tableName, $configTablePrefix) === false) {
                $tableName = $configTablePrefix . $model->getTable();
            }
            $table = $this->getTableDocument($tableName, $propertys, $model);
            if (empty($methodName)) {
                return $table;
            }

            $methodReflect = $classReflect->getMethod($methodName);
            $annotations = (new ParseAnnotation($config))->getMethodAnnotation($methodReflect);
            if (!empty($annotations['field'])) {
                $table = ParseApiDetail::filterParamsField($table, $annotations['field'], 'field');
            }
            if (!empty($annotations['withoutField'])) {
                $table = ParseApiDetail::filterParamsField($table, $annotations['withoutField'], 'withoutField');
            }
            if (!empty($annotations['addField'])) {
                $addFieldData = [];
                if (is_int(Helper::arrayKeyFirst($annotations['addField']))) {
                    $addFieldData = $annotations['addField'];
                } else {
                    $addFieldData = [$annotations['addField']];
                }
                $addFieldList = [];
                $parseApiDetail = new ParseApiDetail($config);
                $field = 'param';
                foreach ($addFieldData as $fieldItem) {
                    if (!empty($fieldItem['ref'])) {
                        $refParams = $parseApiDetail->renderRef($fieldItem['ref'], $field);
                        if (!empty($refParams[$field])) {
                            $fieldItem = $parseApiDetail->handleRefData($fieldItem, $refParams[$field], $field);
                        }
                    }
                    if (!empty($fieldItem['md'])) {
                        $fieldItem['md'] = ParseMarkdown::getContent("", $fieldItem['md']);
                    }
                    // 自定义解析
                    if (!empty($config['parsesAnnotation'])) {
                        $callback = $config['parsesAnnotation']($fieldItem);
                        if (!empty($callback)) {
                            $fieldItem = $callback;
                        }
                    }
                    $addFieldList[] = $fieldItem;
                }
                $table = Helper::arrayMergeAndUnique("name", $table, $addFieldList);
            }
            return $table;
        } catch (\ReflectionException $e) {
            throw new ErrorException('Class ' . get_class($model) . ' ' . $e->getMessage());
        }

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
            if (is_callable(array($modelInstance, 'getTable'))) {
                return $modelInstance;
            }
        }
        return null;
    }


    /**
     * 获取模型注解数据
     * @param $tableName
     * @param $propertys
     * @return array
     */
    public function getTableDocument($tableName, array $propertys, $model = null): array
    {
        $config = $this->config;
        $fieldComment = [];
        if (empty($config['database_query_function'])) {
            throw new ErrorException("not datatable_query_function config");
        }
        $tableColumns = $config['database_query_function']("SHOW FULL COLUMNS FROM `" . $tableName . "`");
        foreach ($tableColumns as $columns) {
            $columns = Helper::objectToArray($columns);
            $name = $columns['Field'];
            $desc = $columns['Comment'];
            $mock = "";
            $md = "";
            if (isset($propertys['convertNameToCamel']) && $propertys['convertNameToCamel'] === true) {
                $name = Helper::camel($name);
            }
            if (!empty($desc)) {
                // 存在字段注释
                $desc = Lang::getLang($desc);
                if (strpos($desc, 'mock(') !== false) {
                    // 存在mock
                    preg_match('#mock\((.*)\)#s', $desc, $mocks);
                    if (!empty($mocks[1])) {
                        $mock = $mocks[1];
                        $desc = str_replace($mocks[0], "", $desc);
                    }
                }
                if (strpos($desc, 'md="') !== false) {
                    // 存在md
                    preg_match('#md="(.*)"#s', $desc, $mdRefs);
                    if (!empty($mdRefs[1])) {
                        $md = ParseMarkdown::getContent("", $mdRefs[1]);
                        $desc = str_replace($mdRefs[0], "", $desc);
                    }
                }
            }
            $fieldComment[] = [
                "name" => $name,
                "type" => $columns['Type'],
                "desc" => $desc,
                "default" => $columns['Default'],
                "require" => $columns['Null'] != "YES",
                "mock" => $mock,
                "md" => $md,
            ];
        }
        return $fieldComment;
    }

}
<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use Doctrine\Common\Annotations\AnnotationReader;
use hg\apidoc\utils\Helper;
use ReflectionAttribute;
use hg\apidoc\exception\ErrorException;
use ReflectionMethod;
use think\facade\Log;

class ParseAnnotation
{

    protected $parser;

    public function __construct($config)
    {
        $this->parser = new AnnotationReader();
        if (!empty($config['ignored_annitation'])){
            foreach ($config['ignored_annitation'] as $item) {
                AnnotationReader::addGlobalIgnoredName($item);
            }
        }
    }
    /**
     * 解析非@注解的文本注释
     * @param $refMethod
     * @return array|false
     */
    public static function parseTextAnnotation($refMethod): array
    {
        $annotation = $refMethod->getDocComment();
        if (empty($annotation)) {
            return [];
        }
        if (preg_match('#^/\*\*(.*)\*/#s', $annotation, $comment) === false)
            return [];
        $comment = trim($comment [1]);
        if (preg_match_all('#^\s*\*(.*)#m', $comment, $lines) === false)
            return [];
        $data = [];
        foreach ($lines[1] as $line) {
            $line = trim($line);
            if (!empty ($line) && strpos($line, '@') !== 0) {
                $data[] = $line;
            }
        }
        return $data;
    }

    /**
     * 根据路径获取类名
     * @param $path
     * @return string
     */
    protected function getClassName($path){
        $NameArr = explode("\\", $path);
        $name    = lcfirst($NameArr[count($NameArr) - 1]);
        return $name;
    }

    /**
     * 获取并处理注解参数
     * @param $attrList
     * @return array
     */
    protected function getParameters($attrList){
        $attrs = [];
        foreach ($attrList as $item) {
            $value = "";
            if ($item instanceof ReflectionAttribute) {
                $name    = $this->getClassName($item->getName());
                $params = $item->getArguments();
                if (!empty($params)){
                    if (is_array($params) && !empty($params[0]) && is_string($params[0]) && count($params)===1){
                        $value = $params[0];
                    }else{
                        if (!empty($params[0])){
                            $paramObj = [];
                            foreach ($params as $k=>$value) {
                                $key = $k===0?'name':$k;
                                $paramObj[$key]=$value;
                            }
                        }else{
                            $paramObj = $params;
                        }
                        $value = $paramObj;
                    }
                }
            }else{
                $name    = $this->getClassName(get_class($item));
                $valueObj = Helper::objectToArray($item);
                if (isset($valueObj['name']) && count($valueObj)===1){
                    $value = $valueObj['name'];
                }else{
                    $value = $valueObj;
                }
            }
            if (!empty($attrs[$name]) && is_array($attrs[$name]) && array_key_first($attrs[$name])===0){
                $attrs[$name][]=$value;
            }else if(!empty($attrs[$name])){
                $attrs[$name] = [$attrs[$name],$value];
            }else{
                $attrs[$name]=$value;
            }
        }
        return $attrs;
    }

    /**
     * 获取类的注解参数
     * @param ReflectionMethod $refMethod
     * @return array
     */
    public function getClassAnnotation($refClass){
        if (method_exists($refClass,'getAttributes')){
            $attributes = $refClass->getAttributes();
        }else{
            $attributes = [];
        }
        $readerAttributes = $this->parser->getClassAnnotations($refClass);
        return $this->getParameters(array_merge($attributes,$readerAttributes));
    }

    /**
     * 获取方法的注解参数
     * @param ReflectionMethod $refMethod
     * @return array
     */
    public function getMethodAnnotation(ReflectionMethod $refMethod){
        if (method_exists($refMethod,'getAttributes')){
            $attributes = $refMethod->getAttributes();
        }else{
            $attributes = [];
        }
        $readerAttributes = $this->parser->getMethodAnnotations($refMethod);
        return $this->getParameters(array_merge($attributes,$readerAttributes));
    }

}
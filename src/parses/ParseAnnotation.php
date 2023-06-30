<?php
declare(strict_types = 1);

namespace hg\apidoc\parses;

use Doctrine\Common\Annotations\AnnotationReader;
use hg\apidoc\utils\Helper;
use ReflectionAttribute;
use hg\apidoc\exception\ErrorException;
use ReflectionMethod;
use ReflectionParameter;
use support\Log;

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
     * @param $isAll bool 是否获取全部，true则将带@开头的注释也包含
     * @return array|false
     */
    public static function parseTextAnnotation($refMethod,$isAll=false): array
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
            if (!empty ($line) && ($isAll===true || ($isAll===false && strpos($line, '@') !== 0))) {
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
                if (array_key_exists('name',$valueObj) && count($valueObj)===1){
                    $value = $valueObj['name']===null?true: $valueObj['name'];
                }else{
                    $value = $valueObj;
                }
            }
            if (!empty($attrs[$name]) && is_array($attrs[$name]) && Helper::arrayKeyFirst($attrs[$name])===0){
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

    /**
     * 获取属性的注解参数
     * @param $property
     * @return array
     */
    public function getPropertyAnnotation($property){
        if (method_exists($property,'getAttributes')){
            $attributes = $property->getAttributes();
        }else{
            $attributes = [];
        }
        $readerAttributes = $this->parser->getPropertyAnnotations($property);
        return $this->getParameters(array_merge($attributes,$readerAttributes));
    }

    /**
     * 解析类的属性文本注释的var
     * @param $propertyTextAnnotations
     * @return array
     */
    protected static function parsesPropertyTextAnnotation($propertyTextAnnotations){
        $varLine = "";
        foreach ($propertyTextAnnotations as $item) {
            if (strpos($item, '@var') !== false){
                $varLine = $item;
                break;
            }
        }
        $type = "";
        $desc = "";
        if ($varLine){
            $varLineArr = preg_split('/\\s+/', $varLine);
            $type = !empty($varLineArr[1])?$varLineArr[1]:"";
            $desc = !empty($varLineArr[2])?$varLineArr[2]:"";
        }
        if (empty($desc) && strpos($propertyTextAnnotations[0], '@var') === false){
            $desc = $propertyTextAnnotations[0];
        }
        return [
            'type'=>$type,
            'desc'=>$desc,
        ];
    }

    /**
     * 获取类的属性参数
     * @param $classReflect
     * @return array
     */
    public function getClassPropertiesy($classReflect){
        $publicProperties = $classReflect->getProperties(\ReflectionProperty::IS_PUBLIC);
        $arr=[];
        foreach ($publicProperties as $property) {
              $propertyAnnotations = $this->getPropertyAnnotation($property);
              $item = [];
              if (!empty($propertyAnnotations['property'])){
                  // 有apidoc注解
                  $arr[] = $propertyAnnotations['property'];
                  continue;
              }
              $propertyTextAnnotations = self::parseTextAnnotation($property,true);
              if (empty($propertyTextAnnotations)){
                  // 无注释
                  continue;
              }
              $textAnnotationsParams=static::parsesPropertyTextAnnotation($propertyTextAnnotations);
              $textAnnotationsParams['name'] =$property->getName();
              $arr[]=$textAnnotationsParams;
        }
        return $arr;
    }



}
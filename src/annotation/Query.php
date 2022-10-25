<?php

namespace hg\apidoc\annotation;


/**
 * Query参数
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","ANNOTATION"})
 */
final class Query extends ParamBase
{


    /**
     * 类型
     * @Enum({"string", "integer", "number", "boolean", "double", "float","date","time","datetime","timeStamp","int","object","array"})
     * @var string
     */
    public $type;

    /**
     * 必须
     * @var bool
     */
    public $require;
    
    /**
     * 引入
     * @var string
     */
    public $ref;

    /**
     * mock
     * @var string
     */
    public $mock;
}

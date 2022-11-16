<?php

namespace hg\apidoc\annotation;


/**
 * 成功响应体
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","ANNOTATION"})
 */
final class ResponseSuccess extends ParamBase
{

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
     * 数据挂载节点
     * @var boolean
     */
    public $main;

}

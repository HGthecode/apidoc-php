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
     * 引入
     * @var string
     */
    public $ref;

}

<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * 返回参数
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","ANNOTATION"})
 */
final class Returned extends ParamBase
{

    /**
     * 必须
     * @var bool
     */
    public $require = false;

    /**
     * 引入
     * @var string
     */
    public $ref;

    /**
     * 是否替换全局响应体中的参数
     * @var bool
     */
    public $replaceGlobal = false;

}

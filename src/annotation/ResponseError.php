<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * 异常响应体
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","ANNOTATION"})
 */
final class ResponseError extends ParamBase
{

    /**
     * 引入
     * @var string
     */
    public $ref;


}

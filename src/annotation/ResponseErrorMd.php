<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * 异常响应体的Markdown内容
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
class ResponseErrorMd extends Annotation
{
    /**
     * 引入md内容
     * @var string
     */
    public $ref;
}

<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * 成功响应体Markdown内容
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
class ResponseSuccessMd extends Annotation
{
    /**
     * 引入md内容
     * @var string
     */
    public $ref;
}

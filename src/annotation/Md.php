<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * Url
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
class Md extends Annotation
{
    /**
     * 引入md内容
     * @var string
     */
    public $ref;
}

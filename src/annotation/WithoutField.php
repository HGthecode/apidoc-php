<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 排除Ref的字段
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
#[Attribute(Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class WithoutField extends AbstractAnnotation
{
    /**
     * @param string|array $value 排除Ref的字段，逗号分割
     */
    public function __construct(...$value)
    {
        parent::__construct(...$value);
    }
}

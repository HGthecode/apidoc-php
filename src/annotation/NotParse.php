<?php

namespace hg\apidoc\annotation;

use Attribute;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 标记不解析的控制器/方法
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","CLASS"})
 */
#[Attribute(Attribute::TARGET_CLASS | \Attribute::IS_REPEATABLE)]
class NotParse extends AbstractAnnotation
{
    /**
     * @param string $value 不解析
     */
    public function __construct(...$value)
    {
        parent::__construct(...$value);
    }
}

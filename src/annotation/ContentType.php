<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 调试时请求类型
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
#[Attribute(Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class ContentType extends AbstractAnnotation
{
    /**
     * @param string $value 调试时请求类型
     */
    public function __construct(...$value)
    {
        parent::__construct(...$value);
    }
}

<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 排序
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"CLASS"})
 */
#[Attribute(Attribute::TARGET_CLASS | \Attribute::IS_REPEATABLE)]
class Sort extends AbstractAnnotation
{
    /**
     * @param string|int $value 排序
     */
    public function __construct(...$value)
    {
        parent::__construct(...$value);
    }
}

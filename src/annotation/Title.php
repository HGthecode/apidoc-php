<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 标题
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","CLASS"})
 */
#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class Title extends AbstractAnnotation
{
    /**
     * @param string $name 控制器/接口名称
     */
    public function __construct(...$value)
    {
        parent::__construct(...$value);
    }
}

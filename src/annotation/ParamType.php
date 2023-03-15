<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 参数类型
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
#[Attribute(Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class ParamType extends AbstractAnnotation
{
    /**
     * @param string $value 参数类型，formdata
     */
    public function __construct(...$value)
    {
        parent::__construct(...$value);
    }
}

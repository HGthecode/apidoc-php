<?php

namespace hg\apidoc\annotation;

use Attribute;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 不使用配置中的全局请求Body参数
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
#[Attribute(Attribute::TARGET_CLASS | \Attribute::IS_REPEATABLE)]
class NotParams extends AbstractAnnotation
{

    public function __construct(...$value)
    {
        parent::__construct(...$value);
    }
}

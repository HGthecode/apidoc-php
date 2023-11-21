<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;

/**
 * 成功响应体
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","ANNOTATION"})
 */
#[Attribute(Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
final class ResponseSuccess extends ParamBase
{

    /**
     * 数据挂载节点
     * @var boolean
     */
    public $main;

    /**
     * @param string $name 字段名
     * @param string $type 字段类型
     * @param string $desc 字段名称
     * @param bool $require 是否必须
     * @param string|int|bool $default 默认值
     * @param string|array $ref 引用注解/模型
     * @param string $md Md文本内容
     * @param string $childrenField 为tree类型时指定children字段
     * @param string $childrenDesc 为tree类型时指定children字段说明
     * @param string $childrenType 为array类型时指定子节点类型
     * @param string|array $field 指定Ref引入的字段
     * @param string|array $withoutField 排除Ref引入的字段
     * @param string $main 数据挂载节点
     */
    public function __construct(
        $name = '',
        string $type = '',
        string $desc = '',
        bool $require = false,
        $default="",
        $ref = "",
        string $md = "",
        string $childrenField = "",
        string $childrenDesc = "children",
        string $childrenType = "",
        $field = "",
        $withoutField = "",
        string $mock = "",
        bool $main = false,
        ...$attrs
    )
    {
        parent::__construct(...func_get_args());
    }

}

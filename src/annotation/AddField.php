<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;
use hg\apidoc\utils\AbstractAnnotation;

/**
 * 添加模型的字段
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
#[Attribute(Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class AddField extends ParamBase
{
    /**
     * 字段名
     * @var string
     */
    public $name;
    /**
     * 类型
     * @var string
     */
    public $type = 'string';


    /**
     * 默认值
     * @var string
     */
    public $default;

    /**
     * 描述
     * @var string
     */
    public $desc;

    /**
     * 必须
     * @var bool
     */
    public $require = false;

    /**
     * 说明md内容
     * @var string
     */
    public $md;


    /**
     * @param string $name 字段名
     * @param string $type 字段类型
     * @param string $desc 字段名称
     * @param bool $require 是否必须
     * @param string $ref 引用注解/模型
     * @param string $table 引用数据表
     * @param string $md Md文本内容
     * @param string $field 指定Ref引入的字段
     * @param string $withoutField 排除Ref引入的字段
     * @param string $mock Mock规则
     * @param string $children 字段子节点
     */
    public function __construct(
        $name = '',
        string $type = '',
        string $desc = '',
        bool $require = false,
        $ref = "",
        $table = "",
        string $md = "",
        $field = "",
        $withoutField = "",
        string $mock = "",
        ...$attrs
    )
    {
        parent::__construct(...func_get_args());
    }
}

<?php

namespace hg\apidoc\annotation;

use Attribute;
use Doctrine\Common\Annotations\Annotation;

/**
 * 接口调试前置事件
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","ANNOTATION"})
 */
#[Attribute(Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
final class Before extends EventBase
{
    /**
     * 事件
     * @Enum({"setHeader","setQuery","setBody", "clearHeader", "clearQuery", "clearBody", "setGlobalHeader", "setGlobalQuery", "setGlobalBody","clearGlobalHeader","clearGlobalQuery","clearGlobalBody","ajax"})
     * @var string
     */
    public $event;


    /**
     * @param string $event 事件名
     * @param string $name 事件名称
     * @param string $appKey 设置全局参数setGlobalHeader、setGlobalParam时指定应用
     * @param string $key 字段名
     * @param string $value 字段值
     * @param string|array $ref 事件引用
     * @param string $url ajax事件时的url
     * @param string $method ajax事件时的Method
     * @param string $contentType ajax事件时的 content-type
     * @param string $desc 事件描述
     * @param array $before 执行之前的事件
     * @param array $after 执行之后的事件
     */
    public function __construct(
        $event = '',
        string $name = '',
        string $appKey = "",
        string $key = '',
        string $value = '',
               $ref = "",
        string $url = '',
        string $method = '',
        string $contentType = "",
        string $desc = "",
        array  $before = [],
        array  $after = []
    )
    {
        parent::__construct(...func_get_args());
    }

}

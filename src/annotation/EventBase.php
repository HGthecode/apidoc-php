<?php

namespace hg\apidoc\annotation;

use hg\apidoc\utils\AbstractAnnotation;

abstract class EventBase extends AbstractAnnotation
{

    /**
     * 名称
     * @var string
     */
    public $name;

    /**
     * key
     * @var string
     */
    public $key;

    /**
     * 事件处理的值
     * @var string
     */
    public $value;


    /**
     * ajax时的url
     * @var string
     */
    public $url;

    /**
     * ajax时的Method
     * @Enum({"GET", "POST", "PUT", "DELETE"})
     * @var string
     */
    public $method;

    /**
     * ajax时的 content-type
     * @var string
     */
    public $contentType;

    /**
     * 字段描述
     * @var string
     */
    public $desc;

    /**
     * 引用
     * @var string|array
     */
    public $ref;

    /**
     * 设置全局参数setGlobalHeader、setGlobalParam时指定应用
     * @var string
     */
    public $appKey;


    /**
     * 执行之前的事件
     * @var array
     */
    public $before;

    /**
     * 执行之后的事件
     * @var array
     */
    public $after;


}

<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

abstract class EventBase extends Annotation
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
     * 处理值的方法
     * @var string
     */
    public $handleValue;

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
     * @var string
     */
    public $ref;

    /**
     * 设置全局参数setGlobalHeader、setGlobalParam时指定应用
     * @var string
     */
    public $appKey;



}

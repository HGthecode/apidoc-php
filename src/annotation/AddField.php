<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * 添加模型的字段
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
class AddField extends Annotation
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
     * 引入说明md内容
     * @var string
     */
    public $mdRef;
}

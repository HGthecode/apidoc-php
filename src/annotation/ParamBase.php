<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

abstract class ParamBase extends Annotation
{

    /**
     * 类型
     * @Enum({"string", "integer", "int", "boolean", "array", "double", "object", "tree", "file","float","date","time","datetime"})
     * @var string
     */
    public $type;


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
     * 为tree类型时指定children字段
     * @var string
     */
    public $childrenField = '';

    /**
     * 为tree类型时指定children字段说明
     * @var string
     */
    public $childrenDesc = 'children';

    /**
     * 为array类型时指定子节点类型
     *  @Enum({"string", "int", "boolean", "array", "object"})
     * @var string
     */
    public $childrenType = '';

    /**
     * 指定引入的字段
     * @var string
     */
    public $field;

    /**
     * 指定从引入中过滤的字段
     * @var string
     */
    public $withoutField;

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

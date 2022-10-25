<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * 调试时请求内容
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD"})
 */
class ContentType extends Annotation
{}

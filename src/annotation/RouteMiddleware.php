<?php

namespace hg\apidoc\annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * 路由中间件，自动注册路由时有效
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","CLASS"})
 */
class RouteMiddleware extends Annotation
{}

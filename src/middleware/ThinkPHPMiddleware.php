<?php

namespace hg\apidoc\middleware;

use hg\apidoc\utils\ConfigProvider;

class ThinkPHPMiddleware
{
    public function handle($request, \Closure $next)
    {
        $params = $request->param();
        $config =  ConfigProvider::get();
        $config['request_params'] = $params;
        ConfigProvider::set($config);
        return $next($request);
    }
}
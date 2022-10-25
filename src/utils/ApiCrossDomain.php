<?php
declare(strict_types = 1);
namespace hg\apidoc\utils;
use \Illuminate\Http\Request;
class ApiCrossDomain
{

    public function handle (Request $request, \Closure $next){

        $response = $next($request);
        $origin = $request->server('HTTP_ORIGIN') ? $request->server('HTTP_ORIGIN') : '';
        $response->header('Access-Control-Allow-Origin', $origin);
        $response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
        $response->header('Access-Control-Expose-Headers', 'Authorization, authenticated');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
        $response->header('Access-Control-Allow-Credentials', 'true');
        return $response;

    }


}
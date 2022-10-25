<?php
return [
    // 文档标题
    'title'              => 'API接口文档',
    // 文档描述
    'desc'               => '',
    // 默认请求类型
    'default_method'=>'GET',
    // 允许跨域访问
    'allowCrossDomain'=>false,
    // 设置可选版本
    'apps'           => [],
    // 自动生成url规则
    'auto_url' => [
        // 字母规则
        'letter_rule' => "lcfirst",
        // 多级路由分隔符
        'multistage_route_separator'  =>"."
    ],
    // 指定公共注释定义的文件地址
    'definitions'        => "app\common\controller\Definitions",
    // 缓存配置
    'cache'              => [
        // 是否开启缓存
        'enable' => false,
    ],
    // 权限认证配置
    'auth'               => [
        // 是否启用密码验证
        'enable'     => false,
        // 全局访问密码
        'password'   => "123456",
        // 密码加密盐
        'secret_key' => "apidoc#hg_code",
        // 有效期
        'expire' => 24*60*60
    ],
    // 统一的请求Header
    'headers'=>[],
    // 统一的请求参数Params
    'params'=>[],
    // 统一的请求响应体
    'responses'=>[
        ['name'=>'code','desc'=>'代码','type'=>'int'],
        ['name'=>'message','desc'=>'业务信息','type'=>'string'],
        ['name'=>'data','desc'=>'业务数据','main'=>true,'type'=>'object'],
    ],
    // md文档
    'docs'              => [],

];

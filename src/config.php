<?php
return [
    // 文档标题，显示在左上角与首页
    'title'              => 'Apidoc',
    // 文档描述，显示在首页
    'desc'               => '',
    // （必须）设置文档的应用/版本
    'apps'           => [
        [
            'title' => 'Api接口',
            'path' => 'app\controller',
            'key' => 'api',
        ],
    ],
    // （必须）指定通用注释定义的文件地址
    'definitions'        => "app\common\controller\Definitions",
    // （必须）自动生成url规则，当接口不添加@Apidoc\Url ("xxx")注解时，使用以下规则自动生成
    'auto_url' => [
        // 字母规则
        'letter_rule' => "lcfirst",
        // url前缀
        'prefix'=>"",
    ],
    // （必须）缓存配置
    'cache'              => [
        // 是否开启缓存
        'enable' => false,
    ],
    // （必须）权限认证配置
    'auth'               => [
        // 是否启用密码验证
        'enable'     => false,
        // 全局访问密码
        'password'   => "123456",
        // 密码加密盐
        'secret_key' => "apidoc#hg_code",
        // 授权访问后的有效期
        'expire' => 24*60*60
    ],
    // 全局参数
    'params'=>[],
    // 全局响应体
    'responses'=>[
        // 参数同上 headers；main=true来指定接口Returned参数挂载节点
        'success'=>[
            ['name'=>'code','desc'=>'业务编码','type'=>'int','require'=>1],
            ['name'=>'message','desc'=>'业务消息','type'=>'string','require'=>1],
            ['name'=>'data','desc'=>'业务数据','main'=>true,'type'=>'object','require'=>1],
        ],
        'error'=>[
            ['name'=>'code','desc'=>'异常编码','type'=>'int','require'=>1],
            ['name'=>'message','desc'=>'异常信息','type'=>'string','require'=>1],
        ]
    ],
    //（选配）默认作者
    'default_author'=>'',
    //（选配）默认请求类型
    'default_method'=>'GET',
    // （选配）允许跨域访问
    'allowCrossDomain'=>true,
    /**
     * （选配）解析时忽略带@注解的关键词，当注解中存在带@字符并且非Apidoc注解，如 @key test，此时Apidoc页面报类似以下错误时:
     * [Semantical Error] The annotation "@key" in method app\controller\XXX::index() was never imported. Did you maybe forget to add a "use" statement for this annotation?
     */
    'ignored_annitation'=>[],
    // （选配）Markdown文档
    'docs'              => [],
];
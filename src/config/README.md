---
icon: config
category: 配置
# sidebarDepth: 2
# sidebar: auto
---

# 配置参数
::: tip
安装插件后会生成一个apidoc.php的配置文件，以下为该文件可配置的参数说明
:::

:::: details 完整配置代码
```php
<?php
return [
    // （选配）文档标题，显示在左上角与首页
    'title'              => 'lang(apidoc.app.title)',
    // （选配）文档描述，显示在首页
    'desc'               => '',
    // （选配）是否启用Apidoc，默认true
    'enable'               => true,
    // （必须）设置文档的应用/版本
    'apps'           => [
        [
            // （必须）标题
            'title'=>'接口示例',
            // （必须）控制器目录地址，也可以是数组来指定多个控制器目录，如：['app\demo\controller','app\test\controller']
            'path'=>'app\demo\controller',
            // （必须）唯一的key
            'key'=>'demo',
            // （选配）该应用的访问授权密码
            'password' => '',
            // （选配）当前应用全局参数
            'params'=>[
                // （选配）当前应用全局的请求Header
                'header'=>[],
                // （选配）当前应用全局的请求Query
                'query'=>[],
                // （选配）当前应用全局的请求Body
                'body'=>[],
            ],
            // （选配）当前应用全局响应体
            'responses'=>[
                // （选配）当前应用成功响应体
                'success'=>[
                    // 同全的请求成功响应体
                ],
                // （选配）当前应用异常响应体
                'error'=>[
                    // 同全的请求成功响应体
                ]
            ],
            // （选配）该应用是否不允许调试
            'notDebug'=>true,
            // （选配）该应用的接口调试时，使用指定host发起请求，通常用于多应用多域名时配置
            'host'=>'',
            // （选配）配置该参数时，该应用只解析所列出的控制器
            'controllers'=>['app\admin\controller\BaseDemo',],
            // （选配）该用于的控制器分组
            'groups'=>[
                ['title'=>'基础用法','name'=>'base'],
                ['title'=>'接口示例','name'=>'apiDemo'],
                // 多级分组时，通过children嵌套
                [
                    'title'=>'多级分组',
                    'name'=>'subMenu',
                    'children'=>[
                        ['title'=>'子级1','name'=>'sub1',],
                        ['title'=>'子级2','name'=>'sub2'],
                    ]
                ],
            ],
             // （选配）多级应用/版本使用items嵌套，配置参数同上
            'items'=>[
                ['title' => 'V2.0','key' => 'v2','path' => 'app\test\controller\v2' ]
            ]
        ]
    ],
    // （必须）指定通用注释定义的文件地址
    'definitions'        => "app\common\controller\Definitions",
    // （必须）自动生成url规则，当接口不添加@Apidoc\Url ("xxx")注解时，使用以下规则自动生成
    'auto_url' => [
        // 字母规则，lcfirst=首字母小写；ucfirst=首字母大写；
        'letter_rule' => "lcfirst",
        // url前缀
        'prefix'=>"",
        // 过滤的目录
        'filter_keys'=>['app','controller'],
        // （选配）自动生成url时对每个key的处理函数
        'handle_key'=>function($key){
            // 此例子是tp6开启控制器后缀配置后，用来将Controller去除。
            return str_ireplace('Controller', "", $key);
        }
        // （选配）自定义url生成方法
        'custom' =>function($path,$method){
            //此处根据需求自行实现
            return "/".str_replace('\\','/',$$path).$method;
        },
    ],
    //  (选配) 是否自动注册路由
    'auto_register_routes'=>false,
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
    'params'=>[
        // （选配）全局的请求Header
        'header'=>[
            // name=字段名，type=字段类型，require=是否必须，default=默认值，desc=字段描述
            ['name'=>'Authorization','type'=>'string','require'=>true,'desc'=>'身份令牌Token'],
        ],
        // （选配）全局的请求Query
        'query'=>[
            // 同上 header
        ],
        // （选配）全局的请求Body
        'body'=>[
            // 同上 header
        ],
    ],
    // 全局响应体
    'responses'=>[
        // 成功响应体
        'success'=>[
            ['name'=>'code','desc'=>'业务代码','type'=>'int','require'=>1],
            ['name'=>'message','desc'=>'业务信息','type'=>'string','require'=>1],
            //参数同上 headers；main=true来指定接口Returned参数挂载节点
            ['name'=>'data','desc'=>'业务数据','main'=>true,'type'=>'object','require'=>1],
        ],
        // 异常响应体
        'error'=>[
            ['name'=>'code','desc'=>'业务代码','type'=>'int','require'=>1,'md'=>'/docs/HttpError.md'],
            ['name'=>'message','desc'=>'业务信息','type'=>'string','require'=>1],
        ]
    ],
    //（选配）全局事件
    'debug_events'=>[
        // 前置事件
        'before'=>[
            // event=事件方法名；name=事件名称；
            ['event'=>'renderGetUrl','name'=>'生成调试URL']
        ],
        // 后置事件
        'after'=>[
            // 同上
        ]
    ],
    //（选配）默认作者
    'default_author'=>'',
    //（选配）默认请求类型
    'default_method'=>'GET',
    // （选配）允许跨域访问
    'allowCrossDomain'=>false,
     /**
      * （选配）解析时忽略带@注解的关键词，当注解中存在带@字符并且非Apidoc注解，如 @key test，此时Apidoc页面报类似以下错误时:
      * [Semantical Error] The annotation "@key" in method app\demo\controller\Base::index() was never imported. Did you maybe forget to add a "use" statement for this annotation?
      */
    'ignored_annitation'=>['key'],
    
    
     // （选配）数据库配置
    'database'=>[
        // 数据库表前缀
        'prefix'          => '',
        // 数据库编码，默认为utf8
        'charset'         =>  'utf8',
        // 数据库引擎，默认为 InnoDB
        'engine'          => 'InnoDB',
    ],
    // （选配）Markdown文档
    'docs'              => [
        // title=文档标题，path=.md文件地址，appKey=指定应用/版本，多级分组使用children嵌套
        ['title'=>'md语法示例','path'=>'docs/Use','appKey'=>'demo'],
        [
            'title'=>'HTTP响应编码',
            'children'=>[
                ['title'=>'code错误码说明','path'=>'docs/HttpCode_${app[0].key}'],
                ['title'=>'status错误码说明','path'=>'docs/HttpStatus'],
            ],
        ]
    ],
    // （选配）代码生成器配置 注意：是一个二维数组
    'generator' =>[
        [
            // 标题
            'title'=>'创建Crud',
            // 是否启用
            'enable'=>true,
            // （选配）执行中间件，具体请查看下方中间件介绍
            'middleware'=>[
                \app\middleware\CreateCrudMiddleware::class
            ],
            // （必须）生成器窗口的表单配置
            'form' =>[
                // （选配）表单显示列数，默认3
                'colspan'=>3,
                // （选配）表单项字段配置
                'items'=>[
                    [
                        // （必须）表单项标题
                        'title'=>'控制器标题',
                        // （必须）字段名
                        'field'=>'controller_title',
                        // （必须）输入类型，支持：input、select
                        'type'=>'input',
                        // （选配）输入项属性
                        'props'=>[
                            // 提示文本
                            'placeholder'=>'请输入',
                            // type类型为select时有效，multiple=多选
                            'mode' =>'multiple',
                            // type类型为select时有效，最多显示选项的个数
                            'maxTagCount'=>1,
                            // type类型为select时有效，下拉选项数据
                            'options'=>[
                                // 每个选项的标题与值，label=标题，value=值
                                ['label'=>'选项A','value'=>1],
                            ]
                        ],
                        // （选配）验证规则
                        'rules'=>[
                            // 必填的验证
                            ['required'=>true,'message'=>'请输入控制器文件名'],
                            // 自定义正则验证
                            ['pattern'=>'^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$','message'=>'请输入正确的目录名'],
                        ]
                    ],
                ]
            ],
            // （必须）文件生成配置，注意：是一个二维数组
            'files'=>[
                [
                    // （必须）生成文件的文件夹地址，或php文件地址
                    'path'=>'app\${app[0].folder}\controller',
                    // （必须）生成文件的命名空间
                    'namespace'=>'app\${app[0].folder}\controller',
                    // （必须）模板文件地址
                    'template'=>'template/controller.tpl',
                    // （必须）名称
                    'name'=>'controller',
                    // （选配）验证规则
                    'rules'=>[
                        ['required'=>true,'message'=>'请输入控制器文件名'],
                        ['pattern'=>'^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$','message'=>'请输入正确的目录名'],
                    ]
                ],
                [
                    // 这里的path地址为php文件地址，当指定到php文件地址时，不会创建新的文件，而会将模板内容添加的该.php文件内
                    'path'=>'app\${app[0].folder}\route\admin.php',
                    'name'=>'route',
                    'template'=>'template/route.tpl',
                ],
            ],
            // （必须）数据表配置
            'table'=>[
                // 可选的字段类型
                'field_types'=>[
                    "int",
                    "varchar",
                    //...
                ],
                // 数据表配置，注意：是一个二维数组，可定义多个数据表
                'items'=>[
                     [
                         // （必须）表标题
                        'title'=>'主表',
                        // （选配）模型名验证规则
                        'model_rules'=>[
                            ['pattern'=>'^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$','message'=>'模型文件名错误，请输入大写字母开头的字母+数字，长度2-19的组合']
                        ],
                        // （选配）表名验证规则
                        'table_rules'=>[
                            ['pattern'=>'^[a-z]{1}([a-z0-9]|[_]){2,19}$','message'=>'表名错误，请输入小写字母开头的字母+数字+下划线，长度2-19的组合']
                        ],
                        // （选配）显示的提示文本
                        'desc'=>'提示说明文本',
                        // （必须）生成模型的命名空间
                        'namespace'=>'app\model',
                        // （必须）生成模型的文件夹地址
                        'path'=>"app\model",
                        // （必须）模板文件地址
                        'template'=>"template/model.tpl",
                        //（选配）自定义配置列
                        'columns'=>[
                            [
                                // （必须）标题
                                'title'=>'验证',
                                // （必须）字段名
                                'field'=>'check',
                                // （必须）字段类型，input、select、checkbox、number
                                'type'=>'select',
                                //（选配）列宽 px
                                'width'=>180,
                                //（选配）输入项属性
                                'props'=>[
                                    // 提示文本
                                    'placeholder'=>'请输入1',
                                    // type类型为select时有效，multiple=多选
                                    'mode' =>'multiple',
                                    // type类型为select时有效，最多显示选项的个数
                                    'maxTagCount'=>1,
                                     // type类型为select时有效，下拉选项数据
                                    'options'=>[
                                        // 每个选项的标题与值，label=标题，value=值
                                        ['label'=>'必填','value'=>'require','message'=>'缺少必要参数{$item.field}'],
                                    ]
                                ],
                            ],
                            //...
                        ],
                        // （选配）改生成器的默认字段
                        'default_fields'=>[
                            [
                                // 字段名
                                'field'=> 'id',
                                // 字段注释
                                'desc'=> '唯一id',
                                // 字段类型
                                'type'=> 'int',
                                // 字段长度
                                'length'=> 11,
                                // 默认值
                                'default'=> '',
                                // 非Null
                                'not_null'=> true,
                                // 主键
                                'main_key'=> true,
                                // 自增
                                'incremental'=> true,
                                //也可以添加自定义列的值
                                'query'=>true, 
                            ],
                            //...
                        ],
                        // 添加一行字段时，默认的值
                        'default_values'=>[
                            //这里就是对应每列字段名=>值
                            'type'=>'varchar',
                            'length'=>255,
                            //...
                        ],
                    ],
                ]
            ]
        ],
    ],
    // （选配）代码模板
    'code_template'=>[
        [
            // 标题
            'title'=>'vue前端Api文件',
            // 选择模式，controller、api
            'select_mode'=>'controller',
            // 是否多选
            'multiple'=>false,
            // 多选时，限制接口/控制器勾选的数量
            'limit'=>5,
            // 模板文件地址
            'template'=>'template\codes\fe_api_file.tpl',
            // 代码语言
            'language'=>'javascript',
            // 配置表单
            'form' => [
                // 表单元素布局方式 ，inline=联排；grid=网格
                'layout' => 'inline',
                // 表单项
                'items' => [
                    [
                        // （必须）表单项标题
                        'title' => '请求封装import',
                        // （必须）表单项字段
                        'field' => 'http_import',
                        // （必须）输入类型，支持：input、select、checkbox
                        'type' => 'input'
                    ],
                    [
                        'title' => '显示注释',
                        'field' => 'show_desc',
                        'type' => 'checkbox'
                    ],
                ],
                // 表单默认值
                'data'=>[
                    'http_import'=>'import sendRequest from "@/utils/request";',
                    'show_desc'=>true
                ]
            ],
        ]
    ],
    // （选配）接口分享功能
    'share'=>[
        // 是否开启接口分享功能
        'enable'=>true,
        // 自定义接口分享操作，二维数组，每个配置为一个按钮操作
        'actions'=>[
            [
                // 操作名称
                'name'=>'下载json',
                // 点击时触发的方法
                'click'=>function($shareData,$apiData){
                    // 自定义业务代码...

                    // retrun 返回js执行脚本。可以用downloadFile("下载地址","名称")来执行文件下载。
                    return 'downloadFile("/test.json","name");';
                }
            ]
        ]
    ],
    //自定义处理注解
    'parsesAnnotation'=>function($data){
        //...
        return $data;
    }
];
```
::::


### 应用/版本变量说明

#### 可用位置：
docs配置中的path可用

generator配置中的path、namespace、template可用


- 变量写法`${app[N].key}`其中的`N`表示`apps`中配置的层级：
- `${lang}`当前语言变量，`docs`的`path`可用。

比如配置为如下
```php
'apps' => [
    ['title'=>'后台管理','path'=>'app\admin\controller','key'=>'admin'],
    [
        'title'=>'演示示例',
        'path'=>'app\demo\controller',
        'key'=>'demo',
        'items'=>[
            ['title'=>'V1.0','path'=>'app\demo\controller\v1','key'=>'v1'],
            ['title'=>'V2.0','path'=>'app\demo\controller\v2','key'=>'v2']
        ]
    ],
],
'docs'=>[
    ['title'=>'Http状态码','path'=>'docs/${app[0].key}/HttpCode_${app[1].key}'],
]
```
1、当应用/版本选为`后台管理`的应用时，此时`${app[0].key}`就等于`admin` 由于该应用配置无子级`items`此时的`${app[1].key}`也就为空。最终文件地址为`dosc/admin/HttpCode_.md`。

2、当应用/版本选为`演示示例-V1.0`时，此时`${app[0].key}`就等于`demo` 由于该应用配置存在子级（多个版本）`items`此时的`${app[1].key}`也就为`v1`。最终文件地址为`dosc/demo/HttpCode_v1.md`。



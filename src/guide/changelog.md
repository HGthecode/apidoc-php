---
icon: log
headerDepth: 2
category: 指南
---

# 更新日志

- 主版本号：含有破坏性更新和新特性，不在发布周期内。
- 次版本号：带有新特性的向下兼容的版本。
- 修订版本号：日常 bugfix 更新

## v5.3.0

`2025-01-18`

> 需升级前端文件至 v3.2.0

- 增加 ignored_methods 配置参数，用于过滤不需要解析的方法。
- 增加请求响应状态码显示功能，用法请查看配置参数`responses_status`。
- 增加 apidoc-export 导出插件，目前支持导出 swagger.json 格式；[使用说明](/use/function/apiExport)

## v5.2.7

`2024-11-25`

> 无需升级前端文件

- 修复模型 ref 引用通过 AddField 注解参数并使用 mock 时报错问题。
- 修复 Method 通过数组定义多个值时报错问题。
- Method 类增加` GET``POST``PUT``PATCH``DELETE `静态属性。

## v5.2.6

`2024-08-13`

> 无需升级前端文件

- 修复 apps 中配置 responses，取参错误而引发报错问题。

## v5.2.5

`2024-07-26`

> 无需升级前端文件

- 修复 hyperf 的 config 函数需要声明引入才能使用。
- 调整特殊参数注解的应用范围。
- 修正 sort 传入 0 值的问题。
- 修正嵌套 ref 引入不解析问题。

## v5.2.4

`2024-06-26`

> 无需升级前端文件

- 修复 tp6 框架控制器中间件会影响全局路由。
- 修正同时使用其它注解插件，注解参数解析异常问题。

## v5.2.3

`2024-03-22`

> 需升级前端文件至 v3.1.2

- 修正 Header、PesponseSuccess、PesponseError 参数定义的字段名。
- 接口生成器路径替换表单字段异常问题。
- 增加接口生成器模板语法 ucfirst。
- 移除 doctrine/lexer 版本限制。

## v5.2.2

`2024-03-22`

> 发布后发现移除 doctrine/lexer 版本限制，可以解决 laravel10+的安装兼容问题，就接着发 5.2.3 版本了 😝

## v5.2.1

`2023-08-10`

> 需升级前端文件至 v3.1.1

- 修复接口参数 float 类型，生成 json 参数时不显示的问题。
- 修复接口生成器对无效参数处理不正确导致的不执行问题。
- 修复接口生成器配置 enable 无效问题。
- 接口生成器配置 Path，支持 form 的变量替换，如`'path' => 'app\${app[0].key}\controller\${form.group}',`。

## v5.2.0

`2023-06-30`

> 无需升级前端文件

- 修复 ref 模型的数据表名为`group`等关键字时，报错问题。
- 修复前端接口生成器的 path 显示问题。
- 接口响应体支持多级嵌套配置 main=true，指定业务数据挂载位置。
- 接口参数支持 ref 支持引用实体类属性。
- 控制器/接口的特殊参数（如：NotParse、NotHeaders 等）支持原生注解及注解参数方式书写。
  :::: details 特殊参数写法示例

  ```php
    /**
     * 原写法
     * NotParse
     */
    public function index(Request $request){
        //...
    }

    /**
     * 新写法
     * @Apidoc\NotParse()
     */
    public function index(Request $request){
        //...
    }

    // PHP8原生注解写法
    #[Apidoc\NotParse()]
    public function index(Request $request){
        //...
    }
  ```

  ::::

## v5.1.0

`2023-05-25`

> 需升级前端文件至 v3.1.0

- 增加接口分享功能
- 增加 ResponseSuccess 的 default 参数，及不注解 desc 时报错的问题。

## v5.0.10

`2023-05-08`

> 需升级前端文件至 v3.0.5

- 修正代码模板生成器的接口关键词筛选不生效问题。
- apps 的 path 支持配置为数组，来指定多个目录的控制器。
- `Param`、`Query`、`Returned`、`AddField`注解支持 table 来指定数据表解析。

## v5.0.9

`2023-05-02`

> 无需升级前端文件

- 增加清除缓存时将自动注册路由的缓存一并清除。
- 修复模型注解对自定义解析无效问题。
- 修复自动注册路由，注册中间件调用异常问题。

## v5.0.8

`2023-04-25`

> 需升级前端文件至 v3.0.4

- 兼容 php7.1。
- 修正 formdata 为空时传 null 的问题。
- 修正接口生成器提交成功后接口菜单不刷新问题。
- 修正自动注册路由跨域 OPTIONS 请求无效问题。
- 增加接口生成器表单项可配置默认值。
- 增加前端配置参数`API_TABLE_PROPS`，来控制接口详情的 Table。
- 接口生成器的数据表配置中的`namespace`、`path`支持使用应用/版本变量替换。
- `Param`、`Query`、`Returned`、`RouteParam`、`AddField`注解支持自定义参数。
- 增加 apidoc.php 配置参数`parsesAnnotation`用于自定义处理注解解析。

## v5.0.7

`2023-04-09`

> 无需升级前端文件

- 修正生成所有缓存异常问题。

## v5.0.6

`2023-04-04`

> 无需升级前端文件

- 修正响应体`ResponseSuccess` `ResponseError`的 ref 不解析问题。

## v5.0.5

`2023-04-03`

> 需升级前端文件至 v3.0.3

- 修正 AddField 注解 children 不解析问题。
- 接口文档页 Table 默认展开子参数。
- 模型注解 AddField 支持 ref。

## v5.0.4

`2023-03-29`

> 需升级前端文件至 v3.0.2

- 修正使用了 Field 注解报错问题。
- 修正特殊注释 NotResponseSuccess 无效问题。
- 修正 ts 生成 object 类型解析为 array 的异常问题。
- 修正默认值为空对象，json 生成异常问题。

## v5.0.3

`2023-03-28`

> 需升级前端文件至 v3.0.1

- Query/Param/Returned 注解支持 children 子参数注解中直接使用 ref。
- 支持接口调试响应参数的 Hover 提示。
- 修正 ref 引用文件/方法不存在时，提示异常不准确问题。
- 修正 Laravel 异常显示问题。

## v5.0.2

`2023-03-18`

> 无需升级前端文件

- 修正全局参数 body 配置后异常问题。

## v5.0.1

`2023-03-18`

> 无需升级前端文件

- 修正兼容 PHP7.4 以下不兼容...报错问题。

## v5.0.0

`2023-03-17`

> 需升级前端文件至 v3.0.0

- 支持 php8 原生注解。
- 兼容 Hyperf3.x。
- 将 md 与 mdRef 合并，废弃 mdRef。
- 支持全局参数 md 配置。
- 支持接口 json 字段名 Hover 提示。
- 修正模型引用表前缀无效问题。
- 修正数据表非空解析为必填参数异常问题。

## v4.2.1

`2023-01-28`

> 需升级前端文件至 v0.1.1

- 增加接口详情页，刷新当前页面的按钮。
- 调整 ResponseSuccess 注解不替换全局响应体配置，改为合并。
- 全局参数修改时，同步到调试的接口参数。

## v4.2.0

`2023-01-14`

> 需升级前端文件至 v0.1.0

- 支持自动注册路由。
- 修正 php8.1 环境下开启密码验证报错问题。
- 修正全局 body 参数赋值异常问题。
- 修正 ajax 事件，嵌套单个事件时不正常执行问题。
- 优化异常提示。
- 前端配置支持，自定义处理字段说明/MD 内容。
- 内置兼容 Webman 框架，无需繁杂的手动配置兼容。
- 简化 Hyperf 框架路由注册方式，升级到此版本参考以下方式修改：

```php
// config/routes.php
// 将这些代码
use hg\apidoc\providers\CommonService;
CommonService::registerApidocRoutes(function ($item){
    Router::addRoute($item['method'],$item['uri'],$item['callback'],['middleware' => [hg\apidoc\providers\HyperfService::class]]);
});

// 修改为这句
hg\apidoc\providers\HyperfService::register();
```

## v4.1.5

> 需升级前端文件至 v0.0.9

- 修正多应用全局参数名相同，存在调试时赋值错乱问题。
- 修正 Webman 及其它手动兼容的框架，在 php8.1 环境下运行报错问题。

注意：Webman 框架升级到此版本，需将以下文件做修改

```php
// app/middleware/ApidocServiceProvider.php

// 将这句
use hg\apidoc\providers\CommonService;
// 修改为这句
use hg\apidoc\providers\BaseService;

class ApidocServiceProvider
{
    // 将这句
    use CommonService;
    // 修改为
    use BaseService;
    //...
}
```

## v4.1.4

`2022-11-29`

> 无需更新前端文件

- 调整路由注册方式，来修正 ThinkPHP 路由中间件不执行问题。
- 修正 ThinkPHP、Laravel 在基于 swoole 环境下无法取到请求参数而报错的问题。

注意：Webman 框架升级到此版本，需将以下文件做修改

```php
// app/middleware/ApidocServiceProvider.php

class ApidocServiceProvider
{
    //...

    public function process(Request $request, callable $handler) : Response
    {
        // 删除这句
        $this->register();

        // 加上这句
        $this->initConfig();
    }

    //...
}
```

## v4.1.3

`2022-11-26`

> 需升级前端文件至 v0.0.8

- auto_url.custom 自定义 url 生成规则增加$url 返回值。
- 修正自动生成 url 时异常问题。

注意：如果之前配置了 auto_url.custom 来自定义实现 url 的生成，升级到该版本后，可能会报错；如下增加$url，参数接收即可：

```php
// config/apidoc.php
//...
'auto_url' => [
        // ...
        // 原来的
        'custom' =>function($path,$method){
            //...
        },

        // 修改为 ；由于该版本增加了第三个参数，所以此处也需加上该参数的接收
        'custom' =>function($path,$method,$url){
            //...
        },
]
```

## v4.1.2

`2022-11-26`

> 需升级前端文件至 v0.0.8

- 新增 auto_url.handle_key 配置项，用于自定义处理自动生成 url 的每个 key。
- 新增前端显示版本号。
- 新增自定义事件 name 属性，用于自定义事件名称的显示。
- 新增 ResponseSuccessMd 注解，用于使用 md 编写成功响应体。
- 新增 ResponseErrorMd 注解，用于使用 md 编写失败响应体。
- 优化 markdown 的 json 显示效果。

## v4.1.1

`2022-11-18`

> 需升级前端文件至 v0.0.7

- 新增自定义事件，移除原 handleValue 事件处理，统一由自定义事件实现。
- 新增全局、应用/版本全局事件调用。
- 增加 ResponseSuccess 支持 require。
- 修正 tree 类型子节点展开异常问题。
- 修正 ts 生成 childrenType 异常问题。

## v4.1.0

`2022-11-14`

> 需升级前端文件至 v0.0.5

- 增加代码模板生成器 [参考文档](/use/function/codeTemplate)。
- 增加自定义响应显示处理函数。
- 修正 tree 数据下 children 的类型为 array<\object\>。
- 修正文档 table 多级中重复字段的显示异常问题。

## v4.0.5

`2022-11-11`

> 无需升级前端文件

- 修正 ref 参数合并异常问题

## v4.0.4

`2022-11-10`

- 增加关闭文档配置。
- 修正 ref 引入参数时、且无字段名定义的子参数解析异常问题。
- 修正数据表生成 CURRENT_TIMESTAMP 默认值报错问题。
- 修正数组类型的显示问题。
- 修正字符串数组、数字数组 ts 生成异常问题。

## v4.0.3

`2022-11-07`

- 修正密码验证判断问题
- 修正 ResponseSuccess 注解 main 无效问题

## v4.0.2

`2022-11-03`

- 修正 Hyperf 表前缀获取异常问题

## v4.0.1

`2022-11-03`

- 修正 php8 环境下安装异常

## v4.0.0

`2022-11-02`

开始新的征程

---
icon: log
sidebarDepth: 2
category: 指南
---

# 更新日志


- 主版本号：含有破坏性更新和新特性，不在发布周期内。
- 次版本号：带有新特性的向下兼容的版本。
- 修订版本号：日常 bugfix 更新

## v5.0.0

`2023-03-17`

> 需升级前端文件至 v3.0.0

- 支持php8原生注解。
- 兼容Hyperf3.x。
- 将md与mdRef合并，废弃mdRef。
- 支持全局参数md配置。
- 支持接口json字段名Hover提示。
- 修正模型引用表前缀无效问题。
- 修正数据表非空解析为必填参数异常问题。


## v4.2.1

`2023-01-28`

> 需升级前端文件至 v0.1.1

- 增加接口详情页，刷新当前页面的按钮。
- 调整ResponseSuccess注解不替换全局响应体配置，改为合并。
- 全局参数修改时，同步到调试的接口参数。

## v4.2.0

`2023-01-14`

> 需升级前端文件至 v0.1.0

- 支持自动注册路由。
- 修正php8.1环境下开启密码验证报错问题。
- 修正全局body参数赋值异常问题。
- 修正ajax事件，嵌套单个事件时不正常执行问题。
- 优化异常提示。
- 前端配置支持，自定义处理字段说明/MD内容。
- 内置兼容Webman框架，无需繁杂的手动配置兼容。
- 简化Hyperf框架路由注册方式，升级到此版本参考以下方式修改：
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
- 修正Webman及其它手动兼容的框架，在php8.1环境下运行报错问题。

注意：Webman框架升级到此版本，需将以下文件做修改

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

- 调整路由注册方式，来修正ThinkPHP路由中间件不执行问题。
- 修正ThinkPHP、Laravel在基于swoole环境下无法取到请求参数而报错的问题。

注意：Webman框架升级到此版本，需将以下文件做修改

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

- auto_url.custom自定义url生成规则增加$url返回值。
- 修正自动生成url时异常问题。

注意：如果之前配置了auto_url.custom来自定义实现url的生成，升级到该版本后，可能会报错；如下增加$url，参数接收即可：


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

- 新增auto_url.handle_key配置项，用于自定义处理自动生成url的每个key。
- 新增前端显示版本号。
- 新增自定义事件name属性，用于自定义事件名称的显示。
- 新增ResponseSuccessMd注解，用于使用md编写成功响应体。
- 新增ResponseErrorMd注解，用于使用md编写失败响应体。
- 优化markdown的json显示效果。


## v4.1.1

`2022-11-18`

> 需升级前端文件至 v0.0.7

- 新增自定义事件，移除原handleValue事件处理，统一由自定义事件实现。
- 新增全局、应用/版本全局事件调用。
- 增加ResponseSuccess支持require。
- 修正tree类型子节点展开异常问题。
- 修正ts生成childrenType异常问题。


## v4.1.0

`2022-11-14`

> 需升级前端文件至 v0.0.5

- 增加代码模板生成器 [参考文档](/use/function/codeTemplate)。
- 增加自定义响应显示处理函数。
- 修正tree数据下children的类型为array<\object\>。
- 修正文档table多级中重复字段的显示异常问题。


## v4.0.5

`2022-11-11`

> 无需升级前端文件

- 修正ref参数合并异常问题


## v4.0.4

`2022-11-10`

- 增加关闭文档配置。
- 修正ref引入参数时、且无字段名定义的子参数解析异常问题。
- 修正数据表生成CURRENT_TIMESTAMP默认值报错问题。
- 修正数组类型的显示问题。
- 修正字符串数组、数字数组ts生成异常问题。

## v4.0.3

`2022-11-07`

- 修正密码验证判断问题
- 修正ResponseSuccess注解main无效问题



## v4.0.2

`2022-11-03`

- 修正Hyperf表前缀获取异常问题



## v4.0.1

`2022-11-03`

- 修正php8环境下安装异常


## v4.0.0

`2022-11-02`

开始新的征程




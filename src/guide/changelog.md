---
icon: log
sidebarDepth: 2
category: 指南
---

# 更新日志


- 主版本号：含有破坏性更新和新特性，不在发布周期内。
- 次版本号：带有新特性的向下兼容的版本。
- 修订版本号：日常 bugfix 更新

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




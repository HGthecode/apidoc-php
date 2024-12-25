---
icon: info
category: 建议及规范
headerDepth: 2
---

# 建议及规范

## 建议

- 如果您使用的是 php8 以上版本，建议使用 PHP8 原生注解方式书写注解。
- 如果你使用小于 PHP8 版本，并使用 PHPStorm 的话，建议安装[Annotations 插件](https://plugins.jetbrains.com/plugin/7320-php-annotations)，可以支持注解的语法提示及自动完成

- 配合查看[演示项目](https://demo-tp6.apidoc.icu/apidoc/)与[演示源码](https://github.com/HGthecode/apidoc-demos)、[基于 Webman 的 PHP8 原生注解示例源码](https://github.com/HGthecode/apidoc-demos/tree/webman)上手更快哦！

## 书写规范

::: warning 书写注解时有如下几个规范

- 控制器必须`use`引入注释解释文件
- `php8原生注解` 每个注解以 #[注解名("参数值",子参数名="子参数值",...)]
- `原始注解` 每个注解以 @+注解名("参数名/值",子参数名="子参数值",...)
  :::

## 举例

::: code-tabs#php

@tab:active PHP8 原生注解

```php
<?php
namespace app\demo\controller;
use app\BaseController;
// 必须的
use hg\apidoc\annotation as Apidoc;

#[Apidoc\Title("基础示例")]
class Base extends BaseController
{
    #[
        Apidoc\Title("基础的演示"),
        Apidoc\Tag("基础,示例"),
        Apidoc\Method("GET"),
        Apidoc\Url("/demo/base/index"),
        Apidoc\Query(name:"name",type: "string",require: true,desc: "姓名",mock:"@name"),
        Apidoc\Query(name:"phone",type: "string",require: true,desc: "手机号",mock:"@phone"),
        Apidoc\Returned("id",type: "int",desc: "Id"),
    ]
    public function index(){
        //...
    }
}
```

@tab 原始注解

```php
<?php
namespace app\demo\controller;
use app\BaseController;
// 必须的
use hg\apidoc\annotation as Apidoc;

/**
 * 基础示例
 */
class Base extends BaseController
{
    /**
     * @Apidoc\Title("基础的接口演示")
     * @Apidoc\Tag("基础,示例")
     * @Apidoc\Method ("GET")
     * @Apidoc\Url ("/demo/index")
     * @Apidoc\Query("name", type="string",require=true, desc="姓名",mock="@name")
     * @Apidoc\Query("phone", type="string",require=true, desc="手机号",mock="@phone")
     * @Apidoc\Returned("id", type="int", desc="Id")
     */
    public function index(){
        //...
    }
}
```

:::

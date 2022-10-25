---
icon: info
category: 建议及规范
sidebarDepth: 2
---

# 建议及规范

## 建议
- 如果你使用PHPStorm的话，建议安装PHP [Annotations插件](https://plugins.jetbrains.com/plugin/7320-php-annotations)，可以支持注解的语法提示及自动完成

- 配合查看[演示项目](https://apidoc.demo.hg-code.com/apidoc/?appKey=admin)与[演示源码](https://github.com/HGthecode/thinkphp-apidoc-demo)上手更快哦！



## 书写规范
::: warning 书写参数时有如下几个规范
- 控制器必须`use`引入注释解释文件
- 每个参数以 @+参数名("参数值",子参数名="子参数值",...)
- 子参数需用双引号包裹
:::

## 举例
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
     * @Apidoc\Author("HG")
     * @Apidoc\Tag("基础,示例")
     * @Apidoc\Url ("/demo/base/index")
     * @Apidoc\Method ("GET")
     * @Apidoc\Query("name", type="string",require=true, desc="姓名",mock="@name")
     * @Apidoc\Query("phone", type="string",require=true, desc="手机号",mock="@phone")
     * @Apidoc\Query("sex", type="int",desc="性别" ,mock="@integer(0, 1)")
     * @Apidoc\Returned("id", type="int", desc="id")
     */
    public function index(){
        //...
    }
}
```
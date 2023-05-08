# 没有解析出接口文档

正常安装好Apidoc后，发现页面的接口列表没有任何接口列出；可检查以下几个可能。

## 1、apps的path没有配置正确

检查 apidoc.php 配置文件的 apps 中的path是否配置正确，如下

```php
<?php
return [
    // 此处忽略其它配置项

    // （必须）设置文档的应用/版本
    'apps'           => [
    [
        // （必须）标题
        'title'=>'接口示例',
        // （必须）控制器目录地址，也可以是数组来指定多个控制器目录，如：['app\demo\controller','app\test\controller']
        'path'=>'app\controller',
        //...
    ]
]
```


## 2、无接口注解

检查以上apps配置的path控制器目录下，是否有控制器的接口按Apidoc的方式注解了接口参数。






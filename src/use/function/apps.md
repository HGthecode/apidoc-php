# 多应用/多版本

由于在各种项目开发中，有多种情况，如`单应用多版本`、`多应用无版本`、`多应用多版本`等开发场景与项目目录，所以将多应用/多版本统一在`apps`中配置实现。

## 举例一个多应用多版本的实现：

假设一个admin应用无版本，demo应用有多个版本，其项目项目目录如下

```sh
app
 |—— admin
    |—— controller
       |—— Index.php
       ...
    |—— route
    ...
 |—— demo
    |—— controller
        |—— v1
            BaseDemo.php
            CrudDemo.php
            ...
        |—— v2
            BaseDemo.php
            CrudDemo.php
            ...
 |—— model
 ...
```

在配置文件`apidoc.php`中的 apps 参数中配置如下

> 注意：path是指定该应用控制器的目录，不是命名空间

```php
'apps' => [
    ['title'=>'后台管理','path'=>'app\admin\controller','key'=>'admin'],
    [
        'title'=>'演示示例',
        'key'=>'demo',
        'items'=>[
            ['title'=>'V1.0','path'=>'app\demo\controller\v1','key'=>'v1'],
            ['title'=>'V2.0','path'=>'app\demo\controller\v2','key'=>'v2']
        ]
    ],
],
```



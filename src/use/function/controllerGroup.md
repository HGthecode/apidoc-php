# 控制器分组

可通过控制器分组实现将多模块的控制器进行分组

1、配置文件`apidoc.php`中的 apps 配置应用/版本的分组列表：

```php
// apidoc.php
//设置控制器分组
'apps' => [
    [
        'title'=>'后台管理',
        'path'=>'app\admin\controller',
        'key'=>'admin',
        'groups'             => [
                ['title'=>'基础模块','name'=>'base'],
                ['title'=>'多级模块','name'=>'subMenu',
                    'children'=>[
                        ['title'=>'多级v1','name'=>'subv1',],
                        ['title'=>'多级v2','name'=>'subv2'],
                    ]
                ],
        ],
    ]
]
```

2、在对应控制器注释中，加入 `@group` 来指定该控制器所属分类的 name

```php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 * @Apidoc\Group("base")
 */
class ApiDocTest
{ 
```
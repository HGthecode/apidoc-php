

# 代码生成器

::: warning 注意
确保站点目录有写入权限
:::


代码生成器功能由 系统配置+模板+可视化页面配置来实现。为了灵活适应各种项目结构与实现方式，需做好系统配置与模板编写。


下面将举例一个多应用多版本的实现：
> 假设一个admin应用无版本，demo应用有多个版本，其项目项目目录如下
```sh
app
 |—— admin
    |—— controller
       |—— Index.php
       ...
    |—— service
    |—— validate
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
    |—— service
    |—— validate
 |—— model
 ...
```

## 1、系统配置

> 多应用/多版本需先配置 [apps](/config/#apps) 

配置文件`apidoc.php`中，
根据项目结构设置，每个配置参数说明请查看->[generator参数](/config/)


```php
// /config/apidoc.php
// 为了方便配置多个生成器，可把一些公用的配置先定义成变量来使用

// 表字段可选的字段类型
$tableFieldTypes = ["int", "tinyint", "integer", "float", "decimal", "char", "varchar", "blob", "text", "point"];
// 表字段可选的验证规则
$tableFieldCheckOptions = [
    ['label'=>'必填','value'=>'require','message'=>'缺少必要参数{$item.field}'],
    ['label'=>'数字','value'=>'number','message'=>'{$item.field}字段类型为数字'],
    ['label'=>'整数','value'=>'integer','message'=>'{$item.field}为整数'],
    ['label'=>'布尔','value'=>'boolean','message'=>'{$item.field}为布尔值'],
];
// 主表默认字段
$tableDefaultRows = [
    [
        'field'=> 'id',
        'desc'=> '唯一id',
        'type'=> 'int',
        'length'=> 11,
        'default'=> '',
        'not_null'=> true,
        'main_key'=> true,
        'incremental'=> true,
        'query'=> false,
        'list'=> true,
        'detail'=> true,
        'add'=> false,
        'edit'=> true
    ],
    [
        'field'=> 'create_time',
        'desc'=> '创建时间',
        'type'=> 'int',
        'length'=> 10,
        'default'=> '',
        'not_null'=> false,
        'main_key'=> false,
        'incremental'=> false,
    ],
    [
        'field'=> 'update_time',
        'desc'=> '更新时间',
        'type'=> 'int',
        'length'=> 10,
        'default'=> '',
        'not_null'=> false,
        'main_key'=> false,
        'incremental'=> false,
    ],
    [
        'field'=> 'delete_time',
        'desc'=> '删除时间',
        'type'=> 'int',
        'length'=> 10,
        'default'=> '',
        'not_null'=> false,
        'main_key'=> false,
        'incremental'=> false,
    ]
];

// crud的表配置自定义列
$crudTableColumns=[
    [
        'title'=>'验证',
        'field'=>'check',
        'type'=>'select',
        'width'=>180,
        'props'=>[
            'placeholder'=>'请输入',
            'mode' =>'multiple',
            'maxTagCount'=>1,
            'options'=>$tableFieldCheckOptions
        ],
    ],
    [
        'title'=>'查询',
        'field'=>'query',
        'type'=>'checkbox',
        'width'=>60
    ],
    [
        'title'=>'列表',
        'field'=>'list',
        'type'=>'checkbox',
        'width'=>60
    ],
    [
        'title'=>'明细',
        'field'=>'detail',
        'type'=>'checkbox',
        'width'=>60
    ],
    [
        'title'=>'新增',
        'field'=>'add',
        'type'=>'checkbox',
        'width'=>60
    ],
    [
        'title'=>'编辑',
        'field'=>'edit',
        'type'=>'checkbox',
        'width'=>60
    ]
];
// 模型名规则
$modelNameRules=[
    ['pattern'=>'^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$','message'=>'模型文件名错误，请输入大写字母开头的字母+数字，长度2-19的组合']
];
// 表名规则
$tableNameRules=[
    ['pattern'=>'^[a-z]{1}([a-z0-9]|[_]){2,19}$','message'=>'表名错误，请输入小写字母开头的字母+数字/下划线，长度2-19的组合']
];

'generator' =>[
    [
        'title'=>'创建Crud',
        'enable'=>true,
        'middleware'=>[
            \app\common\middleware\CreateCrudMiddleware::class
        ],
        'form' =>[
            'colspan'=>3,
            'items'=>[
                [
                    'title'=>'控制器标题',
                    'field'=>'controller_title',
                    'type'=>'input'
                ],
            ]
        ],
        'files'=>[
            [
                'path'=>'app\${app[0].key}\controller\${app[1].key}',
                'namespace'=>'app\${app[0].key}\controller\${app[1].key}',
                'template'=>'template\crud\controller.tpl',
                'name'=>'controller',
                'rules'=>[
                    ['required'=>true,'message'=>'请输入控制器文件名'],
                    ['pattern'=>'^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$','message'=>'请输入正确的目录名'],
                ]
            ],
            [
                'name'=>'service',
                'path'=>'app\${app[0].key}\services',
                'template'=>'template\crud\service.tpl',
            ],
            [
                'name'=>'validate',
                'path'=>'app\${app[0].key}\validate',
                'template'=>'template\crud\validate.tpl',
            ],
            [
                'name'=>'route',
                'path'=>'app\${app[0].key}\route\${app[0].key}.php',
                'template'=>'template\crud\route.tpl',
            ],
        ],
        'table'=>[
            'field_types'=>$tableFieldTypes,
            'items'=>[
                [
                    'title'=>'数据表',
                    'namespace'=>'app\model',
                    'path'=>"app\model",
                    'template'=>"template\crud\model.tpl",
                    'model_rules'=>$modelNameRules,
                    'table_rules'=>$tableNameRules,
                    'columns'=>$crudTableColumns,
                    'default_fields'=>$tableDefaultRows,
                    'default_values'=>[
                        'type'=>'varchar',
                        'length'=>255,
                        'list'=>true,
                        'detail'=>true,
                        'add'=>true,
                        'edit'=>true,
                    ],
                ],
            ]
        ]
    ],
    //....
]


```

通过如上配置，我们就可以看到页面右上角就出现 代码生成 的菜单了，点击弹出可视化配置窗口，如下



## 2、模板编写

根据以上配置中template模板目录，在指定位置创建模板文件 `controller.tpl`、`service.tpl`、`model.tpl`、`validate.tpl`、`route.tpl`等。

模板示例可参考 [模板文件示例](https://github.com/HGthecode/apidoc-demos/tree/main/template) ，这里就不贴出来了，这里说说如何编写模板，相信你很快就能上手。

::: tip 要领
1、首先自己在项目中实现一个完整的逻辑。

2、然后把这些文件内容拷贝在对应的`.tpl`模板文件中。

3、用下表变量替换模板中的参数。
:::

### 模板变量

以下数据为在模板中可使用的全部参数，你也可以在配置的执行中间件的before方法内改变它

```json
{
    // 页面中表单的参数
    "form": {
        // 所选的应用key，多级应用逗号,分开如 demo,v1
        "appKey": "admin",
        // 所选分组的name
        "group": "test",
        // 自定义表单字段值
        "controller_title": "测试Crud"
    },
    // 表配置参数，数组中每个对象为一个表配置参数
    "tables": [
        {
            // 表名
            "table_name": "test_crud",
            // 模型名
            "model_name": "TestCrud",
            // 命名空间
            "namespace": "app\\model",
            // 模型目录地址
            "model_path": "app\\model",
            // 模型模板文件地址
            "template": "template\\crud\\model.tpl",
            // 表配置数据
            "datas": [
                {
                    // 字段名
                    "field": "id",
                    // 字段注释
                    "desc": "唯一id",
                    // 字段类型
                    "type": "int",
                    // 字段长度
                    "length": 11,
                    // 默认值
                    "default": "",
                    // 非Null
                    "not_null": true,
                    // 主键
                    "main_key": true,
                    // 自增
                    "incremental": true,
                    // 以下为自定义列的字段参数
                    "query": false,
                    "list": true,
                    "detail": true,
                    "add": false,
                    "edit": true,
                    // 当自定义字段类型为select时，值为所选选项的所有参数
                    "check": [
                        {
                            "label": "必填",
                            "value": "require",
                            "message": "缺少必要参数{$item.field}"
                        }
                    ]
                },
               //...
            ]
        }
    ],
    // 当前所选应用数据，多级应用下，该数组为所选应用的每一层数据
    "app": [
        {
            "title": "后台管理",
            "path": "app\\admin\\controller",
            "key": "admin",
        }
    ],
    // 每个生成文件的名称，对应其配置与页面输入的文件名
    "controller": {
        // 页面输入的文件名
        "class_name": "TestCrud",
        // 文件目录地址
        "path": "app\\admin\\controller\\",
        // 文件命名空间
        "namespace": "app\\admin\\controller",
        // 模板地址
        "template": "template\\crud\\controller.tpl"
    },
    "service": {
        "class_name": "TestCrud",
        "path": "app\\admin\\services",
        "namespace": "app\\admin\\services",
        "template": "template\\crud\\service.tpl"
    },
    "validate": {
        "class_name": "TestCrud",
        "path": "app\\admin\\validate",
        "namespace": "app\\admin\\validate",
        "template": "template\\crud\\validate.tpl"
    },
    "route": {
        "class_name": "TestCrud",
        "path": "app\\admin\\route\\admin.php",
        "namespace": "app\\admin\\route\\admin.php",
        "template": "template\\crud\\route.tpl"
    }
}

```

### 模板语法

通过以下模板语法可对以上参数，进行 变量调用、if判断、foreach循环等模板语法生成需要的模板内容

#### 变量调用

用于调用以上参数中的字符串/数字参数

使用语法 `{$变量}` 变量为需要指定的参数，对象可通过`.`，数组可通过`[N]`来指定下标参数

```php
<?php
namespace {$controller.namespace};
// 这里的{$controller.namespace} 会被替换为以上参数的 app\admin\services

{$form.controller_title}  //测试Crud
{$form.group}   // admin

// 数组调用
{$app[0].title}  // 后台管理
{$app[0].key}  // admin

/** 参数处理*/
// lower 转小写
{$lower(controller.class_name)} // testcrud

// snake 驼峰转下划线
{$snake(controller.class_name)} // test_crud

// lcfirst 首字母小写
{$lcfirst(controller.class_name)} // testCrud

// count 参数长度
{$count(tables)} // 1
{$count(tables[0].datas)} // 1

```

#### if判断

用于根据参数判断输出不同的模板内容

```php
// 字符串判断
{if 'a'=='a'}
    //...
{/if}

// 数字判断
{if 1!=1}
    //...
{/if}
{if 1>=1}
    //...
{/if}

// 如果app[1].key存在则输出if中的内容
{if '{$app[1].key}'}
    // ...
{/if}

// 当所选分组为admin时输出if中的内容
{if '{$form.group}'=='admin'}
    // ...
{/if}

```

#### foreach

用于对数组循环输出

注意：这里的变量不需要`{$...}`包裹，变量值需为数组

```php
{foreach $tables[0].datas as $k=>$item}
    //...
{/foreach}
```


## 3、执行中间件

你可以配置生成器执行时，触发中间件的`before`、`after`方法来实现一些自定义的逻辑。

### 中间件文件

在项目中创建中间件文件，如下：

```php
<?php
namespace app\common\middleware;

class CreateCrudMiddleware
{
    // 生成文件及数据表前执行
    public function before ($tplParams){

       // 如果在此方法内改变了 tplParams参数，将其返回，就可以在模板中使用了
       return $tplParams;
    }

    //生成文件及数据表后执行
    public function after($tplParams){

    }
}
```

### 中间件引用

只需要在生成器配置中加入`middleware` 配置即可

```php
// config/apidoc.php

'generator' =>[
    [
        'title'=>'创建Crud',
        'enable'=>true,
        'middleware'=>[
            \app\common\middleware\CreateCrudMiddleware::class
        ],
        //...
    ]
    //...
];
```


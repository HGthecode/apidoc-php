# Markdown 文档

## 1、创建md文件

根目录下创建`docs`（你也可以是别的）目录，并创建md文档文件，如下

```sh
app
config
docs
 |—— Use.md
 |—— admin
    |—— HttpStatus.md
    |—— HttpCode.md
 |—— demo
    |—— HttpStatus.md
    |—— HttpCode_v1.md 
    |—— HttpCode_v2.md
 ...
```

## 2、配置文档菜单

> 可使用 `${app[N].folder}` 做多版本区分，变量参数用法见[配置说明](/config/#应用-版本变量说明)
```php
// apidoc.php
<?php
return [
    // markdown 文档
    'docs' => [
        ['title'=>'介绍','path'=>'docs/readme'],
        ['title'=>'md语法示例','path'=>'docs/Use'],
        ['title'=>'md Test','path'=>'docs/test'],
        [
            'title'=>'HTTP响应编码',
            'children'=>[
                ['title'=>'status错误码说明','path'=>'docs/HttpStatus'],
                ['title'=>'code错误码说明','path'=>'docs/HttpCode_${app[0].folder}_${app[1].folder}'],
            ],
        ]
    ],
]
```


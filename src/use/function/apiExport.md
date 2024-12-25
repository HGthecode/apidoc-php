# 接口导出

通过 apidoc-export 插件，可将分享接口导出为 swagger.json 格式。

::: tip
非 Apidoc 内置功能，需要安装 apidoc-export 插件。
:::

## 安装 apidoc-export 插件

```bash
composer require hg/apidoc-export:^5.3.0-rc.1
```

Laravel 框架需要执行以下命令生成配置文件

```bash
php artisan vendor:publish --provider="hg\apidoc\export\providers\LaravelService"
```

Hyperf 框架需要执行以下命令生成配置文件

```bash
php bin/hyperf.php vendor:publish hg/apidoc-export
```

## 配置

> 配置文件位于`config/apidoc-export.php`，webman 框架位于`config/plugin/hg/apidoc-export/app.php`

```php
<?php
return [
    // 是否开启插件
    'enable' => true,
    // （选配）控制器tag Name生成规则，生成swagger.json中tags的name字段，通过app、group组合来避免多应用/多分组下同名控制器分组错误问题
    // 包含app则tag中会包含app的key，包含group则tag中会包含group名称。如配置为['app','group']，生成tag为：demo.user.Index
    'controller_tags_rule'=>['app','group'],
    // swagger.json配置，需符合openapi 3的规范
    'swagger_options'=>[
        "host"=> "",
        "basePath"=> "",
        "schemes"=> ["http"],
        // 安全认证配置
        // "components"=>[
        //     "securitySchemes"=>[
        //         "api_key"=> [
        //             "type"=> "apiKey",
        //             "name"=> "Authorization",
        //             "in"=> "header"
        //         ]
        //     ]
        // ],
        // "security"=>[
        //     [
        //         'api_key'=>[],
        //     ]
        // ]
    ]
];
```

## 使用

1、开启 Apidoc 分享功能，参考[Apidoc 分享功能使用](/use/function/apiShare)

2、在 Apidoc 页面右上角工具栏中，点击`接口分享`按钮，创建分享。

3、在分享窗口，点击`导出Swagger.json`按钮，即可导出 swagger.json 文件。

![export-swagger](/images/export-swagger.png)

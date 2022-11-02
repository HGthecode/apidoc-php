# 没有apidoc.php配置文件


## TP5.1

TP5.1框架，安装Apidoc时可能无法自动生成配置文件，需手动添加配置文件

手动将 `/vendor/hg/apidoc/src/config.php` 拷贝到`/config/`目录下，并重命名为`apidoc.php`


## TP6

使用`composer2`且`topthink/framework`版本小于 V6.0.6，安装Apidoc时可能会出现无法自动生成配置文件，需手动添加配置文件

手动将 `/vendor/hg/apidoc/src/config.php` 拷贝到`/config/`目录下，并重命名为`apidoc.php`

## Laravel

项目根目录下执行：
```
php artisan vendor:publish --provider="hg\apidoc\providers\LaravelService"
```

## Hyperf

项目根目录下执行：
```
php bin/hyperf.php vendor:publish hg\apidoc\providers\HyperfService
```


## 其它框架

手动将 `/vendor/hg/apidoc/src/config.php` 拷贝到框架规范的配置目录下，并根据框架规范修改配置文件命名/结构，如下以Webman为例：

在 `config/plugin`目录下创建 `hg/apidoc/`目录，并在该目录下创建`app.php`文件，创建后目录结构如下：
```
|- config
   |- plugin
     |-hg
       |-apidoc
         |- app.php
         |- route.php
```

```php
// app.php
<?php
return [
    'enable'  => true,
    'apidoc' => [
        // 文档标题
        'title'              => 'API接口文档',
        // 设置可选版本
        'apps'           => [
            //...
        ],
        //...
    ]
];
```




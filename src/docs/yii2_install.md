# Yii2 安装

> 在安装本插件时，确保你已成功安装 Yii2 的项目的 advanced 模板，并成功运行
安装方法参考：[Yii2 文档](https://learnku.com/docs/yii-framework/2.0.x/advanced-install/11993)

## 1、安装插件

进入项目根目录，执行如下命令：

```shell
composer require hg/apidoc
```

## 2、配置文件

1、手动添加apidoc.php配置文件

手动将 `/vendor/hg/apidoc/src/config.php` 拷贝到`{app}/config/`目录下，并重命名为`apidoc.php`


2、Yii 2.x 版本需手动配置，让 Apidoc 在应用初始化时注册相关服务，如下：

```php
// {app}/config/main.php 中
return [
    // 增加 apidoc
    'bootstrap' => ['log', 'apidoc'],
    // 组件中
    'components' => [
        'apidoc' => [
            'class' => '\hg\apidoc\providers\Yii2Service',
            'cfgPath' => __DIR__ . '/apidoc.php'
        ],
        // 如果要支持国际化
        'i18n' => [
            'translations' => [
                '*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    // {app}/messages/en-US/apidoc.php 英文
                    // {app}/messages/zh-CN/apidoc.php 中文
                    'basePath' => '@app/messages',
                    'sourceLanguage' => 'en-US',
                    'fileMap' => [
                        'apidoc' => 'apidoc.php'
                    ],
                ],
            ],
        ],
    ],
    // 如果要支持国际化
    'sourceLanguage' => 'en-US',//源语言
    'language' => 'zh-CN',//目标语言
];

// {app}/messages/en-US/apidoc.php 中
<?php

return [
    'apps.test' => 'Test',
];
```

> 根据项目结构调整 apps 配置
```php
// {app}/config/apidoc.php
'apps'           => [
    [
        'title'=>'Api接口',
        // （注意）核对配置文件中此目录是否正确
        'path'=>'modules\v1\controllers',
        'key'=>'api',
    ]
],
```

## 3、添加前端页面

<button>[从Gitee下载](https://gitee.com/hg-code/apidoc-php/releases/download/v5.2.3/apidoc-ui.zip)</button>
<button>[从Github下载](https://github.com/HGthecode/apidoc-php/releases/download/v5.2.3/apidoc-ui.zip)</button>

下载完成后解压，将apidoc文件夹拷贝到你的项目 web 目录下

打开浏览器访问 [http://你的域名/apidoc/](http://你的域名/apidoc/) ，出现接口文档页面，表示安装成功。
---
category: 安装
sidebarDepth: 2
---

<script setup lang="ts">
import DownloadFe from "@DownloadFe";
</script>

# ThinkPHP安装

::: tip 在安装本插件时，确保你已成功安装ThinkPHP的项目并成功运行
安装方法参考：[ThinkPHP5.1文档](https://www.kancloud.cn/manual/thinkphp5_1/353948)
[ThinkPHP6文档](https://www.kancloud.cn/manual/thinkphp6_0/1037481)
:::



## 1、安装插件
进入项目根目录，执行如下命令：
```sh
composer require hg/apidoc
```


## 2、添加前端页面

<ClientOnly>
<DownloadFe ></DownloadFe>
</ClientOnly>


下载完成后解压，将apidoc文件夹拷贝到你的项目 public 目录下

打开浏览器访问   http://你的域名/apidoc/ ，出现接口文档页面，表示安装成功。



## TP5.1配置

1、TP5.1版本需手动配置，让Apidoc在应用初始化时注册相关服务，如下：

```php
// application/tags.php

// 应用行为扩展定义文件
return [
    // 应用初始化
    'app_init'     => [
        // 添加这一句
        'hg\\apidoc\\providers\\ThinkPHP5Service',
    ],
    //...
];
```

2、手动添加apidoc.php配置文件

手动将 `/vendor/hg/apidoc/src/config.php` 拷贝到`/config/`目录下，并重命名为`apidoc.php`


## 配置异常响应

由于框架会对全局异常进行处理，如apidoc的异常未被正确响应，会导致页面打不开或报错，配置以下异常处理来解决问题。

```php
// 找到你的项目所配置的异常处理类，tp6默认为
// app/ExceptionHandle.php
public function render($request, Throwable $e): Response
{
    // 添加自定义异常处理机制
    if ($e instanceof \hg\apidoc\exception\HttpException) {
        return json(
            [
                "code" => $e->getCode(),
                "message" => $e->getMessage(),
            ],
            $e->getStatusCode()
        );
    }
}
```


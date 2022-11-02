---
category: 安装
sidebarDepth: 2
---

<script setup lang="ts">
import DownloadFe from "@DownloadFe";
</script>

# Hyperf安装

::: tip 在安装本插件时，确保你已成功安装Hyperf的项目并成功运行
安装方法参考：[Hyperf2.x安装文档](https://hyperf.wiki/2.2/#/zh-cn/quick-start/install)
:::



## 1、安装插件
进入项目根目录，执行如下命令：
```sh
composer require hg/apidoc
```

## 2、生成配置文件
项目根目录下执行：
```
php bin/hyperf.php vendor:publish hg/apidoc
```
> 命令执行后在将在`config/autoload`目录下生成`apidoc.php`配置文件


## 3、手动注册路由

将以下代码复制到`config/routes.php`


```php
use hg\apidoc\providers\CommonService;
/**
 * Apidoc Routes
 */
CommonService::registerApidocRoutes(function ($item){
    Router::addRoute($item['method'],$item['uri'],$item['callback'],['middleware' => [hg\apidoc\providers\HyperfService::class]]);
});
```

## 4、添加前端页面

<ClientOnly>
<DownloadFe ></DownloadFe>
</ClientOnly>


下载完成后解压，将apidoc文件夹拷贝到你的项目 public 目录下

打开浏览器访问   http://你的域名/apidoc/ ，出现接口文档页面，表示安装成功。




---
category: 安装
sidebarDepth: 2
---

<script setup lang="ts">
import DownloadFe from "@DownloadFe";
</script>

# Laravel安装

::: tip 在安装本插件时，确保你已成功安装Laravel的项目并成功运行
安装方法参考：[laravel8.x安装文档](https://laravel.com/docs/8.x/installation)
:::



## 1、安装插件
进入项目根目录，执行如下命令：
```
composer require hg/apidoc
```

## 2、生成配置文件
项目根目录下执行：
```
php artisan vendor:publish --provider="hg\apidoc\providers\LaravelService"
```
命令执行后在将在`config`目录下生成`apidoc.php`配置文件

## 3、添加前端页面

<ClientOnly>
<DownloadFe ></DownloadFe>
</ClientOnly>


下载完成后解压，将apidoc文件夹拷贝到你的项目 public 目录下

打开浏览器访问   http://你的域名/apidoc/ ，出现接口文档页面，表示安装成功。


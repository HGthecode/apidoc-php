---
category: 安装
sidebarDepth: 2
---

<script setup lang="ts">
import DownloadFe from "@DownloadFe";
</script>


# Webman安装

::: tip 在安装本插件时，确保你已成功安装Webman的项目并成功运行
安装方法参考：[Webman安装文档](https://www.workerman.net/doc/webman/install.html)
:::



## 1、安装插件
进入项目根目录，执行如下命令：
```
composer require hg/apidoc
```

::: warning 根据项目结构调整apps配置

```php
// /config/plugin/hg/apidoc/app.php
'apps'           => [
    [
        'title'=>'Api接口',
        // （注意）核对配置文件中此目录是否正确
        'path'=>'app\controller',
        'key'=>'api',
    ]
],
```
:::

## 2、添加前端页面

<ClientOnly>
<DownloadFe ></DownloadFe>
</ClientOnly>


下载完成后解压，将apidoc文件夹拷贝到你的项目 public 目录下

打开浏览器访问   http://你的域名/apidoc/index.html ，出现接口文档页面，表示安装成功。


## 配置异常响应

由于框架会对全局异常进行处理，如apidoc的异常未被正确响应，会导致页面打不开或报错，配置以下异常处理来解决问题。

> 参考[Webman官方文档](https://www.workerman.net/doc/webman/exception.html)找到你项目的异常处理类，或创建异常处理类

```php
// 找到你的项目所配置的异常处理类，本示例为
// support/ExceptionHandle.php
public function render(Request $request, Throwable $exception): Response
{
    // Apidoc异常处理响应
    if ($exception instanceof \hg\apidoc\exception\HttpException) {
        return response(json_encode([
            "code" => $exception->getCode(),
            "message" => $exception->getMessage(),
        ],JSON_UNESCAPED_UNICODE), $exception->getStatusCode());
    }
    
    return parent::render($request, $exception);
}
```
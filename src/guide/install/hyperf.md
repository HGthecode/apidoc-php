---
category: 安装
headerDepth: 2
---

<script setup lang="ts">
import DownloadFe from "@DownloadFe";
</script>

# Hyperf 安装

::: tip 在安装本插件时，确保你已成功安装 Hyperf 的项目并成功运行
安装方法参考：[Hyperf2.x 安装文档](https://hyperf.wiki/2.2/#/zh-cn/quick-start/install)
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

::: warning 根据项目结构调整 apps 配置

```php
// /config/autoload/apidoc.php
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

## 3、注册 Apidoc 路由

将以下代码复制到`config/routes.php`

```php
hg\apidoc\providers\HyperfService::register();
```

## 4、添加前端页面

<ClientOnly>
<DownloadFe ></DownloadFe>
</ClientOnly>

下载完成后解压，将 apidoc 文件夹拷贝到你的项目 public 目录下

打开浏览器访问 http://你的域名/apidoc/index.html ，出现接口文档页面，表示安装成功。

::: tip

如果以上地址 访问不了（Not Found），可尝试 [配置静态资源](https://hyperf.wiki/3.0/#/zh-cn/filesystem),

:::

## 配置异常响应

由于框架会对全局异常进行处理，如 apidoc 的异常未被正确响应，会导致页面打不开或报错，配置以下异常处理来解决问题。

```php
// 找到你的项目所配置的异常处理类，本示例为
// App\Exception\Handler\AppExceptionHandler.php

public function handle(Throwable $throwable, ResponseInterface $response)
{
    // Apidoc 异常处理
    if ($throwable instanceof \hg\apidoc\exception\HttpException) {
        // 格式化输出
        $data = json_encode([
            'code' => $throwable->getCode(),
            'message' => $throwable->getMessage(),
        ], JSON_UNESCAPED_UNICODE);

        // 阻止异常冒泡
        $this->stopPropagation();
        return $response->withStatus($throwable->getStatusCode())->withBody(new SwooleStream($data));
    }

    //....
}

```

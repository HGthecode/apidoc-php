# Hyperf安装Apidoc教程

## 安装Hyperf项目：

>本教程使用centos7虚拟机，虚拟机已安装好相关环境

使用命令行执行下面的命令

```
composer create-project hyperf/hyperf-skeleton
```
![hyperf-install-1](/images/hyperf-install-1.png)

安装完成后目录如下：

![hyperf-install-4](/images/hyperf-install-4.png)

cd进入目录下执行启动命令：
```
cd hyperf-skeleton
php bin/hyperf.php start
```

![hyperf-install-2](/images/hyperf-install-2.png)


浏览器访问`ip地址或域名:9501或自定义的端口号`，出现如下页面表示部署成功

![hyperf-install-3](/images/hyperf-install-3.png)


## 安装Apidoc

### 1、根目录下执行安装命令

```
composer require hg/apidoc
```
<!-- ![hyperf-install-5](/images/hyperf-install-5.png) -->

### 2、生成配置文件

根目录下执行安装命令

```
php bin/hyperf.php vendor:publish hg/apidoc
```

![hyperf-install-5](/images/hyperf-install-5.png)

### 3、注册Apidoc所需路由

在config/routes.php添加以下代码


```php
use hg\apidoc\providers\CommonService;
/**
 * Apidoc Routes
 */
CommonService::registerApidocRoutes(function ($item){
    Router::addRoute($item['method'],$item['uri'],$item['callback'],['middleware' => [hg\apidoc\providers\HyperfService::class]]);
});
```

![hyperf-install-7](/images/hyperf-install-7.png)


### 2、下载前端文件

点击前端文件下载链接，下载完成后解压；并将其解压到 `public`目录下

![hyperf-install-6](/images/hyperf-install-6.png)


### 3、配置Hyperf静态资源访问

在 config/autoload/server.php 配置中增加以下配置

```php
return [
    'settings' => [
        ...
        // 静态资源
        'document_root' => BASE_PATH . '/public',
        'enable_static_handler' => true,
    ],
];
```

## 注解体验

### 1、写入测试注解

![hyperf-install-8](/images/hyperf-install-8.png)

### 2、查看效果

执行 `php bin/hyperf.php start` 重启服务后，访问 `ip地址或域名:9501或自定义的端口号/apidoc/index.html`


![hyperf-install-9](/images/hyperf-install-9.png)

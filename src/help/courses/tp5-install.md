# ThinkPHP5.1安装Apidoc教程

## 安装Tp5.1项目：

使用命令行执行下面的命令

```
composer create-project topthink/think=5.1.* tp5
```
![tp5-install-1](/images/tp5-install-1.png)

安装完成后目录如下：

![tp5-install-2](/images/tp5-install-2.png)

## 部署网站

> 本教程使用本机的 phpStudy 来部署网站

### 1、创建一个网站

![tp5-install-4](/images/tp5-install-4.png)

### 2、配置伪静态

```
location / {
    if (!-e $request_filename){
        rewrite ^(.*)$ /index.php?s=$1 last; 
        break;
    }
}
```

![tp5-install-5](/images/tp5-install-5.png)


### 3、部署完成

浏览器访问上面配置的域名，出现如下页面表示tp5部署成功

![tp5-install-6](/images/tp5-install-6.png)


## 安装Apidoc

参考[ThinkPHP安装文档](/guide/install/thinkphp)

### 1、根目录下执行安装命令

```
composer require hg/apidoc
```
![tp5-install-7](/images/tp5-install-7.png)


### 2、配置tags注册服务

配置如下代码，在应用初始化时注册Apidoc相关服务
```
// 应用初始化
'app_init'     => [
    'hg\\apidoc\\providers\\ThinkPHP5Service',
],
```

![tp5-install-8](/images/tp5-install-8.png)

### 3、手动复制配置文件

手动将 /vendor/hg/apidoc/src/config.php 拷贝到/config/目录下，并重命名为apidoc.php

![tp5-install-9](/images/tp5-install-9.png)

### 4、下载前端文件

点击前端文件下载链接，下载完成后解压；并将其解压到 `public`目录下

![tp5-install-14](/images/tp5-install-14.png)


## 注解体验

### 1、修改apps配置

![tp5-install-10](/images/tp5-install-10.png)

### 2、写入测试注解

![tp5-install-11](/images/tp5-install-11.png)

### 3、查看效果

![tp5-install-12](/images/tp5-install-12.png)

![tp5-install-13](/images/tp5-install-13.png)
# Webman安装Apidoc教程

## 安装Webman项目：

使用命令行执行下面的命令

```
composer create-project workerman/webman
```
![webman-install-1](/images/webman-install-1.png)

安装完成后目录如下：

![webman-install-2](/images/webman-install-2.png)

## 部署网站

> 本教程由于在windows下启动，直接双击`windows.bat`启动

![webman-install-11](/images/webman-install-11.png)

用浏览器访问`http://localhost:8787/`，出现以下效果表示启动成功

![webman-install-3](/images/webman-install-3.png)


## 安装Apidoc

参考[Webman/其它框架安装文档](/guide/install/other)

### 1、根目录下执行安装命令

```
composer require hg/apidoc
```
![webman-install-4](/images/webman-install-4.png)

### 2、创建配置文件

在 `config/plugin`目录下创建 `hg/apidoc/`目录，并在该目录下创建`app.php` `route.php`文件

![webman-install-5](/images/webman-install-5.png)

![webman-install-6](/images/webman-install-6.png)

### 3、创建及注册中间件

下图的中间件代码可查看：[ApidocServiceProvider.php](/guide/install/other.html#_3、创建中间件)

![webman-install-7](/images/webman-install-7.png)

![webman-install-8](/images/webman-install-8.png)



### 2、下载前端文件

点击前端文件下载链接，下载完成后解压；并将其解压到 `public`目录下

![webman-install-9](/images/webman-install-9.png)


## 注解体验

### 1、写入测试注解

![webman-install-10](/images/webman-install-10.png)

### 2、查看效果

![webman-install-12](/images/webman-install-12.png)

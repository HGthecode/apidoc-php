# Laravel安装Apidoc教程

## 安装Laravel项目：

使用命令行执行下面的命令

```
composer create-project laravel/laravel laravel8
```
![lv8-install-1](/images/lv8-install-1.png)

安装完成后目录如下：

![lv8-install-2](/images/lv8-install-2.png)

## 部署网站

> 本教程使用本机的 phpStudy 来部署网站

### 1、创建一个网站

![lv8-install-5](/images/lv8-install-5.png)

### 2、配置伪静态

```
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

![lv8-install-9](/images/lv8-install-9.png)


### 3、部署完成

浏览器访问上面配置的域名，出现如下页面表示部署成功

![lv8-install-10](/images/lv8-install-10.png)


## 安装Apidoc

参考[Laravel安装文档](/guide/install/laravel)

### 1、根目录下执行安装命令

```
composer require hg/apidoc
```
![lv8-install-3](/images/lv8-install-3.png)

### 2、生成配置文件

根目录下执行安装命令

```
php artisan vendor:publish --provider="hg\apidoc\providers\LaravelService"
```

![lv8-install-4](/images/lv8-install-4.png)

### 2、下载前端文件

点击前端文件下载链接，下载完成后解压；并将其解压到 `public`目录下

![lv8-install-11](/images/lv8-install-11.png)


## 注解体验

### 1、修改apps配置

![lv8-install-6](/images/lv8-install-6.png)

### 2、写入测试注解

![lv8-install-12](/images/lv8-install-12.png)

### 3、查看效果

![lv8-install-8](/images/lv8-install-8.png)

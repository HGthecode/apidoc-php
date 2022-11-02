# ThinkPHP6安装Apidoc教程

## 安装Tp6项目：

使用命令行执行下面的命令

```
composer create-project topthink/think tp6
```
![tp6-install-1](/images/tp6-install-1.png)

安装完成后目录如下：

![tp6-install-2](/images/tp6-install-2.png)

## 部署网站

> 本教程使用本机的 phpStudy 来部署网站

### 1、创建一个网站

![tp6-install-4](/images/tp6-install-4.png)

### 2、配置伪静态

```
location / {
    if (!-e $request_filename){
        rewrite ^(.*)$ /index.php?s=$1 last; 
        break;
    }
}
```

![tp6-install-5](/images/tp6-install-5.png)


### 3、部署完成

浏览器访问上面配置的域名，出现如下页面表示tp6部署成功

![tp6-install-6](/images/tp6-install-6.png)


## 安装Apidoc

参考[ThinkPHP安装文档](/guide/install/thinkphp)


### 1、根目录下执行安装命令

```
composer require hg/apidoc
```
![tp6-install-3](/images/tp6-install-3.png)


### 2、下载前端文件

点击前端文件下载链接，下载完成后解压；并将其解压到 `public`目录下

![tp6-install-8](/images/tp6-install-8.png)


## 注解体验

### 1、写入测试注解

![tp6-install-9](/images/tp6-install-9.png)

### 2、查看效果

![tp6-install-7](/images/tp6-install-7.png)

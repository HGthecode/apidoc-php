---
category: 安装
sidebarDepth: 2
---

<script setup lang="ts">
import DownloadFe from "@DownloadFe";
</script>


# Webman/其它框架安装

::: tip 其它框架兼容
理论上Apidoc可通过手动配置来兼容任何基于composer的框架，此处以Webman框架为例来手动适配兼容
:::



## 1、安装插件
进入项目根目录，执行如下命令：
```
composer require hg/apidoc
```

## 2、创建配置文件
根据框架规范在指定目录创建配置文件，以webman为例。

在 `config/plugin`目录下创建 `hg/apidoc/`目录，并在该目录下创建`app.php` `route.php`文件，创建后目录结构如下：
```
|- config
   |- plugin
     |-hg
       |-apidoc
         |- app.php
         |- route.php
```

:::: details app.php代码
```php
<?php
return [
    'enable'  => true,
    'apidoc' => [
        // 文档标题
        'title'              => 'API接口文档',
        // 设置可选版本
        'apps'           => [
            //...
        ],
        //...
    ]
];
```
::::

:::: details route.php代码
```php
<?php
use Webman\Route;
use hg\apidoc\providers\CommonService;
// 注册Apidoc所需路由
CommonService::registerApidocRoutes(function ($item){
    Route::any($item['uri'],[hg\apidoc\Controller::class,$item['route']]);
});
```
::::


## 3、创建中间件

### （1）创建ApidocService中间件
根据框架规范在指定目录创建中间件文件，以Webman为例在`app/middleware/`目录创建`ApidocServiceProvider.php`文件

:::: details ApidocServiceProvider.php代码
```php
<?php
namespace app\middleware;

use Webman\MiddlewareInterface;
use Webman\Http\Response;
use Webman\Http\Request;
use hg\apidoc\providers\CommonService;
use hg\apidoc\utils\ConfigProvider;
use support\Db;

class ApidocServiceProvider implements MiddlewareInterface
{
    use CommonService;

    public function process(Request $request, callable $next): Response
    {
        $this->register();
        if ($request->method() == "GET"){
            $params = $request->get();
        }else{
            $params = $request->post();
        }
        $config =  ConfigProvider::get();
        $config['request_params'] = $params;
        ConfigProvider::set($config);
        $response = $next($request);
        return $response;
    }

    /**
     * 获取apidoc配置，根据框架返回配置文件的内容
     */
    static function getApidocConfig()
    {
        return config('plugin.hg.apidoc.app.apidoc');
    }

    /**
     * 注册Apidoc所需路由
     */
    static function registerRoute($route)
    {
        // 由于已在配置文件config/plugin/hg/apidoc/route.php中注册了Apidoc路由，此处无需再实现
    }

    /**
     * 数据库查询方法
     */
    static function databaseQuery($sql)
    {
        return Db::select($sql);
    }

    /**
     * 项目跟目录地址
     */
    static function getRootPath()
    {
        return BASE_PATH."/";
    }

    /**
     * 缓存目录地址
     */
    static function getRuntimePath()
    {
        return BASE_PATH."/runtime/";
    }

    /**
     * 语言包注册
     */
    static function setLang($locale)
    {
//        $this->langLocale = $locale;
    }

    /**
     * 获取语言方法
     */
    static function getLang($lang): string
    {
        return $lang;
    }

    /**
     * 处理请求响应返回的数据
     */
    static function handleResponseJson($res)
    {
        return json($res);
    }

    /**
     * 数据表前缀
     */
    static function getTablePrefix(){
        return "";
    }

}
```
::::

### （2）注册中间件
以Webman为例，`config/middleware.php`注册全局中间件
```php
<?php
return [
    '' => [
        // 加上这句
        \app\middleware\ApidocServiceProvider::class
    ]
];
```

## 4、添加前端页面

<ClientOnly>
<DownloadFe ></DownloadFe>
</ClientOnly>


下载完成后解压，将apidoc文件夹拷贝到你的项目 public 目录下

打开浏览器访问   http://你的域名/apidoc/ ，出现接口文档页面，表示安装成功。

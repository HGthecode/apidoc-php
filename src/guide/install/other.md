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
        // （选配）文档标题，显示在左上角与首页
        'title'              => 'Apidoc',
        // （选配）文档描述，显示在首页
        'desc'               => '',
        // （必须）设置文档的应用/版本
        'apps'           => [
            [
                // （必须）标题
                'title'=>'Api接口',
                // （必须）控制器目录地址
                'path'=>'app\controller',
                // （必须）唯一的key
                'key'=>'api',
            ]
        ],
        // （必须）指定通用注释定义的文件地址
        'definitions'        => "app\common\controller\Definitions",
        // （必须）自动生成url规则，当接口不添加@Apidoc\Url ("xxx")注解时，使用以下规则自动生成
        'auto_url' => [
            // 字母规则，lcfirst=首字母小写；ucfirst=首字母大写；
            'letter_rule' => "lcfirst",
            // url前缀
            'prefix'=>"",
        ],
        // （必须）缓存配置
        'cache'              => [
            // 是否开启缓存
            'enable' => false,
        ],
        // （必须）权限认证配置
        'auth'               => [
            // 是否启用密码验证
            'enable'     => false,
            // 全局访问密码
            'password'   => "123456",
            // 密码加密盐
            'secret_key' => "apidoc#hg_code",
            // 授权访问后的有效期
            'expire' => 24*60*60
        ],
        // 全局参数
        'params'=>[
            // （选配）全局的请求Header
            'header'=>[
                // name=字段名，type=字段类型，require=是否必须，default=默认值，desc=字段描述
                ['name'=>'Authorization','type'=>'string','require'=>true,'desc'=>'身份令牌Token'],
            ],
            // （选配）全局的请求Query
            'query'=>[
                // 同上 header
            ],
            // （选配）全局的请求Body
            'body'=>[
                // 同上 header
            ],
        ],
        // 全局响应体
        'responses'=>[
            // 成功响应体
            'success'=>[
                ['name'=>'code','desc'=>'业务代码','type'=>'int','require'=>1],
                ['name'=>'message','desc'=>'业务信息','type'=>'string','require'=>1],
                //参数同上 headers；main=true来指定接口Returned参数挂载节点
                ['name'=>'data','desc'=>'业务数据','main'=>true,'type'=>'object','require'=>1],
            ],
            // 异常响应体
            'error'=>[
                ['name'=>'code','desc'=>'业务代码','type'=>'int','require'=>1,'md'=>'/docs/HttpError.md'],
                ['name'=>'message','desc'=>'业务信息','type'=>'string','require'=>1],
            ]
        ],
        //（选配）默认作者
        'default_author'=>'',
        //（选配）默认请求类型
        'default_method'=>'GET',
        //（选配）允许跨域访问
        'allowCrossDomain'=>false,
        /**
         * （选配）解析时忽略带@注解的关键词，当注解中存在带@字符并且非Apidoc注解，如 @key test，此时Apidoc页面报类似以下错误时:
         * [Semantical Error] The annotation "@key" in method xxx() was never imported. Did you maybe forget to add a "use" statement for this annotation?
         */
        'ignored_annitation'=>[],

        // （选配）数据库配置
        'database'=>[],
        // （选配）Markdown文档
        'docs'              => [],
        // （选配）接口生成器配置 注意：是一个二维数组
        'generator' =>[]
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

打开浏览器访问   http://你的域名/apidoc/index.html ，出现接口文档页面，表示安装成功。

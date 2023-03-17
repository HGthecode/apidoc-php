

# 自动注册路由

> 支持版本 >= v4.2.0

自动根据接口文档url注册路由，本功能默认关闭，如下方式配置开启即可。

配置文件`apidoc.php`中的 `auto_register_routes` 设置为 `true`

```php
// apidoc.php

// 是否自动注册路由
'auto_register_routes'=>true,

```

## 路由中间件

可通过如下注解定义路由中间件

::: code-tabs#apiRoute
@tab:active PHP8原生注解
```php

use hg\apidoc\annotation as Apidoc;
use app\common\middleware\TestMiddleware1;
use app\common\middleware\TestMiddleware2;

//控制器添加路由中间件，则该控制器所有接口都执行该中间件，参考路由分组中间件
#[Apidoc\RouteMiddleware([TestMiddleware1::class])]
class AutoController extends BaseController
{

    //接口添加路由中间件
    #[Apidoc\RouteMiddleware([TestMiddleware2::class])]
    public function autoRoute(Request $request){
        // 业务代码...
    }
}
```

@tab 原始注解

```php
use hg\apidoc\annotation as Apidoc;
use app\common\middleware\TestMiddleware1;
use app\common\middleware\TestMiddleware2;
/**
 * 控制器添加路由中间件，则该控制器所有接口都执行该中间件，参考路由分组中间件
 * @Apidoc\RouteMiddleware({TestMiddleware1::class})
 */
class AutoController extends BaseController
{

    /**
     * 接口添加路由中间件
     * @Apidoc\RouteMiddleware({TestMiddleware2::class})
     */
    public function autoRoute(Request $request){
        // 业务代码...
    }
}
```
:::

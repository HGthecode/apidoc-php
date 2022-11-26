# 自动生成的url不对？

默认的自动生成接口url规则是将控制器目录地址+方法名，并根据配置过滤及处理指定的key来实现的，如默认的生成规则无法满足您项目的需求，可通过配置自定义处理函数来自行实现。

如下举例一些常见的处理方法：

## 1、ThinkPHP开启控制器后缀

当ThinkPHP如下配置开启了控制器后缀的配置，导致自动生成的url比真实的url多出了Controller

```php
// config/route.php

// 是否使用控制器后缀
'controller_suffix'     => true,
```

解决方法：

```php
// config/apidoc.php
//...
'auto_url' => [
        // ...
        // 处理url中每个key
       'handle_key'=>function($key){
           return str_ireplace('Controller', "", $key);
       }
]
```

## 2、ThinkPHP多级路由的分割符

有的同学使用多级路由时，分割符为`.`并不是`/`分割的，可通过自定义生成规则实现

解决方法：

```php
// config/apidoc.php
//...
'auto_url' => [
        // ...
        // 自定义url生成方法
        'custom' =>function($path,$method,$url){
            $urlArr    = explode("/", $url);
            $classPathArr = [];
            for ($i = 2; $i < count($urlArr)-1; $i++) {
                $classPathArr[]=$urlArr[$i];
            }
            $classPath = implode('.', $classPathArr);
            return "/".$urlArr[1]."/".$classPath."/".$method;
        },
]
```





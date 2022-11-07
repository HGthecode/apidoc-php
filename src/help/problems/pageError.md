# 页面报错

## 注解错误

访问apidoc页面时，如出现如下错误信息；通常有具体的描述，根据描述信息排查即可

![error-501](/images/error-501.png)


## 访问授权错误

当开启访问授权配置时，因框架的全局异常处理，没有将401状态码正常返回时出现

ThinkPHP在未对全局异常处理进行修改的，出现以下错误：

![error-auth-1](/images/error-auth-1.png)

可参考以下异常处理类来处理

```php
// tp6为例
public function render($request, Throwable $e): Response
{
    // 添加自定义异常处理机制
    if ($e instanceof \hg\apidoc\exception\HttpException) {
        return json(
            [
                "code" => $e->getCode(),
                "message" => $e->getMessage(),
            ],
            $e->getStatusCode()
        );
    }
}
```




## 缺少注解解释文件


项目所有被解析文件的注释中存在 @XXX 的，都需`use`引入注释解释文件，如出现以下错误

![error-500](/images/error-500.png)

可根据提示在相应的文件里，加上use解释文件

```php
<?php
namespace app\controller;

// 加上这句，解决Apidoc注解报错
use hg\apidoc\annotation as Apidoc;
// 通过use自定义解释文件，解决下面@abc的错误
// use app\utils\Abc;

/**
 * @Apidoc\Title("基础示例")
 */
class BaseDemo
{
    /**
     * @Apidoc\Title("引入通用注释")
     * @abc 错误示例，这样不存在解释文件的注释会报错；可增加use解释文件，或去除@、或通过配置忽略（推荐）
     */
    public function test(){
        //...
    }
}
```

自定义解释文件
```php
// app/utils/Abc.php 解释文件内容
<?php
namespace app\utils;
use Doctrine\Common\Annotations\Annotation;

/**
 * 自定义参数解释文件
 * @package hg\apidoc\annotation
 * @Annotation
 * @Target({"METHOD","CLASS"})
 */
class Abc extends Annotation
{}
```

配置忽略带@的注解报错：

```php
// apidoc.php
[
    'ignored_annitation'=>['abc','name']
]
```



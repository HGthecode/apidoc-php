

# 调试时的事件

接口调试时分别触发`before`请求发起前事件，与`after`请求响应后事件。

可通过接口的注解来定义执行的事件，如下：

```php
/**
 * @Apidoc\Title ("调试时事件")
 * @Apidoc\Url("/admin/demo/debug")
 * @Apidoc\Method("POST")
 * @Apidoc\Param("username",type="string",desc="用户名")
 * @Apidoc\Param("password",type="string",desc="密码")
 * @Apidoc\Before(event="setBody",key="password",handleValue="md5",value="body.password")
 * @Apidoc\After(event="setGlobalHeader",key="Authorization",value="res.data.token",desc="用户登录Toekn")
 */
public function debug(Request $request){
    //...
}
```

以上例子中，会执行以下事件：

1、请求发起前，将请求参数`password`进行md5。

2、请求响应后，设置一个全局请求头参数`Authorization`，参数值为响应结果中返回数据中的`data.token`。


## Before|After注解的参数

|参数名|说明|
|-|-|
| event |	事件名 |  
| key |	字段名 |  
| value |	字段值，可直接设置值，或以`query.xxx`、`body.xxx`取请求参数中的值；以`res.xxx`取请求响应结果中的参数 |  
| desc |	字段描述 |  
| url |	event为ajax时，定义请求地址 |  
| method |	event为ajax时，定义请求类型 |  
| contentType |	event为ajax时，定义contentType |  



## 事件说明


### setHeader

> `before`请求发起前有效

设置一个请求头参数

`@Apidoc\Before(event="setHeader",key="参数名",value="参数值")`


### setQuery

> `before`请求发起前有效

设置一个请求Query参数

`@Apidoc\Before(event="setQuery",key="参数名",value="参数值")`



### setBody

> `before`请求发起前有效

设置一个请求参数

`@Apidoc\Before(event="setBody",key="参数名",value="参数值")`


### clearHeader

清除一个请求头参数

`@Apidoc\Before(event="clearHeader",key="参数名")`

### clearQuery

清除一个请求Query参数

`@Apidoc\Before(event="clearQuery",key="参数名")`

### clearBody

清除一个请求Body参数

`@Apidoc\Before(event="clearBody",key="参数名")`




### setGlobalHeader

设置一个全局请求头参数

`@Apidoc\After(event="setGlobalHeader",key="参数名",value="参数值",desc="参数描述")`


### setGlobalQuery

设置一个全局请求Query参数

`@Apidoc\After(event="setGlobalQuery",key="参数名",value="参数值",desc="参数描述")`



### setGlobalBody

设置一个全局请求Body参数

`@Apidoc\After(event="setGlobalBody",key="参数名",value="参数值",desc="参数描述")`



### clearGlobalHeader

清除一个全局请求头参数

`@Apidoc\Before(event="clearGlobalHeader",key="参数名")`


### clearGlobalQuery

清除一个全局请求Query参数

`@Apidoc\Before(event="clearGlobalQuery",key="参数名")`



### clearGlobalBody

清除一个全局请求Body参数

`@Apidoc\Before(event="clearGlobalBody",key="参数名")`



### ajax

发送一个请求

```php
/**
 * @Apidoc\Before(event="ajax",url="请求地址",method="请求类型",contentType="appicateion-json",
 *    @Apidoc\Before(event="setBody",key="key",value="body.phone"),
 *    @Apidoc\Before(event="setBody",key="abc",value="123456"),
 *    @Apidoc\After(event="setHeader",key="X-CSRF-TOKEN",value="res.data.token")
 * )
 * /
```

以上注解，会在接口调试前发送一个请求，请求参数为`{key:"这个值为调试接口参数的phone字段",abc:"123456"}`，请求响应后执行`setHeader`设置一个key为`X-CSRF-TOKEN`的请求头参数，值为该请求返回值中的`res.data.token`





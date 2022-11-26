

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
 * @Apidoc\Before(event="md5",key="password",value="body.password")
 * @Apidoc\After(event="setGlobalHeader",key="Authorization",value="res.data.data.token",desc="用户登录Toekn")
 */
public function debug(Request $request){
    //...
}
```

以上例子中，会执行以下事件：

1、请求发起前，将请求参数`password`进行md5（自定义事件）。

2、请求响应后，设置一个全局请求头参数`Authorization`，参数值为响应结果中返回数据中的`data.token`。


## Before|After注解的参数

|参数名|说明|
|-|-|
| event | 事件方法名，以下内置事件、及config.js配置的DEBUG_EVENTS自定义的方法名 |  
| name | 事件名称，用于显示事件的名称 |  
| key |	字段名 |  
| value |	字段值，可直接设置值，或以`query.xxx`、`body.xxx`取请求参数中的值；以`res.xxx`取请求响应结果中的参数 |  
| desc |	字段值描述 |  
| url |	event为ajax时，定义请求地址 |  
| method |	event为ajax时，定义请求类型 |  
| contentType |	event为ajax时，定义contentType |  



## 内置事件


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
 *    @Apidoc\After(event="setHeader",key="X-CSRF-TOKEN",value="res.data.data.token")
 * )
 * /
```

以上注解，会在接口调试前发送一个请求，请求参数为`{key:"这个值为调试接口参数的phone字段",abc:"123456"}`，请求响应后执行`setHeader`设置一个key为`X-CSRF-TOKEN`的请求头参数，值为该请求返回值中的`res.data.data.token`



## 自定义事件

### 1、事件定义

:::: details 自定义方法参数说明
```js
window.apidocFeConfig = {
    // ...
    // （选配）自定义调试时事件
  DEBUG_EVENTS:{
    //...,
    myEvent(param){
        // 必须为返回Promise
        return new Promise((resolve, reject) => {
            let {
                event,  // 当前事件的注解参数{event:事件名称，key:注解key，value:注解value}
                config, // 请求配置，修改该对象中的值直接影响当前调试的请求
                value,  // 事件注解中存在value参数时，返回当前请求中指定的参数值
                result, // 请求后执行事件时返回当前请求的响应结果
                message // 事件执行结果的信息
            }=param;
            // 这里按自己的逻辑实现
            if(true){
                // 如果请求前修改请求参数
                param.config.params.abc = 1;
                // 如果请求后修改响应参数
                param.result.data.abc = 2;
                // 如果要在事件执行请求处显示内容
                param.message = "处理成功666"

                // 注意，处理成功必须调用resolve，参数为param
                resolve(param)
            }else{
                // 注意，处理失败时必须调用reject，参数为执行结果显示内容
                reject("处理失败000")
            }
        })
    }
  }
}
```
::::


在前端配置文件config.js配置中加入自定义事件，以下实现一个将当前请求拼成get的url

```js
window.apidocFeConfig = {
    // ...
    // （选配）自定义调试时事件
  DEBUG_EVENTS:{
    //...,
    renderGetUrl(param){
        // 必须为返回Promise
        return new Promise((resolve, reject) => {
            const {result}=param
            function urlEncode(param, key, encode) {
                if (param == null) return '';
                var paramStr = '';
                var t = typeof(param);
                if (t == 'string' || t == 'number' || t == 'boolean') {
                    paramStr += (paramStr?'&':'?') + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
                } else {
                    for (var i in param) {
                        var k = key == null ? i: key + (param instanceof Array ? '[' + i + ']': '.' + i);
                        paramStr += urlEncode(param[i], k, encode);
                    }
                }
                return paramStr;
            }
            let requestParams = result.config.data
            if (result.config.method=="get") {
                requestParams = result.config.params
            }
            const url = result.config.baseURL + result.config.url+urlEncode(requestParams)
            param.message = `<a href="${url}"  target="_blank"  style="color:red">${url}</a>`
            resolve(param)
        })
    }
  }
}
```

### 2、事件调用

1、接口注解调用

```php
/**
 * @Apidoc\Title ("测试自定义事件")
 * @Apidoc\Method("GET")
 * @Apidoc\Query("name",type="string",desc="姓名",mock="@cname")
 * @Apidoc\Query("phone",type="string",desc="电话",mock="@phone")
 * @Apidoc\After (event="renderGetUrl")
 */
public function testMyEvent(Request $request){
    //...
}
```

2、全局调用

```php
// config/apidoc.php
<?
return [
    // 全局事件
    'debug_events'=>[
        // 'before'=>[
            // ...
        // ],
        'after'=>[
            ['event'=>'renderGetUrl']
        ]
    ],
]
```

2、指定应用/版本调用

```php
// config/apidoc.php
<?
return [
    'apps'           => [
        [
            'title' => 'Api接口',
            'path' => 'app\controller',
            'key' => 'demo',
            // 加入此配置
            'debug_events'=>[
                'after'=>[
                    ['event'=>'renderGetUrl']
                ]
            ],
        ],
     ]
]
```

### 3、执行效果

![debug-event-1](/images/debug-event-1.png)



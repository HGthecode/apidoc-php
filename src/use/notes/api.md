# 接口注解

控制器中的每一个符合注释规则的方法都会被解析成一个API接口

## 基础注释

### 1、Header参数

通过`Header`注解来定义HTTP请求的Header参数

::: code-tabs#apiHeader

@tab:active PHP8原生注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

#[Apidoc\Title("基础示例")]
class ApiDocTest
{ 
    #[
        Apidoc\Title("请求头参数"),
        Apidoc\Method("GET"),
        Apidoc\Header(name:"token",type: "string",require: true,desc: "Token"),
        Apidoc\Query(name:"id",type: "int",require: true,desc: "信息id"),
        Apidoc\Returned("id",type: "int",desc: "信息id"),
    ]
    public function header(){
        //...
    }
}
```

@tab 原始注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 */
class ApiDocTest
{ 
    /**
     * @Apidoc\Title("请求Query参数")
     * @Apidoc\Method("GET")
     * @Apidoc\Header("token", type="string",require=true, desc="Token")
     * @Apidoc\Query("id", type="int",require=true, desc="信息id")
     * @Apidoc\Returned("id", type="int", desc="信息id")
     */
    public function query(){
        //...
    }
  
}
```
:::


### 2、Query参数

通过`Query`注解来定义HTTP请求的Query参数

::: code-tabs#apiQuery

@tab:active PHP8原生注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

#[Apidoc\Title("基础示例")]
class ApiDocTest
{ 
    #[
        Apidoc\Title("基础的演示"),
        Apidoc\Method("GET"),
        Apidoc\Query(name:"name",type: "string",require: true,desc: "姓名"),
        Apidoc\Query(name:"phone",type: "string",require: true,desc: "手机号"),
        Apidoc\Returned("id",type: "int",desc: "用户id"),
    ]
    public function query(){
        //...
    }
}
```

@tab 原始注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 */
class ApiDocTest
{ 
    /**
     * @Apidoc\Title("请求Query参数")
     * @Apidoc\Method("GET")
     * @Apidoc\Query("username", type="abc",require=true, desc="用户名")
     * @Apidoc\Query("phone", type="string",require=true, desc="手机号")
     * @Apidoc\Returned("id", type="int", desc="用户id")
     */
    public function query(){
        //...
    }
  
}
```
:::

### 3、Body参数

通过`Param`注解来定义HTTP请求的body参数

::: code-tabs#apiBody

@tab:active PHP8原生注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

#[Apidoc\Title("基础示例")]
class ApiDocTest
{ 
    #[
        Apidoc\Title("请求Body参数"),
        Apidoc\Method("POST"),
        Apidoc\Param(name:"name",type: "string",require: true,desc: "姓名"),
        Apidoc\Param(name:"phone",type: "string",require: true,desc: "手机号"),
        Apidoc\Returned("id",type: "int",desc: "用户id"),
    ]
    public function body(){
        //...
    }
}
```

@tab 原始注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 */
class ApiDocTest
{ 
    /**
     * @Apidoc\Title("请求Body参数")
     * @Apidoc\Method("GET")
     * @Apidoc\Param("username", type="abc",require=true, desc="用户名")
     * @Apidoc\Param("phone", type="string",require=true, desc="手机号")
     * @Apidoc\Returned("id", type="int", desc="用户id")
     */
    public function body(){
        //...
    }
  
}
```
:::


### 4、路由参数

通过`RouteParam`注解来定义请求的路由传参，如url/{name}/{phone}，通过以下注解实现

::: code-tabs#apiRouteParam

@tab:active PHP8原生注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

#[Apidoc\Title("基础示例")]
class ApiDocTest
{ 
    #[
        Apidoc\Title("路由参数")
        Apidoc\Method("POST"),
        Apidoc\RouteParam(name:"name",type: "string",require: true,desc: "姓名"),
        Apidoc\RouteParam(name:"phone",type: "string",require: true,desc: "手机号"),
        Apidoc\Returned("id",type: "int",desc: "用户id"),
    ]
    public function route(Request $request,$name,$phone){
        //...
    }
}
```

@tab 原始注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 */
class ApiDocTest
{ 
    /**
     * @Apidoc\Title("路由参数")
     * @Apidoc\Method("GET")
     * @Apidoc\RouteParam("username", type="string",require=true, desc="用户名")
     * @Apidoc\RouteParam("phone", type="string",require=true, desc="手机号")
     * @Apidoc\Returned("id", type="int", desc="用户id")
     */
    public function route(){
        //...
    }
  
}
```
:::


### 5、响应参数

通过`Returned`注解来定义HTTP请求响应参数

::: code-tabs#apiReturned

@tab:active PHP8原生注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

#[Apidoc\Title("基础示例")]
class ApiDocTest
{ 
    #[
        Apidoc\Title("响应参数")
        Apidoc\Method("GET"),
        Apidoc\Query(name:"id",type: "int",require: true,desc: "用户id"),
        Apidoc\Returned("id",type: "int",desc: "用户id"),
        Apidoc\Returned("name",type: "string",desc: "姓名"),
        Apidoc\Returned("phone",type: "string",desc: "电话"),
    ]
    public function returned(Request $request,$name,$phone){
        //...
    }
}
```

@tab 原始注解

```php
<?php

use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 */
class ApiDocTest
{ 
    /**
     * @Apidoc\Title("响应参数")
     * @Apidoc\Method("GET")
     * @Apidoc\Query("id", type="int",require=true, desc="用户id")
     * @Apidoc\Returned("id", type="int", desc="用户id")
     * @Apidoc\Returned("name", type="string", desc="姓名")
     * @Apidoc\Returned("phone", type="string", desc="电话")
     */
    public function returned(){
        //...
    }
  
}
```
:::


## 通用注解

通过定义通用的公共注释参数来实现 可复用性，避免每个接口都定义一大堆同样的参数

### 1、增加配置

首先在配置文件 apidoc.php 配置文件中，指定一个文件为定义公共注释的类

```php
// apidoc.php
// 指定公共注释定义的文件地址
'definitions'=>"app\controller\Definitions",
```

### 2、定义通用注解

添加一些通用的方法及注释，（定义`Header`、`Query`、`Param` 、`Returned` 参数与接口注释书写规则一致）

::: code-tabs#apiDefinitons

@tab:active PHP8原生注解

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class Definitions
{
 
    #[
        Apidoc\Query("pageIndex",type: "int",require: true,default: 1,desc: "查询页数"),
        Apidoc\Query("pageSize",type: "int",require: true,default: 20,desc: "查询条数"),
        Apidoc\Returned("total",type: "int",desc: "总条数"),
    ]
    public function pagingParam(){}
  

    #[
        Apidoc\Returned("id",type: "int",desc: "唯一id"),
        Apidoc\Returned("name",type: "string",desc: "字典名"),
        Apidoc\Returned("value",type: "string",desc: "字典值"),
    ]
    public function dictionary(){}

   
    #[Apidoc\Header("shopid",type: "string",require:true,desc: "店铺id")]
    public function shopHeader(){}
    
}
```

@tab 原始注解
```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class Definitions
{
    /**
     * 获取分页数据列表的参数
     * @Apidoc\Query("pageIndex",type="int",require=true,default="1",desc="查询页数")
     * @Apidoc\Query("pageSize",type="int",require=true,default="20",desc="查询条数")
     * @Apidoc\Returned("total", type="int", desc="总条数")
     */
    public function pagingParam(){}
  
    /**
     * 返回字典数据
     * @Apidoc\Returned("id",type="int",desc="唯一id")
     * @Apidoc\Returned("name",type="string",desc="字典名")
     * @Apidoc\Returned("value",type="string",desc="字典值")
     */
    public function dictionary(){}

    /**
     * @Apidoc\Header("shopid",type="string",require=true,desc="店铺id")
     */
    public function shopHeader(){}
    
}
```
:::

### 3、使用定义

在接口注释中的 `Header`、`Query`、`Param`、`RouteParam` 、`Returned` 可通过ref引用通用注解：

::: code-tabs#apiUseDefinitions

@tab:active PHP8原生注解

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;
use app\common\controller\Definitions;

class ApiDocTest
{ 
    #[
        Apidoc\Title("引用公共注解"),
        Apidoc\Method("GET"),
        Apidoc\Header(ref:"shopHeader"),
        Apidoc\Query(ref:[Definitions::class,"pagingParam"] ),
        Apidoc\Returned(ref: [Definitions::class,"pagingParam"]),
        Apidoc\Returned(name: "data",type: "array",ref="dictionary",desc: "字典列表"),
    ]
    public function definitions(){
        //...
    }
}
```

@tab 原始注解

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    /**
     * @Apidoc\Title("引入通用注释")
     * @Apidoc\Method("GET")
     * @Apidoc\Header( ref="shopHeader")
     * @Apidoc\Query( ref="pagingParam")
     * @Apidoc\Returned(ref={Definitions::class,"pagingParam"})
     * @Apidoc\Returned("data", type="array",ref="dictionary", desc="字典列表")
     */
    public function definitions(){
        //...
    }
}
```
:::

:::tip 以上Returned用了两种方式引入，分别是参数指定 字段名 与 type ，与不指定字段名
- 指定字段名：会将引入的参数在该字段属性下
- 不指定字段名：直接引入所有参数
:::


## 逻辑层注解

在实际开发中，业务逻辑处理通常会分层给逻辑层来处理（我这里把业务逻辑层叫service，你也可以根据自己开发来定义 业务逻辑层），我们可直接引入业务逻辑层的注释来实现接口参数的定义

### 增加业务逻辑层

1、在项目 app 目录下（或应用/模块目录）新建 services 文件夹（也可以叫别的）

2、在此文件夹下新建一个ApiDoc.php文件，内容如下：

::: code-tabs#apiService

@tab:active PHP8原生注解

```php
<?php
namespace app\services;

use hg\apidoc\annotation as Apidoc;

class ApiDocService
{
    #[
        Apidoc\Param("id",type:"int",require:true,desc="唯一id"),
        Apidoc\Param("sex",type:"int",require:true,desc="性别"),
        Apidoc\Param("age",type:"int",require:true,desc="年龄"),
        Apidoc\Returned("id",type:"int",desc="唯一id"),
        Apidoc\Returned("name",type:"string",desc="姓名"),
        Apidoc\Returned("phone",type:"string",desc="电话"),
    ]
    public function getUserInfo(){}
}
```
@tab 原始注解
```php
<?php
namespace app\services;

use hg\apidoc\annotation as Apidoc;

class ApiDocService
{
     /**
      * @Apidoc\Param("id", type="int",require=true,desc="唯一id")
     * @Apidoc\Param("sex", type="int",require=true,desc="性别")
     * @Apidoc\Param("age", type="int",require=true,desc="年龄")
     * @Apidoc\Returned("id", type="int",desc="唯一id")
     * @Apidoc\Returned("name", type="string",desc="姓名")
     * @Apidoc\Returned("phone", type="string",desc="电话")
     */
    public function getUserInfo(){}
}
```
:::

### 引用逻辑层注解

在控制器的接口注释中的参数可通过 ref="XXX"来指定引入逻辑层的注释

::: code-tabs#apiUserService

@tab:active PHP8原生注解


```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;
use app\services\ApiDocService;

class ApiDocTest
{ 
    #[
        Apidoc\Title("引入逻辑层注解"),
        Apidoc\Method("POST"),
        Apidoc\Desc("以下Param注解中，三种ref方式等价")
        Apidoc\Param(ref:"app\services\ApiDocService@getUserInfo" ),
        Apidoc\Param(ref:"app\services\ApiDocService\getUserInfo" ),
        Apidoc\Param(ref: [ApiDocService::class,"getUserInfo"] ),
        Apidoc\Returned(ref: [ApiDocService::class,"getUserInfo"]),
    ]
    public function service(){
       //...
    }
}
```

@tab 原始注解

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;
use app\services\ApiDocService;

class ApiDocTest
{ 
    /**
     * @Apidoc\Title("引入逻辑层注释")
     * @Apidoc\Method("POST")
     * @Apidoc\Desc("以下Param注解中，三种ref方式等价")
     * @Apidoc\Param(ref="app\services\ApiDocService\getUserInfo")
     * @Apidoc\Param(ref="app\services\ApiDocService@getUserInfo")
     * @Apidoc\Param(ref={ApiDocService::class,"getUserInfo"})
     * @Apidoc\Returned(ref={ApiDocService::class,"getUserInfo"})
     */
    public function service(){
       //...
    }
}
```
:::

## 模型注解

接口参数往往与数据表息息相关，很多接口参数均由数据表字段而来。我们可以直接引入指定模型的数据表字段来生成参数说明，省去了一大堆接口注解与维护工作。

### 给数据表字段添加注释

建议为数据表字段添加注释，即让数据表字段可读性更高，也让文档可读性更高。
我们直接在数据表给相应字段添加注释，如下SQL供参考

```php
CREATE TABLE `user` (↵  
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `name` varchar(64) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '联系电话',
  `role` varchar(255) DEFAULT NULL COMMENT '角色',
PRIMARY KEY (`id`)↵) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8"
```

### 模型方法的注解

可为引入的数据模型方法添加相应注释来实现 Field（返回指定字段）、WithoutField（排除指定字段）、AddField（添加指定字段）

|参数|说明|书写规范|
|-|-|-|
|Field|返回指定字段|数组或英文格式逗号 , 分开指定的字段|
|WithoutField|排除指定字段|英文格式逗号 , 分开指定的字段|
|AddField|添加指定字段|可定义多个，每行为一个参数，也可如下示例嵌套Param使用来定义复杂层级的数据结构|
|   \|—  |参数的字段名|如：@Apidoc\AddField("name")|
|   \|— type|字段类型|
|   \|— require|是否必填| |
|   \|— default|默认值| |
|   \|— desc|字段说明文字||
|   \|— children|子参数||

::: code-tabs#apiModel
@tab:active PHP8原生注解

```php
<?php
namespace app\model;

use hg\apidoc\annotation as Apidoc;

class User extends BaseModel
{
    #[
        Apidoc\Field(["id","username","nickname","role"]),
        Apidoc\AddField("openid",type:"string",desc:"OpenId"),
        Apidoc\AddField("role",type:"array",desc:"重写role，由于数据表中存在该字段，此处定义会覆盖数据表中的字段",children:[
            ['name'=>'name','type'=>'string','desc'=>'角色名称'],
            ['name'=>'id','type'=>'int','desc'=>'角色id'],
        ]),
    ]
    public function getInfo($id){
        //...
    }
}
```

@tab 原始注解

```php
<?php
namespace app\model;

use hg\apidoc\annotation as Apidoc;

class User extends BaseModel
{
     /**
     * @Apidoc\Field("id,username,nickname,role")
     * @Apidoc\AddField("openid",type="string",default="abc",desc="微信openid")
     * @Apidoc\AddField("role",type="array",desc="重写role，由于数据表中存在该字段，此处定义会覆盖数据表中的字段",children:{
     *      @Apidoc\Param ("name",type="string",desc="名称"),
     *      @Apidoc\Param ("id",type="string",desc="id"),
     * })
     */
    public function getInfo($id){
        //...
    }
}
```

:::

### 引用模型注释

::: code-tabs#apiUseModel
@tab:active PHP8原生注解

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;
use app\model\User as UserModel;

class ApiDocTest
{ 

    #[
        Apidoc\Title("引入模型注解"),
        Apidoc\Method("POST"),
        Apidoc\Param(ref: "app\model\User@getInfo",desc: "指定引入模型的getInfo方法,会通过getInfo的注解处理数据表字段" ),
        Apidoc\Param(ref: [UserModel::class,"getUserInfo"],desc: "同上" ),
        Apidoc\Param(ref: "app\model\User",desc: "直接引入该模型数据表字段" ),
        Apidoc\Param(ref: UserModel::class,desc: "同上" ),
        Apidoc\Returned(ref:UserModel::class),
    ]
    public function model(){
       //...
    }
}
```

@tab 原始注解
```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    /**
     * @Apidoc\Title("引入模型注释")
     * @Apidoc\Method("POST")
     * @Apidoc\Param(ref="app\model\User@getInfo",desc="指定引入模型的方法,会通过getInfo的注解处理数据表字段")
     * @Apidoc\Param(ref={UserModel::class,"getUserInfo"},desc: "同上" )
     * @Apidoc\Param(ref="app\model\User",desc="直接引入该模型数据表字段")
     * @Apidoc\Param(ref={UserModel::class},desc: "同上" )
     * @Apidoc\Returned(ref={UserModel::class})
     */
    public function model(){
       //...
    }
}
```
:::



## 复杂注释

虽然Apidoc拥有强大的ref引用能力，但某些场景我们需要在一个方法内完成多层数据结构的注解，此时我们可以将`Header`、`Query`,`Param`,`Returned`做嵌套使用即可

::: code-tabs#apiChildren
@tab:active PHP8原生注解

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    #[
        Apidoc\Method("POST"),
        Apidoc\Param("info",type:"object",desc="信息",children:[
            ['name'=>'name','type'=>'string','desc'=>'姓名'],
            ['name'=>'sex','type'=>'string','desc'=>'性别'],
            ['name'=>'group','type'=>'object','desc'=>'所属分组','children'=>[
                ['name'=>'group_id','type'=>'int','desc'=>'组id'],
                ['name'=>'group_name','type'=>'string','desc'=>'组名'],
            ]],
        ]),
    ]
    public function test(){
       //...
    }
}
```

@tab 原始注解

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    /**
     * @Apidoc\Method("POST")
     * @Apidoc\Param("info",type="object",desc="信息",children={
     *     @Apidoc\Param ("name",type="string",desc="姓名"),
     *     @Apidoc\Param ("sex",type="string",desc="性别"),
     *     @Apidoc\Param ("group",type="object",desc="所属组",children={
     *          @Apidoc\Param ("group_id",type="int",desc="组id"),
     *          @Apidoc\Param ("group_name",type="string",desc="组名"),
     *     })
     * })
     */
    public function test(){
       //...
    }
}
```
:::

## 参数说明


|参数名|参数值|说明|书写规范|
|-|-|-|-|
|Title| |	接口名称 |	任意字符，也可如以下[特殊参数](#特殊参数)直接写在注释前面 |	
|Desc|	|接口描述 |	任意字符 |	
|Md|	|Markdown描述，子参数`ref`引用一个md文件内容 |	Markdown语法字符 |	
|Author|	|作者 |	任意字符,默认配置文件的`apidoc.default_author` |	
|Url|	|真实的接口URL，不配置时会根据控制器目录自动生成 |	任意字符 |	
|Method|	 |请求类型,默认配置文件的`apidoc.default_method`,多个类型(数组或用,隔开)|	`GET` `POST`等 |	
|RouteMiddleware| 	|开启自动注册路由时，定义路由中间件 |	 |
|ContentType|	|指定调试时请求ContentType |	 |	
|Tag|	|接口Tag标签 |	多个标签用数组或,（逗号）隔开 |	
|Header| 具体查看 [接口参数](#接口参数)	|请求Headers参数 |	可定义多个|	
|Query | 具体查看 [接口参数](#接口参数)	|请求Query参数 |	可定义多个 |	
|Param | 具体查看 [接口参数](#接口参数)	|请求Body参数 |	可定义多个 |	
|ParamType| `json` `formdata`	|请求参数类型，默认json | |
|Returned| 具体查看 [接口参数](#接口参数)	|响应结果 |	可定义多个 |	
| ResponseSuccess| 当前接口的成功响应体，通过main=true指定业务数据挂载节点 | 如：<div>@Apidoc\ResponseSuccess("code",type="int",desc="业务编码")</div><div>@Apidoc\ResponseSuccess("data",type="object",desc="业务数据",main=true)</div> | |
| ResponseError| 当前接口的异常响应体 | 同上 | |
| ResponseSuccessMd| 使用Markdown写成功响应体 | 支持ref引入md文件 | |
| ResponseError| 使用Markdown写异常响应体 | 同上 | |
|Before| 具体查看 [功能使用-调试时的事件](../../use/function/debugEvent)	|调试时请求发起前执行的事件 |	可定义多个 |
|After| 具体查看 [功能使用-调试时的事件](../../use/function/debugEvent)	|调试时请求返回后执行的事件 |	可定义多个 |



### 接口参数

适用于接口`Header`,`Query`,`Param`,`Returned`注解

|参数名|说明|书写规范|
|-|-|-|
| |	参数的字段名 |	如：@Apidoc\Param("name")，如使用ref引入某个定义，可不配置参数值 |	
| type| 	字段类型 | `string` `int` `boolean` `array` `object` `tree` `file` `float` `date` `time` `datetime`	 |	
| require|	是否必填 |	 |	
| default|默认值 |  |	
| desc|	字段描述 |	 |	
| md|	引用Markdown描述内容 |	 |	
| mdRef|	引用Markdown描述内容 |	如：`/docs/xxx.md` |
| ref|	引入定义的路径，可引入全局定义、服务层方法类、模型方法 |<div>如：@Apidoc\Param(ref="pagingParam")</div><div>或：@Apidoc\Param(ref="app\services\ApiDocTest\get")</div><div>或：@Apidoc\Param(ref="app\model\User\getList")</div>	 |	
| mock|	接口调试时自动生成该字段的值，支持的参数值请查看[mock语法](../../use/function/mock) | 	 |	
| field|	配置了ref引入时有效，用来指定引入的字段 | 如：field="id,username"；则只会引入定义的 id,username字段	 |	
| withoutField|	配置了ref引入时有效，用来指定过滤掉的字段 | 如：withoutField:id,username；则引入模型除 id,username字段外的所有字段	 |	
| childrenField|	字段类型为`tree`时，给其定义子节点字段名 |	默认为 children |	
| childrenDesc|	字段类型为`tree`时，给其定义子节点字段名的备注|	 |
| childrenType| 字段类型为`array`时，为子参数定义类型，可选值有`string` `int` `boolean` `array` `object` |  |
| children| 子参数，多层参数时通过 children 嵌套使用|  |



## 特殊参数

::: tip 说明
特殊参数以字符方式直接写到注释中，如下
:::

|参数名|说明|
|-|-|
|NotParse| 不需要解析的方法 |	
|NotHeaders| 不使用配置中的全局请求Headers参数 |	
|NotQuerys| 不使用配置中的全局请求Querys参数 |	
|NotParams| 不使用配置中的全局请求Params参数 |	
|NotResponses| 不使用统一响应体返回数据 |	
|NotResponseSuccess| 不使用成功响应体返回数据 |	
|NotResponseError| 不使用异常响应体返回数据 |	
|NotDefaultAuthor| 不使用默认作者 |	
|NotDebug| 关闭接口调试 |	



```php
<?php
namespace app\controller;
use hg\apidoc\annotation as Apidoc;

/**
 * NotParse
 */
class ApiDocTest
{ 
   /**
     * NotParse
     * NotResponses
     */
    public function model(){
       //...
    }
}
```
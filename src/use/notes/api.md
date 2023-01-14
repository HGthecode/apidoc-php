# 接口注释

控制器中的每一个符合注释规则的方法都会被解析成一个API接口

## 基础注释
先来体验一个最基本的注释，所得到的结果

我们在控制器中加入如下方法，如下

```php
<?php

use hg\apidoc\annotation as Apidoc;

/**
 * @Apidoc\Title("基础示例")
 */
class ApiDocTest
{ 
    /**
     * @Apidoc\Title("基础的注释方法")
     * @Apidoc\Desc("最基础的接口注释写法")
     * @Apidoc\Method("GET")
     * @Apidoc\Author("HG")
     * @Apidoc\Tag("测试")
     * @Apidoc\Query("username", type="abc",require=true, desc="用户名")
     * @Apidoc\Query("password", type="string",require=true, desc="密码")
     * @Apidoc\Query("phone", type="string",require=true, desc="手机号")
     * @Apidoc\Query("sex", type="int",default="1",desc="性别" )
     * @Apidoc\Returned("id", type="int", desc="用户id")
     */
    public function base(){
        //...
    }
  
}
```


## 通用注释

通过定义通用的公共注释参数来实现 可复用性，避免每个接口都定义一大堆同样的参数

### 1、增加配置

首先，在配置文件 apidoc.php 配置文件中，指定一个控制器为定义公共注释的控制器

```php
// apidoc.php
// 指定公共注释定义的文件地址
'definitions'=>"app\controller\Definitions",
```

### 2、定义通用注释

添加一些通用的方法及注释，（定义`Header`、`Query`、`Param` 、`Returned` 参数与接口注释书写规则一致）

```php
<?php
namespace app\controller;

use hg\apidoc\annotation\Query;
use hg\apidoc\annotation\Param;
use hg\apidoc\annotation\Returned;
use hg\apidoc\annotation\Header;


class Definitions
{
    /**
     * 获取分页数据列表的参数
     * @Query("pageIndex",type="int",require=true,default="0",desc="查询页数")
     * @Query("pageSize",type="int",require=true,default="20",desc="查询条数")
     * @Param("index",type="int",require=true,default="0",desc="查询页数")
     * @Param("size",type="int",require=true,default="20",desc="查询条数")
     * @Returned("total", type="int", desc="总条数")
     */
    public function pagingParam(){}
  
    /**
     * 返回字典数据
     * @Returned("id",type="int",desc="唯一id")
     * @Returned("name",type="string",desc="字典名")
     * @Returned("value",type="string",desc="字典值")
     */
    public function dictionary(){}

    /**
     * @Header("token",type="string",require=true,desc="身份票据")
     * @Header("shopid",type="string",require=true,desc="店铺id")
     */
    public function auth(){}
    
}
```

### 3、使用定义

在接口注释中的 `Header`、`Query`、`Param` 、`Returned` 可通过 ref="XXX" 来指定引入的 通用注释

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    /**
     * @Apidoc\Title("引入通用注释")
     * @Apidoc\Desc("引入配置中definitions的通用注解控制器中所定义的通用参数")
     * @Apidoc\Url("/admin/refDemo/definitions")
     * @Apidoc\Author("HG")
     * @Apidoc\Method("GET")
     * @Apidoc\Header( ref="auth")
     * @Apidoc\Query( ref="pagingParam")
     * @Apidoc\Param("page",type="object", ref="pagingParam",desc="分页参数")
     * @Apidoc\Returned("list", type="array",ref="dictionary", desc="字典列表")
     */
    public function definitions(){
        //...
    }
}
```
:::tip 以上Query、Param用了两种方式引入，分别是参数指定 字段名 与 type ，与不指定字段名
- 指定字段名：会将引入的参数在该字段属性下
- 不指定字段名：直接引入所有参数
:::


## 逻辑层注释

在实际开发中，业务逻辑处理通常会分层给逻辑层来处理（我这里把业务逻辑层叫service，你也可以根据自己开发来定义 业务逻辑层），我们可直接引入业务逻辑层的注释来实现接口参数的定义

### 增加业务逻辑层

1、在项目 app 目录下（或应用/模块目录）新建 services 文件夹（也可以叫别的）

2、在此文件夹下新建一个ApiDoc.php文件，内容如下：

```php
<?php
namespace app\services;

use hg\apidoc\annotation as Apidoc;

class ApiDocService
{

     /**
     * @Apidoc\Param("sex", type="int",require=true,desc="性别")
     * @Apidoc\Param("age", type="int",require=true,desc="年龄")
     * @Apidoc\Param("id", type="int",require=true,desc="唯一id")
     * @Apidoc\Returned("id", type="int",desc="唯一id")
     * @Apidoc\Returned("name", type="string",desc="姓名")
     * @Apidoc\Returned("phone", type="string",desc="电话")
     */
    public function getUserInfo(){}

    
}
```

### 引用逻辑层注释

在控制器的接口注释中的参数可通过 ref="XXX"来指定引入逻辑层的注释

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    /**
     * @Apidoc\Title("引入逻辑层注释")
     * @Apidoc\Url("/admin/refDemo/service")
     * @Apidoc\Method("POST")
     * @Apidoc\Param(ref="app\services\ApiDocService\getUserInfo")
     * @Apidoc\Returned(ref="\app\services\ApiDocService\info")
     */
    public function service(){
       //...
    }
}
```


## 模型注释

接口参数往往与数据表息息相关，很多接口参数均由数据表字段而来。我们可以直接引入指定模型的数据表字段来生成参数说明，省去了一大堆接口注释与维护工作。

### 给数据表字段添加注释

建议为数据表字段添加注释，即让数据表字段可读性更高，也让文档可读性更高。
我们直接在数据表给相应字段添加注释，如下SQL供参考

```php
CREATE TABLE `user` (↵  
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `password` char(64) NOT NULL COMMENT '登录密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `name` varchar(64) DEFAULT NULL COMMENT '姓名',
  `phone` char(32) DEFAULT NULL COMMENT '联系电话',
  `sex` tinyint(1) unsigned DEFAULT '1' COMMENT '性别',
  `regip` bigint(11) DEFAULT NULL COMMENT '注册IP',
  `create_time` int(10) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) unsigned DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(10) DEFAULT NULL COMMENT '删除时间',
PRIMARY KEY (`id`)↵) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8"
```

### 模型方法的注释

可为引入的数据模型方法添加相应注释来实现 field（返回指定字段）、withoutField（排除指定字段）、addField（添加指定字段）

|参数|说明|书写规范|
|-|-|-|
|field|返回指定字段|英文格式逗号 , 分开指定的字段|
|withoutField|排除指定字段|英文格式逗号 , 分开指定的字段|
|addField|添加指定字段|可定义多个，每行为一个参数，也可如下示例嵌套Param使用来定义复杂层级的数据结构|
|   \|—  |参数的字段名|如：@addField("name")|
|   \|— type|字段类型|
|   \|— require|是否必填| |
|   \|— default|默认值| |
|   \|— desc|字段说明文字||

```php
<?php
namespace app\model;

use hg\apidoc\annotation\Field;
use hg\apidoc\annotation\WithoutField;
use hg\apidoc\annotation\AddField;
use hg\apidoc\annotation\Param;

class User extends BaseModel
{

     /**
     * @Field("id,username,nickname,role")
     * @AddField("openid",type="string",default="abc",desc="微信openid")
     * @AddField("senkey",type="string",default="key",desc="微信key")
     * @AddField("role",type="array",desc="重写role，由于数据表中存在该字段，此处定义会覆盖数据表中的字段",
     *     @Param ("name",type="string",desc="名称"),
     *     @Param ("id",type="string",desc="id"),
     * )
     */
    public function getInfo($id){
        $res = $this->get($id);
        return $res;
    }
}
```

### 控制器引用模型注释
```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    /**
     * @Apidoc\Title("引入模型注释")
     * @Apidoc\Desc("param参数为直接引用模型数据表参数")
     * @Apidoc\Author("HG")
     * @Apidoc\Url("/v1/baseDemo/model")
     * @Apidoc\Method("POST")
     * @Apidoc\Param(ref="app\model\User\getInfo")
     * @Apidoc\Returned("userList",type="array",ref="app\model\User\getInfo")
     */
    public function model(){
       //...
    }
}
```

如上Param的ref参数有3种写法：

1、`@Apidoc\Param(ref="app\model\User")` ref为模型命名空间，将该模型数据表所有字段进行引用，适合无需模型注释的引用。

2、`@Apidoc\Param(ref="app\model\User\getInfo")` 最后的`\getInfo`为模型中的方法，该将该模型数据表字段将通过方法的注解处理。

3、`@Apidoc\Param(ref="app\model\User@getInfo")` `@getInfo`为模型中的方法，效果同上。



## 复杂注释

虽然Apidoc拥有强大的ref引用能力，但某些场景我们需要在一个方法内完成多层数据结构的注解，此时我们可以将`Header`、`Query`,`Param`,`Returned`做嵌套使用即可

```php
<?php
namespace app\controller;

use hg\apidoc\annotation as Apidoc;

class ApiDocTest
{ 
    /**
     * 直接定义多层结构的参数
     * @Apidoc\Desc("仅在一个方法注释中定义多层数据结构的参数")
     * @Apidoc\Url("/admin/baseDemo/completeParams")
     * @Apidoc\Method("POST")
     * @Apidoc\Param("info",type="object",desc="信息",
     *     @Apidoc\Param ("name",type="string",desc="姓名"),
     *     @Apidoc\Param ("sex",type="string",desc="性别"),
     *     @Apidoc\Param ("group",type="object",desc="所属组",
     *          @Apidoc\Param ("group_name",type="string",desc="组名"),
     *          @Apidoc\Param ("group_id",type="int",desc="组id"),
     *          @Apidoc\Param ("data",type="object",ref="app\admin\services\ApiDoc\getUserList",desc="这里也可以用ref")
     *     )
     * )
     * @Apidoc\Returned("info",type="object",desc="信息",
     *     @Apidoc\Returned ("name",type="string",desc="姓名"),
     *     @Apidoc\Returned ("sex",type="string",desc="性别"),
     *     @Apidoc\Returned ("group",type="object",desc="所属组",
     *          @Apidoc\Returned ("group_name",type="string",desc="组名"),
     *          @Apidoc\Returned ("group_id",type="int",desc="组id"),
     *     )
     * )
     */
    public function test(){
       //...
    }
}
```


## 参数说明

::: warning 注意
- 每个参数以 @+参数名("参数值",子参数名="子参数值",...)
- 参数名首字母大写，避免有些环境不能正确解析小写首字母
- 子参数的值需用"双引号"包起来 
:::

|参数名|参数值|说明|书写规范|
|-|-|-|-|
|Title| |	接口名称 |	任意字符，也可如以下[特殊参数](#特殊参数)直接写在注释前面 |	
|Desc|	|接口描述 |	任意字符 |	
|Md|	|Markdown描述，子参数`ref`引用一个md文件内容 |	Markdown语法字符 |	
|Author|	|作者 |	任意字符,默认配置文件的`apidoc.default_author` |	
|Url|	|真实的接口URL，不配置时会根据控制器目录自动生成 |	任意字符 |	
|Method|	 |请求类型,默认配置文件的`apidoc.default_method`,多个类型(用,隔开)|	`GET` `POST`等 |	
|RouteMiddleware| 	|开启自动注册路由时，定义路由中间件 |	 |
|ContentType|	|指定调试时请求ContentType |	 |	
|Tag|	|接口Tag标签 |	多个标签用,（逗号）空格隔开 |	
|Header| 具体查看 [接口参数](#接口参数)	|请求Headers参数 |	可定义多个|	
|Query | 具体查看 [接口参数](#接口参数)	|请求Query参数 |	可定义多个 |	
|Param | 具体查看 [接口参数](#接口参数)	|请求Body参数 |	可定义多个 |	
|ParamType| `json` `formdata`	|请求参数类型，默认json | |
|Returned| 具体查看 [接口参数](#接口参数)	|响应结果 |	可定义多个 |	
| ResponseSuccess| 当前接口的成功响应体，通过main=true指定业务数据挂载节点 | 如：<div>@Apidoc\ResponseSuccess("code",type="int",desc="业务编码")</div><div>@Apidoc\ResponseSuccess("data",type="object",desc="业务数据",main=true)</div> | |
| ResponseError| 当前接口的异常响应体 | 同上 | |
| ResponseSuccessMd| 使用Markdown写成功响应体 | 支持ref引入md文件 | |
| ResponseError| 使用Markdown写异常响应体 | 同上 | |
|Before| 具体查看 [功能使用-调试时的事件](/use/function/debugEvent/)	|调试时请求发起前执行的事件 |	可定义多个 |
|After| 具体查看 [功能使用-调试时的事件](/use/function/debugEvent/)	|调试时请求返回后执行的事件 |	可定义多个 |



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
| mock|	接口调试时自动生成该字段的值，支持的参数值请查看[mock语法](/use/function/mock) | 	 |	
| field|	配置了ref引入时有效，用来指定引入的字段 | 如：field="id,username"；则只会引入定义的 id,username字段	 |	
| withoutField|	配置了ref引入时有效，用来指定过滤掉的字段 | 如：withoutField:id,username；则引入模型除 id,username字段外的所有字段	 |	
| childrenField|	字段类型为`tree`时，给其定义子节点字段名 |	默认为 children |	
| childrenDesc|	字段类型为`tree`时，给其定义子节点字段名的备注|	 |
| childrenType| 字段类型为`array`时，为子参数定义类型，可选值有`string` `int` `boolean` `array` `object` |  |



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
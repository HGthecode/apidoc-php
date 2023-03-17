---
icon: log
sidebarDepth: 2
category: 指南
---



# V4升级到V5

## 升级扩展

```sh
composer update hg/apidoc
```
或

```sh
# 先卸载
composer remove hg/apidoc

# 再安装
composer require hg/apidoc
```

## 升级前端文件

<ClientOnly>
<DownloadFe ></DownloadFe>
</ClientOnly>

config.js 配置文件，根据自身项目情况酌情替换


## 修改注解

## 1、子参数嵌套注解的变化

V4版本中`Query`,`Param`,`Returned`的子参数，直接在参数注解中嵌套书写注解，如下：

```php
/**
 * @Apidoc\Title ("V4版本的子参数嵌套注解写法")
 * @Apidoc\Method("POST")
 * @Apidoc\Param("list",type="array", desc="对象数组",childrenType="object"
 *     @Apidoc\Param("name",type="string",desc="名称"),
 *     @Apidoc\Param("code",type="int",desc="编号"),
 * )
 */
public function test(){
    //...
}
```

V5版本中`Query`,`Param`,`Returned`的子参数，使用children嵌套书写注解，如下：
```php
/**
 * @Apidoc\Title ("V5版本的子参数嵌套注解写法")
 * @Apidoc\Method("POST")
 * @Apidoc\Param("list",type="array", desc="对象数组",childrenType="object",children={
 *     @Apidoc\Param("name",type="string",desc="名称"),
 *     @Apidoc\Param("code",type="int",desc="编号"),
 * })
 */
public function test(){
    //...
}
```

## 2、请求事件注解变化

主要调整了ajax事件的前置和后置事件的注解方式

V4版本中的Ajax事件注解

```php
/**
 * @Apidoc\Method("POST")
 * @Apidoc\Before(event="ajax",url="/demo/test/getFormToken",method="POST",
 *    @Apidoc\Before(event="setBody",value="body."),
 *    @Apidoc\Before(event="setBody",key="formToken",value="123"),
 *    @Apidoc\After(event="setHeader",key="X-CSRF-TOKEN",value="res.data.data.token")
 * )
 */
public function test(){
    //...
}
```

V5版本中的Ajax事件注解

```php
/**
 * @Apidoc\Method("POST")
 * @Apidoc\Before(event="ajax",value="body.",url="/demo/test/getFormToken",method="POST",before={
 *    @Apidoc\Before(event="setBody",key="formToken",value="123")
 * },after={
 *    @Apidoc\After(event="setHeader",key="X-CSRF-TOKEN",value="res.data.data")
 * })
 */
public function test(){
    //...
}
```

## 3、废弃mdRef处理

影响注解 `Header` `Query` `RouteParam` `Param` `Returned` `AddField` 

V4版本可通过注解mdRef参数来引用markdown文档内容：

```php
/**
 * @Apidoc\Method("GET")
 * @Apidoc\Param("name", type="string", desc="姓名",mdRef="/docs/apiDesc.md#name字段" )
 */
```

V5版本直接将markdown地址注解到md参数中即可：

```php
/**
 * @Apidoc\Method("GET")
 * @Apidoc\Param("name", type="string", desc="姓名",md="/docs/apiDesc.md#name字段" )
 */
```


<script setup lang="ts">
import DownloadFe from "@DownloadFe";
</script>

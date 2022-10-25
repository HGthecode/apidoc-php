

# 多语言

## 前端多语言

前端配置文件`apidoc/config.js`中配置`LANG`，增加/修改你所需的语言，默认为简体中文，当配置大于1个语言时，页面右上角会出现语言切换功能

> messages 中为前端页面中所需的语言变量，详见[前端配置](/config/fe)

```javascript
// /config.js
const config = {
   //...
   // 多语言
  LANG: [
    {
      title: "简体中文",
      lang: "zh-cn",
      messages: {
        // ...
      },
    },
    {
      title: "Engilsh",
      lang: "en-us",
      messages: {
          // ...
      }
    }
}
```

## 配置文件多语言

如果的项目存在多种语言，希望在Apidoc配置中也同样能进行多语言切换，可将apidoc.php配置文件进行如下调整

:::tip 提示
你的项目需按框架文档进行多语言配置，并且对使用的变量进行定义，以下用TP6举例
:::

### 定义多语言变量

```php
// /app/lang/zh-cn.php
return [
    'apidoc'    =>    [
        'apps.admin' => '后台管理',
        'group.base' => '基础模块',
        'headers.shopId' => '店铺id',
        'params.code' => '编码',
        'responses.code' => '响应编码',
        'responses.message' => '操作描述',
        'doc.about' => '关于',
        'api.lang.title' => "多语言接口",
        'api.lang.desc' => "多语言测试接口",
        'api.lang.age' => "年龄",
        'api.lang.name' => "姓名",
    ]
];
```
```php
// /app/lang/en-us.php
return [
    'apidoc'    =>    [
        'apps.admin' => 'Admin',
        'group.base' => 'Base Module',
        'headers.shopId' => 'Shop Id',
        'params.code' => 'Code',
        'responses.code' => 'Code',
        'responses.message' => 'Message',
        'doc.about' => 'About',
        'api.lang.title' => "Language Api",
        'api.lang.desc' => "This is a language Test Api",
        'api.lang.age' => "Age",
        'api.lang.name' => "Name",
    ]
];
```

### 配置文件中使用

> 如下例子中的参数位置可使用 `lang(多语言变量)` 来引用多语言变量

```php
// /config/apidoc.php
'apps' => [
    [
        'title'=>'lang(apidoc.apps.admin)',
        'path'=>'app\admin\controller',
        'folder'=>'admin',
        'groups'             => [
                ['title'=>'lang(apidoc.group.base)','name'=>'nouse'],
        ],
    ],
]
'params'=>[
    // 统一的请求Header
    'header'=>[
        ['name'=>'ShopId','type'=>'string','desc'=>'lang(apidoc.headers.shopId)'],
    ],
    // 统一的请求参数Query
    'query'=>[
        ['name'=>'code','type'=>'string','desc'=>'lang(apidoc.params.code)'],
    ],
],
// 统一的请求响应体
'responses'=>[
    'success'=>[
        ['name'=>'code','desc'=>'lang(apidoc.responses.code)','type'=>'int'],
        ['name'=>'message','desc'=>'lang(apidoc.responses.message)','type'=>'string'],
    ]
],
// md文档
'docs' => [
    ['title'=>'lang(apidoc.doc.about)','path'=>'docs/readme'],
],
```


## 接口注解多语言

如果的项目存在多种语言，希望在API接口的参数说明也能进行多语言切换，可对注解进行多语言变量引用


```php
/**
 * @Apidoc\Title ("lang(apidoc.api.lang.title)")
 * @Apidoc\Desc ("lang(apidoc.api.lang.desc)")
 * @Apidoc\Param("age",type="int",desc="lang(apidoc.api.lang.age)")
 * @Apidoc\Returned("name",type="string",desc="lang(apidoc.api.lang.name)")
 */
public function lang(Request $request){
    //...
}
```


## 数据表字段描述

通常很多接口中的字段描述是通过ref解析模型对应的数据表注释来得到的，当我们希望apidoc读取数据表注释时，也能实现多语言切换，只需要在字段注释中加入`lang(xxx)`即可，如下：

```php
CREATE TABLE `user` (↵  
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(64) NOT NULL COMMENT '用户名，lang(apidoc.table.user.username)',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称，lang(apidoc.table.user.nickname)',
  `password` char(64) NOT NULL COMMENT '登录密码，lang(apidoc.table.user.password)',
PRIMARY KEY (`id`)↵) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8"
```

如上例子中，字段注释中加入了`lang(xxx)`的内容，apidoc在解析该字段时，会使用多语言变量进行输出。




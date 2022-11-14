

# 代码模板




代码模板功能由 系统配置+模板+可视化页面配置来实现，代码的生成，方便前端或调用者通过所选接口/控制器快速生成代码



## 1、系统配置

配置文件`apidoc.php`中，


```php
// /config/apidoc.php
return [
    //...
    // （选配）代码模板
    'code_template'=>[
        [
            // （必须）标题
            'title'=>'vue前端Api文件',
            // （必须）选择模式，controller、api
            'select_mode'=>'controller',
            // （必须）是否多选
            'multiple'=>false,
            // （选配）限制接口/控制器勾选的数量
            'limit'=>1,
            // （必须）模板文件地址
            'template'=>'template\codes\fe_api_file.tpl',
            // （必须）代码语言
            'language'=>'javascript',
            // （选配）配置表单
            'form' => [
                // 表单元素布局方式 ，inline=联排；grid=网格
                'layout' => 'inline',
                // （必须）表单项
                'items' => [
                    [
                        // （必须）表单项标题
                        'title' => '请求封装import',
                        // （必须）表单项字段
                        'field' => 'http_import',
                        // （必须）输入类型，支持：input、select、checkbox
                        'type' => 'input'
                    ],
                    [
                        'title' => '显示注释',
                        'field' => 'show_desc',
                        'type' => 'checkbox'
                    ],
                ],
                // （选配）表单默认值
                'data'=>[
                    'http_import'=>'import sendRequest from "@/utils/request";',
                    'show_desc'=>true
                ]
            ],
        ],
        //...
    ]
]


```

通过如上配置，我们就可以看到页面右上角就出现 代码模板 的菜单了，点击弹出窗口



## 2、模板编写

根据以上配置中template模板目录，在指定位置创建模板文件，示例模板内容如下

```
{$form.http_import}

export const URLS = {
{foreach $data.children as $k=>$item}
    "{$item.name}": "{$item.url}",
{/foreach}
};

export default class {$lcfirst(data.controller)}Api {
{foreach $data.children as $k=>$item}
    {if '{$form.show_desc}'=='true'}// {$item.title}{/if}
    static {$item.name}(data) {
        return sendRequest(URLS.{$item.name}, data, "{$item.method}");
    }
{/foreach}
}

```


### 模板变量

以下数据为在模板中可使用的全部参数

```json
{
    // 页面中表单的参数
    "form": {
        // 根据自定义表单字段名取
        "key": "xxx"
    },
    // 所选接口/控制器所解析的数据，根据定义个选择类型与是否多选 该字段值有所不同
    // 1、当选择类型为单选控制器时
    "data": {
        "controller": "Base",
        "group": "base",
        "menuKey":"",
        "path":"",
        "title":"",
        "children":[
            {
                "author":"",
                "menuKey":"",
                "method":"",
                "name":"",
                "tag":"",
                "title":"",
                "url":""
            }
        ]
    },
    // 2、当选择类型为多选控制器时
    "data": [
        {
            // 此处数据与上面单选对象中参数一直
        }
    ],
    // 3、当选择类型为单选接口时
    "data": {
        "title":"接口名称",
        "url":"url",
        "author":"作者",
        "menuKey":"",
        "method":"GET",
        "name":"getPage",
        "header":[],
        "routeParam":[],
        "query":[
            {
                "name":"字段名",
                "desc":"字段描述",
                "require":"是否必填",
                "type":"字段类型",
                "children":[
                    {
                        // 多层数据，同上
                    }
                ]
            }
        ],
        "param":[
            // 同上 query
        ],
        "returned":[
            // 同上 query
        ],
        "responseError":[
            // 同上 query
        ],
        "responseSuccess":[
            // 同上 query
        ],
    },
     // 4、当选择类型为多选接口时
    "data": [
        {
            // 此处数据与上面单选对象中参数一直
        }
    ],
}
```

### 模板语法

模板内语法与 [接口生成器模板](/use/function/generator.html#模板语法) 语法相同


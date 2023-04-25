

# 处理自定义注解


配置文件`apidoc.php`中的 `parsesAnnotation` 来自定义处理注解参数。

举例：通过注解dict参数来关联“数据字典”的显示。

![dict-demo](/images/dict.gif)

```php
// 1、接口参数增加dict注解参数
#[Apidoc\Param(name:"type",type: "int",desc: "类型",dict: "testType")]
public function index(){
    //...
}

// 2、配置自定义处理函数
// apidoc.php
//自定义处理注解
'parsesAnnotation'=>function($data){
    // 这里面按自己的业务需求写逻辑
    if (!empty($data['dict'])){
        $data['md'] = \app\demo\services\Dict::renderApidocDictByCode($data);
    }
    return $data;
}

// 3、\app\demo\services\Dict 文件内容
namespace app\demo\services;
class Dict
{
    public static function renderApidocDictByCode($data){
        // 此处是webman的默认模板引擎写的
        $list = \app\model\Dict::get();
        $view= view('dict/render', [
            'desc' => $data['desc'],
            'code' => $data['dict'],
            'list' => $list,
        ],'common');
        $body = $view->rawBody();
        return $body;
    }
}

```

4、模板内容 dict/render.html

```html
<div class="dict-wraper">
    <div class="dict-code">
       <?=$desc?>，字典Code: <?=$code?>
    </div>
    <div class="dict-popover">
        <div class="dict-list">
            <table>
                <thead>
                 <tr>
                     <th>名称（name）</th>
                     <th>值（value）</th>
                     <th>说明（desc）</th>
                 </tr>
                </thead>
                <tbody>
                <?php
                foreach ($list as $item) {
                ?>
                <tr>
                    <td><?=$item['username']?></td>
                    <td><?=$item['id']?></td>
                    <td><?=$item['nickname']?></td>
                </tr>
                <?php }?>
                </tbody>
            </table>
        </div>
    </div>
</div>
```


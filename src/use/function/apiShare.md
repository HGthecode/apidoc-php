

# 接口分享

通过接口分享功能，可将全部、指定应用、指定接口生成分享链接，或自定义操作（如：下载成json文件、下载html、下载word）等实现。

## 配置开启接口分享功能

```php
// （选配）接口分享功能
'share'=>[
    // 是否开启接口分享功能
    'enable'=>true,
    // （选配）自定义接口分享操作，每个配置为一个按钮操作
    'actions'=>[
        [
            // 操作名称
            'name'=>'下载json',
            // 点击时触发的方法
            'click'=>function($shareData,$apiData){
                // 这里面自定义实现你要的功能，此处仅简单的保存一个json文件并下载
                $path = "test.json";
                $jsonFile = fopen(public_path().$path, "w") or die("Unable to open file!");
                $txt = json_encode($apiData);
                fwrite($jsonFile, $txt);
                fclose($jsonFile);
                // 返回js给前端执行，内置了downloadFile方法来执行文件下载
                return 'downloadFile("/'.$path.'","'.$shareData['name'].'");';
            }
        ]
    ]
],
```

配置完成后，打开Apidoc页面右上角“工具”下的接口分享菜单即可操作接口分享了

# 控制器注释

为控制器加上一些注释，以让文档可读性更高（当然这不是必须的）
```php
<?php
namespace app\controller;
use hg\apidoc\annotation as Apidoc;

/**
 * 标题也可以这样直接写
 * @Apidoc\Title("基础示例")
 * @Apidoc\Group("base")
 * @Apidoc\Sort(1)
 */
class ApiDocTest
{
  //...    
}
```

## 注释参数

|参数名|参数值|说明|
|-|-|-|
|Title| |	控制器标题，也可以直接写在注释最前面一行 |	
|Group| 定义在配置文件 groups 中分组的name	|所属分组 |	
|Sort| number | 控制器排序|


## 特殊参数

|参数名|说明|
|-|-|	
|NotParse| 不需要解析Api文档的控制器 |	
|NotDebug| 关闭该控制器的接口调试 |

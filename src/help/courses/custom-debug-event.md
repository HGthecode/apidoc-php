# 自定义调试时事件



## 配置自定义试时事件处理函数：

> 以下示例为自定义`setToken`方法，将请求中指定字段的值处理（加上Bearer ），并将其设置到全局请求参数

```js
// apidoc/config.js
window.apidocFeConfig = {
  // ...
  // （选配）调试时事件，处理参数值的方法
  DEBUG_EVENTS:{
    //...,
    // 自定义设置token到全局请求参数
    setToken(param){
      return new Promise((resolve, reject) => {
        const token=`Bearer ${param.value}`
        this.setGlobalHeader({
          ...param,
          value:token
        })
        .then(()=>resolve(param))
        .catch(err=>reject(err))
      })
    }
  }
}
```

## 接口注解时使用

```php
  #[Apidoc\Title("登录事件")]
  #[Apidoc\Method("POST")]
  #[Apidoc\After(event: "setToken",key: "Authorization",value: "res.data.data.token",desc: "设置全局token")]
  public function login(Request $request){
    //伪代码
    $res = [
        'uid'=>1,
        'token' => uniqid()
    ];
    return json(['code' => 0, 'data' => $res]);
  }
```

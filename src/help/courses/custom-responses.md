# 自定义请求响应的显示


![custom-res](/images/custom-res.png)


## 配置自定义处理函数：

> 以下示例为自定义生成一个当前请求url的跳转新窗口访问的按钮

```js
// apidoc/config.js
window.apidocFeConfig = {
    // ...
    // 自定义方法
  CUSTOM_METHODS:{
    // 自定义响应显示
    RESPONSES_VIEW:function({result}){
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
      if (result.data) {
        const url = `${result.config.baseURL}${result.config.url}${urlEncode(result.config.params)}`
        let hrefButton = `<div class="flex">
        <div class="responses-href-url flex-item">${url}</div>
        <div><a href="${url}" target="_blank" class="ant-btn" type="button" ><span>访问</span></a></div>
        </div>`

        if(typeof result.data =="string"){
          return hrefButton+result.data
        }
        return {
          html:hrefButton,
          code:result.data
        }
      }
      return result.data
    }
  },
}
```

## 自定义样式

```css
/** apidoc/style.css */
.responses-href-url{
    border:1px solid #ddd;
    margin-bottom: 10px;
    padding: 4px;
}
```

# Mock 调试数据

在接口调试时，往往需要填写大量的测试数据来进行请求测试；

有了 Mock 数据的功能，在调试时，自动根据规则生成调试数据，接口调试更高效。

## 注解方式

只需要在接口注解的`Query`、`Param`中加入`mock`的配置即可

::: code-tabs#apiMock1

@tab:active PHP8 原生注解

```php
#[
  Apidoc\Method("POST"),
  Apidoc\Param("number",type:"int",mock:"@integer(10, 100)"),
  Apidoc\Param("boolean",type:"boolean",mock:"@boolean"),
  Apidoc\Param("date",type:"date",mock:"@date"),
  Apidoc\Param("time",type:"time",mock:"@time('H:m')"),
  Apidoc\Param("datetime",type:"datetime",mock:"@datetime('yyyy-MM-dd HH:mm:ss')"),
  Apidoc\Param("string",type:"string",mock:"@string"),
  Apidoc\Param("name",type:"string",mock:"@cname"),
  Apidoc\Param("text",type:"string",mock:"@cparagraph"),
  Apidoc\Param("image",type:"string",mock:"@image('200x100')"),
  Apidoc\Param("color",type:"string",mock:"@color"),
  Apidoc\Param("phone",type:"string",mock:"@phone"),
]
public function mock(Request $request){
  //...
}
```

@tab 原始注解

```php
/**
 * @Apidoc\Method("POST")
 * @Apidoc\Param("number",type="int",mock="@integer(10, 100)")
 * @Apidoc\Param("boolean",type="boolean",mock="@boolean")
 * @Apidoc\Param("date",type="date",mock="@date")
 * @Apidoc\Param("time",type="time",mock="@time('H:m')")
 * @Apidoc\Param("time",type="datetime",mock="@datetime('yyyy-MM-dd HH:mm:ss')")
 * @Apidoc\Param("string",type="string",mock="@string")
 * @Apidoc\Param("name",type="string",mock="@cname")
 * @Apidoc\Param("text",type="string",mock="@cparagraph")
 * @Apidoc\Param("image",type="string",mock="@image('200x100')")
 * @Apidoc\Param("color",type="string",mock="@color")
 * @Apidoc\Param("phone",type="string",mock="@phone")
 */
public function mock(Request $request){
  //...
}
```

:::

## 数据表字段 Mock

当我们希望 ref 引用数据表的字段，也能配置字段的 mock 规则，只需要在字段注释中加入`mock(xxx)`即可，如下：

```php
CREATE TABLE `user` (↵
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(64) NOT NULL COMMENT '姓名，mock(@cname)',
  `age` varchar(64) DEFAULT NULL COMMENT '年龄，mock(@integer(1, 150))',
PRIMARY KEY (`id`)↵) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8"
```

:::tip Mock 规则
以下为内置规则，自定义规则请查看[自定义 mock 规则]()
:::

## 自定义 mock 规则

如果以上内置规则无法满足，你可以通过配置文件自定义规则来实现

1、`config.js`配置文件中加入自定义规则，如下

```js
window.apidocFeConfig = {
  //...
  MOCK_EXTENDS: {
    abc(a) {
      return `abc-${a}`;
    },
  },
};
```

2、注解中直接使用

::: code-tabs#apiMock2

@tab:active PHP8 原生注解

```php

#[Apidoc\Param("abc",type:"string",mock:"@abc('666')")]
public function index(Request $request){
    //...
}
```

@tab 原始注解

```php

/**
 * @Apidoc\Param("abc",type="string",mock="@abc('666')")
 */
public function index(Request $request){
    //...
}
```

:::

## 基础

### @boolean

随机获得一个 boolean 值

```javascript
@boolean
// true

```

### @natural

随机获得一个自然数，可指定范围`@natural(min, max)`

```javascript
@natural
// 8137814963804528

@natural(10000)
// 7797466542198811

@natural(60, 100)
// 93
```

### @integer

随机获得一个整数，可指定范围`@integer(min, max)`

```javascript
@integer
// 2994973617286844

@integer(10000)
// 2405323822479268

@integer(60, 100)
// 80
```

### @float

随机获得一个浮点数，可指定范围`@float(min, max, dmin, dmax)`

```javascript
@float
// 7259904392499748

@float(0)
// 8638086838442049

@float(60, 100)
// 87.08081

@float(60, 100, 3)
// 83.6886314

@float(60, 100, 3, 5)
// 69.4772
```

### @character

随机获得一个字符，可指定`@character('lower/upper/number/symbol')`

- lower：小写字母
- upper：大写字母
- number：数字
- symbol：符号

```javascript
@character
// "m"

@character("lower")
// "j"

@character("upper")
// "F"
```

### @string

随机获得一个字符串

- 指定长度：`@string(length)`
- 指定长度范围：`@string(min, max)`
- 指定类型与长度：`@string('lower/upper/number/symbol', length)`
- 指定类型与长度范围：`@string('lower/upper/number/symbol', min, max)`

```javascript
@string
// "PN@ty"

@string(5)
// "#bZSZ"

@string("lower", 5)
// "ryhyx"
@string("upper", 5)
// "MCCMQ"

@string(7, 10)
// "nyBH2rx#R"

@string("lower", 1, 3)
// "nwo"
```

### @range

随机获得一个范围的数组

- 指定结束的值：`@range(stop)`
- 指定开始、结束的值：`@range(start, stop)`
- 指定开始、结束、步长：`@range(start, stop, step)`

```javascript
@range(10)
// [0,1,2,3,4,5,6,7,8,9]

@range(3, 7)
// [3,4,5,6]

@range(1, 10, 2)
// [1,3,5,7,9]
```

## 日期时间

### @date

随机获得一个日期

- 指定格式：`@date(format)`

```javascript
@date
// 2013-06-13

@date("yyyy-MM-dd")
// 1999-06-21

@date("yyyy/MM/dd")
// 1983/01/25

@date("yy-MM-dd")
// 98-08-03
```

### @time

随机获得一个时间

- 指定格式：`@time(format)`

```javascript
@time
// 12:02:49

@time("A HH:mm:ss")
// AM 04:57:02

@time("a HH:mm:ss")
// pm 15:40:04

@time("HH:mm:ss")
// 09:35:22
```

### @datetime

随机获得一个时间

- 指定格式：`@datetime(format)`

```javascript
@datetime
// 2010-01-13 23:59:05

@time("A HH:mm:ss")
// AM 04:57:02

@time("a HH:mm:ss")
// pm 15:40:04

@time("HH:mm:ss")
// 09:35:22
```

### @now

随机获得一个以当前为基础的日期时间

- 指定单位：`@now('year/month/week/day/hour/minute/second')`
- 指定格式：`@now(format)`

```javascript
@now
// 2021-08-03 10:38:52

@now("year")
// 2021-01-02 00:00:00

@now("month")
// 2021-08-02 00:00:00

@now("week")
// 2021-08-03 00:00:00

@now("day")
// 2021-08-03 00:00:00

@now("hour")
// 2021-08-03 10:00:00

@now("yyyy-MM-dd HH:mm:ss SS")
// 2021-08-03 10:38:52 148

@now('day', 'yyyy-MM-dd HH:mm:ss SS')
// 2021-08-12 00:00:00 000
```

## 图片

### @image

随机获得一个图片地址

- 指定内容 `@image(size, background, foreground, format, text)`

```javascript
@image
// https://dummyimage.com/200x200

@image('200x100')
// https://dummyimage.com/200x100

@image('200x100', '#FF6600')
// https://dummyimage.com/200x100/FF6600

@image('200x100', '#4A7BF7', 'Hello')
// https://dummyimage.com/200x100/4A7BF7&text=Hello

@image('200x100', '#50B347', '#FFF', 'Apidoc')
// https://dummyimage.com/200x100/50B347/FFF&text=Apidoc

@image('200x100', '#894FC4', '#FFF', 'png', '!')
// https://dummyimage.com/200x100/894FC4/FFF.png&text=!
```

### @dataImage

随机获得一个 base64 图片

- 指定内容 `@dataImage(size, text)`

```javascript
@dataImage
// data:image/png;base64, .....

@dataImage('200x100')
// data:image/png;base64, .....

@dataImage('200x100', 'Hello Apidoc!')
// data:image/png;base64, .....
```

## 颜色

### @color

随机获得一个颜色值

```javascript
@color
// #79f2b4
```

### @hex

随机获得一个 hex 格式的颜色值

```javascript
@hex
// #f279ca
```

### @rgb

随机获得一个 rgb 格式的颜色值

```javascript
@rgb
// rgb(242, 211, 121)
```

### @rgba

随机获得一个 rgba 格式的颜色值

```javascript
@rgba
// rgba(242, 211, 121, 0.26)
```

### @hsl

随机获得一个 hsl 格式的颜色值

```javascript
@hsl
// hsl(299, 82, 71)
```

## 文本

### @paragraph

随机获得一段文本

- 指定长度 `@paragraph(length)`
- 指定长度范围 `@paragraph(min, max)`

```javascript
@paragraph
// "Cmealuulh egeilrl wluugtmeg lcnyripd ulqjency etjwsrtck etpqh cytx mmxuvpn xgltiwn gtlswx pejpey swwbx. Otmggk qwib bjbn xqqbzljhem ogvxyf xzcti ekacgtnwp gfdlnftsz nnop yeqqgro yqhm ofcy nydy cdrpyvj lubjkyeo. Jqmuw chcwnq lenof ebiybquma twvbnsnl grg djurcqmwx ufow hlliuo tenom zevg iuqobks bwkkxh pyhucl ingnlebgz jtodh."

@paragraph(2)
// "Seh tki ycusfroo jzudml yordvd zekp mugpcmm ranej scdyrw gvfuvjpf xgyrmit bfgmjxvju okonu cxfelx tnfmmjt unddrhbbtg wjrkeu. Lwtm rhuh zquqdx vgbxbmu rem cganfovr xcecvzwuf fbsukl tblwib axtavkx kxdn ljws jihbcxino pxtgoq iedlp snhq."

@paragraph(1, 3)
// "Khrquxgdv viabvdx yuzlshy rpeoeh xxqgye lclfasktcl dogp jeiii kyxyxvbb esrv esxa uljsshg. Yhp ejfhlun nce xua keakdu llrqxoq ewnyvcyl ecoinwq iifnejlgme wbkwdhec foxdulztyj fqups zfdlqva ptppkz."
```

### @sentence

随机获得一个句子

- 指定长度 `@paragraph(length)`
- 指定长度范围 `@paragraph(min, max)`

```javascript
@sentence
// "Yfdpvct ywneoog tulwe senlh avslxwj ffxjpfeebh knypcz mjpx ucmgqplrb jekmtop qzgsm csqnjg txmxu zmhegfz pwrsmqccs jkhpt."

@sentence(5)
// "Hmayhzx ivrk jxbej vvfmcnuuq zjqdjp."

@sentence(3, 5)
// "Indo rebn ocon ycwpgj."
```

### @word

随机获得一个文本

- 指定长度 `@word(length)`
- 指定长度范围 `@word(min, max)`

```javascript
@word
// "bggnypex"

@word(5)
// "fhvqg"

@word(3, 5)
// "xqdy"
```

### @title

随机获得一个标题

- 指定长度 `@title(length)`
- 指定长度范围 `@title(min, max)`

```javascript
@title
// "Xbiz Wpkfirxrc Iekbn Hzreio Vksv Mrixhk Krwnf"

@title(5)
// "Luzbtjlr Ochd Mibotdsmri Dcpcr Mthbz"

@title(3, 5)
// "Vtqw Jct Loasetdthg Cghvwuk"
```

### @cparagraph

随机获得一段中文文本

- 指定长度 `@cparagraph(length)`
- 指定长度范围 `@cparagraph(min, max)`

```javascript
@cparagraph
// "林律平织代结自术党要真成局。越斯低知称代中区细北表关品断。在增看无片长百活已团布接青争两究西。北打酸心铁相克根八经如再装前角由。容根算打少养严江制社器为我认。无验四口但做西今位制党装用。动也精子照把质被已大才七下想部。"

@cparagraph(5)
// "么办给基率自细程强队社经这千。少立应常须开广情较计体命子动被。"

@cparagraph(3, 5)
// "料难导利极些性通业照周亲员包思认铁。团学细化从查新做来者民细。"
```

### @csentence

随机获得一句中文文本

- 指定长度 `@csentence(length)`
- 指定长度范围 `@csentence(min, max)`

```javascript
@csentence
// "约二证年专话采识路验回已难平管解习。"

@csentence(5)
// "见九思达识。"

@csentence(3, 5)
// "转米变。"
```

### @cword

随机获得一个中文文本

- 指定随机字符 `@cword(pool)`
- 指定长度 `@cword(length)`
- 指定随机字符、长度 `@cword(pool,length)`
- 指定长度范围 `@cword(min, max)`
- 指定随机字符、长度范围 `@cword(pool, min, max)`

```javascript
@cword
// "合"

@cword('零一二三四五六七八九十')
// "三"

@cword(3)
// "拉等示"

@cword("零一二三四五六七八九十", 3)
// "五六十"

@cword(3, 5)
// "青圆统"

@cword("零一二三四五六七八九十", 5, 7)
// "一三四零二一"
```

### @ctitle

随机获得一个中文标题

- 指定长度 `@ctitle(length)`
- 指定长度范围 `@ctitle(min, max)`

```javascript
@ctitle
// "图部称难直记"

@ctitle(5)
// "光派要何给"

@ctitle(3, 5)
// "圆带火带"
```

## 姓名

### @first

随机获得一个姓

```javascript
@first
// "Laura"
```

### @last

随机获得一个名

```javascript
@last
// "White"
```

### @name

随机获得一个姓名

```javascript
@name
// "James Thompson"
```

### @cfirst

随机获得一个中文姓

```javascript
@cfirst
// "张"
```

### @clast

随机获得一个中文名

```javascript
@clast
// "航"
```

### @cname

随机获得一个中文姓名

```javascript
@cname
// "杜芳"
```

## 网络

### @url

随机获得一个 url 地址

```javascript
@url
// "http://atdcptravt.tc/wlrsdlbkwl"
```

### @domain

随机获得一个域名

```javascript
@domain
// "suix.cn"
```

### @protocol

随机获得一个协议名

```javascript
@protocol
// "gopher"
```

### @email

随机获得一个 Email

```javascript
@email
// "p.jldur@hgvxebirz.ca"
```

### @ip

随机获得一个 ip 地址

```javascript
@ip
// "157.234.240.60"
```

## 地址

### @region

随机获得一个地区

```javascript
@region
// "华东"
```

### @province

随机获得一个省份

```javascript
@province
// "天津"
```

### @city

随机获得一个城市

- 是否包含省份 `@city(prefix)`

```javascript
@city
// "晋中市"

@city(true)
// 吉林省 松原市

```

### @county

随机获得一个县/区

- 是否包含省份、城市 `@county(prefix)`

```javascript
@county
// "芦山县"

@county(true)
// "湖南省 株洲市 攸县"
```

### @zip

随机获得一个邮编

```javascript
@zip
// "151840"
```

### @zip

随机获得一个邮编

```javascript
@zip
// "151840"
```

## 其它

### @pick

指定数组中随机抽取一个值

```javascript
@pick(["a", "e", "i", "o", "u"])
// "o"
```

### @shuffle

重组数组中值的位置

```javascript
@pick(["a", "e", "i", "o", "u"])
// ["u","i","o","a","e"]
```

### @guid

获得一个 guid 字符串

```javascript
@guid
// "D8AA2eAf-DcaD-749c-efAB-de4c826cD6FD"
```

### @id

获得一个 id

```javascript
@id
// "350000201612198267"
```

### @phone

随机获得一个 11 位手机号

```javascript
@phone
// "13100667890"
```

### @idcard

随机获得一个 18 位 S·F·Z 号码

```javascript
@idcard
// "450311198810100505"
```

### @regexp

指定长度 `@paragraph(reg, leng)`

根据正则生成数据

```javascript
@regexp('/\[a-z]{5,10}\-/',3)
// "feyoiga-eqiig-pbyriaj-"
```

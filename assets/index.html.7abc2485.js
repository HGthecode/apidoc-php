import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as i,b as n,d as e,e as a,a as c,r as l}from"./app.7f78080c.js";const p={},d=n("h1",{id:"建议及规范",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#建议及规范","aria-hidden":"true"},"#"),e(" 建议及规范")],-1),u=n("h2",{id:"建议",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#建议","aria-hidden":"true"},"#"),e(" 建议")],-1),r={href:"https://plugins.jetbrains.com/plugin/7320-php-annotations",target:"_blank",rel:"noopener noreferrer"},m={href:"https://demo-tp6.apidoc.icu/apidoc/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/HGthecode/apidoc-demos",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="书写规范" tabindex="-1"><a class="header-anchor" href="#书写规范" aria-hidden="true">#</a> 书写规范</h2><div class="custom-container warning"><p class="custom-container-title">书写参数时有如下几个规范</p><ul><li>控制器必须<code>use</code>引入注释解释文件</li><li>每个参数以 @+参数名(&quot;参数值&quot;,子参数名=&quot;子参数值&quot;,...)</li><li>子参数需用双引号包裹</li></ul></div><h2 id="举例" tabindex="-1"><a class="header-anchor" href="#举例" aria-hidden="true">#</a> 举例</h2><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>demo<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">app<span class="token punctuation">\\</span>BaseController</span><span class="token punctuation">;</span>
<span class="token comment">// 必须的</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 基础示例
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">Base</span> <span class="token keyword">extends</span> <span class="token class-name">BaseController</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * @Apidoc\\Title(&quot;基础的接口演示&quot;)
     * @Apidoc\\Author(&quot;HG&quot;)
     * @Apidoc\\Tag(&quot;基础,示例&quot;)
     * @Apidoc\\Url (&quot;/demo/index&quot;)
     * @Apidoc\\Method (&quot;GET&quot;)
     * @Apidoc\\Query(&quot;name&quot;, type=&quot;string&quot;,require=true, desc=&quot;姓名&quot;,mock=&quot;@name&quot;)
     * @Apidoc\\Query(&quot;phone&quot;, type=&quot;string&quot;,require=true, desc=&quot;手机号&quot;,mock=&quot;@phone&quot;)
     * @Apidoc\\Query(&quot;sex&quot;, type=&quot;int&quot;,desc=&quot;性别&quot; ,mock=&quot;@integer(0, 1)&quot;)
     * @Apidoc\\Returned(&quot;id&quot;, type=&quot;int&quot;, desc=&quot;id&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function h(q,b){const s=l("ExternalLinkIcon");return o(),i("div",null,[d,u,n("ul",null,[n("li",null,[n("p",null,[e("如果你使用PHPStorm的话，建议安装PHP "),n("a",r,[e("Annotations插件"),a(s)]),e("，可以支持注解的语法提示及自动完成")])]),n("li",null,[n("p",null,[e("配合查看"),n("a",m,[e("演示项目"),a(s)]),e("与"),n("a",v,[e("演示源码"),a(s)]),e("上手更快哦！")])])]),k])}const g=t(p,[["render",h],["__file","index.html.vue"]]);export{g as default};

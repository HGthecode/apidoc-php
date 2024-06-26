import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.ae28eb48.js";const p={},t=e(`<h1 id="没有解析出接口文档" tabindex="-1"><a class="header-anchor" href="#没有解析出接口文档" aria-hidden="true">#</a> 没有解析出接口文档</h1><p>正常安装好Apidoc后，发现页面的接口列表没有任何接口列出；可检查以下几个可能。</p><h2 id="_1、apps的path没有配置正确" tabindex="-1"><a class="header-anchor" href="#_1、apps的path没有配置正确" aria-hidden="true">#</a> 1、apps的path没有配置正确</h2><p>检查 apidoc.php 配置文件的 apps 中的path是否配置正确，如下</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token comment">// 此处忽略其它配置项</span>

    <span class="token comment">// （必须）设置文档的应用/版本</span>
    <span class="token string single-quoted-string">&#39;apps&#39;</span>           <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
        <span class="token comment">// （必须）标题</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;接口示例&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// （必须）控制器目录地址，也可以是数组来指定多个控制器目录，如：[&#39;app\\demo\\controller&#39;,&#39;app\\test\\controller&#39;]</span>
        <span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\controller&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、无接口注解" tabindex="-1"><a class="header-anchor" href="#_2、无接口注解" aria-hidden="true">#</a> 2、无接口注解</h2><p>检查以上apps配置的path控制器目录下，是否有控制器的接口按Apidoc的方式注解了接口参数。</p>`,7),i=[t];function l(o,c){return s(),a("div",null,i)}const u=n(p,[["render",l],["__file","notApis.html.vue"]]);export{u as default};

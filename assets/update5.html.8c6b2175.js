import{D as s}from"./DownloadFe.79dbedaf.js";import{f as o,o as t,c as i,e as n,w as d,a as e,r as c,u}from"./app.15bfc997.js";import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";const p=e(`<h1 id="v4升级到v5" tabindex="-1"><a class="header-anchor" href="#v4升级到v5" aria-hidden="true">#</a> V4升级到V5</h1><h2 id="升级扩展" tabindex="-1"><a class="header-anchor" href="#升级扩展" aria-hidden="true">#</a> 升级扩展</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">composer</span> require hg/apidoc:5.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先卸载</span>
<span class="token function">composer</span> remove hg/apidoc

<span class="token comment"># 再安装</span>
<span class="token function">composer</span> require hg/apidoc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="升级前端文件" tabindex="-1"><a class="header-anchor" href="#升级前端文件" aria-hidden="true">#</a> 升级前端文件</h2>`,6),r=e(`<p>config.js 配置文件，根据自身项目情况酌情替换</p><h2 id="修改注解" tabindex="-1"><a class="header-anchor" href="#修改注解" aria-hidden="true">#</a> 修改注解</h2><h2 id="_1、子参数嵌套注解的变化" tabindex="-1"><a class="header-anchor" href="#_1、子参数嵌套注解的变化" aria-hidden="true">#</a> 1、子参数嵌套注解的变化</h2><p>V4版本中<code>Query</code>,<code>Param</code>,<code>Returned</code>的子参数，直接在参数注解中嵌套书写注解，如下：</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * @Apidoc\\Title (&quot;V4版本的子参数嵌套注解写法&quot;)
 * @Apidoc\\Method(&quot;POST&quot;)
 * @Apidoc\\Param(&quot;list&quot;,type=&quot;array&quot;, desc=&quot;对象数组&quot;,childrenType=&quot;object&quot;
 *     @Apidoc\\Param(&quot;name&quot;,type=&quot;string&quot;,desc=&quot;名称&quot;),
 *     @Apidoc\\Param(&quot;code&quot;,type=&quot;int&quot;,desc=&quot;编号&quot;),
 * )
 */</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>V5版本中<code>Query</code>,<code>Param</code>,<code>Returned</code>的子参数，使用children嵌套书写注解，如下：</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * @Apidoc\\Title (&quot;V5版本的子参数嵌套注解写法&quot;)
 * @Apidoc\\Method(&quot;POST&quot;)
 * @Apidoc\\Param(&quot;list&quot;,type=&quot;array&quot;, desc=&quot;对象数组&quot;,childrenType=&quot;object&quot;,children=<span class="token punctuation">{</span>
 *     @Apidoc\\Param(&quot;name&quot;,type=&quot;string&quot;,desc=&quot;名称&quot;),
 *     @Apidoc\\Param(&quot;code&quot;,type=&quot;int&quot;,desc=&quot;编号&quot;),
 * <span class="token punctuation">}</span>)
 */</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、请求事件注解变化" tabindex="-1"><a class="header-anchor" href="#_2、请求事件注解变化" aria-hidden="true">#</a> 2、请求事件注解变化</h2><p>主要调整了ajax事件的前置和后置事件的注解方式</p><p>V4版本中的Ajax事件注解</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * @Apidoc\\Method(&quot;POST&quot;)
 * @Apidoc\\Before(event=&quot;ajax&quot;,url=&quot;/demo/test/getFormToken&quot;,method=&quot;POST&quot;,
 *    @Apidoc\\Before(event=&quot;setBody&quot;,value=&quot;body.&quot;),
 *    @Apidoc\\Before(event=&quot;setBody&quot;,key=&quot;formToken&quot;,value=&quot;123&quot;),
 *    @Apidoc\\After(event=&quot;setHeader&quot;,key=&quot;X-CSRF-TOKEN&quot;,value=&quot;res.data.data.token&quot;)
 * )
 */</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>V5版本中的Ajax事件注解</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * @Apidoc\\Method(&quot;POST&quot;)
 * @Apidoc\\Before(event=&quot;ajax&quot;,value=&quot;body.&quot;,url=&quot;/demo/test/getFormToken&quot;,method=&quot;POST&quot;,before=<span class="token punctuation">{</span>
 *    @Apidoc\\Before(event=&quot;setBody&quot;,key=&quot;formToken&quot;,value=&quot;123&quot;)
 * <span class="token punctuation">}</span>,after=<span class="token punctuation">{</span>
 *    @Apidoc\\After(event=&quot;setHeader&quot;,key=&quot;X-CSRF-TOKEN&quot;,value=&quot;res.data.data&quot;)
 * <span class="token punctuation">}</span>)
 */</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、废弃mdref处理" tabindex="-1"><a class="header-anchor" href="#_3、废弃mdref处理" aria-hidden="true">#</a> 3、废弃mdRef处理</h2><p>影响注解 <code>Header</code> <code>Query</code> <code>RouteParam</code> <code>Param</code> <code>Returned</code> <code>AddField</code></p><p>V4版本可通过注解mdRef参数来引用markdown文档内容：</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * @Apidoc\\Method(&quot;GET&quot;)
 * @Apidoc\\Param(&quot;name&quot;, type=&quot;string&quot;, desc=&quot;姓名&quot;,mdRef=&quot;/docs/apiDesc.md#name字段&quot; )
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>V5版本直接将markdown地址注解到md参数中即可：</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * @Apidoc\\Method(&quot;GET&quot;)
 * @Apidoc\\Param(&quot;name&quot;, type=&quot;string&quot;, desc=&quot;姓名&quot;,md=&quot;/docs/apiDesc.md#name字段&quot; )
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),m=o({__name:"update5.html",setup(v){return(q,h)=>{const a=c("ClientOnly");return t(),i("div",null,[p,n(a,null,{default:d(()=>[n(u(s))]),_:1}),r])}}}),g=l(m,[["__file","update5.html.vue"]]);export{g as default};

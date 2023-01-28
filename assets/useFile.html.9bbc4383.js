import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.21b7d189.js";const p={},t=e(`<h1 id="引入apidoc注解" tabindex="-1"><a class="header-anchor" href="#引入apidoc注解" aria-hidden="true">#</a> 引入Apidoc注解</h1><p>控制器必须引入注释解释文件，否则会出现<code>[Semantical Error] The annotation...</code>的报错</p><h2 id="引入方式一-推荐" tabindex="-1"><a class="header-anchor" href="#引入方式一-推荐" aria-hidden="true">#</a> 引入方式一（推荐）</h2><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>
<span class="token comment">// 添加这句，注释写法为 @Apidoc\\参数名(...)</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Apidoc\\Title(&quot;基础示例&quot;)
 * @Apidoc\\Group(&quot;base&quot;)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span>
   <span class="token doc-comment comment">/**
    * @Apidoc\\Title(&quot;测试接口&quot;)
    * ...
    */</span> 
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引入方式二" tabindex="-1"><a class="header-anchor" href="#引入方式二" aria-hidden="true">#</a> 引入方式二</h2><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>
<span class="token comment">// 分别引入这些解释文件，注释写法为 @参数名(...)</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Title</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Group</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Desc</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Author</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Url</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Tag</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Param</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Returned</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>

<span class="token doc-comment comment">/**
 * @Title(&quot;基础示例&quot;)
 * @Group(&quot;base&quot;)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span>
   <span class="token doc-comment comment">/**
    * @Title(&quot;测试接口&quot;)
    * ...
    */</span> 
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[t];function i(o,l){return s(),a("div",null,c)}const k=n(p,[["render",i],["__file","useFile.html.vue"]]);export{k as default};

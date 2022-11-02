import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.05e62024.js";const p={},t=e(`<h1 id="\u5F15\u5165apidoc\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165apidoc\u6CE8\u89E3" aria-hidden="true">#</a> \u5F15\u5165Apidoc\u6CE8\u89E3</h1><p>\u63A7\u5236\u5668\u5FC5\u987B\u5F15\u5165\u6CE8\u91CA\u89E3\u91CA\u6587\u4EF6\uFF0C\u5426\u5219\u4F1A\u51FA\u73B0<code>[Semantical Error] The annotation...</code>\u7684\u62A5\u9519</p><h2 id="\u5F15\u5165\u65B9\u5F0F\u4E00-\u63A8\u8350" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165\u65B9\u5F0F\u4E00-\u63A8\u8350" aria-hidden="true">#</a> \u5F15\u5165\u65B9\u5F0F\u4E00\uFF08\u63A8\u8350\uFF09</h2><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>
<span class="token comment">// \u6DFB\u52A0\u8FD9\u53E5\uFF0C\u6CE8\u91CA\u5199\u6CD5\u4E3A @Apidoc\\\u53C2\u6570\u540D(...)</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Apidoc\\Title(&quot;\u57FA\u7840\u793A\u4F8B&quot;)
 * @Apidoc\\Group(&quot;base&quot;)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span>
   <span class="token doc-comment comment">/**
    * @Apidoc\\Title(&quot;\u6D4B\u8BD5\u63A5\u53E3&quot;)
    * ...
    */</span> 
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5F15\u5165\u65B9\u5F0F\u4E8C" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165\u65B9\u5F0F\u4E8C" aria-hidden="true">#</a> \u5F15\u5165\u65B9\u5F0F\u4E8C</h2><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>
<span class="token comment">// \u5206\u522B\u5F15\u5165\u8FD9\u4E9B\u89E3\u91CA\u6587\u4EF6\uFF0C\u6CE8\u91CA\u5199\u6CD5\u4E3A @\u53C2\u6570\u540D(...)</span>
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
 * @Title(&quot;\u57FA\u7840\u793A\u4F8B&quot;)
 * @Group(&quot;base&quot;)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span>
   <span class="token doc-comment comment">/**
    * @Title(&quot;\u6D4B\u8BD5\u63A5\u53E3&quot;)
    * ...
    */</span> 
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[t];function i(o,l){return s(),a("div",null,c)}const k=n(p,[["render",i],["__file","useFile.html.vue"]]);export{k as default};

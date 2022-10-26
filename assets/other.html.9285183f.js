import{D as p}from"./DownloadFe.038940e2.js";import{g as i,o as c,c as o,e as n,w as l,d as s,a as d,f as a,r as e,u as r}from"./app.4b77f751.js";import{_ as k}from"./_plugin-vue_export-helper.cdc0426e.js";const v=d(`<h1 id="webman-\u5176\u5B83\u6846\u67B6\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#webman-\u5176\u5B83\u6846\u67B6\u5B89\u88C5" aria-hidden="true">#</a> Webman/\u5176\u5B83\u6846\u67B6\u5B89\u88C5</h1><div class="custom-container tip"><p class="custom-container-title">\u5176\u5B83\u6846\u67B6\u517C\u5BB9</p><p>\u7406\u8BBA\u4E0AApidoc\u53EF\u901A\u8FC7\u624B\u52A8\u914D\u7F6E\u6765\u517C\u5BB9\u4EFB\u4F55\u57FA\u4E8Ecomposer\u7684\u6846\u67B6\uFF0C\u6B64\u5904\u4EE5Webman\u6846\u67B6\u4E3A\u4F8B\u6765\u624B\u52A8\u9002\u914D\u517C\u5BB9</p></div><h2 id="_1\u3001\u5B89\u88C5\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u5B89\u88C5\u63D2\u4EF6" aria-hidden="true">#</a> 1\u3001\u5B89\u88C5\u63D2\u4EF6</h2><p>\u8FDB\u5165\u9879\u76EE\u6839\u76EE\u5F55\uFF0C\u6267\u884C\u5982\u4E0B\u547D\u4EE4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>composer require hg/apidoc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2\u3001\u521B\u5EFA\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u521B\u5EFA\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 2\u3001\u521B\u5EFA\u914D\u7F6E\u6587\u4EF6</h2><p>\u6839\u636E\u6846\u67B6\u89C4\u8303\u5728\u6307\u5B9A\u76EE\u5F55\u521B\u5EFA\u914D\u7F6E\u6587\u4EF6\uFF0C\u4EE5webman\u4E3A\u4F8B\u3002</p><p>\u5728 <code>config/plugin</code>\u76EE\u5F55\u4E0B\u521B\u5EFA <code>hg/apidoc/</code>\u76EE\u5F55\uFF0C\u5E76\u5728\u8BE5\u76EE\u5F55\u4E0B\u521B\u5EFA<code>app.php</code> <code>route.php</code>\u6587\u4EF6\uFF0C\u521B\u5EFA\u540E\u76EE\u5F55\u7ED3\u6784\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>|- config
   |- plugin
     |-hg
       |-apidoc
         |- app.php
         |- route.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>app.php\u4EE3\u7801</summary><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;enable&#39;</span>  <span class="token operator">=&gt;</span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;apidoc&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6587\u6863\u6807\u9898</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span>              <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;API\u63A5\u53E3\u6587\u6863&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// \u8BBE\u7F6E\u53EF\u9009\u7248\u672C</span>
        <span class="token string single-quoted-string">&#39;apps&#39;</span>           <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token comment">//...</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>route.php\u4EE3\u7801</summary><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">use</span> <span class="token package">Webman<span class="token punctuation">\\</span>Route</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>providers<span class="token punctuation">\\</span>CommonService</span><span class="token punctuation">;</span>
<span class="token comment">// \u6CE8\u518CApidoc\u6240\u9700\u8DEF\u7531</span>
<span class="token class-name static-context">CommonService</span><span class="token operator">::</span><span class="token function">registerApidocRoutes</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;uri&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token class-name class-name-fully-qualified static-context">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>Controller</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span><span class="token variable">$item</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;route&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="_3\u3001\u521B\u5EFA\u4E2D\u95F4\u4EF6" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u521B\u5EFA\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a> 3\u3001\u521B\u5EFA\u4E2D\u95F4\u4EF6</h2><h3 id="_1-\u521B\u5EFAapidocservice\u4E2D\u95F4\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1-\u521B\u5EFAapidocservice\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a> \uFF081\uFF09\u521B\u5EFAApidocService\u4E2D\u95F4\u4EF6</h3><p>\u6839\u636E\u6846\u67B6\u89C4\u8303\u5728\u6307\u5B9A\u76EE\u5F55\u521B\u5EFA\u4E2D\u95F4\u4EF6\u6587\u4EF6\uFF0C\u4EE5Webman\u4E3A\u4F8B\u5728<code>app/middleware/</code>\u76EE\u5F55\u521B\u5EFA<code>ApidocServiceProvider.php</code>\u6587\u4EF6</p><details class="custom-container details"><summary>ApidocServiceProvider.php\u4EE3\u7801</summary><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>middleware</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>providers<span class="token punctuation">\\</span>CommonService</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>utils<span class="token punctuation">\\</span>ConfigProvider</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Webman<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Response</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Webman<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Request</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">support<span class="token punctuation">\\</span>Db</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApidocServiceProvider</span>
<span class="token punctuation">{</span>
    <span class="token keyword">use</span> <span class="token package">CommonService</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">process</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">,</span> <span class="token keyword type-hint">callable</span> <span class="token variable">$handler</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token class-name return-type">Response</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u6839\u636E\u6846\u67B6\u89C4\u8303\u83B7\u53D6\u8BF7\u6C42\u53C2\u6570</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string double-quoted-string">&quot;GET&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token variable">$params</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token variable">$params</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token variable">$config</span> <span class="token operator">=</span>  <span class="token class-name static-context">ConfigProvider</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;request_params&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$params</span><span class="token punctuation">;</span>
        <span class="token class-name static-context">ConfigProvider</span><span class="token operator">::</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token variable">$config</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$handler</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u83B7\u53D6apidoc\u914D\u7F6E\uFF0C\u6839\u636E\u6846\u67B6\u8FD4\u56DE\u914D\u7F6E\u6587\u4EF6\u7684\u5185\u5BB9
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getApidocConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;plugin.hg.apidoc.app.apidoc&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u6CE8\u518CApidoc\u6240\u9700\u8DEF\u7531
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">registerRoute</span><span class="token punctuation">(</span><span class="token variable">$route</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// \u7531\u4E8E\u5DF2\u5728\u914D\u7F6E\u6587\u4EF6config/plugin/hg/apidoc/route.php\u4E2D\u6CE8\u518C\u4E86Apidoc\u8DEF\u7531\uFF0C\u6B64\u5904\u65E0\u9700\u518D\u5B9E\u73B0</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u6570\u636E\u5E93\u67E5\u8BE2\u65B9\u6CD5
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">databaseQuery</span><span class="token punctuation">(</span><span class="token variable">$sql</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name static-context">Db</span><span class="token operator">::</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token variable">$sql</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u9879\u76EE\u8DDF\u76EE\u5F55\u5730\u5740
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getRootPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">BASE_PATH</span><span class="token operator">.</span><span class="token string double-quoted-string">&quot;/&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u7F13\u5B58\u76EE\u5F55\u5730\u5740
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getRuntimePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">BASE_PATH</span><span class="token operator">.</span><span class="token string double-quoted-string">&quot;/runtime/&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u8BED\u8A00\u5305\u6CE8\u518C
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">setLang</span><span class="token punctuation">(</span><span class="token variable">$locale</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
<span class="token comment">//        $this-&gt;langLocale = $locale;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u83B7\u53D6\u8BED\u8A00\u65B9\u6CD5
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getLang</span><span class="token punctuation">(</span><span class="token variable">$lang</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$lang</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u5904\u7406\u8BF7\u6C42\u54CD\u5E94\u8FD4\u56DE\u7684\u6570\u636E
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">handleResponseJson</span><span class="token punctuation">(</span><span class="token variable">$res</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">json</span><span class="token punctuation">(</span><span class="token variable">$res</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u6570\u636E\u8868\u524D\u7F00
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getTablePrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="_2-\u6CE8\u518C\u4E2D\u95F4\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-\u6CE8\u518C\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a> \uFF082\uFF09\u6CE8\u518C\u4E2D\u95F4\u4EF6</h3><p>\u4EE5Webman\u4E3A\u4F8B\uFF0C\u6CE8\u518C\u5168\u5C40\u4E2D\u95F4\u4EF6</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u52A0\u4E0A\u8FD9\u53E5</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>app<span class="token punctuation">\\</span>middleware<span class="token punctuation">\\</span>ApidocServiceProvider</span><span class="token operator">::</span><span class="token keyword">class</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4\u3001\u6DFB\u52A0\u524D\u7AEF\u9875\u9762" tabindex="-1"><a class="header-anchor" href="#_4\u3001\u6DFB\u52A0\u524D\u7AEF\u9875\u9762" aria-hidden="true">#</a> 4\u3001\u6DFB\u52A0\u524D\u7AEF\u9875\u9762</h2>`,19),m=s("p",null,"\u4E0B\u8F7D\u5B8C\u6210\u540E\u89E3\u538B\uFF0C\u5C06apidoc\u6587\u4EF6\u5939\u62F7\u8D1D\u5230\u4F60\u7684\u9879\u76EE public \u76EE\u5F55\u4E0B",-1),b=a("\u6253\u5F00\u6D4F\u89C8\u5668\u8BBF\u95EE "),E={href:"http://xn--6qqv7i2xdt95b/apidoc/",target:"_blank",rel:"noopener noreferrer"},F=a("http://\u4F60\u7684\u57DF\u540D/apidoc/"),g=a(" \uFF0C\u51FA\u73B0\u63A5\u53E3\u6587\u6863\u9875\u9762\uFF0C\u8868\u793A\u5B89\u88C5\u6210\u529F\u3002"),h=i({__name:"other.html",setup(B){return(f,C)=>{const u=e("ClientOnly"),t=e("ExternalLinkIcon");return c(),o("div",null,[v,n(u,null,{default:l(()=>[n(r(p))]),_:1}),m,s("p",null,[b,s("a",E,[F,n(t)]),g])])}}}),w=k(h,[["__file","other.html.vue"]]);export{w as default};

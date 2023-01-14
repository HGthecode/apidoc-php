import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.0ca28b62.js";const t={},i=e(`<h1 id="自动注册路由" tabindex="-1"><a class="header-anchor" href="#自动注册路由" aria-hidden="true">#</a> 自动注册路由</h1><blockquote><p>支持版本 &gt;= v4.2.0</p></blockquote><p>自动根据接口文档url注册路由，本功能默认关闭，如下方式配置开启即可。</p><p>配置文件<code>apidoc.php</code>中的 <code>auto_register_routes</code> 设置为 <code>true</code></p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// apidoc.php</span>

<span class="token comment">// 是否自动注册路由</span>
<span class="token string single-quoted-string">&#39;auto_register_routes&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由中间件" tabindex="-1"><a class="header-anchor" href="#路由中间件" aria-hidden="true">#</a> 路由中间件</h2><p>可通过如下注解定义路由中间件</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// /config/apidoc.php</span>

<span class="token keyword">use</span> <span class="token package">app<span class="token punctuation">\\</span>common<span class="token punctuation">\\</span>middleware<span class="token punctuation">\\</span>TestMiddleware1</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">app<span class="token punctuation">\\</span>common<span class="token punctuation">\\</span>middleware<span class="token punctuation">\\</span>TestMiddleware2</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * 控制器添加路由中间件，则该控制器所有接口都执行该中间件，参考路由分组中间件
 * @Apidoc\\RouteMiddleware(<span class="token punctuation">{</span>TestMiddleware1::class<span class="token punctuation">}</span>)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">AutoController</span> <span class="token keyword">extends</span> <span class="token class-name">BaseController</span>
<span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 接口添加路由中间件
     * @Apidoc\\RouteMiddleware(<span class="token punctuation">{</span>TestMiddleware2::class<span class="token punctuation">}</span>)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">autoRoute</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 业务代码...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=[i];function o(p,l){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","autoRegisterRoutes.html.vue"]]);export{r as default};

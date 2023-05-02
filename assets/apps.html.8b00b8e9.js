import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.cabb47e5.js";const t={},p=e(`<h1 id="多应用-多版本" tabindex="-1"><a class="header-anchor" href="#多应用-多版本" aria-hidden="true">#</a> 多应用/多版本</h1><p>由于在各种项目开发中，有多种情况，如<code>单应用多版本</code>、<code>多应用无版本</code>、<code>多应用多版本</code>等开发场景与项目目录，所以将多应用/多版本统一在<code>apps</code>中配置实现。</p><h2 id="举例一个多应用多版本的实现" tabindex="-1"><a class="header-anchor" href="#举例一个多应用多版本的实现" aria-hidden="true">#</a> 举例一个多应用多版本的实现：</h2><p>假设一个admin应用无版本，demo应用有多个版本，其项目项目目录如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>app
 <span class="token operator">|</span>—— admin
    <span class="token operator">|</span>—— controller
       <span class="token operator">|</span>—— Index.php
       <span class="token punctuation">..</span>.
    <span class="token operator">|</span>—— route
    <span class="token punctuation">..</span>.
 <span class="token operator">|</span>—— demo
    <span class="token operator">|</span>—— controller
        <span class="token operator">|</span>—— v1
            BaseDemo.php
            CrudDemo.php
            <span class="token punctuation">..</span>.
        <span class="token operator">|</span>—— v2
            BaseDemo.php
            CrudDemo.php
            <span class="token punctuation">..</span>.
 <span class="token operator">|</span>—— model
 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置文件<code>apidoc.php</code>中的 apps 参数中配置如下</p><blockquote><p>注意：path是指定该应用控制器的目录，不是命名空间</p></blockquote><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token string single-quoted-string">&#39;apps&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;后台管理&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\admin\\controller&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;key&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;admin&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;演示示例&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;key&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;demo&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;items&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
            <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;V1.0&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\demo\\controller\\v1&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;key&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;v1&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;V2.0&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\demo\\controller\\v2&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;key&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;v2&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),i=[p];function o(l,c){return s(),a("div",null,i)}const u=n(t,[["render",o],["__file","apps.html.vue"]]);export{u as default};

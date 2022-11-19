import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.2fd33af9.js";const t={},i=e(`<h1 id="页面404错误" tabindex="-1"><a class="header-anchor" href="#页面404错误" aria-hidden="true">#</a> 页面404错误</h1><blockquote><p>访问apidoc页面时，以下几个原因有可能导致页面显示 404 错误</p></blockquote><p>通常该问题会报出 <code>Request failed with status code 404</code> 或<code>Cannot read property &#39;config&#39; of undefined</code> 或<code>当前访问路由未定义或不匹配</code>等错误。</p><p>这并不是文件不存在，而是apidoc会自动注册一些所需的路由，由于某种原因导致未注册成功</p><h2 id="_1、-手动注册路由" tabindex="-1"><a class="header-anchor" href="#_1、-手动注册路由" aria-hidden="true">#</a> 1、 手动注册路由</h2><p><code>Hyperf</code>、<code>Webman</code>等框架需手动注册Apidoc所需路由，具体请参考相关框架的安装文档。</p><h2 id="_2、伪静态配置" tabindex="-1"><a class="header-anchor" href="#_2、伪静态配置" aria-hidden="true">#</a> 2、伪静态配置</h2><p><code>Tp5.1</code>、<code>Tp6</code>、<code>Laravel</code>等通过Nginx/Apache代理的网站，如果没有正确配置项目伪静态规则，可能会导致无法正常访问路由</p><h3 id="解决方案1-配置伪静态规则" tabindex="-1"><a class="header-anchor" href="#解决方案1-配置伪静态规则" aria-hidden="true">#</a> 解决方案1：配置伪静态规则</h3><blockquote><p>以下为Tp6的伪静态规则，其它框架请自行到官网查看</p></blockquote><ul><li>Apache</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;IfModule mod_rewrite.c&gt;
  Options +FollowSymlinks -Multiviews
  RewriteEngine On

  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^(.*)$ index.php?$1 [QSA,PT,L]

  SetEnvIf Authorization .+ HTTP_AUTHORIZATION=$0
&lt;/IfModule&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Nginx</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location / {
    if (!-e $request_filename){
    rewrite ^(.*)$ /index.php?s=$1 last; 
    break;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方案2-配置前端项目请求host参数" tabindex="-1"><a class="header-anchor" href="#解决方案2-配置前端项目请求host参数" aria-hidden="true">#</a> 解决方案2：配置前端项目请求host参数：</h3><blockquote><p>以下index.php为tp5.1/tp6的，其它框架视情况而定</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// public/apidoc/config.js</span>

<span class="token keyword">var</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 请求地址host</span>
  <span class="token constant">HTTP</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token constant">HOSTS</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">host</span><span class="token operator">:</span><span class="token string">&quot;/index.php&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、项目根目录配置问题" tabindex="-1"><a class="header-anchor" href="#_3、项目根目录配置问题" aria-hidden="true">#</a> 3、项目根目录配置问题</h2><p>有的用户配置站点目录为项目根目录或更上级目录，而网站的入口文件在public目录，就会导致无法正确的访问路由，也会报出404 <code>Cannot read property &#39;config&#39; of undefined</code> 的错误</p><p>解决方案1：将站点目录配置正确的目录，并正确配置伪静态。</p><p>解决方案2：配置前端项目请求host参数：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// public/apidoc/config.js</span>
<span class="token keyword">var</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 请求地址host</span>
  <span class="token constant">HTTP</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token constant">HOSTS</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">host</span><span class="token operator">:</span><span class="token string">&quot;/public/index.php&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、apidoc路由未注册成功" tabindex="-1"><a class="header-anchor" href="#_4、apidoc路由未注册成功" aria-hidden="true">#</a> 4、apidoc路由未注册成功</h2><p>基于其它一些二次封装过的项目框架使用apidoc时，由于项目可能对路由进行过调整，导致apidoc插件的路由无法自动注册成功。</p><p>解决方案：可尝试在你的项目中添加以下路由</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>providers<span class="token punctuation">\\</span>CommonService</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * Apidoc Routes
 */</span>
<span class="token class-name static-context">CommonService</span><span class="token operator">::</span><span class="token function">registerApidocRoutes</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 这里的路由注册根据自身框架调整</span>
  <span class="token class-name static-context">Router</span><span class="token operator">::</span><span class="token function">addRoute</span><span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;method&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token variable">$item</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;uri&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token variable">$item</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;callback&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),p=[i];function o(c,l){return s(),a("div",null,p)}const u=n(t,[["render",o],["__file","404.html.vue"]]);export{u as default};

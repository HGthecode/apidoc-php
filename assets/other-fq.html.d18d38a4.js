import{D as i}from"./DownloadFe.d1d43bc4.js";import{f as c,o as l,c as u,e as n,w as r,b as a,d as s,a as t,r as e,u as d}from"./app.3683576a.js";import{_ as k}from"./_plugin-vue_export-helper.cdc0426e.js";const v=t(`<h1 id="webman-其它框架安装" tabindex="-1"><a class="header-anchor" href="#webman-其它框架安装" aria-hidden="true">#</a> Webman/其它框架安装</h1><div class="custom-container tip"><p class="custom-container-title">其它框架兼容</p><p>理论上Apidoc可通过手动配置来兼容任何基于composer的框架，此处以Webman框架为例来手动适配兼容</p></div><h2 id="_1、安装插件" tabindex="-1"><a class="header-anchor" href="#_1、安装插件" aria-hidden="true">#</a> 1、安装插件</h2><p>进入项目根目录，执行如下命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>composer require hg/apidoc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2、创建配置文件" tabindex="-1"><a class="header-anchor" href="#_2、创建配置文件" aria-hidden="true">#</a> 2、创建配置文件</h2><p>根据框架规范在指定目录创建配置文件，以webman为例。</p><p>在 <code>config/plugin</code>目录下创建 <code>hg/apidoc/</code>目录，并在该目录下创建<code>app.php</code> <code>route.php</code>文件，创建后目录结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|- config
   |- plugin
     |-hg
       |-apidoc
         |- app.php
         |- route.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>app.php代码</summary><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;enable&#39;</span>  <span class="token operator">=&gt;</span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;apidoc&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
        <span class="token comment">// （选配）文档标题，显示在左上角与首页</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span>              <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;Apidoc&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// （选配）文档描述，显示在首页</span>
        <span class="token string single-quoted-string">&#39;desc&#39;</span>               <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// （必须）设置文档的应用/版本</span>
        <span class="token string single-quoted-string">&#39;apps&#39;</span>           <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                <span class="token comment">// （必须）标题</span>
                <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;Api接口&#39;</span><span class="token punctuation">,</span>
                <span class="token comment">// （必须）控制器目录地址</span>
                <span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\controller&#39;</span><span class="token punctuation">,</span>
                <span class="token comment">// （必须）唯一的key</span>
                <span class="token string single-quoted-string">&#39;key&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;api&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// （必须）指定通用注释定义的文件地址</span>
        <span class="token string single-quoted-string">&#39;definitions&#39;</span>        <span class="token operator">=&gt;</span> <span class="token string double-quoted-string">&quot;app\\common\\controller\\Definitions&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// （必须）自动生成url规则，当接口不添加@Apidoc\\Url (&quot;xxx&quot;)注解时，使用以下规则自动生成</span>
        <span class="token string single-quoted-string">&#39;auto_url&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token comment">// 字母规则，lcfirst=首字母小写；ucfirst=首字母大写；</span>
            <span class="token string single-quoted-string">&#39;letter_rule&#39;</span> <span class="token operator">=&gt;</span> <span class="token string double-quoted-string">&quot;lcfirst&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// url前缀</span>
            <span class="token string single-quoted-string">&#39;prefix&#39;</span><span class="token operator">=&gt;</span><span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// （必须）缓存配置</span>
        <span class="token string single-quoted-string">&#39;cache&#39;</span>              <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token comment">// 是否开启缓存</span>
            <span class="token string single-quoted-string">&#39;enable&#39;</span> <span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// （必须）权限认证配置</span>
        <span class="token string single-quoted-string">&#39;auth&#39;</span>               <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
            <span class="token comment">// 是否启用密码验证</span>
            <span class="token string single-quoted-string">&#39;enable&#39;</span>     <span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
            <span class="token comment">// 全局访问密码</span>
            <span class="token string single-quoted-string">&#39;password&#39;</span>   <span class="token operator">=&gt;</span> <span class="token string double-quoted-string">&quot;123456&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// 密码加密盐</span>
            <span class="token string single-quoted-string">&#39;secret_key&#39;</span> <span class="token operator">=&gt;</span> <span class="token string double-quoted-string">&quot;apidoc#hg_code&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// 授权访问后的有效期</span>
            <span class="token string single-quoted-string">&#39;expire&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">24</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">60</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 全局参数</span>
        <span class="token string single-quoted-string">&#39;params&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
            <span class="token comment">// （选配）全局的请求Header</span>
            <span class="token string single-quoted-string">&#39;header&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token comment">// name=字段名，type=字段类型，require=是否必须，default=默认值，desc=字段描述</span>
                <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;Authorization&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;string&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;require&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;身份令牌Token&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token comment">// （选配）全局的请求Query</span>
            <span class="token string single-quoted-string">&#39;query&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token comment">// 同上 header</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token comment">// （选配）全局的请求Body</span>
            <span class="token string single-quoted-string">&#39;body&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token comment">// 同上 header</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 全局响应体</span>
        <span class="token string single-quoted-string">&#39;responses&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
            <span class="token comment">// 成功响应体</span>
            <span class="token string single-quoted-string">&#39;success&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;code&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;业务代码&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;int&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;require&#39;</span><span class="token operator">=&gt;</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;业务信息&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;string&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;require&#39;</span><span class="token operator">=&gt;</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token comment">//参数同上 headers；main=true来指定接口Returned参数挂载节点</span>
                <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;data&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;业务数据&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;main&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;object&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;require&#39;</span><span class="token operator">=&gt;</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token comment">// 异常响应体</span>
            <span class="token string single-quoted-string">&#39;error&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;code&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;业务代码&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;int&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;require&#39;</span><span class="token operator">=&gt;</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;md&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;/docs/HttpError.md&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;业务信息&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;string&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;require&#39;</span><span class="token operator">=&gt;</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">//（选配）默认作者</span>
        <span class="token string single-quoted-string">&#39;default_author&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">//（选配）默认请求类型</span>
        <span class="token string single-quoted-string">&#39;default_method&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;GET&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">//（选配）允许跨域访问</span>
        <span class="token string single-quoted-string">&#39;allowCrossDomain&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token doc-comment comment">/**
         * （选配）解析时忽略带@注解的关键词，当注解中存在带@字符并且非Apidoc注解，如 @key test，此时Apidoc页面报类似以下错误时:
         * [Semantical Error] The annotation &quot;@key&quot; in method xxx() was never imported. Did you maybe forget to add a &quot;use&quot; statement for this annotation?
         */</span>
        <span class="token string single-quoted-string">&#39;ignored_annitation&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// （选配）数据库配置</span>
        <span class="token string single-quoted-string">&#39;database&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// （选配）Markdown文档</span>
        <span class="token string single-quoted-string">&#39;docs&#39;</span>              <span class="token operator">=&gt;</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// （选配）接口生成器配置 注意：是一个二维数组</span>
        <span class="token string single-quoted-string">&#39;generator&#39;</span> <span class="token operator">=&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>route.php代码</summary><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">use</span> <span class="token package">Webman<span class="token punctuation">\\</span>Route</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>providers<span class="token punctuation">\\</span>CommonService</span><span class="token punctuation">;</span>
<span class="token comment">// 注册Apidoc所需路由</span>
<span class="token class-name static-context">CommonService</span><span class="token operator">::</span><span class="token function">registerApidocRoutes</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">any</span><span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;uri&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token class-name class-name-fully-qualified static-context">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>Controller</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span><span class="token variable">$item</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;route&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="_3、创建中间件" tabindex="-1"><a class="header-anchor" href="#_3、创建中间件" aria-hidden="true">#</a> 3、创建中间件</h2><h3 id="_1-创建apidocservice中间件" tabindex="-1"><a class="header-anchor" href="#_1-创建apidocservice中间件" aria-hidden="true">#</a> （1）创建ApidocService中间件</h3><p>根据框架规范在指定目录创建中间件文件，以Webman为例在<code>app/middleware/</code>目录创建<code>ApidocServiceProvider.php</code>文件</p><details class="custom-container details"><summary>ApidocServiceProvider.php代码</summary><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>middleware</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Webman<span class="token punctuation">\\</span>MiddlewareInterface</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Webman<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Response</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Webman<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Request</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>providers<span class="token punctuation">\\</span>BaseService</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>utils<span class="token punctuation">\\</span>ConfigProvider</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">support<span class="token punctuation">\\</span>Db</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApidocServiceProvider</span> <span class="token keyword">implements</span> <span class="token class-name">MiddlewareInterface</span>
<span class="token punctuation">{</span>
    <span class="token keyword">use</span> <span class="token package">BaseService</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">process</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">,</span> <span class="token keyword type-hint">callable</span> <span class="token variable">$next</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token class-name return-type">Response</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">initConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string double-quoted-string">&quot;GET&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token variable">$params</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token variable">$params</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token variable">$config</span> <span class="token operator">=</span>  <span class="token class-name static-context">ConfigProvider</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;request_params&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$params</span><span class="token punctuation">;</span>
        <span class="token class-name static-context">ConfigProvider</span><span class="token operator">::</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token variable">$config</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$response</span> <span class="token operator">=</span> <span class="token variable">$next</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$response</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取apidoc配置，根据框架返回配置文件的内容
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getApidocConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;plugin.hg.apidoc.app.apidoc&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 注册Apidoc所需路由
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">registerRoute</span><span class="token punctuation">(</span><span class="token variable">$route</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 由于已在配置文件config/plugin/hg/apidoc/route.php中注册了Apidoc路由，此处无需再实现</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 数据库查询方法
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">databaseQuery</span><span class="token punctuation">(</span><span class="token variable">$sql</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name static-context">Db</span><span class="token operator">::</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token variable">$sql</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 项目跟目录地址
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getRootPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">BASE_PATH</span><span class="token operator">.</span><span class="token string double-quoted-string">&quot;/&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 缓存目录地址
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getRuntimePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">BASE_PATH</span><span class="token operator">.</span><span class="token string double-quoted-string">&quot;/runtime/&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 语言包注册
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">setLang</span><span class="token punctuation">(</span><span class="token variable">$locale</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
<span class="token comment">//        $this-&gt;langLocale = $locale;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取语言方法
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getLang</span><span class="token punctuation">(</span><span class="token variable">$lang</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$lang</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 处理请求响应返回的数据
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">handleResponseJson</span><span class="token punctuation">(</span><span class="token variable">$res</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">json</span><span class="token punctuation">(</span><span class="token variable">$res</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 数据表前缀
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getTablePrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="_2-注册中间件" tabindex="-1"><a class="header-anchor" href="#_2-注册中间件" aria-hidden="true">#</a> （2）注册中间件</h3><p>以Webman为例，<code>config/middleware.php</code>注册全局中间件</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
        <span class="token comment">// 加上这句</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>app<span class="token punctuation">\\</span>middleware<span class="token punctuation">\\</span>ApidocServiceProvider</span><span class="token operator">::</span><span class="token keyword">class</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、添加前端页面" tabindex="-1"><a class="header-anchor" href="#_4、添加前端页面" aria-hidden="true">#</a> 4、添加前端页面</h2>`,19),m=a("p",null,"下载完成后解压，将apidoc文件夹拷贝到你的项目 public 目录下",-1),g={href:"http://xn--6qqv7i2xdt95b/apidoc/index.html",target:"_blank",rel:"noopener noreferrer"},b=t(`<h2 id="配置异常响应" tabindex="-1"><a class="header-anchor" href="#配置异常响应" aria-hidden="true">#</a> 配置异常响应</h2><p>由于框架会对全局异常进行处理，如apidoc的异常未被正确响应，会导致页面打不开或报错，配置以下异常处理来解决问题。</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// 找到你的项目所配置的异常处理类，本示例为</span>
<span class="token comment">// support/ExceptionHandle.php</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">,</span> <span class="token class-name type-declaration">Throwable</span> <span class="token variable">$exception</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token class-name return-type">Response</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$exception</span> <span class="token keyword">instanceof</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>exception<span class="token punctuation">\\</span>HttpException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
            <span class="token string double-quoted-string">&quot;code&quot;</span> <span class="token operator">=&gt;</span> <span class="token variable">$exception</span><span class="token operator">-&gt;</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token string double-quoted-string">&quot;message&quot;</span> <span class="token operator">=&gt;</span> <span class="token variable">$exception</span><span class="token operator">-&gt;</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token constant">JSON_UNESCAPED_UNICODE</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token variable">$exception</span><span class="token operator">-&gt;</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">return</span> <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">,</span> <span class="token variable">$exception</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),q=c({__name:"other-fq.html",setup(h){return(f,y)=>{const p=e("ClientOnly"),o=e("ExternalLinkIcon");return l(),u("div",null,[v,n(p,null,{default:r(()=>[n(d(i))]),_:1}),m,a("p",null,[s("打开浏览器访问 "),a("a",g,[s("http://你的域名/apidoc/index.html"),n(o)]),s(" ，出现接口文档页面，表示安装成功。")]),b])}}}),$=k(q,[["__file","other-fq.html.vue"]]);export{$ as default};

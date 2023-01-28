import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as e,a as p}from"./app.21b7d189.js";const n="/apidoc-php/images/error-500-1.png",t="/apidoc-php/images/error-auth-1.png",c="/apidoc-php/images/error-501.png",o="/apidoc-php/images/error-500.png",i={},l=p('<h1 id="_500错误" tabindex="-1"><a class="header-anchor" href="#_500错误" aria-hidden="true">#</a> 500错误</h1><h2 id="未知异常" tabindex="-1"><a class="header-anchor" href="#未知异常" aria-hidden="true">#</a> 未知异常</h2><p><img src="'+n+`" alt="error-500-1"></p><p>如页面显示无具体错误信息，可尝试开启框架的DEBUG模式，再次访问通常就会出现详细的错误信息了。</p><h2 id="访问授权错误" tabindex="-1"><a class="header-anchor" href="#访问授权错误" aria-hidden="true">#</a> 访问授权错误</h2><p>当开启访问授权配置时，因框架的全局异常处理，没有将401状态码正常返回时出现</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// （必须）权限认证配置
&#39;auth&#39;               =&gt; [
    // 是否启用密码验证
    &#39;enable&#39;     =&gt; true,
    //...
],
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ThinkPHP框架在未对全局异常处理进行修改的，出现以下错误：</p><p><img src="`+t+'" alt="error-auth-1"></p><p>Laravel框架在未对全局异常处理进行修改的，出现如下错误：</p><p><img src="'+n+`" alt="error-500-1"></p><p>可参考以下异常处理类来处理</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// Tp6示例</span>
<span class="token comment">// app/ExceptionHandle.php</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">,</span> <span class="token class-name type-declaration">Throwable</span> <span class="token variable">$e</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token class-name return-type">Response</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 添加自定义异常处理机制</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$e</span> <span class="token keyword">instanceof</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>exception<span class="token punctuation">\\</span>HttpException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">json</span><span class="token punctuation">(</span>
            <span class="token punctuation">[</span>
                <span class="token string double-quoted-string">&quot;code&quot;</span> <span class="token operator">=&gt;</span> <span class="token variable">$e</span><span class="token operator">-&gt;</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string double-quoted-string">&quot;message&quot;</span> <span class="token operator">=&gt;</span> <span class="token variable">$e</span><span class="token operator">-&gt;</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token variable">$e</span><span class="token operator">-&gt;</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Laravel 示例</span>
<span class="token comment">// app/Exceptions/Handler.php</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">reportable</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token class-name type-declaration">Throwable</span> <span class="token variable">$e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$e</span> <span class="token keyword">instanceof</span> <span class="token class-name class-name-fully-qualified"><span class="token punctuation">\\</span>hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>exception<span class="token punctuation">\\</span>HttpException</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">abort</span><span class="token punctuation">(</span>
                <span class="token variable">$e</span><span class="token operator">-&gt;</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token variable">$e</span><span class="token operator">-&gt;</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Webman 示例</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注解错误" tabindex="-1"><a class="header-anchor" href="#注解错误" aria-hidden="true">#</a> 注解错误</h2><p>访问apidoc页面时，如出现如下错误信息；通常有具体的描述，根据描述信息排查即可</p><p><img src="`+c+'" alt="error-501"></p><h2 id="缺少注解解释文件" tabindex="-1"><a class="header-anchor" href="#缺少注解解释文件" aria-hidden="true">#</a> 缺少注解解释文件</h2><p>项目所有被解析文件的注释中存在 @XXX 的，都需<code>use</code>引入注释解释文件，如出现以下错误</p><p><img src="'+o+`" alt="error-500"></p><p>可根据提示在相应的文件里，加上use解释文件</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>

<span class="token comment">// 加上这句，解决Apidoc注解报错</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>
<span class="token comment">// 通过use自定义解释文件，解决下面@abc的错误</span>
<span class="token comment">// use app\\utils\\Abc;</span>

<span class="token doc-comment comment">/**
 * @Apidoc\\Title(&quot;基础示例&quot;)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">BaseDemo</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * @Apidoc\\Title(&quot;引入通用注释&quot;)
     * <span class="token keyword">@abc</span> 错误示例，这样不存在解释文件的注释会报错；可增加use解释文件，或去除@、或通过配置忽略（推荐）
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自定义解释文件</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>// app/utils/Abc.php 解释文件内容
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>utils</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Doctrine<span class="token punctuation">\\</span>Common<span class="token punctuation">\\</span>Annotations<span class="token punctuation">\\</span>Annotation</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 自定义参数解释文件
 * <span class="token keyword">@package</span> <span class="token class-name">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span>
 * @Annotation
 * @Target(<span class="token punctuation">{</span>&quot;METHOD&quot;,&quot;CLASS&quot;<span class="token punctuation">}</span>)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">Abc</span> <span class="token keyword">extends</span> <span class="token class-name">Annotation</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置忽略带@的注解报错：</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// apidoc.php</span>
<span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;ignored_annitation&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;abc&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),u=[l];function d(r,k){return a(),e("div",null,u)}const b=s(i,[["render",d],["__file","500.html.vue"]]);export{b as default};

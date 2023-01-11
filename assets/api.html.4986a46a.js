import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c,b as n,d as s,e as t,w as e,a as o,r as d}from"./app.e90d4982.js";const l={},u=o(`<h1 id="接口注释" tabindex="-1"><a class="header-anchor" href="#接口注释" aria-hidden="true">#</a> 接口注释</h1><p>控制器中的每一个符合注释规则的方法都会被解析成一个API接口</p><h2 id="基础注释" tabindex="-1"><a class="header-anchor" href="#基础注释" aria-hidden="true">#</a> 基础注释</h2><p>先来体验一个最基本的注释，所得到的结果</p><p>我们在控制器中加入如下方法，如下</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Apidoc\\Title(&quot;基础示例&quot;)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span> 
    <span class="token doc-comment comment">/**
     * @Apidoc\\Title(&quot;基础的注释方法&quot;)
     * @Apidoc\\Desc(&quot;最基础的接口注释写法&quot;)
     * @Apidoc\\Method(&quot;GET&quot;)
     * @Apidoc\\Author(&quot;HG&quot;)
     * @Apidoc\\Tag(&quot;测试&quot;)
     * @Apidoc\\Query(&quot;username&quot;, type=&quot;abc&quot;,require=true, desc=&quot;用户名&quot;)
     * @Apidoc\\Query(&quot;password&quot;, type=&quot;string&quot;,require=true, desc=&quot;密码&quot;)
     * @Apidoc\\Query(&quot;phone&quot;, type=&quot;string&quot;,require=true, desc=&quot;手机号&quot;)
     * @Apidoc\\Query(&quot;sex&quot;, type=&quot;int&quot;,default=&quot;1&quot;,desc=&quot;性别&quot; )
     * @Apidoc\\Returned(&quot;id&quot;, type=&quot;int&quot;, desc=&quot;用户id&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通用注释" tabindex="-1"><a class="header-anchor" href="#通用注释" aria-hidden="true">#</a> 通用注释</h2><p>通过定义通用的公共注释参数来实现 可复用性，避免每个接口都定义一大堆同样的参数</p><h3 id="_1、增加配置" tabindex="-1"><a class="header-anchor" href="#_1、增加配置" aria-hidden="true">#</a> 1、增加配置</h3><p>首先，在配置文件 apidoc.php 配置文件中，指定一个控制器为定义公共注释的控制器</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// apidoc.php</span>
<span class="token comment">// 指定公共注释定义的文件地址</span>
<span class="token string single-quoted-string">&#39;definitions&#39;</span><span class="token operator">=&gt;</span><span class="token string double-quoted-string">&quot;app\\controller\\Definitions&quot;</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、定义通用注释" tabindex="-1"><a class="header-anchor" href="#_2、定义通用注释" aria-hidden="true">#</a> 2、定义通用注释</h3><p>添加一些通用的方法及注释，（定义<code>Header</code>、<code>Query</code>、<code>Param</code> 、<code>Returned</code> 参数与接口注释书写规则一致）</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Query</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Param</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Returned</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Header</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name-definition class-name">Definitions</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 获取分页数据列表的参数
     * @Query(&quot;pageIndex&quot;,type=&quot;int&quot;,require=true,default=&quot;0&quot;,desc=&quot;查询页数&quot;)
     * @Query(&quot;pageSize&quot;,type=&quot;int&quot;,require=true,default=&quot;20&quot;,desc=&quot;查询条数&quot;)
     * @Param(&quot;index&quot;,type=&quot;int&quot;,require=true,default=&quot;0&quot;,desc=&quot;查询页数&quot;)
     * @Param(&quot;size&quot;,type=&quot;int&quot;,require=true,default=&quot;20&quot;,desc=&quot;查询条数&quot;)
     * @Returned(&quot;total&quot;, type=&quot;int&quot;, desc=&quot;总条数&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">pagingParam</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  
    <span class="token doc-comment comment">/**
     * 返回字典数据
     * @Returned(&quot;id&quot;,type=&quot;int&quot;,desc=&quot;唯一id&quot;)
     * @Returned(&quot;name&quot;,type=&quot;string&quot;,desc=&quot;字典名&quot;)
     * @Returned(&quot;value&quot;,type=&quot;string&quot;,desc=&quot;字典值&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">dictionary</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * @Header(&quot;token&quot;,type=&quot;string&quot;,require=true,desc=&quot;身份票据&quot;)
     * @Header(&quot;shopid&quot;,type=&quot;string&quot;,require=true,desc=&quot;店铺id&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">auth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、使用定义" tabindex="-1"><a class="header-anchor" href="#_3、使用定义" aria-hidden="true">#</a> 3、使用定义</h3><p>在接口注释中的 <code>Header</code>、<code>Query</code>、<code>Param</code> 、<code>Returned</code> 可通过 ref=&quot;XXX&quot; 来指定引入的 通用注释</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span> 
    <span class="token doc-comment comment">/**
     * @Apidoc\\Title(&quot;引入通用注释&quot;)
     * @Apidoc\\Desc(&quot;引入配置中definitions的通用注解控制器中所定义的通用参数&quot;)
     * @Apidoc\\Url(&quot;/admin/refDemo/definitions&quot;)
     * @Apidoc\\Author(&quot;HG&quot;)
     * @Apidoc\\Method(&quot;GET&quot;)
     * @Apidoc\\Header( ref=&quot;auth&quot;)
     * @Apidoc\\Query( ref=&quot;pagingParam&quot;)
     * @Apidoc\\Param(&quot;page&quot;,type=&quot;object&quot;, ref=&quot;pagingParam&quot;,desc=&quot;分页参数&quot;)
     * @Apidoc\\Returned(&quot;list&quot;, type=&quot;array&quot;,ref=&quot;dictionary&quot;, desc=&quot;字典列表&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">definitions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">以上Query、Param用了两种方式引入，分别是参数指定 字段名 与 type ，与不指定字段名</p><ul><li>指定字段名：会将引入的参数在该字段属性下</li><li>不指定字段名：直接引入所有参数</li></ul></div><h2 id="逻辑层注释" tabindex="-1"><a class="header-anchor" href="#逻辑层注释" aria-hidden="true">#</a> 逻辑层注释</h2><p>在实际开发中，业务逻辑处理通常会分层给逻辑层来处理（我这里把业务逻辑层叫service，你也可以根据自己开发来定义 业务逻辑层），我们可直接引入业务逻辑层的注释来实现接口参数的定义</p><h3 id="增加业务逻辑层" tabindex="-1"><a class="header-anchor" href="#增加业务逻辑层" aria-hidden="true">#</a> 增加业务逻辑层</h3><p>1、在项目 app 目录下（或应用/模块目录）新建 services 文件夹（也可以叫别的）</p><p>2、在此文件夹下新建一个ApiDoc.php文件，内容如下：</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>services</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocService</span>
<span class="token punctuation">{</span>

     <span class="token doc-comment comment">/**
     * @Apidoc\\Param(&quot;sex&quot;, type=&quot;int&quot;,require=true,desc=&quot;性别&quot;)
     * @Apidoc\\Param(&quot;age&quot;, type=&quot;int&quot;,require=true,desc=&quot;年龄&quot;)
     * @Apidoc\\Param(&quot;id&quot;, type=&quot;int&quot;,require=true,desc=&quot;唯一id&quot;)
     * @Apidoc\\Returned(&quot;id&quot;, type=&quot;int&quot;,desc=&quot;唯一id&quot;)
     * @Apidoc\\Returned(&quot;name&quot;, type=&quot;string&quot;,desc=&quot;姓名&quot;)
     * @Apidoc\\Returned(&quot;phone&quot;, type=&quot;string&quot;,desc=&quot;电话&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="引用逻辑层注释" tabindex="-1"><a class="header-anchor" href="#引用逻辑层注释" aria-hidden="true">#</a> 引用逻辑层注释</h3><p>在控制器的接口注释中的参数可通过 ref=&quot;XXX&quot;来指定引入逻辑层的注释</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span> 
    <span class="token doc-comment comment">/**
     * @Apidoc\\Title(&quot;引入逻辑层注释&quot;)
     * @Apidoc\\Url(&quot;/admin/refDemo/service&quot;)
     * @Apidoc\\Method(&quot;POST&quot;)
     * @Apidoc\\Param(ref=&quot;app\\services\\ApiDocService\\getUserInfo&quot;)
     * @Apidoc\\Returned(ref=&quot;\\app\\services\\ApiDocService\\info&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">service</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模型注释" tabindex="-1"><a class="header-anchor" href="#模型注释" aria-hidden="true">#</a> 模型注释</h2><p>接口参数往往与数据表息息相关，很多接口参数均由数据表字段而来。我们可以直接引入指定模型的数据表字段来生成参数说明，省去了一大堆接口注释与维护工作。</p><h3 id="给数据表字段添加注释" tabindex="-1"><a class="header-anchor" href="#给数据表字段添加注释" aria-hidden="true">#</a> 给数据表字段添加注释</h3><p>建议为数据表字段添加注释，即让数据表字段可读性更高，也让文档可读性更高。 我们直接在数据表给相应字段添加注释，如下SQL供参考</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token constant">CREATE</span> <span class="token constant">TABLE</span> <span class="token string backtick-quoted-string">\`user\`</span> <span class="token punctuation">(</span>↵  
  <span class="token string backtick-quoted-string">\`id\`</span> <span class="token keyword type-declaration">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token constant">NOT</span> <span class="token constant">NULL</span> <span class="token constant">AUTO_INCREMENT</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;用户id&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`username\`</span> <span class="token function">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token constant">NOT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;用户名&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`nickname\`</span> <span class="token function">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;昵称&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`password\`</span> <span class="token function">char</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token constant">NOT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;登录密码&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`avatar\`</span> <span class="token function">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;头像&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`name\`</span> <span class="token function">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;姓名&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`phone\`</span> <span class="token function">char</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;联系电话&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`sex\`</span> <span class="token function">tinyint</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> unsigned <span class="token keyword">DEFAULT</span> <span class="token string single-quoted-string">&#39;1&#39;</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;性别&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`regip\`</span> <span class="token function">bigint</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;注册IP&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`create_time\`</span> <span class="token keyword type-declaration">int</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;创建时间&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`update_time\`</span> <span class="token keyword type-declaration">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> unsigned <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;更新时间&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`delete_time\`</span> <span class="token keyword type-declaration">int</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;删除时间&#39;</span><span class="token punctuation">,</span>
<span class="token constant">PRIMARY</span> <span class="token function">KEY</span> <span class="token punctuation">(</span><span class="token string backtick-quoted-string">\`id\`</span><span class="token punctuation">)</span>↵<span class="token punctuation">)</span> <span class="token constant">ENGINE</span><span class="token operator">=</span>MyISAM <span class="token constant">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">23</span> <span class="token keyword">DEFAULT</span> <span class="token constant">CHARSET</span><span class="token operator">=</span>utf8&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模型方法的注释" tabindex="-1"><a class="header-anchor" href="#模型方法的注释" aria-hidden="true">#</a> 模型方法的注释</h3><p>可为引入的数据模型方法添加相应注释来实现 field（返回指定字段）、withoutField（排除指定字段）、addField（添加指定字段）</p><table><thead><tr><th>参数</th><th>说明</th><th>书写规范</th></tr></thead><tbody><tr><td>field</td><td>返回指定字段</td><td>英文格式逗号 , 分开指定的字段</td></tr><tr><td>withoutField</td><td>排除指定字段</td><td>英文格式逗号 , 分开指定的字段</td></tr><tr><td>addField</td><td>添加指定字段</td><td>可定义多个，每行为一个参数，也可如下示例嵌套Param使用来定义复杂层级的数据结构</td></tr><tr><td>|—</td><td>参数的字段名</td><td>如：@addField(&quot;name&quot;)</td></tr><tr><td>|— type</td><td>字段类型</td><td></td></tr><tr><td>|— require</td><td>是否必填</td><td></td></tr><tr><td>|— default</td><td>默认值</td><td></td></tr><tr><td>|— desc</td><td>字段说明文字</td><td></td></tr></tbody></table><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>model</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Field</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>WithoutField</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>AddField</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation<span class="token punctuation">\\</span>Param</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">BaseModel</span>
<span class="token punctuation">{</span>

     <span class="token doc-comment comment">/**
     * @Field(&quot;id,username,nickname,role&quot;)
     * @AddField(&quot;openid&quot;,type=&quot;string&quot;,default=&quot;abc&quot;,desc=&quot;微信openid&quot;)
     * @AddField(&quot;senkey&quot;,type=&quot;string&quot;,default=&quot;key&quot;,desc=&quot;微信key&quot;)
     * @AddField(&quot;role&quot;,type=&quot;array&quot;,desc=&quot;重写role，由于数据表中存在该字段，此处定义会覆盖数据表中的字段&quot;,
     *     @Param (&quot;name&quot;,type=&quot;string&quot;,desc=&quot;名称&quot;),
     *     @Param (&quot;id&quot;,type=&quot;string&quot;,desc=&quot;id&quot;),
     * )
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getInfo</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$res</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$res</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="控制器引用模型注释" tabindex="-1"><a class="header-anchor" href="#控制器引用模型注释" aria-hidden="true">#</a> 控制器引用模型注释</h3><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span> 
    <span class="token doc-comment comment">/**
     * @Apidoc\\Title(&quot;引入模型注释&quot;)
     * @Apidoc\\Desc(&quot;param参数为直接引用模型数据表参数&quot;)
     * @Apidoc\\Author(&quot;HG&quot;)
     * @Apidoc\\Url(&quot;/v1/baseDemo/model&quot;)
     * @Apidoc\\Method(&quot;POST&quot;)
     * @Apidoc\\Param(ref=&quot;app\\model\\User\\getInfo&quot;)
     * @Apidoc\\Returned(&quot;userList&quot;,type=&quot;array&quot;,ref=&quot;app\\model\\User\\getInfo&quot;)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">model</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上Param的ref参数有3种写法：</p><p>1、<code>@Apidoc\\Param(ref=&quot;app\\model\\User&quot;)</code> ref为模型命名空间，将该模型数据表所有字段进行引用，适合无需模型注释的引用。</p><p>2、<code>@Apidoc\\Param(ref=&quot;app\\model\\User\\getInfo&quot;)</code> 最后的<code>\\getInfo</code>为模型中的方法，该将该模型数据表字段将通过方法的注解处理。</p><p>3、<code>@Apidoc\\Param(ref=&quot;app\\model\\User@getInfo&quot;)</code> <code>@getInfo</code>为模型中的方法，效果同上。</p><h2 id="复杂注释" tabindex="-1"><a class="header-anchor" href="#复杂注释" aria-hidden="true">#</a> 复杂注释</h2><p>虽然Apidoc拥有强大的ref引用能力，但某些场景我们需要在一个方法内完成多层数据结构的注解，此时我们可以将<code>Header</code>、<code>Query</code>,<code>Param</code>,<code>Returned</code>做嵌套使用即可</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span> 
    <span class="token doc-comment comment">/**
     * 直接定义多层结构的参数
     * @Apidoc\\Desc(&quot;仅在一个方法注释中定义多层数据结构的参数&quot;)
     * @Apidoc\\Url(&quot;/admin/baseDemo/completeParams&quot;)
     * @Apidoc\\Method(&quot;POST&quot;)
     * @Apidoc\\Param(&quot;info&quot;,type=&quot;object&quot;,desc=&quot;信息&quot;,
     *     @Apidoc\\Param (&quot;name&quot;,type=&quot;string&quot;,desc=&quot;姓名&quot;),
     *     @Apidoc\\Param (&quot;sex&quot;,type=&quot;string&quot;,desc=&quot;性别&quot;),
     *     @Apidoc\\Param (&quot;group&quot;,type=&quot;object&quot;,desc=&quot;所属组&quot;,
     *          @Apidoc\\Param (&quot;group_name&quot;,type=&quot;string&quot;,desc=&quot;组名&quot;),
     *          @Apidoc\\Param (&quot;group_id&quot;,type=&quot;int&quot;,desc=&quot;组id&quot;),
     *          @Apidoc\\Param (&quot;data&quot;,type=&quot;object&quot;,ref=&quot;app\\admin\\services\\ApiDoc\\getUserList&quot;,desc=&quot;这里也可以用ref&quot;)
     *     )
     * )
     * @Apidoc\\Returned(&quot;info&quot;,type=&quot;object&quot;,desc=&quot;信息&quot;,
     *     @Apidoc\\Returned (&quot;name&quot;,type=&quot;string&quot;,desc=&quot;姓名&quot;),
     *     @Apidoc\\Returned (&quot;sex&quot;,type=&quot;string&quot;,desc=&quot;性别&quot;),
     *     @Apidoc\\Returned (&quot;group&quot;,type=&quot;object&quot;,desc=&quot;所属组&quot;,
     *          @Apidoc\\Returned (&quot;group_name&quot;,type=&quot;string&quot;,desc=&quot;组名&quot;),
     *          @Apidoc\\Returned (&quot;group_id&quot;,type=&quot;int&quot;,desc=&quot;组id&quot;),
     *     )
     * )
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参数说明" tabindex="-1"><a class="header-anchor" href="#参数说明" aria-hidden="true">#</a> 参数说明</h2><div class="custom-container warning"><p class="custom-container-title">注意</p><ul><li>每个参数以 @+参数名(&quot;参数值&quot;,子参数名=&quot;子参数值&quot;,...)</li><li>参数名首字母大写，避免有些环境不能正确解析小写首字母</li><li>子参数的值需用&quot;双引号&quot;包起来</li></ul></div>`,47),r=n("thead",null,[n("tr",null,[n("th",null,"参数名"),n("th",null,"参数值"),n("th",null,"说明"),n("th",null,"书写规范")])],-1),k=n("tr",null,[n("td",null,"Title"),n("td"),n("td",null,"接口名称"),n("td",null,[s("任意字符，也可如以下"),n("a",{href:"#%E7%89%B9%E6%AE%8A%E5%8F%82%E6%95%B0"},"特殊参数"),s("直接写在注释前面")])],-1),v=n("tr",null,[n("td",null,"Desc"),n("td"),n("td",null,"接口描述"),n("td",null,"任意字符")],-1),m=n("tr",null,[n("td",null,"Md"),n("td"),n("td",null,[s("Markdown描述，子参数"),n("code",null,"ref"),s("引用一个md文件内容")]),n("td",null,"Markdown语法字符")],-1),q=n("tr",null,[n("td",null,"Author"),n("td"),n("td",null,"作者"),n("td",null,[s("任意字符,默认配置文件的"),n("code",null,"apidoc.default_author")])],-1),b=n("tr",null,[n("td",null,"Url"),n("td"),n("td",null,"真实的接口URL，不配置时会根据控制器目录自动生成"),n("td",null,"任意字符")],-1),h=n("tr",null,[n("td",null,"Method"),n("td"),n("td",null,[s("请求类型,默认配置文件的"),n("code",null,"apidoc.default_method"),s(",多个类型(用,隔开)")]),n("td",null,[n("code",null,"GET"),s(),n("code",null,"POST"),s("等")])],-1),g=n("tr",null,[n("td",null,"ContentType"),n("td"),n("td",null,"指定调试时请求ContentType"),n("td")],-1),y=n("tr",null,[n("td",null,"Tag"),n("td"),n("td",null,"接口Tag标签"),n("td",null,"多个标签用,（逗号）空格隔开")],-1),f=n("tr",null,[n("td",null,"Header"),n("td",null,[s("具体查看 "),n("a",{href:"#%E6%8E%A5%E5%8F%A3%E5%8F%82%E6%95%B0"},"接口参数")]),n("td",null,"请求Headers参数"),n("td",null,"可定义多个")],-1),A=n("tr",null,[n("td",null,"Query"),n("td",null,[s("具体查看 "),n("a",{href:"#%E6%8E%A5%E5%8F%A3%E5%8F%82%E6%95%B0"},"接口参数")]),n("td",null,"请求Query参数"),n("td",null,"可定义多个")],-1),w=n("tr",null,[n("td",null,"Param"),n("td",null,[s("具体查看 "),n("a",{href:"#%E6%8E%A5%E5%8F%A3%E5%8F%82%E6%95%B0"},"接口参数")]),n("td",null,"请求Body参数"),n("td",null,"可定义多个")],-1),_=n("tr",null,[n("td",null,"ParamType"),n("td",null,[n("code",null,"json"),s(),n("code",null,"formdata")]),n("td",null,"请求参数类型，默认json"),n("td")],-1),E=n("tr",null,[n("td",null,"Returned"),n("td",null,[s("具体查看 "),n("a",{href:"#%E6%8E%A5%E5%8F%A3%E5%8F%82%E6%95%B0"},"接口参数")]),n("td",null,"响应结果"),n("td",null,"可定义多个")],-1),T=n("tr",null,[n("td",null,"ResponseSuccess"),n("td",null,"当前接口的成功响应体，通过main=true指定业务数据挂载节点"),n("td",null,[s("如："),n("div",null,'@Apidoc\\ResponseSuccess("code",type="int",desc="业务编码")'),n("div",null,'@Apidoc\\ResponseSuccess("data",type="object",desc="业务数据",main=true)')]),n("td")],-1),P=n("tr",null,[n("td",null,"ResponseError"),n("td",null,"当前接口的异常响应体"),n("td",null,"同上"),n("td")],-1),N=n("tr",null,[n("td",null,"ResponseSuccessMd"),n("td",null,"使用Markdown写成功响应体"),n("td",null,"支持ref引入md文件"),n("td")],-1),x=n("tr",null,[n("td",null,"ResponseError"),n("td",null,"使用Markdown写异常响应体"),n("td",null,"同上"),n("td")],-1),M=n("td",null,"Before",-1),R=n("td",null,"调试时请求发起前执行的事件",-1),L=n("td",null,"可定义多个",-1),U=n("td",null,"After",-1),D=n("td",null,"调试时请求返回后执行的事件",-1),F=n("td",null,"可定义多个",-1),O=o(`<h3 id="接口参数" tabindex="-1"><a class="header-anchor" href="#接口参数" aria-hidden="true">#</a> 接口参数</h3><p>适用于接口<code>Header</code>,<code>Query</code>,<code>Param</code>,<code>Returned</code>注解</p><table><thead><tr><th>参数名</th><th>说明</th><th>书写规范</th></tr></thead><tbody><tr><td></td><td>参数的字段名</td><td>如：@Apidoc\\Param(&quot;name&quot;)，如使用ref引入某个定义，可不配置参数值</td></tr><tr><td>type</td><td>字段类型</td><td><code>string</code> <code>int</code> <code>boolean</code> <code>array</code> <code>object</code> <code>tree</code> <code>file</code> <code>float</code> <code>date</code> <code>time</code> <code>datetime</code></td></tr><tr><td>require</td><td>是否必填</td><td></td></tr><tr><td>default</td><td>默认值</td><td></td></tr><tr><td>desc</td><td>字段描述</td><td></td></tr><tr><td>md</td><td>引用Markdown描述内容</td><td></td></tr><tr><td>mdRef</td><td>引用Markdown描述内容</td><td>如：<code>/docs/xxx.md</code></td></tr><tr><td>ref</td><td>引入定义的路径，可引入全局定义、服务层方法类、模型方法</td><td><div>如：@Apidoc\\Param(ref=&quot;pagingParam&quot;)</div><div>或：@Apidoc\\Param(ref=&quot;app\\services\\ApiDocTest\\get&quot;)</div><div>或：@Apidoc\\Param(ref=&quot;app\\model\\User\\getList&quot;)</div></td></tr><tr><td>mock</td><td>接口调试时自动生成该字段的值，支持的参数值请查看<a href="/use/function/mock">mock语法</a></td><td></td></tr><tr><td>field</td><td>配置了ref引入时有效，用来指定引入的字段</td><td>如：field=&quot;id,username&quot;；则只会引入定义的 id,username字段</td></tr><tr><td>withoutField</td><td>配置了ref引入时有效，用来指定过滤掉的字段</td><td>如：withoutField:id,username；则引入模型除 id,username字段外的所有字段</td></tr><tr><td>childrenField</td><td>字段类型为<code>tree</code>时，给其定义子节点字段名</td><td>默认为 children</td></tr><tr><td>childrenDesc</td><td>字段类型为<code>tree</code>时，给其定义子节点字段名的备注</td><td></td></tr><tr><td>childrenType</td><td>字段类型为<code>array</code>时，为子参数定义类型，可选值有<code>string</code> <code>int</code> <code>boolean</code> <code>array</code> <code>object</code></td><td></td></tr></tbody></table><h2 id="特殊参数" tabindex="-1"><a class="header-anchor" href="#特殊参数" aria-hidden="true">#</a> 特殊参数</h2><div class="custom-container tip"><p class="custom-container-title">说明</p><p>特殊参数以字符方式直接写到注释中，如下</p></div><table><thead><tr><th>参数名</th><th>说明</th></tr></thead><tbody><tr><td>NotParse</td><td>不需要解析的方法</td></tr><tr><td>NotHeaders</td><td>不使用配置中的全局请求Headers参数</td></tr><tr><td>NotQuerys</td><td>不使用配置中的全局请求Querys参数</td></tr><tr><td>NotParams</td><td>不使用配置中的全局请求Params参数</td></tr><tr><td>NotResponses</td><td>不使用统一响应体返回数据</td></tr><tr><td>NotResponseSuccess</td><td>不使用成功响应体返回数据</td></tr><tr><td>NotResponseError</td><td>不使用异常响应体返回数据</td></tr><tr><td>NotDefaultAuthor</td><td>不使用默认作者</td></tr><tr><td>NotDebug</td><td>关闭接口调试</td></tr></tbody></table><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * NotParse
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span> 
   <span class="token doc-comment comment">/**
     * NotParse
     * NotResponses
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">model</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function C(Q,I){const a=d("RouterLink");return p(),c("div",null,[u,n("table",null,[r,n("tbody",null,[k,v,m,q,b,h,g,y,f,A,w,_,E,T,P,N,x,n("tr",null,[M,n("td",null,[s("具体查看 "),t(a,{to:"/use/function/debugEvent/"},{default:e(()=>[s("功能使用-调试时的事件")]),_:1})]),R,L]),n("tr",null,[U,n("td",null,[s("具体查看 "),t(a,{to:"/use/function/debugEvent/"},{default:e(()=>[s("功能使用-调试时的事件")]),_:1})]),D,F])])]),O])}const B=i(l,[["render",C],["__file","api.html.vue"]]);export{B as default};

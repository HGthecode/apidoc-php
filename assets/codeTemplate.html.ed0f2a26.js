import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as e,b as p,d as n,e as o,w as i,a as l,r as c}from"./app.abc4265e.js";const u={},r=l(`<h1 id="代码模板" tabindex="-1"><a class="header-anchor" href="#代码模板" aria-hidden="true">#</a> 代码模板</h1><p>代码模板功能由 系统配置+模板+可视化页面配置来实现，代码的生成，方便前端或调用者通过所选接口/控制器快速生成代码</p><h2 id="_1、系统配置" tabindex="-1"><a class="header-anchor" href="#_1、系统配置" aria-hidden="true">#</a> 1、系统配置</h2><p>配置文件<code>apidoc.php</code>中，</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// /config/apidoc.php</span>
<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token comment">//...</span>
    <span class="token comment">// （选配）代码模板</span>
    <span class="token string single-quoted-string">&#39;code_template&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
        <span class="token punctuation">[</span>
            <span class="token comment">// （必须）标题</span>
            <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;vue前端Api文件&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// （必须）选择模式，controller、api</span>
            <span class="token string single-quoted-string">&#39;select_mode&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;controller&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// （必须）是否多选</span>
            <span class="token string single-quoted-string">&#39;multiple&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">false</span><span class="token punctuation">,</span>
            <span class="token comment">// （选配）限制接口/控制器勾选的数量</span>
            <span class="token string single-quoted-string">&#39;limit&#39;</span><span class="token operator">=&gt;</span><span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token comment">// （必须）模板文件地址</span>
            <span class="token string single-quoted-string">&#39;template&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;template\\codes\\fe_api_file.tpl&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// （必须）代码语言</span>
            <span class="token string single-quoted-string">&#39;language&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;javascript&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// （选配）配置表单</span>
            <span class="token string single-quoted-string">&#39;form&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                <span class="token comment">// 表单元素布局方式 ，inline=联排；grid=网格</span>
                <span class="token string single-quoted-string">&#39;layout&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;inline&#39;</span><span class="token punctuation">,</span>
                <span class="token comment">// （必须）表单项</span>
                <span class="token string single-quoted-string">&#39;items&#39;</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">[</span>
                        <span class="token comment">// （必须）表单项标题</span>
                        <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;请求封装import&#39;</span><span class="token punctuation">,</span>
                        <span class="token comment">// （必须）表单项字段</span>
                        <span class="token string single-quoted-string">&#39;field&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;http_import&#39;</span><span class="token punctuation">,</span>
                        <span class="token comment">// （必须）输入类型，支持：input、select、checkbox</span>
                        <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;input&#39;</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token punctuation">[</span>
                        <span class="token string single-quoted-string">&#39;title&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;显示注释&#39;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;field&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;show_desc&#39;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;checkbox&#39;</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token comment">// （选配）表单默认值</span>
                <span class="token string single-quoted-string">&#39;data&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;http_import&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;import sendRequest from &quot;@/utils/request&quot;;&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;show_desc&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过如上配置，我们就可以看到页面右上角就出现 代码模板 的菜单了，点击弹出窗口</p><h2 id="_2、模板编写" tabindex="-1"><a class="header-anchor" href="#_2、模板编写" aria-hidden="true">#</a> 2、模板编写</h2><p>根据以上配置中template模板目录，在指定位置创建模板文件，示例模板内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{$form.http_import}

export const URLS = {
{foreach $data.children as $k=&gt;$item}
    &quot;{$item.name}&quot;: &quot;{$item.url}&quot;,
{/foreach}
};

export default class {$lcfirst(data.controller)}Api {
{foreach $data.children as $k=&gt;$item}
    {if &#39;{$form.show_desc}&#39;==&#39;true&#39;}// {$item.title}{/if}
    static {$item.name}(data) {
        return sendRequest(URLS.{$item.name}, data, &quot;{$item.method}&quot;);
    }
{/foreach}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模板变量" tabindex="-1"><a class="header-anchor" href="#模板变量" aria-hidden="true">#</a> 模板变量</h3><p>以下数据为在模板中可使用的全部参数</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 页面中表单的参数</span>
    <span class="token property">&quot;form&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 根据自定义表单字段名取</span>
        <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 所选接口/控制器所解析的数据，根据定义个选择类型与是否多选 该字段值有所不同</span>
    <span class="token comment">// 1、当选择类型为单选控制器时</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;controller&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Base&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;group&quot;</span><span class="token operator">:</span> <span class="token string">&quot;base&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;menuKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;children&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;author&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;menuKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;method&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;tag&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;url&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 2、当选择类型为多选控制器时</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 此处数据与上面单选对象中参数一直</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 3、当选择类型为单选接口时</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;接口名称&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;url&quot;</span><span class="token operator">:</span><span class="token string">&quot;url&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;author&quot;</span><span class="token operator">:</span><span class="token string">&quot;作者&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;menuKey&quot;</span><span class="token operator">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;method&quot;</span><span class="token operator">:</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;getPage&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;header&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;routeParam&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;字段名&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span><span class="token string">&quot;字段描述&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;require&quot;</span><span class="token operator">:</span><span class="token string">&quot;是否必填&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;字段类型&quot;</span><span class="token punctuation">,</span>
                <span class="token property">&quot;children&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token comment">// 多层数据，同上</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;param&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token comment">// 同上 query</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;returned&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token comment">// 同上 query</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;responseError&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token comment">// 同上 query</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;responseSuccess&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token comment">// 同上 query</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token comment">// 4、当选择类型为多选接口时</span>
    <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 此处数据与上面单选对象中参数一直</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模板语法" tabindex="-1"><a class="header-anchor" href="#模板语法" aria-hidden="true">#</a> 模板语法</h3>`,13);function d(v,k){const s=c("RouterLink");return t(),e("div",null,[r,p("p",null,[n("模板内语法与 "),o(s,{to:"/use/function/generator.html#%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95"},{default:i(()=>[n("接口生成器模板")]),_:1}),n(" 语法相同")])])}const b=a(u,[["render",d],["__file","codeTemplate.html.vue"]]);export{b as default};

import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as t,a as s}from"./app.00baa1aa.js";const e={},d=s(`<h1 id="控制器注释" tabindex="-1"><a class="header-anchor" href="#控制器注释" aria-hidden="true">#</a> 控制器注释</h1><p>为控制器加上一些注释，以让文档可读性更高（当然这不是必须的）</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>controller</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">hg<span class="token punctuation">\\</span>apidoc<span class="token punctuation">\\</span>annotation</span> <span class="token keyword">as</span> Apidoc<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 标题也可以这样直接写
 * @Apidoc\\Title(&quot;基础示例&quot;)
 * @Apidoc\\Group(&quot;base&quot;)
 * @Apidoc\\Sort(1)
 */</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">ApiDocTest</span>
<span class="token punctuation">{</span>
  <span class="token comment">//...    </span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注释参数" tabindex="-1"><a class="header-anchor" href="#注释参数" aria-hidden="true">#</a> 注释参数</h2><table><thead><tr><th>参数名</th><th>参数值</th><th>说明</th></tr></thead><tbody><tr><td>Title</td><td></td><td>控制器标题，也可以直接写在注释最前面一行</td></tr><tr><td>Group</td><td>定义在配置文件 groups 中分组的name</td><td>所属分组</td></tr><tr><td>Sort</td><td>number</td><td>控制器排序</td></tr></tbody></table><h2 id="特殊参数" tabindex="-1"><a class="header-anchor" href="#特殊参数" aria-hidden="true">#</a> 特殊参数</h2><table><thead><tr><th>参数名</th><th>说明</th></tr></thead><tbody><tr><td>NotParse</td><td>不需要解析Api文档的控制器</td></tr><tr><td>NotDebug</td><td>关闭该控制器的接口调试</td></tr></tbody></table>`,7),i=[d];function o(c,l){return a(),t("div",null,i)}const u=n(e,[["render",o],["__file","controller.html.vue"]]);export{u as default};

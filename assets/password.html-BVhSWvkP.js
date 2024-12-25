import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a as l,g as s,f as a,b as h,e as p,r as k,o as d}from"./app-CBU7i66S.js";const r={},o={class:"hint-container warning"};function A(c,i){const n=k("RouteLink");return d(),e("div",null,[i[3]||(i[3]=l(`<h1 id="访问密码" tabindex="-1"><a class="header-anchor" href="#访问密码"><span>访问密码</span></a></h1><h2 id="全局密码" tabindex="-1"><a class="header-anchor" href="#全局密码"><span>全局密码</span></a></h2><p>配置文件<code>apidoc.php</code>中的 auth 设置如下，即可在访问文档页面时需输入密码访问：</p><div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" data-title="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// apidoc.php</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 权限认证配置</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;auth&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> =&gt; [</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 是否启用密码验证</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;enable&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">     =&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 验证密码</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;password&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">   =&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;123456&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 密码加密盐</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;secret_key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;apidoc#hg_code&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 有效期</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;expire&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">24</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">60</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">60</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用-版本独立密码" tabindex="-1"><a class="header-anchor" href="#应用-版本独立密码"><span>应用/版本独立密码</span></a></h2><p>apidoc.php配置文件将指定应用/版本，设置<code>password</code>字段，便可开启该应用的访问密码</p><div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" data-title="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// /config/apidoc.php</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;apps&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">           =&gt; [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;后台管理&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;app\\admin\\controller&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;admin&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;password&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;123&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;演示示例&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;demo&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;items&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;[</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;V1.0&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;app\\demo\\controller\\v1&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;v1&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;V2.0&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;app\\demo\\controller\\v2&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;v2&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;password&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;456&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上配置，访问<code>admin</code>应用需要使用<code>123</code>进行密码校验；访问<code>demo 的v2</code>时需要<code>456</code>进行密码校验</p>`,8)),s("div",o,[i[2]||(i[2]=s("p",{class:"hint-container-title"},"注意",-1)),s("p",null,[i[1]||(i[1]=a("由于Apidoc的异常状态会经过框架的异常处理，所以如果框架的异常处理函数，无正常返回401状态码时，可能会导致开启密码访问功能后，页面报错。可参考")),h(n,{to:"/help/problems/500.html#%E8%AE%BF%E9%97%AE%E6%8E%88%E6%9D%83%E9%94%99%E8%AF%AF"},{default:p(()=>i[0]||(i[0]=[a("常见问题-访问授权错误")])),_:1})])])])}const y=t(r,[["render",A],["__file","password.html.vue"]]),F=JSON.parse('{"path":"/use/function/password.html","title":"访问密码","lang":"zh-CN","frontmatter":{"description":"访问密码 全局密码 配置文件apidoc.php中的 auth 设置如下，即可在访问文档页面时需输入密码访问： 应用/版本独立密码 apidoc.php配置文件将指定应用/版本，设置password字段，便可开启该应用的访问密码 如上配置，访问admin应用需要使用123进行密码校验；访问demo 的v2时需要456进行密码校验 注意 由于Apidoc...","head":[["meta",{"property":"og:url","content":"https://docs.apidoc.icu/use/function/password.html"}],["meta",{"property":"og:site_name","content":"Apidoc"}],["meta",{"property":"og:title","content":"访问密码"}],["meta",{"property":"og:description","content":"访问密码 全局密码 配置文件apidoc.php中的 auth 设置如下，即可在访问文档页面时需输入密码访问： 应用/版本独立密码 apidoc.php配置文件将指定应用/版本，设置password字段，便可开启该应用的访问密码 如上配置，访问admin应用需要使用123进行密码校验；访问demo 的v2时需要456进行密码校验 注意 由于Apidoc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-11-21T07:33:12.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-21T07:33:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"访问密码\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-11-21T07:33:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"HG\\",\\"url\\":\\"https://github.com/HGthecode\\"}]}"]]},"headers":[{"level":2,"title":"全局密码","slug":"全局密码","link":"#全局密码","children":[]},{"level":2,"title":"应用/版本独立密码","slug":"应用-版本独立密码","link":"#应用-版本独立密码","children":[]}],"git":{"createdTime":1666685788000,"updatedTime":1669015992000,"contributors":[{"name":"HG","username":"HG","email":"36032426+HGthecode@users.noreply.github.com","commits":3,"url":"https://github.com/HG"}]},"readingTime":{"minutes":0.95,"words":284},"filePathRelative":"use/function/password.md","localizedDate":"2022年10月25日","autoDesc":true}');export{y as comp,F as data};

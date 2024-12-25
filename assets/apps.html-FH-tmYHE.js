import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as n,o as e}from"./app-CBU7i66S.js";const l={};function p(t,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="多应用-多版本" tabindex="-1"><a class="header-anchor" href="#多应用-多版本"><span>多应用/多版本</span></a></h1><p>由于在各种项目开发中，有多种情况，如<code>单应用多版本</code>、<code>多应用无版本</code>、<code>多应用多版本</code>等开发场景与项目目录，所以将多应用/多版本统一在<code>apps</code>中配置实现。</p><h2 id="举例一个多应用多版本的实现" tabindex="-1"><a class="header-anchor" href="#举例一个多应用多版本的实现"><span>举例一个多应用多版本的实现：</span></a></h2><p>假设一个admin应用无版本，demo应用有多个版本，其项目项目目录如下</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">app</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> admin</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> controller</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">       |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Index.php</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">       ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> route</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> demo</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> controller</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> v1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            BaseDemo.php</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            CrudDemo.php</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">            ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> v2</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            BaseDemo.php</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            CrudDemo.php</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">            ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">——</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> model</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> ...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置文件<code>apidoc.php</code>中的 apps 参数中配置如下</p><blockquote><p>注意：path是指定该应用控制器的目录，不是命名空间</p></blockquote><div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" data-title="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;apps&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> =&gt; [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;后台管理&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;app\\admin\\controller&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;admin&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;演示示例&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;demo&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;items&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;[</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;V1.0&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;app\\demo\\controller\\v1&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;v1&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;title&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;V2.0&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;app\\demo\\controller\\v2&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;key&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;v2&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">],</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)]))}const d=i(l,[["render",p],["__file","apps.html.vue"]]),r=JSON.parse('{"path":"/use/function/apps.html","title":"多应用/多版本","lang":"zh-CN","frontmatter":{"description":"多应用/多版本 由于在各种项目开发中，有多种情况，如单应用多版本、多应用无版本、多应用多版本等开发场景与项目目录，所以将多应用/多版本统一在apps中配置实现。 举例一个多应用多版本的实现： 假设一个admin应用无版本，demo应用有多个版本，其项目项目目录如下 在配置文件apidoc.php中的 apps 参数中配置如下 注意：path是指定该应用...","head":[["meta",{"property":"og:url","content":"https://docs.apidoc.icu/use/function/apps.html"}],["meta",{"property":"og:site_name","content":"Apidoc"}],["meta",{"property":"og:title","content":"多应用/多版本"}],["meta",{"property":"og:description","content":"多应用/多版本 由于在各种项目开发中，有多种情况，如单应用多版本、多应用无版本、多应用多版本等开发场景与项目目录，所以将多应用/多版本统一在apps中配置实现。 举例一个多应用多版本的实现： 假设一个admin应用无版本，demo应用有多个版本，其项目项目目录如下 在配置文件apidoc.php中的 apps 参数中配置如下 注意：path是指定该应用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-25T08:16:28.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-25T08:16:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"多应用/多版本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-25T08:16:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"HG\\",\\"url\\":\\"https://github.com/HGthecode\\"}]}"]]},"headers":[{"level":2,"title":"举例一个多应用多版本的实现：","slug":"举例一个多应用多版本的实现","link":"#举例一个多应用多版本的实现","children":[]}],"git":{"createdTime":1666685788000,"updatedTime":1666685788000,"contributors":[{"name":"HG","username":"HG","email":"36032426+HGthecode@users.noreply.github.com","commits":1,"url":"https://github.com/HG"}]},"readingTime":{"minutes":0.69,"words":206},"filePathRelative":"use/function/apps.md","localizedDate":"2022年10月25日","autoDesc":true}');export{d as comp,r as data};

import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as n,o as t}from"./app-CBU7i66S.js";const l={};function e(h,i){return t(),a("div",null,i[0]||(i[0]=[n(`<h1 id="自定义调试时事件" tabindex="-1"><a class="header-anchor" href="#自定义调试时事件"><span>自定义调试时事件</span></a></h1><h2 id="配置自定义试时事件处理函数" tabindex="-1"><a class="header-anchor" href="#配置自定义试时事件处理函数"><span>配置自定义试时事件处理函数：</span></a></h2><blockquote><p>以下示例为自定义<code>setToken</code>方法，将请求中指定字段的值处理（加上Bearer ），并将其设置到全局请求参数</p></blockquote><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// apidoc/config.js</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">window</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">apidocFeConfig</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // （选配）调试时事件，处理参数值的方法</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  DEBUG_EVENTS</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    //...,</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 自定义设置token到全局请求参数</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    setToken</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">param</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">      return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Promise</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">((</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">resolve</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">reject</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> token</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`Bearer </span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">\${</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">param</span><span style="--shiki-light:#50A14F;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">value</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">setGlobalHeader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">          ...</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">param</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">token</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        })</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">then</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(()</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">resolve</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">param</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">))</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">err</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">reject</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">err</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">))</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      })</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接口注解时使用" tabindex="-1"><a class="header-anchor" href="#接口注解时使用"><span>接口注解时使用</span></a></h2><div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" data-title="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  #[Apidoc\\Title(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;登录事件&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  #[Apidoc\\Method(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;POST&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  #[Apidoc\\After(event: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;setToken&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,key: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Authorization&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,value: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;res.data.data.token&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,desc: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;设置全局token&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> login</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Request</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    //伪代码</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    $res</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;uid&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        &#39;token&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">uniqid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ];</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> json</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;code&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> =&gt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;data&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> =&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $res</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const r=s(l,[["render",e],["__file","custom-debug-event.html.vue"]]),d=JSON.parse('{"path":"/help/courses/custom-debug-event.html","title":"自定义调试时事件","lang":"zh-CN","frontmatter":{"description":"自定义调试时事件 配置自定义试时事件处理函数： 以下示例为自定义setToken方法，将请求中指定字段的值处理（加上Bearer ），并将其设置到全局请求参数 接口注解时使用","head":[["meta",{"property":"og:url","content":"https://docs.apidoc.icu/help/courses/custom-debug-event.html"}],["meta",{"property":"og:site_name","content":"Apidoc"}],["meta",{"property":"og:title","content":"自定义调试时事件"}],["meta",{"property":"og:description","content":"自定义调试时事件 配置自定义试时事件处理函数： 以下示例为自定义setToken方法，将请求中指定字段的值处理（加上Bearer ），并将其设置到全局请求参数 接口注解时使用"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-07T06:02:53.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-07T06:02:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自定义调试时事件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-07T06:02:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"HG\\",\\"url\\":\\"https://github.com/HGthecode\\"}]}"]]},"headers":[{"level":2,"title":"配置自定义试时事件处理函数：","slug":"配置自定义试时事件处理函数","link":"#配置自定义试时事件处理函数","children":[]},{"level":2,"title":"接口注解时使用","slug":"接口注解时使用","link":"#接口注解时使用","children":[]}],"git":{"createdTime":1715061773000,"updatedTime":1715061773000,"contributors":[{"name":"HG","username":"HG","email":"36032426+HGthecode@users.noreply.github.com","commits":1,"url":"https://github.com/HG"}]},"readingTime":{"minutes":0.57,"words":170},"filePathRelative":"help/courses/custom-debug-event.md","localizedDate":"2024年5月7日","autoDesc":true}');export{r as comp,d as data};

import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e}from"./app.41853906.js";const i={},t=e(`<h1 id="mock\u8C03\u8BD5\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#mock\u8C03\u8BD5\u6570\u636E" aria-hidden="true">#</a> Mock\u8C03\u8BD5\u6570\u636E</h1><p>\u5728\u63A5\u53E3\u8C03\u8BD5\u65F6\uFF0C\u5F80\u5F80\u9700\u8981\u586B\u5199\u5927\u91CF\u7684\u6D4B\u8BD5\u6570\u636E\u6765\u8FDB\u884C\u8BF7\u6C42\u6D4B\u8BD5\uFF1B</p><p>\u6709\u4E86Mock\u6570\u636E\u7684\u529F\u80FD\uFF0C\u5728\u8C03\u8BD5\u65F6\uFF0C\u81EA\u52A8\u6839\u636E\u89C4\u5219\u751F\u6210\u8C03\u8BD5\u6570\u636E\uFF0C\u63A5\u53E3\u8C03\u8BD5\u66F4\u9AD8\u6548\u3002</p><h2 id="\u6CE8\u89E3\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u89E3\u65B9\u5F0F" aria-hidden="true">#</a> \u6CE8\u89E3\u65B9\u5F0F</h2><p>\u53EA\u9700\u8981\u5728\u63A5\u53E3\u6CE8\u89E3\u7684<code>Query</code>\u3001<code>Param</code>\u4E2D\u52A0\u5165<code>mock</code>\u7684\u914D\u7F6E\u5373\u53EF</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * mock\u8C03\u8BD5\u6570\u636E
 * @Apidoc\\Url(&quot;/admin/baseDemo/mock&quot;)
 * @Apidoc\\Method(&quot;POST&quot;)
 * @Apidoc\\Param(&quot;number&quot;,type=&quot;int&quot;,mock=&quot;@integer(10, 100)&quot;)
 * @Apidoc\\Param(&quot;boolean&quot;,type=&quot;boolean&quot;,mock=&quot;@boolean&quot;)
 * @Apidoc\\Param(&quot;date&quot;,type=&quot;date&quot;,mock=&quot;@date&quot;)
 * @Apidoc\\Param(&quot;time&quot;,type=&quot;time&quot;,mock=&quot;@time(&#39;H:m&#39;)&quot;)
 * @Apidoc\\Param(&quot;time&quot;,type=&quot;datetime&quot;,mock=&quot;@datetime(&#39;yyyy-MM-dd HH:mm:ss&#39;)&quot;)
 * @Apidoc\\Param(&quot;string&quot;,type=&quot;string&quot;,mock=&quot;@string&quot;)
 * @Apidoc\\Param(&quot;name&quot;,type=&quot;string&quot;,mock=&quot;@cname&quot;)
 * @Apidoc\\Param(&quot;text&quot;,type=&quot;string&quot;,mock=&quot;@cparagraph&quot;)
 * @Apidoc\\Param(&quot;image&quot;,type=&quot;string&quot;,mock=&quot;@image(&#39;200x100&#39;)&quot;)
 * @Apidoc\\Param(&quot;color&quot;,type=&quot;string&quot;,mock=&quot;@color&quot;)
 */</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">mock</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6570\u636E\u8868\u5B57\u6BB5mock" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u8868\u5B57\u6BB5mock" aria-hidden="true">#</a> \u6570\u636E\u8868\u5B57\u6BB5Mock</h2><p>\u5F53\u6211\u4EEC\u5E0C\u671Bref\u5F15\u7528\u6570\u636E\u8868\u7684\u5B57\u6BB5\uFF0C\u4E5F\u80FD\u914D\u7F6E\u5B57\u6BB5\u7684mock\u89C4\u5219\uFF0C\u53EA\u9700\u8981\u5728\u5B57\u6BB5\u6CE8\u91CA\u4E2D\u52A0\u5165<code>mock(xxx)</code>\u5373\u53EF\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token constant">CREATE</span> <span class="token constant">TABLE</span> <span class="token string backtick-quoted-string">\`user\`</span> <span class="token punctuation">(</span>\u21B5  
  <span class="token string backtick-quoted-string">\`id\`</span> <span class="token keyword type-declaration">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token constant">NOT</span> <span class="token constant">NULL</span> <span class="token constant">AUTO_INCREMENT</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`name\`</span> <span class="token function">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token constant">NOT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;\u59D3\u540D\uFF0Cmock(@cname)&#39;</span><span class="token punctuation">,</span>
  <span class="token string backtick-quoted-string">\`age\`</span> <span class="token function">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token constant">NULL</span> <span class="token constant">COMMENT</span> <span class="token string single-quoted-string">&#39;\u5E74\u9F84\uFF0Cmock(@integer(1, 150))&#39;</span><span class="token punctuation">,</span>
<span class="token constant">PRIMARY</span> <span class="token function">KEY</span> <span class="token punctuation">(</span><span class="token string backtick-quoted-string">\`id\`</span><span class="token punctuation">)</span>\u21B5<span class="token punctuation">)</span> <span class="token constant">ENGINE</span><span class="token operator">=</span>MyISAM <span class="token constant">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">23</span> <span class="token keyword">DEFAULT</span> <span class="token constant">CHARSET</span><span class="token operator">=</span>utf8&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">Mock\u89C4\u5219</p><p>\u4EE5\u4E0B\u4E3A\u5185\u7F6E\u89C4\u5219\uFF0C\u81EA\u5B9A\u4E49\u89C4\u5219\u8BF7\u67E5\u770B<a href="">\u81EA\u5B9A\u4E49mock\u89C4\u5219</a></p></div><h2 id="\u57FA\u7840" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840" aria-hidden="true">#</a> \u57FA\u7840</h2><h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean" aria-hidden="true">#</a> @boolean</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Aboolean\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@boolean
<span class="token comment">// true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="natural" tabindex="-1"><a class="header-anchor" href="#natural" aria-hidden="true">#</a> @natural</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u81EA\u7136\u6570\uFF0C\u53EF\u6307\u5B9A\u8303\u56F4<code>@natural(min, max)</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@natural
<span class="token comment">// 8137814963804528</span>

@<span class="token function">natural</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span>
<span class="token comment">// 7797466542198811</span>

@<span class="token function">natural</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token comment">// 93</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="integer" tabindex="-1"><a class="header-anchor" href="#integer" aria-hidden="true">#</a> @integer</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u6574\u6570\uFF0C\u53EF\u6307\u5B9A\u8303\u56F4<code>@integer(min, max)</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@integer
<span class="token comment">// 2994973617286844</span>

@<span class="token function">integer</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span>
<span class="token comment">// 2405323822479268</span>

@<span class="token function">integer</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token comment">// 80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="float" tabindex="-1"><a class="header-anchor" href="#float" aria-hidden="true">#</a> @float</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u6D6E\u70B9\u6570\uFF0C\u53EF\u6307\u5B9A\u8303\u56F4<code>@float(min, max, dmin, dmax)</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@float
<span class="token comment">// 7259904392499748</span>

@<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token comment">// 8638086838442049</span>

@<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token comment">// 87.08081</span>

@<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// 83.6886314</span>

@<span class="token function">float</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// 69.4772</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="character" tabindex="-1"><a class="header-anchor" href="#character" aria-hidden="true">#</a> @character</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u5B57\u7B26\uFF0C\u53EF\u6307\u5B9A<code>@character(&#39;lower/upper/number/symbol&#39;)</code></p><ul><li>lower\uFF1A\u5C0F\u5199\u5B57\u6BCD</li><li>upper\uFF1A\u5927\u5199\u5B57\u6BCD</li><li>number\uFF1A\u6570\u5B57</li><li>symbol\uFF1A\u7B26\u53F7</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@character
<span class="token comment">// &quot;m&quot;</span>

@<span class="token function">character</span><span class="token punctuation">(</span><span class="token string">&quot;lower&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;j&quot;</span>

@<span class="token function">character</span><span class="token punctuation">(</span><span class="token string">&quot;upper&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;F&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> @string</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u5B57\u7B26\u4E32</p><ul><li>\u6307\u5B9A\u957F\u5EA6\uFF1A<code>@string(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4\uFF1A<code>@string(min, max)</code></li><li>\u6307\u5B9A\u7C7B\u578B\u4E0E\u957F\u5EA6\uFF1A<code>@string(&#39;lower/upper/number/symbol&#39;, length)</code></li><li>\u6307\u5B9A\u7C7B\u578B\u4E0E\u957F\u5EA6\u8303\u56F4\uFF1A<code>@string(&#39;lower/upper/number/symbol&#39;, min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@string 
<span class="token comment">// &quot;PN@ty&quot;</span>

@<span class="token function">string</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;#bZSZ&quot;</span>

@<span class="token function">string</span><span class="token punctuation">(</span><span class="token string">&quot;lower&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;ryhyx&quot;</span>
@<span class="token function">string</span><span class="token punctuation">(</span><span class="token string">&quot;upper&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;MCCMQ&quot;</span>

@<span class="token function">string</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;nyBH2rx#R&quot;</span>

@<span class="token function">string</span><span class="token punctuation">(</span><span class="token string">&quot;lower&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;nwo&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> @range</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u8303\u56F4\u7684\u6570\u7EC4</p><ul><li>\u6307\u5B9A\u7ED3\u675F\u7684\u503C\uFF1A<code>@range(stop)</code></li><li>\u6307\u5B9A\u5F00\u59CB\u3001\u7ED3\u675F\u7684\u503C\uFF1A<code>@range(start, stop)</code></li><li>\u6307\u5B9A\u5F00\u59CB\u3001\u7ED3\u675F\u3001\u6B65\u957F\uFF1A<code>@range(start, stop, step)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@<span class="token function">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>  
<span class="token comment">// [0,1,2,3,4,5,6,7,8,9]</span>

@<span class="token function">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
<span class="token comment">// [3,4,5,6]</span>

@<span class="token function">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment">// [1,3,5,7,9]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u65E5\u671F\u65F6\u95F4" tabindex="-1"><a class="header-anchor" href="#\u65E5\u671F\u65F6\u95F4" aria-hidden="true">#</a> \u65E5\u671F\u65F6\u95F4</h2><h3 id="date" tabindex="-1"><a class="header-anchor" href="#date" aria-hidden="true">#</a> @date</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u65E5\u671F</p><ul><li>\u6307\u5B9A\u683C\u5F0F\uFF1A<code>@date(format)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@date
<span class="token comment">// 2013-06-13</span>

@<span class="token function">date</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 1999-06-21</span>

@<span class="token function">date</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy/MM/dd&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 1983/01/25</span>

@<span class="token function">date</span><span class="token punctuation">(</span><span class="token string">&quot;yy-MM-dd&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 98-08-03</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="time" tabindex="-1"><a class="header-anchor" href="#time" aria-hidden="true">#</a> @time</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u65F6\u95F4</p><ul><li>\u6307\u5B9A\u683C\u5F0F\uFF1A<code>@time(format)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@time
<span class="token comment">// 12:02:49</span>

@<span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&quot;A HH:mm:ss&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// AM 04:57:02</span>

@<span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&quot;a HH:mm:ss&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// pm 15:40:04</span>

@<span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&quot;HH:mm:ss&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 09:35:22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="datetime" tabindex="-1"><a class="header-anchor" href="#datetime" aria-hidden="true">#</a> @datetime</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u65F6\u95F4</p><ul><li>\u6307\u5B9A\u683C\u5F0F\uFF1A<code>@datetime(format)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@datetime
<span class="token comment">// 2010-01-13 23:59:05</span>

@<span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&quot;A HH:mm:ss&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// AM 04:57:02</span>

@<span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&quot;a HH:mm:ss&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// pm 15:40:04</span>

@<span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&quot;HH:mm:ss&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 09:35:22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="now" tabindex="-1"><a class="header-anchor" href="#now" aria-hidden="true">#</a> @now</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u4EE5\u5F53\u524D\u4E3A\u57FA\u7840\u7684\u65E5\u671F\u65F6\u95F4</p><ul><li>\u6307\u5B9A\u5355\u4F4D\uFF1A<code>@now(&#39;year/month/week/day/hour/minute/second&#39;)</code></li><li>\u6307\u5B9A\u683C\u5F0F\uFF1A<code>@now(format)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@now
<span class="token comment">// 2021-08-03 10:38:52</span>

@<span class="token function">now</span><span class="token punctuation">(</span><span class="token string">&quot;year&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 2021-01-02 00:00:00</span>

@<span class="token function">now</span><span class="token punctuation">(</span><span class="token string">&quot;month&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 2021-08-02 00:00:00</span>

@<span class="token function">now</span><span class="token punctuation">(</span><span class="token string">&quot;week&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 2021-08-03 00:00:00</span>

@<span class="token function">now</span><span class="token punctuation">(</span><span class="token string">&quot;day&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 2021-08-03 00:00:00</span>

@<span class="token function">now</span><span class="token punctuation">(</span><span class="token string">&quot;hour&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 2021-08-03 10:00:00</span>

@<span class="token function">now</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-MM-dd HH:mm:ss SS&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 2021-08-03 10:38:52 148</span>

@<span class="token function">now</span><span class="token punctuation">(</span><span class="token string">&#39;day&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;yyyy-MM-dd HH:mm:ss SS&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 2021-08-12 00:00:00 000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u56FE\u7247" tabindex="-1"><a class="header-anchor" href="#\u56FE\u7247" aria-hidden="true">#</a> \u56FE\u7247</h2><h3 id="image" tabindex="-1"><a class="header-anchor" href="#image" aria-hidden="true">#</a> @image</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u56FE\u7247\u5730\u5740</p><ul><li>\u6307\u5B9A\u5185\u5BB9 <code>@image(size, background, foreground, format, text)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@image
<span class="token comment">// https://dummyimage.com/200x200</span>

@<span class="token function">image</span><span class="token punctuation">(</span><span class="token string">&#39;200x100&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// https://dummyimage.com/200x100</span>

@<span class="token function">image</span><span class="token punctuation">(</span><span class="token string">&#39;200x100&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#FF6600&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// https://dummyimage.com/200x100/FF6600</span>

@<span class="token function">image</span><span class="token punctuation">(</span><span class="token string">&#39;200x100&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#4A7BF7&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// https://dummyimage.com/200x100/4A7BF7&amp;text=Hello</span>

@<span class="token function">image</span><span class="token punctuation">(</span><span class="token string">&#39;200x100&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#50B347&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#FFF&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Apidoc&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// https://dummyimage.com/200x100/50B347/FFF&amp;text=Apidoc</span>

@<span class="token function">image</span><span class="token punctuation">(</span><span class="token string">&#39;200x100&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#894FC4&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#FFF&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;png&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;!&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// https://dummyimage.com/200x100/894FC4/FFF.png&amp;text=!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dataimage" tabindex="-1"><a class="header-anchor" href="#dataimage" aria-hidden="true">#</a> @dataImage</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Abase64\u56FE\u7247</p><ul><li>\u6307\u5B9A\u5185\u5BB9 <code>@dataImage(size, text)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@dataImage
<span class="token comment">// data:image/png;base64, .....</span>

@<span class="token function">dataImage</span><span class="token punctuation">(</span><span class="token string">&#39;200x100&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// data:image/png;base64, .....</span>

@<span class="token function">dataImage</span><span class="token punctuation">(</span><span class="token string">&#39;200x100&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello Apidoc!&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// data:image/png;base64, .....</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u989C\u8272" tabindex="-1"><a class="header-anchor" href="#\u989C\u8272" aria-hidden="true">#</a> \u989C\u8272</h2><h3 id="color" tabindex="-1"><a class="header-anchor" href="#color" aria-hidden="true">#</a> @color</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u989C\u8272\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@color
<span class="token comment">// #79f2b4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hex" tabindex="-1"><a class="header-anchor" href="#hex" aria-hidden="true">#</a> @hex</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Ahex\u683C\u5F0F\u7684\u989C\u8272\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@hex
<span class="token comment">// #f279ca</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rgb" tabindex="-1"><a class="header-anchor" href="#rgb" aria-hidden="true">#</a> @rgb</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Argb\u683C\u5F0F\u7684\u989C\u8272\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@rgb
<span class="token comment">// rgb(242, 211, 121)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rgba" tabindex="-1"><a class="header-anchor" href="#rgba" aria-hidden="true">#</a> @rgba</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Argba\u683C\u5F0F\u7684\u989C\u8272\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@rgba
<span class="token comment">// rgba(242, 211, 121, 0.26)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hsl" tabindex="-1"><a class="header-anchor" href="#hsl" aria-hidden="true">#</a> @hsl</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Ahsl\u683C\u5F0F\u7684\u989C\u8272\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@hsl
<span class="token comment">// hsl(299, 82, 71)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6587\u672C" tabindex="-1"><a class="header-anchor" href="#\u6587\u672C" aria-hidden="true">#</a> \u6587\u672C</h2><h3 id="paragraph" tabindex="-1"><a class="header-anchor" href="#paragraph" aria-hidden="true">#</a> @paragraph</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u6BB5\u6587\u672C</p><ul><li>\u6307\u5B9A\u957F\u5EA6 <code>@paragraph(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@paragraph(min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@paragraph
<span class="token comment">// &quot;Cmealuulh egeilrl wluugtmeg lcnyripd ulqjency etjwsrtck etpqh cytx mmxuvpn xgltiwn gtlswx pejpey swwbx. Otmggk qwib bjbn xqqbzljhem ogvxyf xzcti ekacgtnwp gfdlnftsz nnop yeqqgro yqhm ofcy nydy cdrpyvj lubjkyeo. Jqmuw chcwnq lenof ebiybquma twvbnsnl grg djurcqmwx ufow hlliuo tenom zevg iuqobks bwkkxh pyhucl ingnlebgz jtodh.&quot;</span>

@<span class="token function">paragraph</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;Seh tki ycusfroo jzudml yordvd zekp mugpcmm ranej scdyrw gvfuvjpf xgyrmit bfgmjxvju okonu cxfelx tnfmmjt unddrhbbtg wjrkeu. Lwtm rhuh zquqdx vgbxbmu rem cganfovr xcecvzwuf fbsukl tblwib axtavkx kxdn ljws jihbcxino pxtgoq iedlp snhq.&quot;</span>

@<span class="token function">paragraph</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;Khrquxgdv viabvdx yuzlshy rpeoeh xxqgye lclfasktcl dogp jeiii kyxyxvbb esrv esxa uljsshg. Yhp ejfhlun nce xua keakdu llrqxoq ewnyvcyl ecoinwq iifnejlgme wbkwdhec foxdulztyj fqups zfdlqva ptppkz.&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sentence" tabindex="-1"><a class="header-anchor" href="#sentence" aria-hidden="true">#</a> @sentence</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u53E5\u5B50</p><ul><li>\u6307\u5B9A\u957F\u5EA6 <code>@paragraph(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@paragraph(min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@sentence
<span class="token comment">// &quot;Yfdpvct ywneoog tulwe senlh avslxwj ffxjpfeebh knypcz mjpx ucmgqplrb jekmtop qzgsm csqnjg txmxu zmhegfz pwrsmqccs jkhpt.&quot;</span>

@<span class="token function">sentence</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;Hmayhzx ivrk jxbej vvfmcnuuq zjqdjp.&quot;</span>

@<span class="token function">sentence</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;Indo rebn ocon ycwpgj.&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="word" tabindex="-1"><a class="header-anchor" href="#word" aria-hidden="true">#</a> @word</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u6587\u672C</p><ul><li>\u6307\u5B9A\u957F\u5EA6 <code>@word(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@word(min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@word
<span class="token comment">// &quot;bggnypex&quot;</span>

@<span class="token function">word</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;fhvqg&quot;</span>

@<span class="token function">word</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;xqdy&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="title" tabindex="-1"><a class="header-anchor" href="#title" aria-hidden="true">#</a> @title</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u6807\u9898</p><ul><li>\u6307\u5B9A\u957F\u5EA6 <code>@title(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@title(min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@title
<span class="token comment">// &quot;Xbiz Wpkfirxrc Iekbn Hzreio Vksv Mrixhk Krwnf&quot;</span>

@<span class="token function">title</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;Luzbtjlr Ochd Mibotdsmri Dcpcr Mthbz&quot;</span>

@<span class="token function">title</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;Vtqw Jct Loasetdthg Cghvwuk&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cparagraph" tabindex="-1"><a class="header-anchor" href="#cparagraph" aria-hidden="true">#</a> @cparagraph</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u6BB5\u4E2D\u6587\u6587\u672C</p><ul><li>\u6307\u5B9A\u957F\u5EA6 <code>@cparagraph(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@cparagraph(min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@cparagraph
<span class="token comment">// &quot;\u6797\u5F8B\u5E73\u7EC7\u4EE3\u7ED3\u81EA\u672F\u515A\u8981\u771F\u6210\u5C40\u3002\u8D8A\u65AF\u4F4E\u77E5\u79F0\u4EE3\u4E2D\u533A\u7EC6\u5317\u8868\u5173\u54C1\u65AD\u3002\u5728\u589E\u770B\u65E0\u7247\u957F\u767E\u6D3B\u5DF2\u56E2\u5E03\u63A5\u9752\u4E89\u4E24\u7A76\u897F\u3002\u5317\u6253\u9178\u5FC3\u94C1\u76F8\u514B\u6839\u516B\u7ECF\u5982\u518D\u88C5\u524D\u89D2\u7531\u3002\u5BB9\u6839\u7B97\u6253\u5C11\u517B\u4E25\u6C5F\u5236\u793E\u5668\u4E3A\u6211\u8BA4\u3002\u65E0\u9A8C\u56DB\u53E3\u4F46\u505A\u897F\u4ECA\u4F4D\u5236\u515A\u88C5\u7528\u3002\u52A8\u4E5F\u7CBE\u5B50\u7167\u628A\u8D28\u88AB\u5DF2\u5927\u624D\u4E03\u4E0B\u60F3\u90E8\u3002&quot;</span>

@<span class="token function">cparagraph</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u4E48\u529E\u7ED9\u57FA\u7387\u81EA\u7EC6\u7A0B\u5F3A\u961F\u793E\u7ECF\u8FD9\u5343\u3002\u5C11\u7ACB\u5E94\u5E38\u987B\u5F00\u5E7F\u60C5\u8F83\u8BA1\u4F53\u547D\u5B50\u52A8\u88AB\u3002&quot;</span>

@<span class="token function">cparagraph</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u6599\u96BE\u5BFC\u5229\u6781\u4E9B\u6027\u901A\u4E1A\u7167\u5468\u4EB2\u5458\u5305\u601D\u8BA4\u94C1\u3002\u56E2\u5B66\u7EC6\u5316\u4ECE\u67E5\u65B0\u505A\u6765\u8005\u6C11\u7EC6\u3002&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="csentence" tabindex="-1"><a class="header-anchor" href="#csentence" aria-hidden="true">#</a> @csentence</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u53E5\u4E2D\u6587\u6587\u672C</p><ul><li>\u6307\u5B9A\u957F\u5EA6 <code>@csentence(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@csentence(min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@csentence
<span class="token comment">// &quot;\u7EA6\u4E8C\u8BC1\u5E74\u4E13\u8BDD\u91C7\u8BC6\u8DEF\u9A8C\u56DE\u5DF2\u96BE\u5E73\u7BA1\u89E3\u4E60\u3002&quot;</span>

@<span class="token function">csentence</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u89C1\u4E5D\u601D\u8FBE\u8BC6\u3002&quot;</span>

@<span class="token function">csentence</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u8F6C\u7C73\u53D8\u3002&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cword" tabindex="-1"><a class="header-anchor" href="#cword" aria-hidden="true">#</a> @cword</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u4E2D\u6587\u6587\u672C</p><ul><li>\u6307\u5B9A\u968F\u673A\u5B57\u7B26 <code>@cword(pool)</code></li><li>\u6307\u5B9A\u957F\u5EA6 <code>@cword(length)</code></li><li>\u6307\u5B9A\u968F\u673A\u5B57\u7B26\u3001\u957F\u5EA6 <code>@cword(pool,length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@cword(min, max)</code></li><li>\u6307\u5B9A\u968F\u673A\u5B57\u7B26\u3001\u957F\u5EA6\u8303\u56F4 <code>@cword(pool, min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@cword
<span class="token comment">// &quot;\u5408&quot;</span>

@<span class="token function">cword</span><span class="token punctuation">(</span><span class="token string">&#39;\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u4E09&quot;</span>

@<span class="token function">cword</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u62C9\u7B49\u793A&quot;</span>

@<span class="token function">cword</span><span class="token punctuation">(</span><span class="token string">&quot;\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u4E94\u516D\u5341&quot;</span>

@<span class="token function">cword</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u9752\u5706\u7EDF&quot;</span>

@<span class="token function">cword</span><span class="token punctuation">(</span><span class="token string">&quot;\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u4E00\u4E09\u56DB\u96F6\u4E8C\u4E00&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ctitle" tabindex="-1"><a class="header-anchor" href="#ctitle" aria-hidden="true">#</a> @ctitle</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u4E2D\u6587\u6807\u9898</p><ul><li>\u6307\u5B9A\u957F\u5EA6 <code>@ctitle(length)</code></li><li>\u6307\u5B9A\u957F\u5EA6\u8303\u56F4 <code>@ctitle(min, max)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@ctitle
<span class="token comment">// &quot;\u56FE\u90E8\u79F0\u96BE\u76F4\u8BB0&quot;</span>

@<span class="token function">ctitle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u5149\u6D3E\u8981\u4F55\u7ED9&quot;</span>

@<span class="token function">ctitle</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u5706\u5E26\u706B\u5E26&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u59D3\u540D" tabindex="-1"><a class="header-anchor" href="#\u59D3\u540D" aria-hidden="true">#</a> \u59D3\u540D</h2><h3 id="first" tabindex="-1"><a class="header-anchor" href="#first" aria-hidden="true">#</a> @first</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u59D3</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@first
<span class="token comment">// &quot;Laura&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="last" tabindex="-1"><a class="header-anchor" href="#last" aria-hidden="true">#</a> @last</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@last
<span class="token comment">// &quot;White&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="name" tabindex="-1"><a class="header-anchor" href="#name" aria-hidden="true">#</a> @name</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u59D3\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@name
<span class="token comment">// &quot;James Thompson&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cfirst" tabindex="-1"><a class="header-anchor" href="#cfirst" aria-hidden="true">#</a> @cfirst</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u4E2D\u6587\u59D3</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@cfirst
<span class="token comment">// &quot;\u5F20&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clast" tabindex="-1"><a class="header-anchor" href="#clast" aria-hidden="true">#</a> @clast</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u4E2D\u6587\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@clast
<span class="token comment">// &quot;\u822A&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cname" tabindex="-1"><a class="header-anchor" href="#cname" aria-hidden="true">#</a> @cname</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u4E2D\u6587\u59D3\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@cname
<span class="token comment">// &quot;\u675C\u82B3&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#\u7F51\u7EDC" aria-hidden="true">#</a> \u7F51\u7EDC</h2><h3 id="url" tabindex="-1"><a class="header-anchor" href="#url" aria-hidden="true">#</a> @url</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Aurl\u5730\u5740</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@url
<span class="token comment">// &quot;http://atdcptravt.tc/wlrsdlbkwl&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="domain" tabindex="-1"><a class="header-anchor" href="#domain" aria-hidden="true">#</a> @domain</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u57DF\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@domain
<span class="token comment">// &quot;suix.cn&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="protocol" tabindex="-1"><a class="header-anchor" href="#protocol" aria-hidden="true">#</a> @protocol</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u534F\u8BAE\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@protocol
<span class="token comment">// &quot;gopher&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="email" tabindex="-1"><a class="header-anchor" href="#email" aria-hidden="true">#</a> @email</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2AEmail</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@email
<span class="token comment">// &quot;p.jldur@hgvxebirz.ca&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ip" tabindex="-1"><a class="header-anchor" href="#ip" aria-hidden="true">#</a> @ip</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2Aip\u5730\u5740</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@ip
<span class="token comment">// &quot;157.234.240.60&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u5730\u5740" aria-hidden="true">#</a> \u5730\u5740</h2><h3 id="region" tabindex="-1"><a class="header-anchor" href="#region" aria-hidden="true">#</a> @region</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u5730\u533A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@region
<span class="token comment">// &quot;\u534E\u4E1C&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="province" tabindex="-1"><a class="header-anchor" href="#province" aria-hidden="true">#</a> @province</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u7701\u4EFD</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@province
<span class="token comment">// &quot;\u5929\u6D25&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="city" tabindex="-1"><a class="header-anchor" href="#city" aria-hidden="true">#</a> @city</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u57CE\u5E02</p><ul><li>\u662F\u5426\u5305\u542B\u7701\u4EFD <code>@city(prefix)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@city
<span class="token comment">// &quot;\u664B\u4E2D\u5E02&quot;</span>

@<span class="token function">city</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token comment">// \u5409\u6797\u7701 \u677E\u539F\u5E02</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="county" tabindex="-1"><a class="header-anchor" href="#county" aria-hidden="true">#</a> @county</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u53BF/\u533A</p><ul><li>\u662F\u5426\u5305\u542B\u7701\u4EFD\u3001\u57CE\u5E02 <code>@county(prefix)</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@county
<span class="token comment">// &quot;\u82A6\u5C71\u53BF&quot;</span>

@<span class="token function">county</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;\u6E56\u5357\u7701 \u682A\u6D32\u5E02 \u6538\u53BF&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="zip" tabindex="-1"><a class="header-anchor" href="#zip" aria-hidden="true">#</a> @zip</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u90AE\u7F16</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@zip
<span class="token comment">// &quot;151840&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="zip-1" tabindex="-1"><a class="header-anchor" href="#zip-1" aria-hidden="true">#</a> @zip</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A\u90AE\u7F16</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@zip
<span class="token comment">// &quot;151840&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5176\u5B83" tabindex="-1"><a class="header-anchor" href="#\u5176\u5B83" aria-hidden="true">#</a> \u5176\u5B83</h2><h3 id="pick" tabindex="-1"><a class="header-anchor" href="#pick" aria-hidden="true">#</a> @pick</h3><p>\u6307\u5B9A\u6570\u7EC4\u4E2D\u968F\u673A\u62BD\u53D6\u4E00\u4E2A\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@<span class="token function">pick</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;o&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;u&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;o&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="shuffle" tabindex="-1"><a class="header-anchor" href="#shuffle" aria-hidden="true">#</a> @shuffle</h3><p>\u91CD\u7EC4\u6570\u7EC4\u4E2D\u503C\u7684\u4F4D\u7F6E</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@<span class="token function">pick</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;o&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;u&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// [&quot;u&quot;,&quot;i&quot;,&quot;o&quot;,&quot;a&quot;,&quot;e&quot;]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="guid" tabindex="-1"><a class="header-anchor" href="#guid" aria-hidden="true">#</a> @guid</h3><p>\u83B7\u5F97\u4E00\u4E2Aguid\u5B57\u7B26\u4E32</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@guid
<span class="token comment">// &quot;D8AA2eAf-DcaD-749c-efAB-de4c826cD6FD&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="id" tabindex="-1"><a class="header-anchor" href="#id" aria-hidden="true">#</a> @id</h3><p>\u83B7\u5F97\u4E00\u4E2Aid</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@id
<span class="token comment">// &quot;350000201612198267&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="phone" tabindex="-1"><a class="header-anchor" href="#phone" aria-hidden="true">#</a> @phone</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A11\u4F4D\u624B\u673A\u53F7</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@phone
<span class="token comment">// &quot;13100667890&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="idcard" tabindex="-1"><a class="header-anchor" href="#idcard" aria-hidden="true">#</a> @idcard</h3><p>\u968F\u673A\u83B7\u5F97\u4E00\u4E2A18\u4F4D\u8EAB\u4EFD\u8BC1\u53F7\u7801</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@idcard
<span class="token comment">// &quot;450311198810100505&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="regexp" tabindex="-1"><a class="header-anchor" href="#regexp" aria-hidden="true">#</a> @regexp</h3><p>\u6307\u5B9A\u957F\u5EA6 <code>@paragraph(reg, leng)</code></p><p>\u6839\u636E\u6B63\u5219\u751F\u6210\u6570\u636E</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@<span class="token function">regexp</span><span class="token punctuation">(</span><span class="token string">&#39;/\\[a-z]{5,10}\\-/&#39;</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// &quot;feyoiga-eqiig-pbyriaj-&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u81EA\u5B9A\u4E49mock\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49mock\u89C4\u5219" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49mock\u89C4\u5219</h2><p>\u5982\u679C\u4EE5\u4E0A\u5185\u7F6E\u89C4\u5219\u65E0\u6CD5\u6EE1\u8DB3\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u6587\u4EF6\u81EA\u5B9A\u4E49\u89C4\u5219\u6765\u5B9E\u73B0</p><p>1\u3001<code>config.js</code>\u914D\u7F6E\u6587\u4EF6\u4E2D\u52A0\u5165\u81EA\u5B9A\u4E49\u89C4\u5219\uFF0C\u5982\u4E0B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>window<span class="token punctuation">.</span>apidocFeConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
   <span class="token constant">MOCK_EXTENDS</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">abc</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">abc-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>a<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2\u3001\u6CE8\u89E3\u4E2D\u76F4\u63A5\u4F7F\u7528</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code>
<span class="token doc-comment comment">/**
 * mock\u8C03\u8BD5\u6570\u636E
 * ...
 * @Apidoc\\Param(&quot;abc&quot;,type=&quot;string&quot;,mock=&quot;@abc(&#39;666&#39;)&quot;)
 */</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">index</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,195),c=[t];function l(p,o){return s(),a("div",null,c)}const r=n(i,[["render",l],["__file","mock.html.vue"]]);export{r as default};

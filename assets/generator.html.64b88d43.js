import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as i,b as s,d as n,e as t,a as e,r as l}from"./app.97339b06.js";const c={},r=e(`<h1 id="接口生成器" tabindex="-1"><a class="header-anchor" href="#接口生成器" aria-hidden="true">#</a> 接口生成器</h1><div class="custom-container warning"><p class="custom-container-title">注意</p><p>确保站点目录有写入权限</p></div><p>接口生成器功能由 系统配置+模板+可视化页面配置来实现。为了灵活适应各种项目结构与实现方式，需做好系统配置与模板编写。</p><p>下面将举例一个多应用多版本的实现：</p><blockquote><p>假设一个admin应用无版本，demo应用有多个版本，其项目项目目录如下</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>app
 <span class="token operator">|</span>—— admin
    <span class="token operator">|</span>—— controller
       <span class="token operator">|</span>—— Index.php
       <span class="token punctuation">..</span>.
    <span class="token operator">|</span>—— <span class="token function">service</span>
    <span class="token operator">|</span>—— validate
    <span class="token punctuation">..</span>.
 <span class="token operator">|</span>—— demo
    <span class="token operator">|</span>—— controller
        <span class="token operator">|</span>—— v1
            BaseDemo.php
            CrudDemo.php
            <span class="token punctuation">..</span>.
        <span class="token operator">|</span>—— v2
            BaseDemo.php
            CrudDemo.php
            <span class="token punctuation">..</span>.
    <span class="token operator">|</span>—— <span class="token function">service</span>
    <span class="token operator">|</span>—— validate
 <span class="token operator">|</span>—— model
 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1、系统配置" tabindex="-1"><a class="header-anchor" href="#_1、系统配置" aria-hidden="true">#</a> 1、系统配置</h2>`,7),u={href:"/config/#apps",target:"_blank",rel:"noopener noreferrer"},d=s("code",null,"apidoc.php",-1),k={href:"/config/",target:"_blank",rel:"noopener noreferrer"},g=e(`<div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// /config/apidoc.php</span>
<span class="token comment">// 为了方便配置多个生成器，可把一些公用的配置先定义成变量来使用</span>

<span class="token comment">// 表字段可选的字段类型</span>
<span class="token variable">$tableFieldTypes</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;int&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;tinyint&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;integer&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;float&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;decimal&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;char&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;varchar&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;blob&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;text&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;point&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 表字段可选的验证规则</span>
<span class="token variable">$tableFieldCheckOptions</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;label&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;必填&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;require&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;缺少必要参数{$item.field}&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;label&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;数字&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;number&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;{$item.field}字段类型为数字&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;label&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;整数&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;integer&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;{$item.field}为整数&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;label&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;布尔&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;value&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;boolean&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;{$item.field}为布尔值&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 主表默认字段</span>
<span class="token variable">$tableDefaultRows</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;唯一id&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;int&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;length&#39;</span><span class="token operator">=&gt;</span> <span class="token number">11</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;default&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;not_null&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;main_key&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;incremental&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;query&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;list&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;detail&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;add&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;edit&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">true</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;create_time&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;创建时间&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;int&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;length&#39;</span><span class="token operator">=&gt;</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;default&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;not_null&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;main_key&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;incremental&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;update_time&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;更新时间&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;int&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;length&#39;</span><span class="token operator">=&gt;</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;default&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;not_null&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;main_key&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;incremental&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;delete_time&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;删除时间&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;int&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;length&#39;</span><span class="token operator">=&gt;</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;default&#39;</span><span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;not_null&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;main_key&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;incremental&#39;</span><span class="token operator">=&gt;</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// crud的表配置自定义列</span>
<span class="token variable">$crudTableColumns</span><span class="token operator">=</span><span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;验证&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;check&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;select&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;width&#39;</span><span class="token operator">=&gt;</span><span class="token number">180</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;props&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;placeholder&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;请输入&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;mode&#39;</span> <span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;multiple&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;maxTagCount&#39;</span><span class="token operator">=&gt;</span><span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;options&#39;</span><span class="token operator">=&gt;</span><span class="token variable">$tableFieldCheckOptions</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;查询&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;query&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;checkbox&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;width&#39;</span><span class="token operator">=&gt;</span><span class="token number">60</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;列表&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;list&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;checkbox&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;width&#39;</span><span class="token operator">=&gt;</span><span class="token number">60</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;明细&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;detail&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;checkbox&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;width&#39;</span><span class="token operator">=&gt;</span><span class="token number">60</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;新增&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;add&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;checkbox&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;width&#39;</span><span class="token operator">=&gt;</span><span class="token number">60</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;编辑&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;edit&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;checkbox&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;width&#39;</span><span class="token operator">=&gt;</span><span class="token number">60</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 模型名规则</span>
<span class="token variable">$modelNameRules</span><span class="token operator">=</span><span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;pattern&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;模型文件名错误，请输入大写字母开头的字母+数字，长度2-19的组合&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 表名规则</span>
<span class="token variable">$tableNameRules</span><span class="token operator">=</span><span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;pattern&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;^[a-z]{1}([a-z0-9]|[_]){2,19}$&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;表名错误，请输入小写字母开头的字母+数字/下划线，长度2-19的组合&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token comment">//...</span>
    <span class="token string single-quoted-string">&#39;generator&#39;</span> <span class="token operator">=&gt;</span><span class="token punctuation">[</span>
        <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;创建Crud&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;enable&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;middleware&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>app<span class="token punctuation">\\</span>common<span class="token punctuation">\\</span>middleware<span class="token punctuation">\\</span>CreateCrudMiddleware</span><span class="token operator">::</span><span class="token keyword">class</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;form&#39;</span> <span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;colspan&#39;</span><span class="token operator">=&gt;</span><span class="token number">3</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;items&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                    <span class="token punctuation">[</span>
                        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;控制器标题&#39;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;field&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;controller_title&#39;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;input&#39;</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;files&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\\${app[0].key}\\controller\\\${app[1].key}&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;namespace&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\\${app[0].key}\\controller\\\${app[1].key}&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;template&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;template\\crud\\controller.tpl&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;controller&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;rules&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                        <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;required&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;请输入控制器文件名&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                        <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;pattern&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;^[A-Z]{1}([a-zA-Z0-9]|[._]){2,19}$&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;message&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;请输入正确的目录名&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;service&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\\${app[0].key}\\services&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;template&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;template\\crud\\service.tpl&#39;</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;validate&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\\${app[0].key}\\validate&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;template&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;template\\crud\\validate.tpl&#39;</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">[</span>
                    <span class="token string single-quoted-string">&#39;name&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;route&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\\${app[0].key}\\route\\\${app[0].key}.php&#39;</span><span class="token punctuation">,</span>
                    <span class="token string single-quoted-string">&#39;template&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;template\\crud\\route.tpl&#39;</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;table&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                <span class="token string single-quoted-string">&#39;field_types&#39;</span><span class="token operator">=&gt;</span><span class="token variable">$tableFieldTypes</span><span class="token punctuation">,</span>
                <span class="token string single-quoted-string">&#39;items&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                    <span class="token punctuation">[</span>
                        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;数据表&#39;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;namespace&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;app\\model&#39;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;path&#39;</span><span class="token operator">=&gt;</span><span class="token string double-quoted-string">&quot;app\\model&quot;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;template&#39;</span><span class="token operator">=&gt;</span><span class="token string double-quoted-string">&quot;template\\crud\\model.tpl&quot;</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;model_rules&#39;</span><span class="token operator">=&gt;</span><span class="token variable">$modelNameRules</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;table_rules&#39;</span><span class="token operator">=&gt;</span><span class="token variable">$tableNameRules</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;columns&#39;</span><span class="token operator">=&gt;</span><span class="token variable">$crudTableColumns</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;default_fields&#39;</span><span class="token operator">=&gt;</span><span class="token variable">$tableDefaultRows</span><span class="token punctuation">,</span>
                        <span class="token string single-quoted-string">&#39;default_values&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
                            <span class="token string single-quoted-string">&#39;type&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;varchar&#39;</span><span class="token punctuation">,</span>
                            <span class="token string single-quoted-string">&#39;length&#39;</span><span class="token operator">=&gt;</span><span class="token number">255</span><span class="token punctuation">,</span>
                            <span class="token string single-quoted-string">&#39;list&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span>
                            <span class="token string single-quoted-string">&#39;detail&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span>
                            <span class="token string single-quoted-string">&#39;add&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span>
                            <span class="token string single-quoted-string">&#39;edit&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">]</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过如上配置，我们就可以看到页面右上角就出现 接口生成 的菜单了，点击弹出可视化配置窗口，如下</p><h2 id="_2、模板编写" tabindex="-1"><a class="header-anchor" href="#_2、模板编写" aria-hidden="true">#</a> 2、模板编写</h2><p>根据以上配置中template模板目录，在指定位置创建模板文件 <code>controller.tpl</code>、<code>service.tpl</code>、<code>model.tpl</code>、<code>validate.tpl</code>、<code>route.tpl</code>等。</p>`,4),v={href:"https://github.com/HGthecode/apidoc-demos/tree/main/template",target:"_blank",rel:"noopener noreferrer"},m=e(`<div class="custom-container tip"><p class="custom-container-title">要领</p><p>1、首先自己在项目中实现一个完整的逻辑。</p><p>2、然后把这些文件内容拷贝在对应的<code>.tpl</code>模板文件中。</p><p>3、用下表变量替换模板中的参数。</p></div><h3 id="模板变量" tabindex="-1"><a class="header-anchor" href="#模板变量" aria-hidden="true">#</a> 模板变量</h3><p>以下数据为在模板中可使用的全部参数，你也可以在配置的执行中间件的before方法内改变它</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 页面中表单的参数</span>
    <span class="token property">&quot;form&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 所选的应用key，多级应用逗号,分开如 demo,v1</span>
        <span class="token property">&quot;appKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 所选分组的name</span>
        <span class="token property">&quot;group&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 自定义表单字段值</span>
        <span class="token property">&quot;controller_title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;测试Crud&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 表配置参数，数组中每个对象为一个表配置参数</span>
    <span class="token property">&quot;tables&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 表名</span>
            <span class="token property">&quot;table_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test_crud&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// 模型名</span>
            <span class="token property">&quot;model_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TestCrud&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// 命名空间</span>
            <span class="token property">&quot;namespace&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\model&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// 模型目录地址</span>
            <span class="token property">&quot;model_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\model&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// 模型模板文件地址</span>
            <span class="token property">&quot;template&quot;</span><span class="token operator">:</span> <span class="token string">&quot;template\\\\crud\\\\model.tpl&quot;</span><span class="token punctuation">,</span>
            <span class="token comment">// 表配置数据</span>
            <span class="token property">&quot;datas&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">// 字段名</span>
                    <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>
                    <span class="token comment">// 字段注释</span>
                    <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;唯一id&quot;</span><span class="token punctuation">,</span>
                    <span class="token comment">// 字段类型</span>
                    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;int&quot;</span><span class="token punctuation">,</span>
                    <span class="token comment">// 字段长度</span>
                    <span class="token property">&quot;length&quot;</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
                    <span class="token comment">// 默认值</span>
                    <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                    <span class="token comment">// 非Null</span>
                    <span class="token property">&quot;not_null&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token comment">// 主键</span>
                    <span class="token property">&quot;main_key&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token comment">// 自增</span>
                    <span class="token property">&quot;incremental&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token comment">// 以下为自定义列的字段参数</span>
                    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;list&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;detail&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;add&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;edit&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token comment">// 当自定义字段类型为select时，值为所选选项的所有参数</span>
                    <span class="token property">&quot;check&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;必填&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;require&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;缺少必要参数{$item.field}&quot;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
               <span class="token comment">//...</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 当前所选应用数据，多级应用下，该数组为所选应用的每一层数据</span>
    <span class="token property">&quot;app&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;后台管理&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\controller&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 每个生成文件的名称，对应其配置与页面输入的文件名</span>
    <span class="token property">&quot;controller&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 页面输入的文件名</span>
        <span class="token property">&quot;class_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TestCrud&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 文件目录地址</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\controller\\\\&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 文件命名空间</span>
        <span class="token property">&quot;namespace&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\controller&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 模板地址</span>
        <span class="token property">&quot;template&quot;</span><span class="token operator">:</span> <span class="token string">&quot;template\\\\crud\\\\controller.tpl&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;service&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;class_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TestCrud&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\services&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;namespace&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\services&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;template&quot;</span><span class="token operator">:</span> <span class="token string">&quot;template\\\\crud\\\\service.tpl&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;validate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;class_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TestCrud&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\validate&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;namespace&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\validate&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;template&quot;</span><span class="token operator">:</span> <span class="token string">&quot;template\\\\crud\\\\validate.tpl&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;route&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;class_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;TestCrud&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\route\\\\admin.php&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;namespace&quot;</span><span class="token operator">:</span> <span class="token string">&quot;app\\\\admin\\\\route\\\\admin.php&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;template&quot;</span><span class="token operator">:</span> <span class="token string">&quot;template\\\\crud\\\\route.tpl&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模板语法" tabindex="-1"><a class="header-anchor" href="#模板语法" aria-hidden="true">#</a> 模板语法</h3><p>通过以下模板语法可对以上参数，进行 变量调用、if判断、foreach循环等模板语法生成需要的模板内容</p><h4 id="变量调用" tabindex="-1"><a class="header-anchor" href="#变量调用" aria-hidden="true">#</a> 变量调用</h4><p>用于调用以上参数中的字符串/数字参数</p><p>使用语法 <code>{$变量}</code> 变量为需要指定的参数，对象可通过<code>.</code>，数组可通过<code>[N]</code>来指定下标参数</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token punctuation">{</span><span class="token variable">$controller</span><span class="token operator">.</span><span class="token keyword">namespace</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 这里的{$controller.namespace} 会被替换为以上参数的 app\\admin\\services</span>

<span class="token punctuation">{</span><span class="token variable">$form</span><span class="token operator">.</span>controller_title<span class="token punctuation">}</span>  <span class="token comment">//测试Crud</span>
<span class="token punctuation">{</span><span class="token variable">$form</span><span class="token operator">.</span>group<span class="token punctuation">}</span>   <span class="token comment">// admin</span>

<span class="token comment">// 数组调用</span>
<span class="token punctuation">{</span><span class="token variable">$app</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">.</span>title<span class="token punctuation">}</span>  <span class="token comment">// 后台管理</span>
<span class="token punctuation">{</span><span class="token variable">$app</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">.</span>key<span class="token punctuation">}</span>  <span class="token comment">// admin</span>

<span class="token doc-comment comment">/** 参数处理*/</span>
<span class="token comment">// lower 转小写</span>
<span class="token punctuation">{</span><span class="token variable">$lower</span><span class="token punctuation">(</span>controller<span class="token operator">.</span>class_name<span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token comment">// testcrud</span>

<span class="token comment">// snake 驼峰转下划线</span>
<span class="token punctuation">{</span><span class="token variable">$snake</span><span class="token punctuation">(</span>controller<span class="token operator">.</span>class_name<span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token comment">// test_crud</span>

<span class="token comment">// lcfirst 首字母小写</span>
<span class="token punctuation">{</span><span class="token variable">$lcfirst</span><span class="token punctuation">(</span>controller<span class="token operator">.</span>class_name<span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token comment">// testCrud</span>

<span class="token comment">// count 参数长度</span>
<span class="token punctuation">{</span><span class="token variable">$count</span><span class="token punctuation">(</span>tables<span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token comment">// 1</span>
<span class="token punctuation">{</span><span class="token variable">$count</span><span class="token punctuation">(</span>tables<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">.</span>datas<span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token comment">// 1</span>

</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="if判断" tabindex="-1"><a class="header-anchor" href="#if判断" aria-hidden="true">#</a> if判断</h4><p>用于根据参数判断输出不同的模板内容</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// 字符串判断</span>
<span class="token punctuation">{</span><span class="token keyword">if</span> <span class="token string single-quoted-string">&#39;a&#39;</span><span class="token operator">==</span><span class="token string single-quoted-string">&#39;a&#39;</span><span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">{</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">}</span>

<span class="token comment">// 数字判断</span>
<span class="token punctuation">{</span><span class="token keyword">if</span> <span class="token number">1</span><span class="token operator">!=</span><span class="token number">1</span><span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">{</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token keyword">if</span> <span class="token number">1</span><span class="token operator">&gt;=</span><span class="token number">1</span><span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">{</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">}</span>

<span class="token comment">// 如果app[1].key存在则输出if中的内容</span>
<span class="token punctuation">{</span><span class="token keyword">if</span> <span class="token string single-quoted-string">&#39;{$app[1].key}&#39;</span><span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">{</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">}</span>

<span class="token comment">// 当所选分组为admin时输出if中的内容</span>
<span class="token punctuation">{</span><span class="token keyword">if</span> <span class="token string single-quoted-string">&#39;{$form.group}&#39;</span><span class="token operator">==</span><span class="token string single-quoted-string">&#39;admin&#39;</span><span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">{</span><span class="token operator">/</span><span class="token keyword">if</span><span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach" aria-hidden="true">#</a> foreach</h4><p>用于对数组循环输出</p><p>注意：这里的变量不需要<code>{$...}</code>包裹，变量值需为数组</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token punctuation">{</span><span class="token keyword">foreach</span> <span class="token variable">$tables</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">.</span>datas <span class="token keyword">as</span> <span class="token variable">$k</span><span class="token operator">=&gt;</span><span class="token variable">$item</span><span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">{</span><span class="token operator">/</span><span class="token keyword">foreach</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、执行中间件" tabindex="-1"><a class="header-anchor" href="#_3、执行中间件" aria-hidden="true">#</a> 3、执行中间件</h2><p>你可以配置生成器执行时，触发中间件的<code>before</code>、<code>after</code>方法来实现一些自定义的逻辑。</p><h3 id="中间件文件" tabindex="-1"><a class="header-anchor" href="#中间件文件" aria-hidden="true">#</a> 中间件文件</h3><p>在项目中创建中间件文件，如下：</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">app<span class="token punctuation">\\</span>common<span class="token punctuation">\\</span>middleware</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">CreateCrudMiddleware</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 生成文件及数据表前执行</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">before</span> <span class="token punctuation">(</span><span class="token variable">$tplParams</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

       <span class="token comment">// 如果在此方法内改变了 tplParams参数，将其返回，就可以在模板中使用了</span>
       <span class="token keyword">return</span> <span class="token variable">$tplParams</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//生成文件及数据表后执行</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">after</span><span class="token punctuation">(</span><span class="token variable">$tplParams</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="中间件引用" tabindex="-1"><a class="header-anchor" href="#中间件引用" aria-hidden="true">#</a> 中间件引用</h3><p>只需要在生成器配置中加入<code>middleware</code> 配置即可</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token comment">// config/apidoc.php</span>

<span class="token string single-quoted-string">&#39;generator&#39;</span> <span class="token operator">=&gt;</span><span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
        <span class="token string single-quoted-string">&#39;title&#39;</span><span class="token operator">=&gt;</span><span class="token string single-quoted-string">&#39;创建Crud&#39;</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;enable&#39;</span><span class="token operator">=&gt;</span><span class="token constant boolean">true</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">&#39;middleware&#39;</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span>
            <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>app<span class="token punctuation">\\</span>common<span class="token punctuation">\\</span>middleware<span class="token punctuation">\\</span>CreateCrudMiddleware</span><span class="token operator">::</span><span class="token keyword">class</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">]</span>
    <span class="token comment">//...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25);function b(q,h){const a=l("ExternalLinkIcon");return o(),i("div",null,[r,s("blockquote",null,[s("p",null,[n("多应用/多版本需先配置 "),s("a",u,[n("apps"),t(a)])])]),s("p",null,[n("配置文件"),d,n("中， 根据项目结构设置，每个配置参数说明请查看->"),s("a",k,[n("generator参数"),t(a)])]),g,s("p",null,[n("模板示例可参考 "),s("a",v,[n("模板文件示例"),t(a)]),n(" ，这里就不贴出来了，这里说说如何编写模板，相信你很快就能上手。")]),m])}const _=p(c,[["render",b],["__file","generator.html.vue"]]);export{_ as default};

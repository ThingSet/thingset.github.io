"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8617],{3241:(n,s,a)=>{a.r(s),a.d(s,{data:()=>t});const t={key:"v-3da90f6c",path:"/software/node_library.html",title:"ThingSet Node Library",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"Example",slug:"example",children:[]}],filePathRelative:"software/node_library.md",git:{updatedTime:170759614e4}}},3749:(n,s,a)=>{a.r(s),a.d(s,{default:()=>m});var t=a(6252);const e=(0,t._)("h1",{id:"thingset-node-library",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#thingset-node-library","aria-hidden":"true"},"#"),(0,t.Uk)(" ThingSet Node Library")],-1),p=(0,t._)("p",null,"The library provides all necessary functions required to parse incoming ThingSet requests and generate the responses. It is agnostic to the used transport protocol and can be used with a serial interface, CAN, Bluetooth, MQTT and other protocols.",-1),o=(0,t._)("p",null,"It is written in C and currently requires Zephyr RTOS. It can be used in in other embedded C environments with minor changes.",-1),c=(0,t._)("strong",null,"Library documentation:",-1),u=(0,t.Uk)(),l={href:"https://thingset.io/thingset-node-c/",target:"_blank",rel:"noopener noreferrer"},i=(0,t.Uk)("thingset.io/thingset-node-c"),r=(0,t._)("strong",null,"Source repository:",-1),k=(0,t.Uk)(),d={href:"https://github.com/ThingSet/thingset-node-c",target:"_blank",rel:"noopener noreferrer"},h=(0,t.Uk)("ThingSet/thingset-node-c"),g=(0,t.uE)('<h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><p>The following code snippet is an example how ThingSet can be used as an interface for a smart heating thermostat.</p><p>The device can be configured for a target temperature. The measured room temperature and current state of the heater can be read and the device can be reset remotely.</p><div class="language-c ext-c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>\n<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thingset.h&gt;</span></span>\n\n<span class="token comment">/* variables/functions to be exposed via ThingSet */</span>\n<span class="token keyword">char</span> node_id<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;C001CAFE01234567&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">float</span> room_temp <span class="token operator">=</span> <span class="token number">18.3</span><span class="token punctuation">;</span>\n<span class="token keyword">float</span> target_temp <span class="token operator">=</span> <span class="token number">21.0</span><span class="token punctuation">;</span>\nbool heater_on <span class="token operator">=</span> true<span class="token punctuation">;</span>\n<span class="token keyword">void</span> <span class="token function">reset</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* the ThingSet object definitions */</span>\n<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">thingset_data_object</span> data_objects<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function">THINGSET_ITEM_STRING</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0x1D</span><span class="token punctuation">,</span> <span class="token string">&quot;pNodeID&quot;</span><span class="token punctuation">,</span> node_id<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>node_id<span class="token punctuation">)</span><span class="token punctuation">,</span>\n        THINGSET_ANY_R<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">THINGSET_ITEM_FLOAT</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0x61</span><span class="token punctuation">,</span> <span class="token string">&quot;rRoomTemp_degC&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>room_temp<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>\n        THINGSET_ANY_R<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">THINGSET_ITEM_FLOAT</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0x62</span><span class="token punctuation">,</span> <span class="token string">&quot;wTargetTemp_degC&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>target_temp<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>\n        THINGSET_ANY_RW<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">THINGSET_ITEM_BOOL</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0x71</span><span class="token punctuation">,</span> <span class="token string">&quot;rHeaterOn&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>heater_on<span class="token punctuation">,</span>\n        THINGSET_ANY_R<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">THINGSET_FN_VOID</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0xE1</span><span class="token punctuation">,</span> <span class="token string">&quot;xReset&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>reset<span class="token punctuation">,</span>\n        THINGSET_ANY_RW<span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">void</span> <span class="token function">reset</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Reset function called!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name">uint8_t</span> request<span class="token punctuation">[</span><span class="token number">512</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token class-name">uint8_t</span> response<span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">struct</span> <span class="token class-name">thingset_context</span> ts<span class="token punctuation">;</span>\n\n    <span class="token comment">/* initialize ThingSet context and assign data objects */</span>\n    <span class="token function">thingset_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ts<span class="token punctuation">,</span> data_objects<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>data_objects<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">thingset_data_object</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>true<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">/* wait for requests from an interface (e.g. serial) */</span>\n        <span class="token function">serial_readline</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">/* process the request with ThingSet */</span>\n        <span class="token keyword">int</span> len <span class="token operator">=</span>\n            <span class="token function">thingset_process_message</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ts<span class="token punctuation">,</span> request<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">,</span> response<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">/* send response back (again using the serial as an example) */</span>\n        <span class="token function">serial_printline</span><span class="token punctuation">(</span>response<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>For setting the target temperature, the following request can be sent to the device:</p><div class="language-text ext-text"><pre class="language-text"><code>= {&quot;wTargetTemp_degC&quot;:22}\n</code></pre></div><p>The response indicates that the new value has been written successfully:</p><div class="language-text ext-text"><pre class="language-text"><code>:84\n</code></pre></div><p>In order to read the measured temperature and the heater state from the device, send the following command:</p><div class="language-text ext-text"><pre class="language-text"><code>? [&quot;rRoomTemp_degC&quot;,&quot;rHeaterOn&quot;]\n</code></pre></div><p>This request will be answered with below response:</p><div class="language-text ext-text"><pre class="language-text"><code>:85 [18.3,true]\n</code></pre></div><p>Please see the specification for further protocol details.</p>',13),m={render:function(n,s){const a=(0,t.up)("OutboundLink");return(0,t.wg)(),(0,t.iD)(t.HY,null,[e,p,o,(0,t._)("p",null,[c,u,(0,t._)("a",l,[i,(0,t.Wm)(a)])]),(0,t._)("p",null,[r,k,(0,t._)("a",d,[h,(0,t.Wm)(a)])]),g],64)}}}}]);
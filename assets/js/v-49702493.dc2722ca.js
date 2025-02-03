"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9053],{7977:(n,a,s)=>{s.r(a),s.d(a,{data:()=>e});const e={key:"v-49702493",path:"/software/zephyr_sdk.html",title:"ThingSet Zephyr SDK",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"Example",slug:"example",children:[]}],filePathRelative:"software/zephyr_sdk.md",git:{updatedTime:1738504364e3}}},7438:(n,a,s)=>{s.r(a),s.d(a,{default:()=>_});var e=s(6252);const t=(0,e.uE)('<h1 id="thingset-zephyr-sdk" tabindex="-1"><a class="header-anchor" href="#thingset-zephyr-sdk" aria-hidden="true">#</a> ThingSet Zephyr SDK</h1><p>The ThingSet software development (SDK) for Zephyr leverages the Zephyr RTOS APIs to provide ready-to-use implementations for the following interfaces:</p><ul><li>Serial (UART or USB CDC-ACM)</li><li>CAN</li><li>Bluetooth</li><li>LoRaWAN</li><li>Flash or EEPROM (for non-volatile data storage)</li></ul><p>Further interfaces like MQTT and WebSocket over WiFi are currently under development.</p><p>The ThingSet device library is used internally for data processing.</p>',5),p=(0,e._)("strong",null,"Source repository:",-1),o=(0,e.Uk)(),c={href:"https://github.com/ThingSet/thingset-zephyr-sdk",target:"_blank",rel:"noopener noreferrer"},l=(0,e.Uk)("ThingSet/thingset-zephyr-sdk"),r=(0,e.uE)('<h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><p>First of all, the ThingSet library and an interface provided by the ThingSet SDK have to be enabled via Kconfig in the <code>prj.conf</code>. This example uses the serial interface:</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token assign-left variable">CONFIG_SERIAL</span><span class="token operator">=</span>y\n<span class="token assign-left variable">CONFIG_UART_INTERRUPT_DRIVEN</span><span class="token operator">=</span>y\n\n<span class="token assign-left variable">CONFIG_THINGSET</span><span class="token operator">=</span>y\n<span class="token assign-left variable">CONFIG_THINGSET_SDK</span><span class="token operator">=</span>y\n<span class="token assign-left variable">CONFIG_THINGSET_SERIAL</span><span class="token operator">=</span>y\n</code></pre></div><p>Afterwards, exposing data via ThingSet just needs very few lines of code:</p><div class="language-c ext-c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thingset.h&gt;</span></span>\n<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thingset/sdk.h&gt;</span></span>\n<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;zephyr/kernel.h&gt;</span></span>\n\n<span class="token comment">/* local variables/functions to be exposed via ThingSet */</span>\n<span class="token keyword">float</span> room_temp <span class="token operator">=</span> <span class="token number">18.3</span><span class="token punctuation">;</span>\n<span class="token keyword">float</span> target_temp <span class="token operator">=</span> <span class="token number">21.0</span><span class="token punctuation">;</span>\nbool heater_on <span class="token operator">=</span> true<span class="token punctuation">;</span>\n<span class="token keyword">void</span> <span class="token function">reset</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* ThingSet object definitions */</span>\n<span class="token function">THINGSET_ADD_ITEM_FLOAT</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0x61</span><span class="token punctuation">,</span> <span class="token string">&quot;rRoomTemp_degC&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>room_temp<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> THINGSET_ANY_R<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">THINGSET_ADD_ITEM_FLOAT</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0x62</span><span class="token punctuation">,</span> <span class="token string">&quot;wTargetTemp_degC&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>target_temp<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> THINGSET_ANY_RW<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">THINGSET_ADD_ITEM_BOOL</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0x71</span><span class="token punctuation">,</span> <span class="token string">&quot;rHeaterOn&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>heater_on<span class="token punctuation">,</span> THINGSET_ANY_R<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">THINGSET_ADD_FN_VOID</span><span class="token punctuation">(</span>ID_ROOT<span class="token punctuation">,</span> <span class="token number">0xE1</span><span class="token punctuation">,</span> <span class="token string">&quot;xReset&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>reset<span class="token punctuation">,</span> THINGSET_ANY_RW<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">void</span> <span class="token function">reset</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Reset function called!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/*\n     * Implement your application code here (e.g. controlling of the heater).\n     *\n     * ThingSet requests are automatically handled by the SDK in the background.\n     */</span>\n\n    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',5),i=(0,e.Uk)("The "),u=(0,e._)("code",null,"THINGSET_ADD_*",-1),k=(0,e.Uk)(" macros use Zephyr's "),d={href:"https://docs.zephyrproject.org/latest/kernel/iterable_sections/index.html",target:"_blank",rel:"noopener noreferrer"},h=(0,e.Uk)("Iterable Sections"),g=(0,e.Uk)(" internally. They can be used anywhere in the code to add data items to the global ThingSet database."),T=(0,e._)("p",null,"The actual processing of the data through the serial interface happens in a dedicated thread in the background. You can fully focus on your application development.",-1),m=(0,e._)("p",null,[(0,e.Uk)("If the used board supports Bluetooth, a simple "),(0,e._)("code",null,"CONFIG_THINGSET_BLE=y"),(0,e.Uk)(" would also make the data available via Bluetooth (in addition to the serial interface).")],-1),_={render:function(n,a){const s=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[t,(0,e._)("p",null,[p,o,(0,e._)("a",c,[l,(0,e.Wm)(s)])]),r,(0,e._)("p",null,[i,u,k,(0,e._)("a",d,[h,(0,e.Wm)(s)]),g]),T,m],64)}}}}]);
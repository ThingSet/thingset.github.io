"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4030],{5671:(e,t,a)=>{a.r(t),a.d(t,{data:()=>s});const s={key:"v-615a7ebc",path:"/spec/v0.5/transp_ble.html",title:"BLE",lang:"en",frontmatter:{title:"BLE"},excerpt:"",headers:[{level:2,title:"Packetization",slug:"packetization",children:[]},{level:2,title:"BLE Service",slug:"ble-service",children:[]},{level:2,title:"Example",slug:"example",children:[]}],filePathRelative:"spec/v0.5/transp_ble.md",git:{updatedTime:1709745994e3}}},3680:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var s=a(6252);const n=(0,s._)("h1",{id:"bluetooth-low-energy",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#bluetooth-low-energy","aria-hidden":"true"},"#"),(0,s.Uk)(" Bluetooth Low-Energy")],-1),o=(0,s._)("p",null,"Bluetooth Low-Energy (BLE) is designed to transfer only relatively small amounts of data per message.",-1),r=(0,s._)("p",null,"The GATT profile allows to define so-called characteristics, which are similar to a single data object in ThingSet. However, the characteristics have to be pre-defined using UUIDs and their semantics have to be known by both the device and the host. Mapping each data object to a characteristic would undermine the flexibility and discoverability of the ThingSet protocol.",-1),i=(0,s._)("p",null,"Instead of defining characteristics for every data objects, one single service with two GATT characteristics is used to transfer ThingSet protocol data in a bi-directional way.",-1),c=(0,s._)("h2",{id:"packetization",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#packetization","aria-hidden":"true"},"#"),(0,s.Uk)(" Packetization")],-1),l=(0,s._)("p",null,"Long attribute values (ATT) can have a length of max. 512 bytes (see Core Spec v5.3, Section 3.2.9).",-1),d=(0,s.Uk)("A single LinkLayer packet can have max. 251 bytes of data (LE Data Packet Length Extension, BT v4.2, see also "),p={href:"https://punchthrough.com/maximizing-ble-throughput-part-3-data-length-extension-dle-2/",target:"_blank",rel:"noopener noreferrer"},h=(0,s.Uk)("here"),u=(0,s.Uk)("). This results in 244 bytes of payload."),g=(0,s._)("p",null,"Above packet size (which is even lower on older phones) is not considered sufficient for ThingSet, so the messages have to be split into multiple packets and afterwards be re-assembled by the receiver.",-1),f=(0,s.Uk)("For ThingSet, all packets exchanged over BLE are considered a continuous stream of bytes, similar to a serial interface. The SLIP protocol according to "),k={href:"https://datatracker.ietf.org/doc/html/rfc1055",target:"_blank",rel:"noopener noreferrer"},m=(0,s.Uk)("RFC 1055"),b=(0,s.Uk)(" is used to distinguish single frames inside the data stream. See also "),v={href:"https://www.maibornwolff.de/en/blog/talk-coap-me-iot-over-bluetooth-low-energy",target:"_blank",rel:"noopener noreferrer"},_=(0,s.Uk)("this excellent blog post"),E=(0,s.Uk)(" regarding a similar approach for CoAP over BLE."),T=(0,s.Uk)("Existing BLE stacks e.g. in Android are implemented such that the order of messages is maintained, which avoids requiring an any packet counter. The BLE LL provides reliable transport for notifications. Indications are not used, as the ACK of indications provides little to no benefit (see "),S={href:"https://stackoverflow.com/questions/36075763/ble-indications",target:"_blank",rel:"noopener noreferrer"},w=(0,s.Uk)("here"),y=(0,s.Uk)(")"),L=(0,s.uE)('<h2 id="ble-service" tabindex="-1"><a class="header-anchor" href="#ble-service" aria-hidden="true">#</a> BLE Service</h2><p>The following UUIDs are used for the ThingSet BLE service and the two request and response characteristics:</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">UUID_THINGSET_SERVICE</span> <span class="token operator">=</span>  <span class="token string">&quot;00000001-5a19-4887-9c6a-14ad27bfc06d&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token constant">UUID_THINGSET_REQUEST</span> <span class="token operator">=</span>  <span class="token string">&quot;00000002-5a19-4887-9c6a-14ad27bfc06d&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token constant">UUID_THINGSET_RESPONSE</span> <span class="token operator">=</span> <span class="token string">&quot;00000003-5a19-4887-9c6a-14ad27bfc06d&quot;</span><span class="token punctuation">;</span>\n</code></pre></div><p>The request characteristic is used to send ThingSet requests from the central device to the peripheral. The peripheral uses the response characteristic to send notifications back to the central device.</p><p>The response characteristic is also used to send send ThingSet statements autonomously from peripheral to central.</p><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><p>For the following example, non-readable characters are displayed as their hex value wrapped in angular brackets, e.g. <code>&lt;0C&gt;</code>.</p><p>The following characters are used for SLIP:</p><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>SLIP_END</td><td><code>&lt;C0&gt;</code></td></tr><tr><td>SLIP_ESC</td><td><code>&lt;DB&gt;</code></td></tr><tr><td>SLIP_ESC_END</td><td><code>&lt;DC&gt;</code></td></tr><tr><td>SLIP_ESC_ESC</td><td><code>&lt;DD&gt;</code></td></tr></tbody></table><p>A SLIP_END character is also added to the beginning of each message to have a defined start after interrupted streams.</p><p>ThingSet request from BLE central to peripheral (short message, fits into a single packet):</p><pre><code>&lt;C0&gt;?Bat&lt;C0&gt;                                # packet 1\n</code></pre><p>Response via notification from peripheral to central (message split into multiple packets, assuming 20 bytes maximum payload length):</p><pre><code>&lt;C0&gt;:85 Content. {&quot;rMe                      # packet 1\nas_V&quot;:12.9,&quot;rMeas_                          # packet 2\nA&quot;:-3.14,&quot;sTarget_                          # packet 3\nV&quot;:14.4}&lt;C0&gt;                                # packet 4\n</code></pre><p>Re-assembled response: <code>:85 Content. {&quot;rMeas_V&quot;:12.9,&quot;rMeas_A&quot;:-3.14,&quot;sTarget_V&quot;:14.4}</code></p><p>As ASCII strings (like usual ThingSet text-mode messages) never contain the <code>SLIP_END</code> character, no escaping is necessary in this example. It has to be implemented for the binary mode, though.</p>',16),x={render:function(e,t){const a=(0,s.up)("OutboundLink");return(0,s.wg)(),(0,s.iD)(s.HY,null,[n,o,r,i,c,l,(0,s._)("p",null,[d,(0,s._)("a",p,[h,(0,s.Wm)(a)]),u]),g,(0,s._)("p",null,[f,(0,s._)("a",k,[m,(0,s.Wm)(a)]),b,(0,s._)("a",v,[_,(0,s.Wm)(a)]),E]),(0,s._)("p",null,[T,(0,s._)("a",S,[w,(0,s.Wm)(a)]),y]),L],64)}}}}]);
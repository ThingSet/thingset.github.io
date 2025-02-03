"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5628],{1247:(e,t,a)=>{a.r(t),a.d(t,{data:()=>s});const s={key:"v-801e1344",path:"/spec/v0.6/transports/bluetooth.html",title:"BLE",lang:"en",frontmatter:{title:"BLE"},excerpt:"",headers:[{level:2,title:"Packetization",slug:"packetization",children:[]},{level:2,title:"BLE Service",slug:"ble-service",children:[]},{level:2,title:"Example",slug:"example",children:[]}],filePathRelative:"spec/v0.6/transports/bluetooth.md",git:{updatedTime:1709745994e3}}},6636:(e,t,a)=>{a.r(t),a.d(t,{default:()=>U});var s=a(6252);const n=(0,s._)("h1",{id:"bluetooth-low-energy",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#bluetooth-low-energy","aria-hidden":"true"},"#"),(0,s.Uk)(" Bluetooth Low-Energy")],-1),o=(0,s._)("p",null,"Bluetooth Low-Energy (BLE) is designed to transfer only relatively small amounts of data per message.",-1),r=(0,s._)("p",null,"The GATT profile allows to define so-called characteristics, which are similar to a single data object in ThingSet. However, the characteristics have to be pre-defined using UUIDs and their semantics have to be known by both the device and the host. Mapping each data object to a characteristic would undermine the flexibility and discoverability of the ThingSet protocol.",-1),i=(0,s._)("p",null,"Instead of defining characteristics for every data objects, one single service with two GATT characteristics is used to transfer ThingSet protocol data in a bi-directional way.",-1),c=(0,s._)("h2",{id:"packetization",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#packetization","aria-hidden":"true"},"#"),(0,s.Uk)(" Packetization")],-1),l=(0,s._)("p",null,"Long attribute values (ATT) can have a length of max. 512 bytes (see Core Spec v5.3, Section 3.2.9).",-1),d=(0,s.Uk)("A single LinkLayer packet can have max. 251 bytes of data (LE Data Packet Length Extension, BT v4.2, see also "),p={href:"https://punchthrough.com/maximizing-ble-throughput-part-3-data-length-extension-dle-2/",target:"_blank",rel:"noopener noreferrer"},h=(0,s.Uk)("here"),u=(0,s.Uk)("). This results in 244 bytes of payload."),g=(0,s._)("p",null,"Above packet size (which is even lower on older phones) is not considered sufficient for ThingSet, so the messages have to be split into multiple packets and afterwards be re-assembled by the receiver.",-1),f=(0,s.Uk)("For ThingSet, all packets exchanged over BLE are considered a continuous stream of bytes, similar to a serial interface. A packetization mechanism similar to "),k={href:"https://datatracker.ietf.org/doc/html/rfc1055",target:"_blank",rel:"noopener noreferrer"},m=(0,s.Uk)("RFC 1055"),b=(0,s.Uk)(" is used to distinguish single frames inside the data stream."),v=(0,s._)("p",null,[(0,s.Uk)("Each packet ends with a line-feed character ("),(0,s._)("code",null,"0x0A"),(0,s.Uk)("), which is never part of any ThingSet message in text mode andyway. Carriage-return characters ("),(0,s._)("code",null,"0x0D"),(0,s.Uk)(") characters are skipped in the stream so that a text file could be interpreted as a sequence of ThingSet messages independent of the line ending used, allowing to store and batch-process ThingSet messages easily.")],-1),_=(0,s._)("p",null,[(0,s.Uk)("If one of the above characters is part of an actual binary message, it is replaced with the escape character "),(0,s._)("code",null,"0xCE"),(0,s.Uk)(", followed by a special character depending on the represented character to be escaped (see table below). The escape characters were chosen such that they are not used for a ThingSet response code and not part of usual CBOR encoding (they are used for currently unassigned tags). This reduces the probability to need escaping.")],-1),w=(0,s._)("p",null,"An additional line-feed character may also be used at the start of a new packet to have a defined start after interrupted streams. This would lead to an empty packet, which must be ignored.",-1),y=(0,s.Uk)("Existing BLE stacks e.g. in Android are implemented such that the order of messages is maintained, which avoids requiring an any packet counter. The BLE LL provides reliable transport for notifications. Indications are not used, as the ACK of indications provides little to no benefit (see "),T={href:"https://stackoverflow.com/questions/36075763/ble-indications",target:"_blank",rel:"noopener noreferrer"},S=(0,s.Uk)("here"),E=(0,s.Uk)(")"),x=(0,s.uE)('<h2 id="ble-service" tabindex="-1"><a class="header-anchor" href="#ble-service" aria-hidden="true">#</a> BLE Service</h2><p>The following UUIDs are used for the ThingSet BLE service and the two request and response characteristics:</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">UUID_THINGSET_SERVICE</span>  <span class="token operator">=</span> <span class="token string">&quot;00000001-5423-4887-9c6a-14ad27bfc06d&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token constant">UUID_THINGSET_DOWNLINK</span> <span class="token operator">=</span> <span class="token string">&quot;00000002-5423-4887-9c6a-14ad27bfc06d&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token constant">UUID_THINGSET_UPLINK</span>   <span class="token operator">=</span> <span class="token string">&quot;00000003-5423-4887-9c6a-14ad27bfc06d&quot;</span><span class="token punctuation">;</span>\n</code></pre></div><p>The downlink characteristic is used to send ThingSet requests or desires from the central device to the peripheral. The peripheral uses the uplink characteristic to send notifications with responses or reports back to the central device.</p><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><p>For the following example, non-readable characters are displayed as their hex value wrapped in angular brackets, e.g. <code>&lt;0A&gt;</code>.</p><p>The following characters are used for SLIP:</p><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>MSG_END</td><td><code>&lt;0A&gt;</code></td></tr><tr><td>MSG_SKIP</td><td><code>&lt;0D&gt;</code></td></tr><tr><td>MSG_ESC</td><td><code>&lt;CE&gt;</code></td></tr><tr><td>MSG_ESC_END</td><td><code>&lt;CA&gt;</code></td></tr><tr><td>MSG_ESC_SKIP</td><td><code>&lt;CD&gt;</code></td></tr><tr><td>MSG_ESC_ESC</td><td><code>&lt;CF&gt;</code></td></tr></tbody></table><p>ThingSet request from BLE central to peripheral (short message, fits into a single packet):</p><pre><code>?Bat&lt;0A&gt;                                    # packet 1\n</code></pre><p>The same message including an optional <code>MSG_END</code> character at the beginning of the message:</p><pre><code>&lt;0A&gt;?Bat&lt;0A&gt;                                # packet 1\n</code></pre><p>Response via notification from peripheral to central (message split into multiple packets, assuming 20 bytes maximum payload length):</p><pre><code>:85 {&quot;rMeas_V&quot;:12.9,                        # packet 1\n&quot;rMeas_A&quot;:-3.14,&quot;sTa                        # packet 2\nrget_V&quot;:14.4}&lt;0A&gt;                           # packet 3\n</code></pre><p>Re-assembled response: <code>:85 {&quot;rMeas_V&quot;:12.9,&quot;rMeas_A&quot;:-3.14,&quot;sTarget_V&quot;:14.4}</code></p><p>As ASCII strings (like usual ThingSet text-mode messages) never contain the <code>MSG_END</code> character within the message, no escaping is necessary in this example. It has to be implemented for the binary mode, though.</p><p>A binary report containing the number 13, which is encoded as <code>0x0D</code> would look like this:</p><pre><code>&lt;1F&gt;&lt;00&gt;&lt;A1&gt;&lt;18&gt;&lt;40&gt;&lt;CE&gt;&lt;CD&gt;&lt;0A&gt;            # packet 1\n</code></pre><p>The un-escaped final message is as follows:</p><pre><code>1F\n   00                                   # CBOR uint: 0x00 (root ID)\n   A1                                   # CBOR map (1 elements)\n      18 40                             # CBOR uint: 0x40 (object ID)\n      0D                                # CBOR uint: 13\n</code></pre>',20),U={render:function(e,t){const a=(0,s.up)("OutboundLink");return(0,s.wg)(),(0,s.iD)(s.HY,null,[n,o,r,i,c,l,(0,s._)("p",null,[d,(0,s._)("a",p,[h,(0,s.Wm)(a)]),u]),g,(0,s._)("p",null,[f,(0,s._)("a",k,[m,(0,s.Wm)(a)]),b]),v,_,w,(0,s._)("p",null,[y,(0,s._)("a",T,[S,(0,s.Wm)(a)]),E]),x],64)}}}}]);
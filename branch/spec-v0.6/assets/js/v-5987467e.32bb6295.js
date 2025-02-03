"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4765],{4012:(e,a,t)=>{t.r(a),t.d(a,{data:()=>n});const n={key:"v-5987467e",path:"/spec/v0.4/tools_can.html",title:"CAN bus",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"Linux",slug:"linux",children:[{level:3,title:"CAN interface setup",slug:"can-interface-setup",children:[]},{level:3,title:"ISO-TP tools",slug:"iso-tp-tools",children:[]}]}],filePathRelative:"spec/v0.4/tools_can.md",git:{updatedTime:1686213394e3}}},8947:(e,a,t)=>{t.r(a),t.d(a,{default:()=>l});var n=t(6252);const s=(0,n.uE)('<h1 id="can-bus" tabindex="-1"><a class="header-anchor" href="#can-bus" aria-hidden="true">#</a> CAN bus</h1><h2 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h2><h3 id="can-interface-setup" tabindex="-1"><a class="header-anchor" href="#can-interface-setup" aria-hidden="true">#</a> CAN interface setup</h3><p>There are different USB to CAN dongles available on the market, which usually support communicating with the Linux Kernel via a serial interface.</p><p>The following command creates a <code>can0</code> interface from a dongle attached to <code>/dev/ttyUSB0</code>:</p><div class="language-text ext-text"><pre class="language-text"><code>sudo slcan_attach /dev/ttyUSB0 -w\n</code></pre></div><p>Afterwards, the interface has to be configured and started. Here we are setting the bit rate to 500 kbit/s:</p><div class="language-text ext-text"><pre class="language-text"><code>sudo ip link set can0 type can bitrate 500000 restart-ms 500\nsudo ip link set can0 up\n</code></pre></div><p>If you want to see also your own messages, loopback mode has to be enabled before setting the interface up:</p><div class="language-text ext-text"><pre class="language-text"><code>sudo ip link set can0 type can loopback on\n</code></pre></div><p>Now, <code>candump</code> can be used to read all data available on the bus:</p><div class="language-text ext-text"><pre class="language-text"><code>candump can0\n</code></pre></div><h3 id="iso-tp-tools" tabindex="-1"><a class="header-anchor" href="#iso-tp-tools" aria-hidden="true">#</a> ISO-TP tools</h3>',13),o=(0,n.Uk)("The Linux kernel "),d={href:"https://github.com/hartkopp/can-isotp",target:"_blank",rel:"noopener noreferrer"},c=(0,n.Uk)("supports CAN ISO-TP"),r=(0,n.Uk)(", which is used as the transport protocol for ThingSet."),i=(0,n.uE)('<p>Assuming a device with CAN address 10 is connected to the bus, the following command sets up an ISO-TP channel for messages from the device to the host computer (CAN address 0):</p><div class="language-text ext-text"><pre class="language-text"><code>isotprecv -l -s 0x1ada0a00 -d 0x1ada000a can0\n</code></pre></div><p>In order to send a binary command to device with address 10, run the following command:</p><div class="language-text ext-text"><pre class="language-text"><code>echo &quot;01 18 70 A0&quot; | isotpsend -s 0x1ada0a00 -d 0x1ada000a can0\n</code></pre></div><p>The same for text mode:</p><div class="language-text ext-text"><pre class="language-text"><code>echo -n &quot;?output&quot; | hexdump -v -e &#39;/1 &quot;%02X &quot;&#39; | isotpsend -s 0x1ada0a00 -d 0x1ada000a can0\n</code></pre></div><p><code>isotprecv</code> only prints the hex values of the received data. The ASCII payload can be monitored using:</p><div class="language-text ext-text"><pre class="language-text"><code>isotpsniffer -tA -f 2 -d 0x1ada0a00 -s 0x1ada000a can0\n</code></pre></div>',8),l={render:function(e,a){const t=(0,n.up)("OutboundLink");return(0,n.wg)(),(0,n.iD)(n.HY,null,[s,(0,n._)("p",null,[o,(0,n._)("a",d,[c,(0,n.Wm)(t)]),r]),i],64)}}}}]);
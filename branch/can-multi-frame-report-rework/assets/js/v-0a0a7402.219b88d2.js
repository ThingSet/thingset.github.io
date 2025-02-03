"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1553],{9018:(e,t,a)=>{a.r(t),a.d(t,{data:()=>o});const o={key:"v-0a0a7402",path:"/spec/v0.6/mappings/lorawan.html",title:"LoRaWAN",lang:"en",frontmatter:{title:"LoRaWAN"},excerpt:"",headers:[{level:2,title:"DevEUI as Node ID",slug:"deveui-as-node-id",children:[]},{level:2,title:"Port mapping",slug:"port-mapping",children:[]}],filePathRelative:"spec/v0.6/mappings/lorawan.md",git:{updatedTime:1709745994e3}}},2963:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var o=a(6252);const r=(0,o.uE)('<h1 id="thingset-via-lorawan" tabindex="-1"><a class="header-anchor" href="#thingset-via-lorawan" aria-hidden="true">#</a> ThingSet via LoRaWAN</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>This part of the protocol specification is still work in progress.</p></div><p>As the data rate of LoRa is very low, only the binary protocol version is supported.</p><p>The ThingSet mapping is optimized for Class A devices, which allow only a very limited amount of downlink messages from the gateway to the device. This means that a request/response model is not suitable over LoRaWAN.</p><p>Instead, the communication mainly relies on reports sent from the device to the gateway.</p><h2 id="deveui-as-node-id" tabindex="-1"><a class="header-anchor" href="#deveui-as-node-id" aria-hidden="true">#</a> DevEUI as Node ID</h2><p>All LoRaWAN participants use a unique DevEUI. The same EUI-64 must also be used as the <code>pNodeID</code> for ThingSet (encoded as upper-case hex string) so that it can be avoided to transfer an additional ThingSet node ID.</p><h2 id="port-mapping" tabindex="-1"><a class="header-anchor" href="#port-mapping" aria-hidden="true">#</a> Port mapping</h2><p>LoRaWAN supports to specify a port for each message to differentiate between different types of payload. The port can be an integer in the range of 1..223 (0x01..0xDF).</p><p>The ports are mapped to the ThingSet data object IDs and only IDs from 0x01..0x3F are used for communication via LoRaWAN.</p><p>It is recommended to communicate only the values regularly and send corresponding IDs for each report only once during startup (port with ID + 0x40).</p><p>The following table gives an overview of the LoRaWAN ports as they are planned to be used for ThingSet:</p><table><thead><tr><th>Port(s)</th><th>Usage</th></tr></thead><tbody><tr><td>0x00</td><td>Reserved for LoRaWAN MAC messages</td></tr><tr><td>0x01..0x3F</td><td>ThingSet report values (corresponding to ID of group or subset)</td></tr><tr><td>0x40</td><td>Reserved for future use in ThingSet</td></tr><tr><td>0x41..0x7F</td><td>ThingSet report IDs (corresponding to ID + 0x40)</td></tr><tr><td>0x80..0xBF</td><td>ThingSet report/desire key/value pairs (corresponding to ID + 0x80)</td></tr><tr><td>0xC0..0xC7</td><td>ThingSet request/response channels</td></tr><tr><td>0xC8..0xDF</td><td>Recommended for LoRaWAN FUOTA services</td></tr><tr><td>0xE0..0xFF</td><td>Reserved for LoRaWAN</td></tr></tbody></table><p>Ports above <code>0x80</code> with key/value payload can be used to simplify the implementation if payload size is not too critical. Key/value ports sohould also be used for events where only changed values and not all values of a subset should be reported.</p><p>Desires are always sent with key and value.</p><p>Numeric IDs are suggested as the keys for the data. The data object names should be determined from the <code>cMetadataURL</code> document by the backend.</p>',16),d={href:"https://lupyuen.github.io/articles/payload",target:"_blank",rel:"noopener noreferrer"},s=(0,o.Uk)("JavaScript CBOR payload decoder"),n=(0,o.Uk)("."),i={render:function(e,t){const a=(0,o.up)("OutboundLink");return(0,o.wg)(),(0,o.iD)(o.HY,null,[r,(0,o._)("p",null,[(0,o._)("a",d,[s,(0,o.Wm)(a)]),n])],64)}}}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6761],{1553:(e,t,a)=>{a.r(t),a.d(t,{data:()=>s});const s={key:"v-28a639fc",path:"/spec/v0.3/4b_coap.html",title:"CoAP",lang:"en",frontmatter:{title:"CoAP"},excerpt:"",headers:[{level:2,title:"Key concepts",slug:"key-concepts",children:[]}],filePathRelative:"spec/v0.3/4b_coap.md",git:{updatedTime:170759614e4}}},1653:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});const s=(0,a(6252).uE)('<h1 id="thingset-to-coap-mapping" tabindex="-1"><a class="header-anchor" href="#thingset-to-coap-mapping" aria-hidden="true">#</a> ThingSet to CoAP mapping</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>This part of the protocol specification is still work in progress.</p></div><h2 id="key-concepts" tabindex="-1"><a class="header-anchor" href="#key-concepts" aria-hidden="true">#</a> Key concepts</h2><p>ThingSet uses only a subset of CoAPs features in order to make it more simple and compact:</p><ul><li>Mapping to CoAP message types: <ul><li>ThingSet requests are always CON</li><li>Only publication messages are NON</li><li>No dedicated ACK, the response must also contain data (only piggybacked responses)</li><li>RST needed? probably not...</li></ul></li><li>No message IDs: Synchronous communication necessary</li><li>PUT request is not supported. Use POST to create a resource and iPATCH to update it.</li><li>PATCH requests are always idempotent, i.e. only iPATCH is supported</li></ul><p>The binary function codes of ThingSet are the same as CoAP method codes. The status codes are also aligned, but contain an offset as explained before.</p>',6),i={render:function(e,t){return s}}}}]);
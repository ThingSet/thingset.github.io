"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[896],{672:(e,t,a)=>{a.r(t),a.d(t,{data:()=>i});const i={key:"v-64804090",path:"/4a_http.html",title:"HTTP",lang:"en",frontmatter:{title:"HTTP"},excerpt:"",headers:[{level:2,title:"Key concepts",slug:"key-concepts",children:[]},{level:2,title:"Data Processing",slug:"data-processing",children:[{level:3,title:"HTTP via CAN",slug:"http-via-can",children:[]},{level:3,title:"HTTP via Serial",slug:"http-via-serial",children:[]}]}],filePathRelative:"4a_http.md",git:{updatedTime:1628713248e3}}},6151:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});const i=(0,a(6252).uE)('<h1 id="thingset-to-http-mapping" tabindex="-1"><a class="header-anchor" href="#thingset-to-http-mapping" aria-hidden="true">#</a> ThingSet to HTTP mapping</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>This part of the protocol specification is still work in progress.</p></div><h2 id="key-concepts" tabindex="-1"><a class="header-anchor" href="#key-concepts" aria-hidden="true">#</a> Key concepts</h2><p>ThingSet is developed for point-to-point connections or small local networks, but the protocol functions were developed such that they can be easily integrated into larger networks or the internet using an HTTP gateway.</p><p>Many web applications interact using JSON APIs (sometimes in a RESTful way), so the compatibility with JSON web APIs is an important feature of the ThingSet protocol.</p><p>In order to reduce the complexity of the protocol, the features offered by HTTP were reduced:</p><ul><li>Convention over configuration <ul><li>Only two content-types JSON and CBOR are supported. They are detected automatically and no content-type header is needed.</li><li>Predefined URI layout matching the data structure.</li><li>Unit of data objects stored in the name (key) of a map, so the required amount of nesting in the JSON data structure is limited to categories only.</li></ul></li></ul><p>The response codes of ThingSet are aligned with CoAP and thus also allow a simple translation to HTTP. The main difference is that HTTP doesn&#39;t allow to indicate successful requests as fine-grained as CoAP, so the status will be mostly 200 OK or 204 No Content.</p><h2 id="data-processing" tabindex="-1"><a class="header-anchor" href="#data-processing" aria-hidden="true">#</a> Data Processing</h2><h3 id="http-via-can" tabindex="-1"><a class="header-anchor" href="#http-via-can" aria-hidden="true">#</a> HTTP via CAN</h3><div class="language-text ext-text"><pre class="language-text"><code>Dev     CAN:txt     GW   HTTP:txt   Web App\n |                  |                  |\n |                  |   req objects    |\n |   req objects    | &lt;--------------- |\n | &lt;--------------- |                  |\n |   resp objects   |                  |\n | ---------------&gt; |   resp objects   |\n |                  | ---------------&gt; |\n</code></pre></div><h3 id="http-via-serial" tabindex="-1"><a class="header-anchor" href="#http-via-serial" aria-hidden="true">#</a> HTTP via Serial</h3><div class="language-text ext-text"><pre class="language-text"><code>Dev    UART:txt     GW   HTTP:txt   Web App\n |                  |                  |\n |                  |   req objects    |\n |   req objects    | &lt;--------------- |\n | &lt;--------------- |                  |\n |   resp objects   |                  |\n | ---------------&gt; |   resp objects   |\n |                  | ---------------&gt; |\n</code></pre></div>',13),n={render:function(e,t){return i}}}}]);
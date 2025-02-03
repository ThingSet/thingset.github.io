"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[608],{379:(e,t,a)=>{a.r(t),a.d(t,{data:()=>o});const o={key:"v-6d277900",path:"/spec/changelog.html",title:"Changelog",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"v0.3 to v0.4",slug:"v0-3-to-v0-4",children:[]}],filePathRelative:"spec/changelog.md",git:{updatedTime:1654012054e3}}},5128:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});const o=(0,a(6252).uE)('<h1 id="changelog" tabindex="-1"><a class="header-anchor" href="#changelog" aria-hidden="true">#</a> Changelog</h1><p>This changelog notes most important updates from one protocol version to another.</p><p>The protocol is still evolving. Until release of v1.0 even breaking changes may be introduced (even though we do our best to avoid breaking changes).</p><h2 id="v0-3-to-v0-4" tabindex="-1"><a class="header-anchor" href="#v0-3-to-v0-4" aria-hidden="true">#</a> v0.3 to v0.4</h2><ul><li>Nomenclature changes <ul><li>Data nodes are now called <strong>data objects</strong> (&quot;node&quot; could be confused with IoT nodes)</li><li>Leaf nodes containing actual data are called <strong>data items</strong></li><li>Publication messages are called <strong>statements</strong></li></ul></li><li>Statements now contain the path (necessary for better integration with MQTT)</li><li>GET requests in binary mode do not contain any payload anymore to avoid incompatibility with CoAP and HTTP mapping. The FETCH request is used for discovery instead.</li><li>Executable data objects are prefixed with <code>x-</code></li><li>Internal data objects (prefixed with <code>.</code>) are used to configure publication period, etc.</li><li>Draft MQTT topic mapping is now part of the spec</li></ul>',5),n={render:function(e,t){return o}}}}]);
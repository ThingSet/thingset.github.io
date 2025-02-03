"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9988],{6879:(e,t,n)=>{n.r(t),n.d(t,{data:()=>o});const o={key:"v-12993636",path:"/spec/v0.6/transports/websocket.html",title:"WebSocket",lang:"en",frontmatter:{title:"WebSocket"},excerpt:"",headers:[{level:2,title:"Application to cloud connection (client)",slug:"application-to-cloud-connection-client",children:[]},{level:2,title:"Live connection via cloud (client)",slug:"live-connection-via-cloud-client",children:[]},{level:2,title:"Node to cloud connection",slug:"node-to-cloud-connection",children:[]}],filePathRelative:"spec/v0.6/transports/websocket.md",git:{updatedTime:1738504364e3}}},2921:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});const o=(0,n(6252).uE)('<h1 id="thingset-via-websockets" tabindex="-1"><a class="header-anchor" href="#thingset-via-websockets" aria-hidden="true">#</a> ThingSet via WebSockets</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>The WebSocket transport is still work-in-progress and may change in the future.</p></div><p>The WebSocket transport uses normal ThingSet messages as the payload for bi-directional communication.</p><h2 id="application-to-cloud-connection-client" tabindex="-1"><a class="header-anchor" href="#application-to-cloud-connection-client" aria-hidden="true">#</a> Application to cloud connection (client)</h2><p>Used by web front-ends to get information about multiple nodes.</p><pre><code>ws(s)://{cloud-host}/app/\n</code></pre><p>Authentication can be achieved with HTTP basic auth.</p><h2 id="live-connection-via-cloud-client" tabindex="-1"><a class="header-anchor" href="#live-connection-via-cloud-client" aria-hidden="true">#</a> Live connection via cloud (client)</h2><p>Used by an application to establish a direct 1:1 connection to a node.</p><pre><code>ws(s)://{cloud-host}/app/{node-id}\n</code></pre><p>Authentication can be achieved with HTTP basic auth.</p><p>Multiple clients should be able to connect to the same node. They will all receive reports. In addition to that, reports are stored in the state DB.</p><p>Requests and responses have to be multiplexed. After a request the node is locked by a mutex which is only released after the response has been received (or after a timeout).</p><h2 id="node-to-cloud-connection" tabindex="-1"><a class="header-anchor" href="#node-to-cloud-connection" aria-hidden="true">#</a> Node to cloud connection</h2><p>Single node</p><pre><code>ws(s)://{cloud-host}/node/{node-id}\n</code></pre><p>Gateway</p><pre><code>ws(s)://{cloud-host}/gw/{gateway-id}\n</code></pre>',18),i={render:function(e,t){return o}}}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6702],{6404:(e,t,a)=>{a.r(t),a.d(t,{data:()=>i});const i={key:"v-0eea0dda",path:"/spec/v0.3/4c_mqtt.html",title:"MQTT",lang:"en",frontmatter:{title:"MQTT"},excerpt:"",headers:[{level:2,title:"Publication",slug:"publication",children:[]},{level:2,title:"Subscription",slug:"subscription",children:[]}],filePathRelative:"spec/v0.3/4c_mqtt.md",git:{updatedTime:1707227927e3}}},6912:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});const i=(0,a(6252).uE)('<h1 id="thingset-to-mqtt-mapping" tabindex="-1"><a class="header-anchor" href="#thingset-to-mqtt-mapping" aria-hidden="true">#</a> ThingSet to MQTT mapping</h1><p>The MQTT protocol doesn&#39;t support the request/response part of the ThingSet protocol, but the publish/subscribe messaging pattern can be easily mapped.</p><h2 id="publication" tabindex="-1"><a class="header-anchor" href="#publication" aria-hidden="true">#</a> Publication</h2><p>The topic used to publish to the MQTT server may contain the path of the data nodes. The topic name itself could be stored as a data node, but it&#39;s not relevant to the implementation of publication messages in the ThingSet protocool.</p><p>A ThingSet publication message starts with a first byte 0x1F in binary mode or &quot;# &quot; in text mode to indicate a publication message. Whether this byte is also stored in the MQTT topic depends on the application.</p><p>If a single measurement value is stored in an MQTT topic (e.g. /devices/device-id/Bat_V for the battery voltage), it is recommended that only the JSON or CBOR payload data is stored in the MQTT payload and the path of the ThingSet endpoint is contained in the topic.</p><p>If multiple data nodes are stored in the same topic, the entire ThingSet publication message could be stored to allow direct passing between MQTT topic and ThingSet.</p><h2 id="subscription" tabindex="-1"><a class="header-anchor" href="#subscription" aria-hidden="true">#</a> Subscription</h2><p>Content fetched from a specific topic is forwarded to the ThingSet protocol as a publication message. The ThingSet device will parse the incoming data similar to a PATCH request. Unknown data nodes contained in the subscribed payload are silently ignored.</p><p>If the application requires some processing of incoming data before applying them to actual nodes, temporary data nodes can be created where the subscribed content is written to. Afterwards a function is called (assigned as a callback to the sub channel node) to process the incoming data and pass it on to the actual nodes.</p><p>This approach can also be used to determine if the received data has changed compared to already existing state and avoid too many storage operations in EEPROM for regularly published messages.</p>',11),n={render:function(e,t){return i}}}}]);
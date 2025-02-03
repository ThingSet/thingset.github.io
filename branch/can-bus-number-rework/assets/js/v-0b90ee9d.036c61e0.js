"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2186],{9495:(e,t,s)=>{s.r(t),s.d(t,{data:()=>a});const a={key:"v-0b90ee9d",path:"/spec/v0.6/mappings/mqtt.html",title:"MQTT",lang:"en",frontmatter:{title:"MQTT"},excerpt:"",headers:[{level:2,title:"General thoughts",slug:"general-thoughts",children:[]},{level:2,title:"Reports and desires",slug:"reports-and-desires",children:[{level:3,title:"Reports",slug:"reports",children:[]},{level:3,title:"Desires",slug:"desires",children:[]}]},{level:2,title:"Request / response",slug:"request-response",children:[]},{level:2,title:"Connectivity status",slug:"connectivity-status",children:[]},{level:2,title:"Incompatibilities",slug:"incompatibilities",children:[]}],filePathRelative:"spec/v0.6/mappings/mqtt.md",git:{updatedTime:1701767043e3}}},5369:(e,t,s)=>{s.r(t),s.d(t,{default:()=>C});var a=s(6252);const o=(0,a.uE)('<h1 id="thingset-to-mqtt-mapping" tabindex="-1"><a class="header-anchor" href="#thingset-to-mqtt-mapping" aria-hidden="true">#</a> ThingSet to MQTT mapping</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>The MQTT mapping is still work-in-progress and may change in the future.</p></div><p>This chapter specifies a topic layout that supports the publish/subscribe as well as the request/response feature of ThingSet.</p><p>Typically, a gateway would be used to translate the messages between the node (connected via CAN or serial) and the MQTT broker.</p><h2 id="general-thoughts" tabindex="-1"><a class="header-anchor" href="#general-thoughts" aria-hidden="true">#</a> General thoughts</h2><p>The basic MQTT topic layout for ThingSet follows the below structure:</p><pre><code>{message-type}/{node-id}/{details}\n</code></pre><p>The first part of the topic indicates the message type (request, response, desire or report) and mode (text or binary). As MQTT does not allow to specify a content format, the format has to be encoded in the topic.</p><p>The second part contains the node ID, followed by further details depending on the message type.</p><p>This layout allows to easily grant access rights for individual nodes e.g. with following wild card:</p><pre><code>+/{node-id}/#\n</code></pre><p>A Gateway that translates MQTT messages for multiple devices (e.g. connected via CAN) has to subscribe to the downlink message topics for each individual connected node.</p>',12),i={class:"custom-container tip"},n=(0,a._)("p",{class:"custom-container-title"},"Background information",-1),r=(0,a.Uk)("Many MQTT services for IoT don't behave like actual MQTT brokers, but use MQTT only as an API (AWS IoT, Azure IoT, "),d={href:"https://www.eclipse.org/hono/docs/user-guide/mqtt-adapter/",target:"_blank",rel:"noopener noreferrer"},p=(0,a.Uk)("Eclipse Hono"),c=(0,a.Uk)(", ThingsBoard). This allows to omit the device ID in the MQTT topic and determine the device based on the MQTT Client ID."),h=(0,a._)("p",null,"ThingSet supports standard MQTT brokers and thus stores the device ID in the topic. The device ID is also necessary for Gateways.",-1),l=(0,a._)("p",null,"A user name is not part of the topic, as device claiming is usually part of the cloud backend and user information may not be stored in the device.",-1),u=(0,a.uE)('<h2 id="reports-and-desires" tabindex="-1"><a class="header-anchor" href="#reports-and-desires" aria-hidden="true">#</a> Reports and desires</h2><h3 id="reports" tabindex="-1"><a class="header-anchor" href="#reports" aria-hidden="true">#</a> Reports</h3><p>Messages in text mode are published to the <code>rpt</code> path and the payload format must be the valid JSON data extracted from a ThingSet report.</p><p><strong>JSON name:value map, QoS 0/1</strong></p><pre><code>rpt/{node-id}/{group}\n</code></pre><p>Messages can also be published directly in the binary format to the <code>r</code> path if the device does not support the text mode.</p><p>Binary messages can either be published as a map or with IDs and values in a separate topic.</p><p><strong>CBOR id:value map, QoS 0/1</strong></p><pre><code>r/{node-id}/m/{group-id}\n</code></pre><p><strong>CBOR ids, retained flag, QoS 1</strong></p><pre><code>r/{node-id}/i/{group-id}\n</code></pre><p><strong>CBOR values, QoS 0</strong></p><pre><code>r/{node-id}/v/{group-id}\n</code></pre><p>The text mode is the preferred way for MQTT communication if supported by the device or gateway.</p><p>A cloud service might subscribe to the CBOR topics and convert them into the JSON topic automatically so that they can be further processed by other services.</p><p>The link to extended device data information will be published to the topic:</p><pre><code>rpt/{node-id}/cMetadataURL\n</code></pre><p>If the binary mode is used with separated IDs and values, the IDs should be published with QoS 1 and the retained flag in order to make sure they are always available and matching the values that are sent to the <code>/v/</code> topic.</p><p>Only static information as parts of attribute subsets may use the retained flag. Other data should not set the retained flag, as the data gets outdated quickly.</p><h3 id="desires" tabindex="-1"><a class="header-anchor" href="#desires" aria-hidden="true">#</a> Desires</h3><p>Desires are published by the application with QoS 1 and the retained flag set.</p><p>The nodes must connect to the broker with a clean session (note: retained messages are also kept when connecting with clean session). This avoids that outdated desires are received. Same as for CoAP, the desires must contain all requested updates to the data in the device and not only an incremental update to the data.</p><p><strong>JSON name:value map</strong></p><pre><code>des/{node-id}/{group-name}\n</code></pre><p><strong>CBOR id:value map</strong></p><pre><code>d/{node-id}/m/{group-id}\n</code></pre><p><strong>CBOR ids</strong></p><pre><code>d/{node-id}/i/{group-id}\n</code></pre><p><strong>CBOR values</strong></p><pre><code>d/{node-id}/v/{group-id}\n</code></pre><h2 id="request-response" tabindex="-1"><a class="header-anchor" href="#request-response" aria-hidden="true">#</a> Request / response</h2><p>For the request / response messaging mode the response has to be matched with the request. For this reason, the request is stored in a topic with an appended request ID chosen by the requesting device. The response will be stored in a topic containing the same ID.</p><p><strong>Requests (JSON or CBOR)</strong></p><pre><code>req/{node-id}/{cmd-id}\n</code></pre><p><strong>Response (JSON or CBOR, same as request)</strong></p><pre><code>rsp/{node-id}/{cmd-id}\n</code></pre><p>The above topics contain the entire ThingSet request or response. Hence, both binary or text mode can be used with the same topic.</p><h2 id="connectivity-status" tabindex="-1"><a class="header-anchor" href="#connectivity-status" aria-hidden="true">#</a> Connectivity status</h2>',38),g={class:"custom-container warning"},m=(0,a._)("p",{class:"custom-container-title"},"WARNING",-1),b=(0,a._)("p",null,"This is a first idea for an approach to store connectivity information. Expect changes in the future.",-1),f=(0,a.Uk)("See also "),v={href:"http://www.steves-internet-guide.com/checking-active-mqtt-client-connections/",target:"_blank",rel:"noopener noreferrer"},T=(0,a.Uk)("here"),w=(0,a.Uk)(" for further ideas."),y=(0,a.uE)('<p>The following topic is used to store device connectivity status:</p><pre><code>rpt/{node-id}/$conn\n</code></pre><ol><li>Client connects and sends 1 to above topic.</li><li>Client sends last will and testament (LWT) with content 0 for that topic.</li><li>On normal disconnect, client sends 0 before disconnecting.</li></ol><p>All messages should be retained.</p><p><strong>Idea:</strong> Use this topic to tell that client is intermittent / async by design (e.g. in case of LoRaWAN).</p><h2 id="incompatibilities" tabindex="-1"><a class="header-anchor" href="#incompatibilities" aria-hidden="true">#</a> Incompatibilities</h2>',6),k=(0,a.Uk)("AWS is "),q={href:"https://www.hivemq.com/blog/hivemq-cloud-vs-aws-iot/",target:"_blank",rel:"noopener noreferrer"},Q=(0,a.Uk)("not MQTT compliant"),S=(0,a.Uk)(". Handling of retained messages is wrong. According to MQTT standard, subscribing to a retained topic via wild-cards would deliver the mesage. "),R={href:"https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html#mqtt-retain",target:"_blank",rel:"noopener noreferrer"},I=(0,a.Uk)("In AWS this is not supported"),M=(0,a.Uk)("."),C={render:function(e,t){const s=(0,a.up)("OutboundLink");return(0,a.wg)(),(0,a.iD)(a.HY,null,[o,(0,a._)("div",i,[n,(0,a._)("p",null,[r,(0,a._)("a",d,[p,(0,a.Wm)(s)]),c]),h,l]),u,(0,a._)("div",g,[m,b,(0,a._)("p",null,[f,(0,a._)("a",v,[T,(0,a.Wm)(s)]),w])]),y,(0,a._)("p",null,[k,(0,a._)("a",q,[Q,(0,a.Wm)(s)]),S,(0,a._)("a",R,[I,(0,a.Wm)(s)]),M])],64)}}}}]);
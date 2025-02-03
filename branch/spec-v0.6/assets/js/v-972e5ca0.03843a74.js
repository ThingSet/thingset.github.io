"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1998],{7336:(e,t,a)=>{a.r(t),a.d(t,{data:()=>r});const r={key:"v-972e5ca0",path:"/spec/v0.4/mapping_mqtt.html",title:"MQTT",lang:"en",frontmatter:{title:"MQTT"},excerpt:"",headers:[{level:2,title:"General thoughts",slug:"general-thoughts",children:[]},{level:2,title:"Statements",slug:"statements",children:[{level:3,title:"Device to broker",slug:"device-to-broker",children:[]},{level:3,title:"Broker to device",slug:"broker-to-device",children:[]}]},{level:2,title:"Request / response",slug:"request-response",children:[]},{level:2,title:"Data Processing",slug:"data-processing",children:[{level:3,title:"Device to Broker",slug:"device-to-broker-1",children:[]},{level:3,title:"Broker to Device",slug:"broker-to-device-1",children:[]},{level:3,title:"Broker to Device (requests)",slug:"broker-to-device-requests",children:[]}]},{level:2,title:"References",slug:"references",children:[]}],filePathRelative:"spec/v0.4/mapping_mqtt.md",git:{updatedTime:1686213394e3}}},1388:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var r=a(6252);const n=(0,r.uE)('<h1 id="thingset-to-mqtt-mapping" tabindex="-1"><a class="header-anchor" href="#thingset-to-mqtt-mapping" aria-hidden="true">#</a> ThingSet to MQTT mapping</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>The MQTT mapping is still work-in-progress and may change in the future.</p></div><p>This chapter specifies a topic layout that supports the publish/subscribe as well as the request/response feature of ThingSet.</p><p>A gateway has to be used to translate the messages between the device (connected via CAN or serial) and the MQTT broker.</p><h2 id="general-thoughts" tabindex="-1"><a class="header-anchor" href="#general-thoughts" aria-hidden="true">#</a> General thoughts</h2><p>MQTT topics used for ThingSet are namespaced with a <code>ts/</code> at the very beginning. This allows to use the same broker for multiple purposes and data formats. As topics are sent with every single MQTT message, no additional versioning prefix is added in order to keep them short.</p><p>The ThingSet-specific part of the topic starts with <code>rx</code> or <code>tx</code> to indicate the direction of the message. <code>tx</code> means that a message is transmitted from the device to the broker (uplink), <code>rx</code> means that the device receives a message from the broker (downlink).</p><p>The direction identifier is followed by a user or tenant name, the device ID and the path relative to the device root.</p><p>In environments without different users or during bootstrapping of devices, <code>null</code> shall be used instead of an actual user name.</p><p>A Gateway that translates MQTT to multiple devices connected e.g. via CAN subscribes to the following topic for downlink messages</p><pre><code>ts/rx/{user}/#\n</code></pre><p>and publishes uplink messages to the topic</p><pre><code>ts/tx/{user}/{device-id}/{path}\n</code></pre><p><strong>Remark:</strong> For MQTT v3.1.1 it is not possible to use the same topic for uplink and downlink messages, as a device would receive its own published message if it subscribed to the topic aswell. Only MQTT v5 has a &quot;No Local&quot; bit to prevent getting messages from same clientID.</p><p>This topic layout allows to easily grant access rights on user or device basis, e.g. with following wild card:</p><pre><code>ts/+/{user}/{device-id}/#\n</code></pre><h2 id="statements" tabindex="-1"><a class="header-anchor" href="#statements" aria-hidden="true">#</a> Statements</h2><h3 id="device-to-broker" tabindex="-1"><a class="header-anchor" href="#device-to-broker" aria-hidden="true">#</a> Device to broker</h3><p>Messages in text mode are published to the <code>tx</code> path and the payload format must be the valid JSON data extracted from a ThingSet statement.</p><p><strong>JSON name:value map, QoS 0/1</strong></p><pre><code>ts/tx/{user}/{device-id}/{group}\n</code></pre><p>Messages can also be published directly in the binary format to the <code>txb</code> topic if the device does not support the text mode.</p><p>Binary messages can either be published as a map or with IDs and values in a separate topic.</p><p><strong>CBOR id:value map, QoS 0/1</strong></p><pre><code>ts/txb/m/{user}/{device-id}/{group-id}\n</code></pre><p><strong>CBOR ids, retained flag, QoS 1</strong></p><pre><code>ts/txb/i/{user}/{device-id}/{group-id}\n</code></pre><p><strong>CBOR values, QoS 0</strong></p><pre><code>ts/txb/v/{user}/{device-id}/{group-id}\n</code></pre><p>The text mode is the preferred way for MQTT communication if supported by the device or gateway.</p><p>A cloud service might subscribe to the CBOR topics and convert them into the JSON topic automatically so that they can be further processed by other services.</p><p>The link to extended device data information will be published to a special topic:</p><pre><code>ts/tx/{user}/{device-id}/MetadataURL\n</code></pre><p>If the binary mode is used with separated IDs and values, the IDs should be published with QoS 1 and the retained flag in order to make sure they are always available and matching the values that are sent to the <code>/v/</code> topic.</p><p>In general, static data like firmware version from the <code>info</code> group should only be published once after startup and may use the retained flag aswell.</p><h3 id="broker-to-device" tabindex="-1"><a class="header-anchor" href="#broker-to-device" aria-hidden="true">#</a> Broker to device</h3><p><strong>JSON name:value map</strong></p><pre><code>ts/rx/{user}/{device-id}/{group-name}\n</code></pre><p><strong>CBOR id:value map</strong></p><pre><code>tsb/rx/m/{user}/{device-id}/{group-id}\n</code></pre><p><strong>CBOR ids</strong></p><pre><code>tsb/rx/i/{user}/{device-id}/{group-id}\n</code></pre><p><strong>CBOR values</strong></p><pre><code>tsb/rx/v/{user}/{device-id}/{group-id}\n</code></pre><h2 id="request-response" tabindex="-1"><a class="header-anchor" href="#request-response" aria-hidden="true">#</a> Request / response</h2><p>For the request / response messaging mode the response has to be matched with the request. For this reason, the request is stored in a topic with an appended request ID chosen by the requesting device. The response will be stored in a topic containing the same ID.</p><p><strong>Requests (JSON or CBOR)</strong></p><pre><code>ts/req/{user}/{device-id}/{req-id}\n</code></pre><p><strong>Response (JSON or CBOR, same as request)</strong></p><pre><code>ts/res/{user}/{device-id}/{req-id}\n</code></pre><p>The above topics contain the entire ThingSet request or response. Hence, both binary or text mode can be used with the same topic.</p><h2 id="data-processing" tabindex="-1"><a class="header-anchor" href="#data-processing" aria-hidden="true">#</a> Data Processing</h2><p>The following diagrams explain the data flow between a device and an MQTT broker.</p><p>In case of LoRaWAN or CAN where the binary mode with IDs is used, an agent may be installed which subscribes to the binary messages and translates them to the JSON messages which are later on consumed by a higher-level application.</p><p>This translation can also be done on a local gateway.</p><p>The mapping of IDs and names can either be retrieved from the device (e.g. via request/response for a device connected via CAN) or it can be stored in a <code>.json</code> file on a server which contains extended information. The detailed specification of this file is still work in progress.</p><h3 id="device-to-broker-1" tabindex="-1"><a class="header-anchor" href="#device-to-broker-1" aria-hidden="true">#</a> Device to Broker</h3><h4 id="mqtt-direct-low-bandwidth-with-agent" tabindex="-1"><a class="header-anchor" href="#mqtt-direct-low-bandwidth-with-agent" aria-hidden="true">#</a> MQTT direct (low bandwidth, with agent)</h4><ul><li>e.g. 2G with global SIM card and very low data rate</li><li>ID mapping by data agent</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev       MQTT:bin     Agent       MQTT:txt     Broker\n |                       |                        |\n |                       |                        |\n |     ids (QoS 1)       |                        |\n | --------------------&gt; |                        |\n |    values (QoS 0)     |                        |\n | --------------------&gt; |    objects (QoS 0)     |\n |                       | ---------------------&gt; |\n |                       |                        |\n |         ...           |                        |\n |                       |                        |\n |    values (QoS 0)     |                        |\n | --------------------&gt; |    objects (QoS 0)     |\n |                       | ---------------------&gt; |\n</code></pre></div><h4 id="mqtt-direct-sufficient-bandwidth" tabindex="-1"><a class="header-anchor" href="#mqtt-direct-sufficient-bandwidth" aria-hidden="true">#</a> MQTT direct (sufficient bandwidth)</h4><ul><li>e.g. LTE with local SIM card</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev       MQTT:txt     Broker\n |                        |\n |    objects (QoS 0)     |\n | ---------------------&gt; |\n</code></pre></div><h4 id="serial" tabindex="-1"><a class="header-anchor" href="#serial" aria-hidden="true">#</a> Serial</h4><div class="language-text ext-text"><pre class="language-text"><code>Dev    UART:txt   GW   HTTP:txt   Web App\n |                 |                  |\n |     objects     |                  |\n | --------------&gt; |      objects     |\n |                 | ---------------&gt; |\n</code></pre></div><h4 id="can-smart-gateway" tabindex="-1"><a class="header-anchor" href="#can-smart-gateway" aria-hidden="true">#</a> CAN (smart gateway)</h4><ul><li>ID mapping and translation between binary and text mode on gateway</li><li>Preferred way</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev     CAN:bin       GW       MQTT:txt       Broker\n |                    |                         |\n |      values        |                         |\n | -----------------&gt; |                         |\n |   req/resp names   |                         |\n | &lt;----------------&gt; |    objects (QoS 0)      |\n |                    | ----------------------&gt; |\n |         ...        |                         |\n |                    |                         |\n |      values        |                         |\n | -----------------&gt; |    objects (QoS 0)      |\n |                    | ----------------------&gt; |\n</code></pre></div><h4 id="can-with-data-agent" tabindex="-1"><a class="header-anchor" href="#can-with-data-agent" aria-hidden="true">#</a> CAN (with data agent)</h4><ul><li>ID mapping by data agent</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev     CAN:bin      GW       MQTT:bin       Agent       MQTT:txt     Broker\n |                   |                         |                        |\n |      values       |                         |                        |\n | ----------------&gt; |                         |                        |\n |   req/resp ids    |                         |                        |\n | &lt;---------------&gt; |     ids (QoS 1)         |                        |\n |                   | ----------------------&gt; |                        |\n |                   |    values (QoS 0)       |                        |\n |                   | ----------------------&gt; |    objects (QoS 0)     |\n |                   |                         | ---------------------&gt; |\n |        ...        |                         |                        |\n |                   |                         |                        |\n |      values       |                         |                        |\n | ----------------&gt; |    values (QoS 0)       |                        |\n |                   | ----------------------&gt; |    objects (QoS 0)     |\n |                   |                         | ---------------------&gt; |\n</code></pre></div><h4 id="lorawan-smart-gateway" tabindex="-1"><a class="header-anchor" href="#lorawan-smart-gateway" aria-hidden="true">#</a> LoRaWAN (smart gateway)</h4><ul><li>ID mapping on gateway</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev   LoRaWAN:bin      GW       MQTT:txt      Broker\n |                     |                        |\n |     ids (ACK-ed)    |                        |\n | ------------------&gt; |                        |\n |       values        |                        |\n | ------------------&gt; |    objects (QoS 0)     |\n |                     | ---------------------&gt; |\n |        ...          |                        |\n |                     |                        |\n |       values        |                        |\n | ------------------&gt; |    objects (QoS 0)     |\n |                     | ---------------------&gt; |\n</code></pre></div><h4 id="lorawan-with-data-agent" tabindex="-1"><a class="header-anchor" href="#lorawan-with-data-agent" aria-hidden="true">#</a> LoRaWAN (with data agent)</h4><ul><li>Simple forwarding of messages by gateway</li><li>ID mapping by data agent or statically via TTN payload formatter</li><li>Probably preferred way in order to be able to use standard TTN gateways</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev   LoRaWAN:bin      GW       MQTT:bin     Agent       MQTT:txt     Broker\n |                     |                       |                        |\n |     ids (ACK-ed)    |                       |                        |\n | ------------------&gt; |     ids (QoS 1)       |                        |\n |       values        | --------------------&gt; |                        |\n | ------------------&gt; |    values (QoS 0)     |                        |\n |                     | --------------------&gt; |    objects (QoS 0)     |\n |                     |                       | ---------------------&gt; |\n |        ...          |                       |                        |\n |                     |                       |                        |\n |       values        |                       |                        |\n | ------------------&gt; |    values (QoS 0)     |                        |\n |                     | --------------------&gt; |    objects (QoS 0)     |\n |                     |                       | ---------------------&gt; |\n</code></pre></div><h3 id="broker-to-device-1" tabindex="-1"><a class="header-anchor" href="#broker-to-device-1" aria-hidden="true">#</a> Broker to Device</h3><h4 id="serial-1" tabindex="-1"><a class="header-anchor" href="#serial-1" aria-hidden="true">#</a> Serial</h4><div class="language-text ext-text"><pre class="language-text"><code>Dev    UART:txt     GW   MQTT:txt    Broker\n |                  |                  |\n |                  |      objects     |\n |      objects     | &lt;--------------- |\n | &lt;--------------- |                  |\n</code></pre></div><h4 id="can-direct" tabindex="-1"><a class="header-anchor" href="#can-direct" aria-hidden="true">#</a> CAN (direct)</h4><ul><li>No mapping of IDs needed, as incoming statements are sent via ISO-TP and can have almost arbitrary length.</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev     CAN:txt      GW       MQTT:txt       Broker\n |                   |                         |\n |                   |      objects (QoS 0)    |\n |      objects      | &lt;---------------------- |\n | &lt;---------------- |                         |\n</code></pre></div><h4 id="lorawan-direct" tabindex="-1"><a class="header-anchor" href="#lorawan-direct" aria-hidden="true">#</a> LoRaWAN (direct)</h4><ul><li>ID mapping on gateway</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev   LoRaWAN:bin      GW       MQTT:txt      Broker\n |                     |                        |\n |    ids (ACK-ed)     |                        |\n | ------------------&gt; |                        |\n |                     |                        |\n |        ...          |                        |\n |                     |                        |\n |                     |     objects (QoS 0)    |\n |       values        | &lt;--------------------- |\n | &lt;------------------ |                        |\n</code></pre></div><h4 id="lorawan-with-data-agent-1" tabindex="-1"><a class="header-anchor" href="#lorawan-with-data-agent-1" aria-hidden="true">#</a> LoRaWAN (with data agent)</h4><ul><li>Simple forwarding of messages by gateway</li><li>ID mapping by data agent or statically via TTN payload formatter</li><li>Probably preferred way in order to be able to use standard TTN gateways</li></ul><div class="language-text ext-text"><pre class="language-text"><code>Dev   LoRaWAN:bin      GW       MQTT:bin     Agent       MQTT:txt     Broker\n |                     |                       |                        |\n |    ids (ACK-ed)     |                       |                        |\n | ------------------&gt; |     ids (QoS 1)       |                        |\n |       values        | --------------------&gt; |                        |\n | ------------------&gt; |    values (QoS 0)     |                        |\n |                     | --------------------&gt; |    objects (QoS 0)     |\n |                     |                       | ---------------------&gt; |\n |        ...          |                       |                        |\n |                     |                       |                        |\n |       values        |                       |                        |\n | ------------------&gt; |    values (QoS 0)     |                        |\n |                     | --------------------&gt; |    objects (QoS 0)     |\n |                     |                       | ---------------------&gt; |\n</code></pre></div><h3 id="broker-to-device-requests" tabindex="-1"><a class="header-anchor" href="#broker-to-device-requests" aria-hidden="true">#</a> Broker to Device (requests)</h3><p>ToDo</p><h2 id="references" tabindex="-1"><a class="header-anchor" href="#references" aria-hidden="true">#</a> References</h2>',92),i=(0,r.Uk)("[1] "),s={href:"https://d1.awsstatic.com/whitepapers/Designing_MQTT_Topics_for_AWS_IoT_Core.pdf",target:"_blank",rel:"noopener noreferrer"},o=(0,r.Uk)("Designing MQTT Topics for AWS IoT Core"),d=(0,r._)("p",null,"[2] https://pi3g.com/2019/05/29/mqtt-topic-tree-design-best-practices-tips-examples/",-1),c={render:function(e,t){const a=(0,r.up)("OutboundLink");return(0,r.wg)(),(0,r.iD)(r.HY,null,[n,(0,r._)("p",null,[i,(0,r._)("a",s,[o,(0,r.Wm)(a)])]),d],64)}}}}]);
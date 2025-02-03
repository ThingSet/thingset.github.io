"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3008],{175:(e,t,s)=>{s.r(t),s.d(t,{data:()=>a});const a={key:"v-4240eb29",path:"/spec/v0.5/appl_general_concept.html",title:"General Concept",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"Message Types",slug:"message-types",children:[{level:3,title:"Request-response model",slug:"request-response-model",children:[]},{level:3,title:"Publish-subscribe model",slug:"publish-subscribe-model",children:[]}]},{level:2,title:"Protocol Modes",slug:"protocol-modes",children:[]},{level:2,title:"Device Classes",slug:"device-classes",children:[]}],filePathRelative:"spec/v0.5/appl_general_concept.md",git:{updatedTime:1701767043e3}}},7418:(e,t,s)=>{s.r(t),s.d(t,{default:()=>ae});var a=s(6252),o=s(7341),n=s(3088);const i=(0,a._)("h1",{id:"general-concept",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#general-concept","aria-hidden":"true"},"#"),(0,a.Uk)(" General Concept")],-1),r=(0,a.Uk)("The ThingSet protocol provides a consistent, standardized way to configure, monitor and control ressource-constrained devices via different communication interfaces. It specifies the higher layers (5 to 7) of the "),l={href:"https://en.wikipedia.org/wiki/OSI_model",target:"_blank",rel:"noopener noreferrer"},d=(0,a.Uk)("OSI (Open Systems Interconnection) model"),c=(0,a.Uk)(". The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, LoRa, WiFi, Bluetooth, UART (serial) or similar."),h=(0,a._)("p",null,[(0,a._)("img",{src:o,alt:"ISO/OSI layer setup"})],-1),u=(0,a._)("p",null,"The underlying layers have to ensure encryption, reliable transfer, correct packet order (if messages are packetized) and error-checking of the transferred data.",-1),p=(0,a.Uk)("A major feature of the ThingSet protocol is a seamless integration with other application layer protocols such as HTTP, "),m={href:"https://tools.ietf.org/html/rfc7252",target:"_blank",rel:"noopener noreferrer"},g=(0,a.Uk)("CoAP"),f=(0,a.Uk)(" and MQTT. Suggestions for implementing gateways to convert between ThingSet messages and HTTP/CoAP/MQTT payload can be found in the Protocol Mapping sections."),b=(0,a._)("h2",{id:"message-types",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#message-types","aria-hidden":"true"},"#"),(0,a.Uk)(" Message Types")],-1),_=(0,a._)("p",null,"ThingSet defines three types of messages: Requests, responses and statements.",-1),y=(0,a._)("p",null,[(0,a.Uk)("A "),(0,a._)("strong",null,"request"),(0,a.Uk)(" is sent from one device (client) to a single other device (server). The server is expected to answer with a "),(0,a._)("strong",null,"response"),(0,a.Uk)(" containing a status code and optional payload.")],-1),v=(0,a._)("p",null,[(0,a.Uk)("A "),(0,a._)("strong",null,"statement"),(0,a.Uk)(" is a message that is sent without expecting a response or confirmation. It may be sent to a particular device or broadcast through the network to be received by any interested device (publish-subscribe model).")],-1),k=(0,a._)("p",null,"If a device receives a statement, it is considered a proposal to update the values as stated in the message. If all or some of the requested changes are invalid, they are silently ignored, as it is not possible to respond to a statement.",-1),w=(0,a._)("div",{class:"custom-container tip"},[(0,a._)("p",{class:"custom-container-title"},"Idea for evaluation"),(0,a._)("p",null,"After each update of a value via request/response, the device sends out a statement with the updated values. This ensures that also other devices are notified (statements are broadcast on the bus) and it allows to double-check if the value was correctly received or if it was e.g. rounded to the next possible value.")],-1),T=(0,a._)("h3",{id:"request-response-model",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#request-response-model","aria-hidden":"true"},"#"),(0,a.Uk)(" Request-response model")],-1),U=(0,a._)("p",null,"The communication between two specific devices uses a request-response messaging pattern. A connection can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several devices attached (e.g. CAN, Ethernet, WiFi, LoRa). In case of a network, each device has to be uniquely addressable.",-1),C=(0,a._)("p",null,[(0,a._)("img",{src:n,alt:"Communication Channels"})],-1),S=(0,a._)("div",{class:"custom-container warning"},[(0,a._)("p",{class:"custom-container-title"},"ToDo"),(0,a._)("p",null,"Explain hierarchical topology of connected ThingSet nodes and define differences between Nodes, Devices and Gateways.")],-1),x=(0,a._)("p",null,"The client would usually be a display, a mobile phone application or a gateway.",-1),A=(0,a._)("p",null,"The data transfer is always synchronous: The client sends a request and waits until it receives a response before it sends another request to the same device.",-1),I=(0,a._)("h3",{id:"publish-subscribe-model",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#publish-subscribe-model","aria-hidden":"true"},"#"),(0,a.Uk)(" Publish-subscribe model")],-1),M=(0,a._)("p",null,"Monitoring data is not intended for only a single device, but could be interesting for several devices (e.g. data logger and display). Thus, the monitoring data can be exchanged via a publish-subscribe messaging pattern to increase efficiency and avoid polling.",-1),R=(0,a._)("p",null,"In contrast to MQTT, published messages are directly broadcast and there is no intermediate broker to store the messages. Published messages are not confirmed by recipients, so there is no guarantee if the message was received.",-1),q=(0,a._)("p",null,"This model is mainly used for machine-to-machine (M2M) communication, e.g. to store measurements in a database. One dedicated application is the plug-and-play control of multiple energy sources and sinks in a renewable energy system. The details of the implementation are currently still work-in-progress.",-1),B=(0,a._)("h2",{id:"protocol-modes",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#protocol-modes","aria-hidden":"true"},"#"),(0,a.Uk)(" Protocol Modes")],-1),P=(0,a._)("p",null,"Similar to Modbus, the ThingSet protocol supports two different modes: A human-readable text mode and a binary mode.",-1),O=(0,a.Uk)("In the text mode, payload data is encoded in JSON format ("),N={href:"https://tools.ietf.org/html/rfc8259",target:"_blank",rel:"noopener noreferrer"},W=(0,a.Uk)("RFC 8259"),F=(0,a.Uk)("). This mode is recommended when using serial communication interfaces as the low layer protocol, as it can be easily used directly on a terminal."),z=(0,a.Uk)("The binary mode uses CBOR ("),D={href:"https://tools.ietf.org/html/rfc7049",target:"_blank",rel:"noopener noreferrer"},K=(0,a.Uk)("RFC 7049"),L=(0,a.Uk)(") instead of JSON for payload data encoding in order to reduce the protocol overhead for ressource-constrained devices or low bandwith communication via CAN or LoRa."),H=(0,a._)("p",null,"A device may implement both variants of the protocol, but it is also allowed to support only the mode most suitable for the application.",-1),Q=(0,a._)("h2",{id:"device-classes",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#device-classes","aria-hidden":"true"},"#"),(0,a.Uk)(" Device Classes")],-1),G={href:"https://datatracker.ietf.org/doc/html/rfc7228",target:"_blank",rel:"noopener noreferrer"},j=(0,a.Uk)("RFC 7228"),E=(0,a.Uk)(" defines three different classes of constrained devices according to the following table:"),J=(0,a._)("table",null,[(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"Name"),(0,a._)("th",null,"data size (e.g., RAM)"),(0,a._)("th",null,"code size (e.g., Flash)")])]),(0,a._)("tbody",null,[(0,a._)("tr",null,[(0,a._)("td",null,"Class 0, C0"),(0,a._)("td",null,"<< 10 KiB"),(0,a._)("td",null,"<< 100 KiB")]),(0,a._)("tr",null,[(0,a._)("td",null,"Class 1, C1"),(0,a._)("td",null,"~ 10 KiB"),(0,a._)("td",null,"~ 100 KiB")]),(0,a._)("tr",null,[(0,a._)("td",null,"Class 2, C2"),(0,a._)("td",null,"~ 50 KiB"),(0,a._)("td",null,"~ 250 KiB")])])],-1),Y=(0,a._)("p",null,"The ThingSet protocol aims at being suitable for all classes.",-1),V=(0,a._)("p",null,"For class 0 devices and on networks with very low bitrate and payload sizes (CAN, LoRaWAN) it is recommended to use the binary mode with numeric IDs instead of data object names to keep the messages as compact as possible.",-1),X=(0,a.Uk)("If the payload size does not have to be optimized to its very minimum, the binary mode can be used with names instead of IDs (see "),Z=(0,a.Uk)("Binary Mode"),$=(0,a.Uk)(" chapter for more details). The advantage of the binary mode is that no support for floating point numbers for "),ee=(0,a._)("code",null,"printf",-1),te=(0,a.Uk)(" is required, which reduces firmware footprint significantly. This mode is suitable for class 0 and class 1 devices."),se=(0,a._)("p",null,"For most class 1 and class 2 devices, floating-point support will not be an issue, so they might also use the text mode for easier direct interactions with humans. Also gateways should typically support the text mode in order to map ThingSet to other higher-level protocols like HTTP and MQTT.",-1),ae={render:function(e,t){const s=(0,a.up)("OutboundLink"),o=(0,a.up)("RouterLink");return(0,a.wg)(),(0,a.iD)(a.HY,null,[i,(0,a._)("p",null,[r,(0,a._)("a",l,[d,(0,a.Wm)(s)]),c]),h,u,(0,a._)("p",null,[p,(0,a._)("a",m,[g,(0,a.Wm)(s)]),f]),b,_,y,v,k,w,T,U,C,S,x,A,I,M,R,q,B,P,(0,a._)("p",null,[O,(0,a._)("a",N,[W,(0,a.Wm)(s)]),F]),(0,a._)("p",null,[z,(0,a._)("a",D,[K,(0,a.Wm)(s)]),L]),H,Q,(0,a._)("p",null,[(0,a._)("a",G,[j,(0,a.Wm)(s)]),E]),J,Y,V,(0,a._)("p",null,[X,(0,a.Wm)(o,{to:"/spec/v0.5/2c_binary_mode.html"},{default:(0,a.w5)((()=>[Z])),_:1}),$,ee,te]),se],64)}}},3088:(e,t,s)=>{e.exports=s.p+"assets/img/communication_channels.3160ceed.png"},7341:(e,t,s)=>{e.exports=s.p+"assets/img/osi_layers.0b9d7abb.png"}}]);
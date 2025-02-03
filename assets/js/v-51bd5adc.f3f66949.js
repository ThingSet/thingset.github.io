"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[397],{6250:(e,a,t)=>{t.r(a),t.d(a,{data:()=>s});const s={key:"v-51bd5adc",path:"/spec/v0.6/introduction/objectives.html",title:"Objectives",lang:"en",frontmatter:{},excerpt:"",headers:[{level:3,title:"Device Classes",slug:"device-classes",children:[]}],filePathRelative:"spec/v0.6/introduction/objectives.md",git:{updatedTime:1738504364e3}}},7072:(e,a,t)=>{t.r(a),t.d(a,{default:()=>C});var s=t(6252);const o=(0,s.uE)('<h1 id="objectives" tabindex="-1"><a class="header-anchor" href="#objectives" aria-hidden="true">#</a> Objectives</h1><p>The main objectives of ThingSet are described below.</p><h4 id="flexible" tabindex="-1"><a class="header-anchor" href="#flexible" aria-hidden="true">#</a> Flexible</h4><p>As an application layer protocol, it is largely independent of the underlying transport protocols and physical interfaces. For example, it can be used with CAN, USB, WiFi, Bluetooth, a simple serial interface, or emerging interfaces of the future.</p><h4 id="compatible" tabindex="-1"><a class="header-anchor" href="#compatible" aria-hidden="true">#</a> Compatible</h4><p>Easy to integrate with existing protocols such as MQTT or CoAP and based on common data formats such as JSON or CBOR.</p><h4 id="easy-to-use-and-human-readable" tabindex="-1"><a class="header-anchor" href="#easy-to-use-and-human-readable" aria-hidden="true">#</a> Easy to use and human-readable</h4><p>The protocol has a text mode which is human-readable. This allows easy manual device communication via the serial interface. For M2M communication, a more compact binary is available.</p><h4 id="compact-footprint" tabindex="-1"><a class="header-anchor" href="#compact-footprint" aria-hidden="true">#</a> Compact footprint</h4>',9),i=(0,s.Uk)("Implementation and binary data representations are very compact to enable transport via LoRa and CAN. Standard CAN frames allow a payload of only 8 bytes per frame, LoRaWAN allows "),n={href:"https://www.thethingsnetwork.org/forum/t/limitations-data-rate-packet-size-30-seconds-uplink-and-10-messages-downlink-per-day-fair-access-policy/1300",target:"_blank",rel:"noopener noreferrer"},r=(0,s.Uk)("51 bytes"),d=(0,s.Uk)(" of application payload per message."),l=(0,s._)("h4",{id:"schema-less-and-self-explanatory",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#schema-less-and-self-explanatory","aria-hidden":"true"},"#"),(0,s.Uk)(" Schema-less and self-explanatory")],-1),h=(0,s.Uk)("It should be possible to configure and monitor a device without a manual or a configuration file. This means that the protocol needs functions to discover the features and configurable settings of an unknown device. In contrast to other protocols like Modbus, you should not need to know the variable type and register address where a setting is stored. It can be used as a "),c={href:"https://en.wikipedia.org/wiki/Canonical_model",target:"_blank",rel:"noopener noreferrer"},p=(0,s.Uk)("canonical data model"),u=(0,s.Uk)("."),m=(0,s.uE)('<h4 id="stateless" tabindex="-1"><a class="header-anchor" href="#stateless" aria-hidden="true">#</a> Stateless</h4><p>The small devices should not need to handle sessions. Each request stands for its own.</p><h4 id="zero-overhead-api" tabindex="-1"><a class="header-anchor" href="#zero-overhead-api" aria-hidden="true">#</a> Zero-overhead API</h4><p>Strict naming conventions provide sufficient information like units and data types at a minimum of necessary bytes transferred over low bandwidth connections.</p><h3 id="device-classes" tabindex="-1"><a class="header-anchor" href="#device-classes" aria-hidden="true">#</a> Device Classes</h3>',5),f={href:"https://datatracker.ietf.org/doc/html/rfc7228",target:"_blank",rel:"noopener noreferrer"},b=(0,s.Uk)("RFC 7228"),v=(0,s.Uk)(" defines three different classes of constrained devices according to the following table:"),y=(0,s.uE)("<table><thead><tr><th>Name</th><th>data size (e.g., RAM)</th><th>code size (e.g., Flash)</th></tr></thead><tbody><tr><td>Class 0, C0</td><td>&lt;&lt; 10 KiB</td><td>&lt;&lt; 100 KiB</td></tr><tr><td>Class 1, C1</td><td>~ 10 KiB</td><td>~ 100 KiB</td></tr><tr><td>Class 2, C2</td><td>~ 50 KiB</td><td>~ 250 KiB</td></tr></tbody></table><p>The ThingSet protocol aims at being suitable for all classes.</p><p>For class 0 devices and on networks with very low bitrate and payload sizes (CAN, LoRaWAN) it is recommended to use the binary mode with numeric IDs instead of data object names to keep the messages as compact as possible.</p>",3),g=(0,s.Uk)("If the payload size does not have to be optimized to its very minimum, the binary mode can be used with names instead of IDs (see "),k=(0,s.Uk)("Binary Mode"),w=(0,s.Uk)(" chapter for more details). The advantage of the binary mode is that no support for printing floating point numbers is required, which reduces firmware footprint significantly. This mode is suitable for class 0 and class 1 devices."),x=(0,s._)("p",null,"For most class 1 and class 2 devices, floating-point support will not be an issue, so they might also use the text mode for easier direct interactions with humans. Also gateways should typically support the text mode in order to map ThingSet to other higher-level protocols like CoAP and MQTT.",-1),C={render:function(e,a){const t=(0,s.up)("OutboundLink"),C=(0,s.up)("RouterLink");return(0,s.wg)(),(0,s.iD)(s.HY,null,[o,(0,s._)("p",null,[i,(0,s._)("a",n,[r,(0,s.Wm)(t)]),d]),l,(0,s._)("p",null,[h,(0,s._)("a",c,[p,(0,s.Wm)(t)]),u]),m,(0,s._)("p",null,[(0,s._)("a",f,[b,(0,s.Wm)(t)]),v]),y,(0,s._)("p",null,[g,(0,s.Wm)(C,{to:"/spec/v0.6/introduction/2c_binary_mode.html"},{default:(0,s.w5)((()=>[k])),_:1}),w]),x],64)}}}}]);
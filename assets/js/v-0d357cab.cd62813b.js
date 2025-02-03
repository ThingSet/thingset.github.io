"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5607],{724:(e,a,t)=>{t.r(a),t.d(a,{data:()=>n});const n={key:"v-0d357cab",path:"/spec/v0.4/introduction.html",title:"Introduction",lang:"en",frontmatter:{},excerpt:"",headers:[{level:3,title:"Flexible",slug:"flexible",children:[]},{level:3,title:"Compatible",slug:"compatible",children:[]},{level:3,title:"Easy to use and human-readable",slug:"easy-to-use-and-human-readable",children:[]},{level:3,title:"Compact footprint",slug:"compact-footprint",children:[]},{level:3,title:"Schema-less and self-explaining",slug:"schema-less-and-self-explaining",children:[]},{level:3,title:"Stateless",slug:"stateless",children:[]}],filePathRelative:"spec/v0.4/introduction.md",git:{updatedTime:1738504364e3}}},2647:(e,a,t)=>{t.r(a),t.d(a,{default:()=>k});var n=t(6252);const o=(0,n._)("h1",{id:"introduction",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#introduction","aria-hidden":"true"},"#"),(0,n.Uk)(" Introduction")],-1),i=(0,n.Uk)("This specification describes a communication protocol for control, configuration and monitoring of connected devices. It is published under the "),s={href:"https://creativecommons.org/licenses/by-sa/4.0/",target:"_blank",rel:"noopener noreferrer"},r=(0,n.Uk)("CC BY-SA 4.0 License"),l=(0,n.Uk)("."),d=(0,n.uE)('<p>The protocol is called ThingSet - a protocol for <strong>set</strong>tings of <strong>thing</strong>s. The main goals of the protocol are:</p><h3 id="flexible" tabindex="-1"><a class="header-anchor" href="#flexible" aria-hidden="true">#</a> Flexible</h3><p>As an application layer protocol it should be widely independent of the underlying transport protocols and physical interfaces. It can be used with e.g. CAN, USB, WiFi, Bluetooth, a simple serial interface or upcoming interfaces of the future.</p><h3 id="compatible" tabindex="-1"><a class="header-anchor" href="#compatible" aria-hidden="true">#</a> Compatible</h3><p>Easy to integrate with more protocols like CoAP or HTTP and based on common data formats like JSON.</p><h3 id="easy-to-use-and-human-readable" tabindex="-1"><a class="header-anchor" href="#easy-to-use-and-human-readable" aria-hidden="true">#</a> Easy to use and human-readable</h3><p>Similar to Modbus, the protocol should have a text-based mode which is human-readable. This allows easy manual device communication via the serial interface. For M2M communication, a more compact binary mode should be available.</p><h3 id="compact-footprint" tabindex="-1"><a class="header-anchor" href="#compact-footprint" aria-hidden="true">#</a> Compact footprint</h3>',8),c=(0,n.Uk)("Implementation and binary data representations should be very compact to enable transport via LoRa and CAN. Standard CAN frames allow a payload of only 8 bytes per frame, LoRaWAN allows "),h={href:"https://www.thethingsnetwork.org/forum/t/limitations-data-rate-packet-size-30-seconds-uplink-and-10-messages-downlink-per-day-fair-access-policy/1300",target:"_blank",rel:"noopener noreferrer"},p=(0,n.Uk)("51 bytes"),u=(0,n.Uk)(" of application payload per message."),m=(0,n._)("h3",{id:"schema-less-and-self-explaining",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#schema-less-and-self-explaining","aria-hidden":"true"},"#"),(0,n.Uk)(" Schema-less and self-explaining")],-1),f=(0,n._)("p",null,"It should be possible to configure and monitor a device without a manual or a configuration file. This means that the protocol needs functions to discover the features and configurable settings of an unknown device. In contrast to other protocols like Modbus, you should not need to know the variable type and register address where a setting is stored.",-1),b=(0,n._)("h3",{id:"stateless",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#stateless","aria-hidden":"true"},"#"),(0,n.Uk)(" Stateless")],-1),g=(0,n._)("p",null,"The small devices should not need to handle sessions. Each request stands for its own.",-1),k={render:function(e,a){const t=(0,n.up)("OutboundLink");return(0,n.wg)(),(0,n.iD)(n.HY,null,[o,(0,n._)("p",null,[i,(0,n._)("a",s,[r,(0,n.Wm)(t)]),l]),d,(0,n._)("p",null,[c,(0,n._)("a",h,[p,(0,n.Wm)(t)]),u]),m,f,b,g],64)}}}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1115],{1559:(e,t,a)=>{a.r(t),a.d(t,{data:()=>r});const r={key:"v-9d00db7c",path:"/spec/v0.4/transp_serial.html",title:"Serial",lang:"en",frontmatter:{title:"Serial"},excerpt:"",headers:[{level:2,title:"UART",slug:"uart",children:[]},{level:2,title:"USB",slug:"usb",children:[]},{level:2,title:"Bluetooth",slug:"bluetooth",children:[]}],filePathRelative:"spec/v0.4/transp_serial.md",git:{updatedTime:1686213394e3}}},6098:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var r=a(6252);const i=(0,r._)("h1",{id:"serial",tabindex:"-1"},[(0,r._)("a",{class:"header-anchor",href:"#serial","aria-hidden":"true"},"#"),(0,r.Uk)(" Serial")],-1),s=(0,r._)("p",null,"The serial interface can be a hardware UART interface directly with a microcontroller a virtual serial via USB or Bluetooth.",-1),n=(0,r._)("h2",{id:"uart",tabindex:"-1"},[(0,r._)("a",{class:"header-anchor",href:"#uart","aria-hidden":"true"},"#"),(0,r.Uk)(" UART")],-1),o=(0,r._)("p",null,"As serial communication to a microcontroller via UART does not provide any error checking, a CRC checksum is appended to each message in the text mode.",-1),l=(0,r.Uk)("The following extensions for the grammar as described in "),c=(0,r.Uk)("Text Mode chapter"),h=(0,r.Uk)(" are used:"),d=(0,r._)("pre",null,[(0,r._)("code",null,'thingset-msg  = ( request / response / pub-msg )\n\nthingset-uart = thingset-msg end\n\nend = [ " " checksum ] [ CR ] LF\n\nchecksum = 8( hex )                         ; CRC-32, hex always upper case\n')],-1),u=(0,r.Uk)("The CRC checksum is calculated over the entire thingset-msg as defined above. The same CRC-32 polynom 0x04C11DB7 as for "),p={href:"https://en.wikipedia.org/wiki/Cyclic_redundancy_check",target:"_blank",rel:"noopener noreferrer"},m=(0,r.Uk)("Ethernet and many other protocols"),f=(0,r.Uk)(" is used."),v=(0,r.uE)('<p>The CRC is optional so that it is still possible to interact with the device by humans using a terminal. However, the device should always calculate the CRC and in case of M2M communication, the client should check the CRC and also provide a CRC for requests to increase reliability.</p><p>The baudrate of the serial interface is fixed to 115200 bps.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>The binary protocol mode is curently not supported via simple serial interfaces, as it would require some way to determine the end of a message.</p></div><h2 id="usb" tabindex="-1"><a class="header-anchor" href="#usb" aria-hidden="true">#</a> USB</h2><p>USB supports a virtual COM port via the CDC ACM device class.</p><p>If the USB interface is directly provided by the microcontroller, the checksum as for the UART interface is not needed, USB already provides error-checking in that case.</p><p>If a USB-to-UART converter (e.g. FTDI) is used to interact with the device, this is not considered a &quot;virtual serial interface&quot;, as there is still a physical UART interface used between the converter and the device. Thus, checksums should be used.</p><h2 id="bluetooth" tabindex="-1"><a class="header-anchor" href="#bluetooth" aria-hidden="true">#</a> Bluetooth</h2><p>For Bluetooth, the Serial Port Profile (SPP) is used to simulate a serial interface.</p><p>For CRC checksums the same rules apply as for USB.</p>',10),b={render:function(e,t){const a=(0,r.up)("RouterLink"),b=(0,r.up)("OutboundLink");return(0,r.wg)(),(0,r.iD)(r.HY,null,[i,s,n,o,(0,r._)("p",null,[l,(0,r.Wm)(a,{to:"/spec/v0.4/2b_text_mode.html"},{default:(0,r.w5)((()=>[c])),_:1}),h]),d,(0,r._)("p",null,[u,(0,r._)("a",p,[m,(0,r.Wm)(b)]),f]),v],64)}}}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7849],{4391:(e,t,a)=>{a.r(t),a.d(t,{data:()=>s});const s={key:"v-a6a4665c",path:"/spec/v0.6/transports/serial.html",title:"Serial",lang:"en",frontmatter:{title:"Serial"},excerpt:"",headers:[{level:2,title:"UART",slug:"uart",children:[]},{level:2,title:"USB",slug:"usb",children:[]},{level:2,title:"Bluetooth",slug:"bluetooth",children:[]}],filePathRelative:"spec/v0.6/transports/serial.md",git:{updatedTime:170759614e4}}},606:(e,t,a)=>{a.r(t),a.d(t,{default:()=>k});var s=a(6252);const i=(0,s._)("h1",{id:"serial",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#serial","aria-hidden":"true"},"#"),(0,s.Uk)(" Serial")],-1),r=(0,s._)("p",null,"The serial interface can be a hardware UART interface directly with a microcontroller a virtual serial via USB or Bluetooth.",-1),o=(0,s._)("h2",{id:"uart",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#uart","aria-hidden":"true"},"#"),(0,s.Uk)(" UART")],-1),l=(0,s._)("p",null,"As serial communication to a microcontroller via UART does not provide any error checking, a CRC checksum is appended to each message in the text mode.",-1),n=(0,s.Uk)("The following extensions for the grammar as described in "),c=(0,s.Uk)("Text Mode chapter"),h=(0,s.Uk)(" are used:"),d=(0,s._)("pre",null,[(0,s._)("code",null,'thingset-msg  = ( txt-request / txt-response / txt-report / txt-desire )\n\nthingset-uart = thingset-msg end\n\nend = [ " " checksum "#" ] [ CR ] LF\n\nchecksum = 8( DIGIT / %x41-46 )      ; CRC-32 as HEXDIGs (always upper case)\n')],-1),u=(0,s.Uk)("The CRC checksum is calculated over the entire thingset-msg as defined above. The same CRC-32 polynom 0x04C11DB7 as for "),p={href:"https://en.wikipedia.org/wiki/Cyclic_redundancy_check",target:"_blank",rel:"noopener noreferrer"},m=(0,s.Uk)("Ethernet and many other protocols"),f=(0,s.Uk)(" is used."),b=(0,s.uE)('<p>The hash sign <code>#</code> at the end of the checksum allows to detect easily whether the message contains a checksum or not by checking the last character of the message.</p><p>The CRC is optional so that it is still possible to interact with the device by humans using a terminal. However, the device should always calculate the CRC and in case of M2M communication, the client should check the CRC and also provide a CRC for requests to increase reliability.</p><p>The following UART settings must be used:</p><ul><li>Baudrate: <code>115200 bps</code></li><li>Data bits: <code>8</code></li><li>Parity: <code>None</code></li><li>Stop bits: <code>1</code></li></ul><p>No parity bit is used, as parity bits don&#39;t help to detect missed characters, which is a common failure mode in embedded systems with small buffers. The CRC detects missed and wrong characters.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>The binary protocol mode is curently not supported via simple serial interfaces, as it would require some way to determine the end of a message.</p></div><h2 id="usb" tabindex="-1"><a class="header-anchor" href="#usb" aria-hidden="true">#</a> USB</h2><p>USB supports a virtual COM port via the CDC ACM device class.</p><p>If the USB interface is directly provided by the microcontroller, the checksum as for the UART interface is not needed, USB already provides error-checking in that case.</p><p>If a USB-to-UART converter (e.g. FTDI) is used to interact with the device, this is not considered a &quot;virtual serial interface&quot;, as there is still a physical UART interface used between the converter and the device. Thus, checksums should be used.</p><h2 id="bluetooth" tabindex="-1"><a class="header-anchor" href="#bluetooth" aria-hidden="true">#</a> Bluetooth</h2><p>For Bluetooth, the Serial Port Profile (SPP) is used to simulate a serial interface.</p><p>For CRC checksums the same rules apply as for USB.</p>',13),k={render:function(e,t){const a=(0,s.up)("RouterLink"),k=(0,s.up)("OutboundLink");return(0,s.wg)(),(0,s.iD)(s.HY,null,[i,r,o,l,(0,s._)("p",null,[n,(0,s.Wm)(a,{to:"/spec/v0.6/transports/appl_text_mode.html"},{default:(0,s.w5)((()=>[c])),_:1}),h]),d,(0,s._)("p",null,[u,(0,s._)("a",p,[m,(0,s.Wm)(k)]),f]),b],64)}}}}]);
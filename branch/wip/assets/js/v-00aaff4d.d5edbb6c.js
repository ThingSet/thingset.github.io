"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[454],{9242:(e,t,a)=>{a.r(t),a.d(t,{data:()=>i});const i={key:"v-00aaff4d",path:"/spec/v0.5/transp_can.html",title:"CAN",lang:"en",frontmatter:{title:"CAN"},excerpt:"",headers:[{level:2,title:"General features",slug:"general-features",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout",children:[]}]},{level:2,title:"Service message",slug:"service-message",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout-1",children:[]},{level:3,title:"Transport protocol (ISO 15765-2)",slug:"transport-protocol-iso-15765-2",children:[]},{level:3,title:"Remarks regarding existing transport protocols",slug:"remarks-regarding-existing-transport-protocols",children:[]}]},{level:2,title:"Publication message",slug:"publication-message",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout-2",children:[]},{level:3,title:"CAN data format",slug:"can-data-format",children:[]}]},{level:2,title:"Physical layer",slug:"physical-layer",children:[{level:3,title:"Bit rate",slug:"bit-rate",children:[]},{level:3,title:"Connector",slug:"connector",children:[]}]}],filePathRelative:"spec/v0.5/transp_can.md",git:{updatedTime:1642774965e3}}},1297:(e,t,a)=>{a.r(t),a.d(t,{default:()=>S});var i=a(6252);const r=(0,i.uE)('<h1 id="can-transport-and-network-layer" tabindex="-1"><a class="header-anchor" href="#can-transport-and-network-layer" aria-hidden="true">#</a> CAN Transport and Network Layer</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>The CAN bus part of the ThingSet protocol is still in an early stage and may change in the future.</p></div><p>This specification defines layer 3 (Network) and 4 (Transport) of the ThingSet Protocol via CAN bus. Layer 1 and 2 are provided by the CAN bus itself.</p><p>Only the binary messages of the ThingSet Protocol are supported via CAN.</p><h2 id="general-features" tabindex="-1"><a class="header-anchor" href="#general-features" aria-hidden="true">#</a> General features</h2><ul><li>Master-less operation</li><li>Automatic node ID assignment</li><li>Efficient useage of CAN ID and data bytes</li><li>Transport protocol to allow payload of more than 8 bytes</li><li>Two different types of messages for application layer <ul><li>Service message (request/response)</li><li>Publication message (publish/subscribe)</li></ul></li><li>RTR frame is not allowed</li><li>Fixed bitrate of 250 kbit</li></ul><h3 id="can-identifier-layout" tabindex="-1"><a class="header-anchor" href="#can-identifier-layout" aria-hidden="true">#</a> CAN identifier layout</h3><p>In the CAN bus, the identifier part of the CAN frame is used for arbitration and identification of the message type. Typically, it does not define the sender or receiver of the message, but the content of the message.</p><p>For a network with connected ThingSet devices, the layout of the CAN identifier is similar to the SAE J1939 specification. Parts of the identifier define the source and destination address of the message. In addition to that, the first three bits are used to prioritize the messages.</p><p>Two general types of messages are specified: Service message and publication message. Only CAN extended IDs with a size of 29 bit are used.</p><h2 id="service-message" tabindex="-1"><a class="header-anchor" href="#service-message" aria-hidden="true">#</a> Service message</h2><p>A service message is used for the request/response messaging pattern. A single byte each for source and destination node address are defined as part of the CAN ID to identify sender and receiver of the message.</p><h3 id="can-identifier-layout-1" tabindex="-1"><a class="header-anchor" href="#can-identifier-layout-1" aria-hidden="true">#</a> CAN identifier layout</h3><p>The service message addressing in 29-bit CAN ID is similar to SAE J1939:</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25</th><th style="text-align:center;">24</th><th style="text-align:center;">23 .. 16</th><th style="text-align:center;">15 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">reserved (0xDA)</td><td style="text-align:center;">Target address</td><td style="text-align:center;">Source address</td></tr></tbody></table><ul><li>Priority (28-26): Defines the importance of the message. For service messages, only 3 (high priority) or 7 (low priority) are valid.</li><li>Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus</li><li>Message type (24): 0b for service message</li><li>Reserved (23-16): Set to 218 (0xDA) as suggested by ISO-TP standard (ISO 15765-2) for normal fixed addressing with N_TAtype = physical</li><li>Target address (15-8): Destination node address</li><li>Source address (7-0): Source node address (255 for anonymous message during address claiming)</li></ul><h3 id="transport-protocol-iso-15765-2" tabindex="-1"><a class="header-anchor" href="#transport-protocol-iso-15765-2" aria-hidden="true">#</a> Transport protocol (ISO 15765-2)</h3>',17),n=(0,i.Uk)("In order to transfer data with a length of more than 8 bytes, the transfer protocol specified in "),s={href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"},o=(0,i.Uk)("ISO 15765-2 (ISO-TP)"),d=(0,i.Uk)(" is used."),l=(0,i._)("p",null,"It allows a maximum number of 4095 data bytes (defined by 12 bit unsigned int length code in first frame). Flow control mechanisms ensure the reliability of data reception.",-1),h=(0,i._)("p",null,"As a very important feature, ISO-TP allows the efficient transfer of single-frame messages with only one byte of overhead (and no flow control packets). This feature is necessary, as it is not known in advance if a certain function of the ThingSet protocol will transfer only a few bytes or a large amount of data.",-1),c=(0,i.Uk)("The ISO-TP standard is not accessible for free. However, several open source implementations (including "),p={href:"https://github.com/hartkopp/can-isotp",target:"_blank",rel:"noopener noreferrer"},f=(0,i.Uk)("SocketCAN for Linux"),u=(0,i.Uk)(") of the ISO-TP are available. Most important information about the frame layout can be found on "),g={href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"},m=(0,i.Uk)("Wikipedia"),y=(0,i.Uk)("."),b=(0,i.uE)('<h4 id="single-frame-message-request-response" tabindex="-1"><a class="header-anchor" href="#single-frame-message-request-response" aria-hidden="true">#</a> Single-frame message request/response</h4><p>Application protocol data of 7 bytes or lower can be transferred using a single CAN frame. The first byte of the CAN data contains the ISO-TP header for a single-frame message. Bytes 2 to n (with n &lt;= 7) are contained in the remaining data bytes of the CAN frame.</p><table><thead><tr><th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th></tr></thead><tbody><tr><td>ISO-TP header</td><td>Application protocol (byte 1)</td><td>...</td><td>Application protocol (byte 7)</td></tr></tbody></table><h4 id="multi-frame-message-request-response" tabindex="-1"><a class="header-anchor" href="#multi-frame-message-request-response" aria-hidden="true">#</a> Multi-frame message request/response</h4><p>More than 7 bytes of application protocol data are sent as multi-frame messages.</p><p>The first message contains two bytes for the ISO-TP header (including the total message length).</p><table><thead><tr><th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>...</th><th>Byte 8</th></tr></thead><tbody><tr><td colspan="2">ISO-TP header</td><td>Application protocol (byte 1)</td><td>...</td><td>Application protocol (byte 6)</td></tr></tbody></table><p>Consecutive messages i = 2...585 consume only one byte for the ISO-TP header:</p><table><thead><tr><th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th></tr></thead><tbody><tr><td>ISO-TP header</td><td>Application protocol (byte (i-1)*7)</td><td>...</td><td>Application protocol (byte i*7-1)</td></tr></tbody></table><h3 id="remarks-regarding-existing-transport-protocols" tabindex="-1"><a class="header-anchor" href="#remarks-regarding-existing-transport-protocols" aria-hidden="true">#</a> Remarks regarding existing transport protocols</h3><p>Several other transport protocols for CAN have been defined in different standards.</p><p>For the J1939 protocol, the transport protocol is specified in the standard <strong>SAE J1939-21</strong>. Two types of transport protocol are defined: The Connection Mode Data Transfer (CMDT) and the Broadcast Announce Message (BAM). CMDT is used to exchange data between two nodes. It includes methods for flow control and handshake. BAM is more simple and broadcasts a multi-packet message to the bus without feedback if the message was received.</p><p>CMDT and BAM allow to transfer 9 to 1785 bytes (255 packets * 7 bytes) of payload. It is not allowed to transfer 0 to 8 bytes using the J1939 transport protocols. Thus, we need to know before if a message needs the mechanisms of the transport protocol or not. This is not possible for the flexible ThingSet protocol, as the same functions might transfer either very little data (e.g. write 16-bit integer) or a large amount of data (e.g. write multiple values or strings). Data with less than 9 bytes would have to be stuffed, making the protocol very inefficient. A message which could fit into a single CAN frame would need 5 frames (including flow control) when using CMDT and stuffing.</p><p>The <strong>RV-C</strong> standard defines a different transport protocol than SAE J1939, which also allows the transfer of up to 1785 bytes. However, is does not specify any flow control mechanisms at all. So it is not possible to determine if a message was received even for a communication between only two nodes, which is not acceptable.</p><p>NMEA 2000 uses the same transport protocol as the SAE J1939 protocol. In addition to that, it defines a so-called fast packet protocol. With <strong>NMEA 2000 fast packet protocol</strong>, 223 bytes can be transferred without flow control, thus, making it more efficient and &quot;fast&quot;.</p><p>With the fast packet protocol, a single frame transfer is possible. However, a single frame message consumes 2 out of 8 bytes for the fast packet header information. This is considered too high overhead if it is unknown whether a single or multi-frame message has to be used.</p><p>Overview of different CAN based transport protocols:</p><table><thead><tr><th></th><th style="text-align:center;">ISO-TP</th><th style="text-align:center;">NMEA 2000<br>fast packet</th><th style="text-align:center;">SAE J1939-21</th><th style="text-align:center;">RV-C</th></tr></thead><tbody><tr><td>Number of data bytes</td><td style="text-align:center;">0..4095</td><td style="text-align:center;">0..223</td><td style="text-align:center;">9..1785</td><td style="text-align:center;">9..1785</td></tr><tr><td>Flow control</td><td style="text-align:center;">yes</td><td style="text-align:center;">no</td><td style="text-align:center;">yes</td><td style="text-align:center;">no</td></tr><tr><td>Efficient single frame</td><td style="text-align:center;">yes</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td></tr><tr><td>Open standard</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td><td style="text-align:center;">yes</td></tr></tbody></table><h2 id="publication-message" tabindex="-1"><a class="header-anchor" href="#publication-message" aria-hidden="true">#</a> Publication message</h2><p>The publication message provides a very efficient way to send data in a regular interval using a single CAN frame without the overhead of a transport protocol. The publication messages are mainly intended for monitoring purposes.</p><h3 id="can-identifier-layout-2" tabindex="-1"><a class="header-anchor" href="#can-identifier-layout-2" aria-hidden="true">#</a> CAN identifier layout</h3><p>Publication messages are not sent to a single node, so the destination address does not need to be specified. Instead, the data object ID is specified directly in the CAN identifier to have more bytes available for payload in the data section of the CAN frame.</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25</th><th style="text-align:center;">24</th><th style="text-align:center;">23 .. 16</th><th style="text-align:center;">15 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority</td><td style="text-align:center;">1</td><td style="text-align:center;">1</td><td style="text-align:center;">Data object ID (MSB)</td><td style="text-align:center;">Data object ID (LSB)</td><td style="text-align:center;">Source address</td></tr></tbody></table><ul><li>Priority (28-26): Defines the importance of the message. For publication messages, only 4 (high priority), 5 (medium priority) and 6 (low priority) are valid.</li><li>Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus</li><li>Message type (24): 1b for publication message</li><li>Data object ID (23-8): Data object ID as a 16-bit unsigned integer. The most significant byte is stored first (bits 23 to 16).</li><li>Source address (7-0): Source node address (255 for anonymous message during address claiming)</li></ul><p>The data object ID is not encoded in the CBOR format, but as a raw 16-bit unsigned integer. The publication messages are limited to IDs that fit into 16 bits.</p><p>IDs &gt;= 0x8000 are fixed and reserved for control messages, so the CAN filter can be configured to distinguish between normal data ojbects and (high priority) control messages.</p><h3 id="can-data-format" tabindex="-1"><a class="header-anchor" href="#can-data-format" aria-hidden="true">#</a> CAN data format</h3><p>The data section of the CAN frame contains the CBOR-encoded value of the data object with the specified ID.</p><p>In order to acquire real-time measurement values, a 16-bit timestamp (unsigned int) can be appended to the CBOR-encoded value. The timestamp contains the 16 least significant bits of the microcontroller&#39;s system clock in milliseconds. It is a rolling counter and restarts at 0 after an overflow. The timestamp cannot be used to determine the absolute time of a measurement, but the time difference between subsequent measurements. This is important to obtain correct sampling of time-series data if higher priority messages cause a delay of the data delivery on the bus.</p><p>The maximum length of the value and the optional timestamp is defined by the maximum data section size of the CAN frame (8 bytes for classic CAN).</p><h2 id="physical-layer" tabindex="-1"><a class="header-anchor" href="#physical-layer" aria-hidden="true">#</a> Physical layer</h2><h3 id="bit-rate" tabindex="-1"><a class="header-anchor" href="#bit-rate" aria-hidden="true">#</a> Bit rate</h3><p>ThingSet uses a fixed bit rate of 500 kbit/s, which supports a maximum bus length of 100 m according to CiA 301.</p><h3 id="connector" tabindex="-1"><a class="header-anchor" href="#connector" aria-hidden="true">#</a> Connector</h3><p>Standard RJ45 jacks as used for Ethernet are also used as the default for ThingSet via CAN. The cables should be Cat 5e twisted pair or better, allowing reliable communication with easily available parts.</p><p>The pinout of the connector is similar to the CANopen specification:</p><table><thead><tr><th>Pin #</th><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>1</td><td>CAN_H</td><td>CAN bus high signal</td></tr><tr><td>2</td><td>CAN_L</td><td>CAN bus low signal</td></tr><tr><td>3</td><td>GND</td><td>CAN and power supply GND (optional)</td></tr><tr><td>4</td><td>V+</td><td>Bus power supply (optional, 12-24V nominal)</td></tr><tr><td>5</td><td>V+</td><td>Bus power supply (optional, 12-24V nominal)</td></tr><tr><td>6</td><td>-</td><td>reserved (do not connect)</td></tr><tr><td>7</td><td>GND</td><td>CAN and power supply GND (optional)</td></tr><tr><td>8</td><td>(V+)</td><td>Unconnected by default, optional jumper to V+</td></tr></tbody></table><p>The pinout specification aims to create as little interference with existing standards as possible. Most important, any damage must be prevented if a device is accidentally connected to a standard Ethernet jack.</p>',38),w=(0,i.Uk)("In contrast to the CANopen specification, pin 8 is not used as the bus power supply (V+) by default. 10/100 MBit Ethernet jacks with integrated magnetics (e.g. "),v={href:"https://katalog.we-online.de/pbs/download/Tutorials_Connecting+LAN+Transformers_EN+%28rev1%29.pdf",target:"_blank",rel:"noopener noreferrer"},A=(0,i.Uk)("these ones"),x=(0,i.Uk)(") internally connect pin 4 to 5 and pin 7 to 8. In addition to that, Power over Ethernet (PoE) uses pins 4+5 for positive power rail and pins 7+8 for GND. So it's not ideal to use pin 7 as GND and pin 8 as V+. Boards can however offer a jumper to connect pin 8 with the other V+ pins (4 and 5) for bus supply of CANopen devices."),T=(0,i._)("p",null,"Galvanic isolation is not required, as long as all devices are connected via thick wires. This might change in the future.",-1),N=(0,i._)("p",null,"One device typically has 2 RJ45 jacks for daisy-chaining the devices and maintaining the bus topology. There is no such thing like a switch needed. However, the endpoints have to be terminated with termination plugs or resistors.",-1),C=(0,i._)("p",null,"A device that supplies power to V+ may not hard-connect the daisy-chained wires without any fuses in order to ensure that the current rating per wire is not exceeded. Devices without power supply may just route through the powered wires.",-1),k=(0,i._)("p",null,"The maximum current per wire pair is 600 mA (300 mA per wire), same as PoE+ (IEEE 802.3at Type 2) with Cat 5e cables.",-1),S={render:function(e,t){const a=(0,i.up)("OutboundLink");return(0,i.wg)(),(0,i.iD)(i.HY,null,[r,(0,i._)("p",null,[n,(0,i._)("a",s,[o,(0,i.Wm)(a)]),d]),l,h,(0,i._)("p",null,[c,(0,i._)("a",p,[f,(0,i.Wm)(a)]),u,(0,i._)("a",g,[m,(0,i.Wm)(a)]),y]),b,(0,i._)("p",null,[w,(0,i._)("a",v,[A,(0,i.Wm)(a)]),x]),T,N,C,k],64)}}}}]);
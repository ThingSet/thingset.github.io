"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2992],{5960:(e,t,a)=>{a.r(t),a.d(t,{data:()=>r});const r={key:"v-fba11e88",path:"/spec/v0.6/transports/can.html",title:"CAN",lang:"en",frontmatter:{title:"CAN"},excerpt:"",headers:[{level:2,title:"General features",slug:"general-features",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout",children:[]}]},{level:2,title:"Request/response messages",slug:"request-response-messages",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout-1",children:[]},{level:3,title:"Transport protocol (ISO 15765-2)",slug:"transport-protocol-iso-15765-2",children:[]},{level:3,title:"Remarks regarding existing transport protocols",slug:"remarks-regarding-existing-transport-protocols",children:[]}]},{level:2,title:"Multi-frame reports",slug:"multi-frame-reports",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout-2",children:[]},{level:3,title:"CAN data format",slug:"can-data-format",children:[]}]},{level:2,title:"Single-frame reports",slug:"single-frame-reports",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout-3",children:[]},{level:3,title:"CAN data format",slug:"can-data-format-1",children:[]}]},{level:2,title:"Network management",slug:"network-management",children:[{level:3,title:"Description of the approach",slug:"description-of-the-approach",children:[]},{level:3,title:"Considered alternatives",slug:"considered-alternatives",children:[]}]},{level:2,title:"Physical layer",slug:"physical-layer",children:[{level:3,title:"Bit rate",slug:"bit-rate",children:[]},{level:3,title:"Connector",slug:"connector",children:[]}]}],filePathRelative:"spec/v0.6/transports/can.md",git:{updatedTime:1709745994e3}}},4092:(e,t,a)=>{a.r(t),a.d(t,{default:()=>G});var r=a(6252);const s=(0,r.uE)('<h1 id="can-transport-and-network-layer" tabindex="-1"><a class="header-anchor" href="#can-transport-and-network-layer" aria-hidden="true">#</a> CAN Transport and Network Layer</h1><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>The CAN bus part of the ThingSet protocol is still in an early stage and may change in the future.</p></div><p>This specification defines layer 3 (Network) and 4 (Transport) of the ThingSet Protocol via CAN bus. Layer 1 and 2 are provided by the CAN bus itself.</p><h2 id="general-features" tabindex="-1"><a class="header-anchor" href="#general-features" aria-hidden="true">#</a> General features</h2><ul><li>Master-less operation</li><li>Automatic node ID assignment without central instance</li><li>Efficient useage of CAN ID and data bytes</li><li>Transport protocol to allow payload of more than 8 bytes (classical CAN) or 64 bytes (CAN FD)</li><li>RTR frame is not allowed</li><li>Fixed bitrate of 500 kbit/s (arbitration and data phase for classical CAN) and 2 Mbit/s (data phase for CAN FD)</li></ul><h3 id="can-identifier-layout" tabindex="-1"><a class="header-anchor" href="#can-identifier-layout" aria-hidden="true">#</a> CAN identifier layout</h3><p>In the CAN bus, the identifier part of the CAN frame is used for arbitration and identification of the message type. Typically, it does not define the sender or receiver of the message, but the content of the message.</p><p>For a network with connected ThingSet nodes, the layout of the CAN identifier is similar to the SAE J1939 specification. Parts of the identifier define the source and destination address of the message. In addition to that, the first three bits are used to prioritize the messages.</p><p>The node address can be in the range of <code>0x00</code> to <code>0xFD</code> (253). Node addresses <code>0xFE</code> and <code>0xFF</code> are reserved for network management purposes (see below). Address <code>0x00</code> is reserved for gateways. Normal nodes on the bus should use addresses between <code>0x01</code> and <code>0xFD</code>.</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25 .. 24</th><th style="text-align:center;">23 .. 16</th><th style="text-align:center;">15 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority</td><td style="text-align:center;">Type</td><td style="text-align:center;">Variable byte</td><td style="text-align:center;">Variable byte</td><td style="text-align:center;">Source address</td></tr></tbody></table><p>There are four different CAN frame types defined for ThingSet:</p><ul><li><code>0x0</code>: <a href="#request-response-messages">Request/response messages</a></li><li><code>0x1</code>: <a href="#multi-frame-reports">Multi-frame reports</a></li><li><code>0x2</code>: <a href="#single-frame-reports">Single-frame reports</a></li><li><code>0x3</code>: <a href="#network-management">Network management</a></li></ul><p>The variable bytes have a different meaning depending on the frame type.</p><p>It may be possible to exchange ThingSet messages on the same bus with SAE J1939 (using type <code>0x0</code>) or NMEA2000 (using type <code>0x1</code>) if device addresses are chosen carefully. However, ThingSet is not meant to be compatible with mentioned protocols.</p><p>Only CAN extended IDs with a size of 29 bit are used, so it should be possible to use ThingSet together with protocols using standard IDs (e.g. CANopen) on the same bus.</p><h2 id="request-response-messages" tabindex="-1"><a class="header-anchor" href="#request-response-messages" aria-hidden="true">#</a> Request/response messages</h2><p>Channel-based communication between two nodes use the frame type <code>0x0</code>. A single byte each for source and destination node address are defined as part of the CAN ID to identify sender and receiver of the message.</p><p>A request/response message can be routed to different physical buses by a gateway. The 4-bit target and source bus numbers are encoded as part of the CAN ID. There is no automatic bus ID claiming procedure specified. Instead, the bus number has to be manually configured (or hard-coded). For single-bus systems it is <code>0x0</code>.</p><h3 id="can-identifier-layout-1" tabindex="-1"><a class="header-anchor" href="#can-identifier-layout-1" aria-hidden="true">#</a> CAN identifier layout</h3><p>The request/response message addressing in the 29-bit CAN ID is similar to SAE J1939:</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25 .. 24</th><th style="text-align:center;">23 .. 20</th><th style="text-align:center;">19 .. 16</th><th style="text-align:center;">15 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority: <code>0x6</code></td><td style="text-align:center;">Type: <code>0x0</code></td><td style="text-align:center;">Target bus</td><td style="text-align:center;">Source bus</td><td style="text-align:center;">Target address</td><td style="text-align:center;">Source address</td></tr></tbody></table><ul><li>Priority (28-26): Defines the importance of the message. For request/response messages, only priority 6 is valid.</li><li>Type (25-24): 0x0 for request/response message</li><li>Target bus (23-20): Bus number of the target device (default for single bus systems is <code>0x0</code>).</li><li>Source bus (19-16): Bus number of the source device (default for single bus systems is <code>0x0</code>).</li><li>Target address (15-8): Destination node address (<code>0x00</code> to <code>0xFD</code>)</li><li>Source address (7-0): Source node address (<code>0x00</code> to <code>0xFD</code>)</li></ul><h3 id="transport-protocol-iso-15765-2" tabindex="-1"><a class="header-anchor" href="#transport-protocol-iso-15765-2" aria-hidden="true">#</a> Transport protocol (ISO 15765-2)</h3>',23),i=(0,r.Uk)("In order to transfer data with a length of more than 8 bytes, the transfer protocol specified in "),n={href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"},o=(0,r.Uk)("ISO 15765-2 (ISO-TP)"),d=(0,r.Uk)(" is used."),l=(0,r._)("p",null,"It allows a maximum number of 4095 data bytes (defined by 12 bit unsigned int length code in first frame). Flow control mechanisms ensure the reliability of data reception.",-1),h=(0,r._)("p",null,"As a very important feature, ISO-TP allows the efficient transfer of single-frame messages with only one byte of overhead (and no flow control packets). This feature is necessary, as it is not known in advance if a certain function of the ThingSet protocol will transfer only a few bytes or a large amount of data.",-1),c=(0,r.Uk)("The ISO-TP standard is not accessible for free. However, several open source implementations (including "),p={href:"https://github.com/hartkopp/can-isotp",target:"_blank",rel:"noopener noreferrer"},f=(0,r.Uk)("SocketCAN for Linux"),u=(0,r.Uk)(") of the ISO-TP are available. Most important information about the frame layout can be found on "),m={href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"},g=(0,r.Uk)("Wikipedia"),y=(0,r.Uk)("."),b=(0,r.uE)('<h4 id="single-frame-message-request-response" tabindex="-1"><a class="header-anchor" href="#single-frame-message-request-response" aria-hidden="true">#</a> Single-frame message request/response</h4><p>Application protocol data of 7 bytes or lower can be transferred using a single CAN frame. The first byte of the CAN data contains the ISO-TP header for a single-frame message. Bytes 2 to n (with n &lt;= 7) are contained in the remaining data bytes of the CAN frame.</p><table><thead><tr><th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th></tr></thead><tbody><tr><td>ISO-TP header</td><td>Application protocol (byte 1)</td><td>...</td><td>Application protocol (byte 7)</td></tr></tbody></table><h4 id="multi-frame-message-request-response" tabindex="-1"><a class="header-anchor" href="#multi-frame-message-request-response" aria-hidden="true">#</a> Multi-frame message request/response</h4><p>More than 7 bytes of application protocol data are sent as multi-frame messages.</p><p>The first message contains two bytes for the ISO-TP header (including the total message length).</p><table><thead><tr><th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>...</th><th>Byte 8</th></tr></thead><tbody><tr><td colspan="2">ISO-TP header</td><td>Application protocol (byte 1)</td><td>...</td><td>Application protocol (byte 6)</td></tr></tbody></table><p>Consecutive messages i = 2...585 consume only one byte for the ISO-TP header:</p><table><thead><tr><th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th></tr></thead><tbody><tr><td>ISO-TP header</td><td>Application protocol (byte (i-1)*7)</td><td>...</td><td>Application protocol (byte i*7-1)</td></tr></tbody></table><h3 id="remarks-regarding-existing-transport-protocols" tabindex="-1"><a class="header-anchor" href="#remarks-regarding-existing-transport-protocols" aria-hidden="true">#</a> Remarks regarding existing transport protocols</h3><p>Several other transport protocols for CAN have been defined in different standards.</p><p>For the J1939 protocol, the transport protocol is specified in the standard <strong>SAE J1939-21</strong>. Two types of transport protocol are defined: The Connection Mode Data Transfer (CMDT) and the Broadcast Announce Message (BAM). CMDT is used to exchange data between two nodes. It includes methods for flow control and handshake. BAM is more simple and broadcasts a multi-packet message to the bus without feedback if the message was received.</p><p>CMDT and BAM allow to transfer 9 to 1785 bytes (255 packets * 7 bytes) of payload. It is not allowed to transfer 0 to 8 bytes using the J1939 transport protocols. Thus, we need to know before if a message needs the mechanisms of the transport protocol or not. This is not possible for the flexible ThingSet protocol, as the same functions might transfer either very little data (e.g. write 16-bit integer) or a large amount of data (e.g. write multiple values or strings). Data with less than 9 bytes would have to be stuffed, making the protocol very inefficient. A message which could fit into a single CAN frame would need 5 frames (including flow control) when using CMDT and stuffing.</p><p>The <strong>RV-C</strong> standard defines a different transport protocol than SAE J1939, which also allows the transfer of up to 1785 bytes. However, is does not specify any flow control mechanisms at all. So it is not possible to determine if a message was received even for a communication between only two nodes, which is not acceptable.</p><p>NMEA 2000 uses the same transport protocol as the SAE J1939 protocol. In addition to that, it defines a so-called fast packet protocol. With <strong>NMEA 2000 fast packet protocol</strong>, 223 bytes can be transferred without flow control, thus, making it more efficient and &quot;fast&quot;.</p><p>With the fast packet protocol, a single frame transfer is possible. However, a single frame message consumes 2 out of 8 bytes for the fast packet header information. This is considered too high overhead if it is unknown whether a single or multi-frame message has to be used.</p><p>Overview of different CAN based transport protocols:</p><table><thead><tr><th></th><th style="text-align:center;">ISO-TP</th><th style="text-align:center;">NMEA 2000<br>fast packet</th><th style="text-align:center;">SAE J1939-21</th><th style="text-align:center;">RV-C</th></tr></thead><tbody><tr><td>Number of data bytes</td><td style="text-align:center;">0..4095</td><td style="text-align:center;">0..223</td><td style="text-align:center;">9..1785</td><td style="text-align:center;">9..1785</td></tr><tr><td>Flow control</td><td style="text-align:center;">yes</td><td style="text-align:center;">no</td><td style="text-align:center;">yes</td><td style="text-align:center;">no</td></tr><tr><td>Efficient single frame</td><td style="text-align:center;">yes</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td></tr><tr><td>Open standard</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td><td style="text-align:center;">no</td><td style="text-align:center;">yes</td></tr></tbody></table><h2 id="multi-frame-reports" tabindex="-1"><a class="header-anchor" href="#multi-frame-reports" aria-hidden="true">#</a> Multi-frame reports</h2><p>ThingSet reports of arbitrary length can be broadcast to the bus using frame type <code>0x1</code>.</p><h3 id="can-identifier-layout-2" tabindex="-1"><a class="header-anchor" href="#can-identifier-layout-2" aria-hidden="true">#</a> CAN identifier layout</h3><p>Reports are not sent to a single node, so the destination address does not need to be specified. Instead, packetization information is specified in the CAN ID.</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25 .. 24</th><th style="text-align:center;">23 .. 20</th><th style="text-align:center;">19 .. 16</th><th style="text-align:center;">15 .. 14</th><th style="text-align:center;">13 .. 12</th><th style="text-align:center;">11 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority</td><td style="text-align:center;">Type: <code>0x1</code></td><td style="text-align:center;">res: <code>0x0</code></td><td style="text-align:center;">Source bus</td><td style="text-align:center;">Msg no.</td><td style="text-align:center;">MF type</td><td style="text-align:center;">Seq no.</td><td style="text-align:center;">Source address</td></tr></tbody></table><ul><li>Priority (28-26): Defines the importance of the message. For publication messages, only 5 (high priority) and 7 (low priority) are valid.</li><li>Type (25-24): <code>0x1</code> for multi-frame report</li><li>Source bus (19-16): Bus number of the source device (default for single bus systems is <code>0x0</code>).</li><li>Message number (15-14): Wrapping counter of all messages sent by that node</li><li>Multi-frame type (13-12): First frame <code>0x0</code>, Consecutive frame <code>0x1</code>, Last frame <code>0x2</code>, Single frame <code>0x3</code></li><li>Sequence number (11-8): Wrapping counter of all frames for this ThingSet message</li><li>Source address (7-0): Source node address (<code>0x00</code> to <code>0xFD</code>)</li></ul><p>Bytes 23-20 are reserved for future use.</p><h3 id="can-data-format" tabindex="-1"><a class="header-anchor" href="#can-data-format" aria-hidden="true">#</a> CAN data format</h3><p>The data section of the CAN frame contains the raw ThingSet report (which may be in text or binary mode), split in multiple frames with increasing sequence number.</p><p>A multi-frame (MF) transmission starts with the MF type set to <code>0x0</code> for the first frame. Consecutive frames between first and last frame (if existing) are indicated with MF type set to <code>0x1</code>. The last frame uses MF type <code>0x2</code>.</p><p>If a single frame is sufficient, the MF type <code>0x3</code> is used.</p><p>In case the last frame is longer than needed, <code>0x00</code> shall be used for padding the unused bytes.</p><h2 id="single-frame-reports" tabindex="-1"><a class="header-anchor" href="#single-frame-reports" aria-hidden="true">#</a> Single-frame reports</h2><p>The single-frame report frames of type <code>0x2</code> provide a very efficient way to publish a single data item, which is especially interesting for control purposes. For many CBOR-encoded values, a single CAN frame provides sufficient space (8 bytes for classical; 64 bytes for CAN-FD) to transmit the value without the overhead of a transport protocol. For values larger than a single frame, multi-frame reports have to be used.</p><h3 id="can-identifier-layout-3" tabindex="-1"><a class="header-anchor" href="#can-identifier-layout-3" aria-hidden="true">#</a> CAN identifier layout</h3><p>Reports are not sent to a single node, so the destination address does not need to be specified. Instead, the data object ID is specified directly in the CAN identifier to have more bytes available for payload in the data section of the CAN frame.</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25 .. 24</th><th style="text-align:center;">23 .. 16</th><th style="text-align:center;">15 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority</td><td style="text-align:center;">Type: <code>0x2</code></td><td style="text-align:center;">Data item ID (MSB)</td><td style="text-align:center;">Data item ID (LSB)</td><td style="text-align:center;">Source address</td></tr></tbody></table><ul><li>Priority (28-26): Defines the importance of the message. For reports, only 5 (high priority) and 7 (low priority) are valid.</li><li>Type (25-24): <code>0x2</code> for single-frame report</li><li>Data item ID (23-8): Data object ID as a 16-bit unsigned integer. The most significant byte is stored first (bits 23 to 16).</li><li>Source address (7-0): Source node address (<code>0x00</code> to <code>0xFD</code>)</li></ul><p>The data item ID is not encoded in the CBOR format, but as a raw 16-bit unsigned integer. The single-frame reports are limited to IDs that fit into 16 bits.</p><p>IDs &gt;= 0x8000 are fixed and reserved for control messages, so the CAN filter can be configured to distinguish between normal data ojbects and (high priority) control messages.</p><h3 id="can-data-format-1" tabindex="-1"><a class="header-anchor" href="#can-data-format-1" aria-hidden="true">#</a> CAN data format</h3><p>The data section of the CAN frame contains the CBOR-encoded value of the data item with the specified ID.</p><p>In order to acquire real-time measurement values, a 16-bit timestamp (unsigned int) can be appended to the CBOR-encoded value. The timestamp contains the 16 least significant bits of the microcontroller&#39;s system clock in milliseconds. It is a rolling counter and restarts at 0 after an overflow. The timestamp cannot be used to determine the absolute time of a measurement, but the time difference between subsequent measurements. This is important to obtain correct sampling of time-series data if higher priority messages cause a delay of the data delivery on the bus.</p><p>The maximum length of the value and the optional timestamp is defined by the maximum data section size of the CAN frame (8 bytes for classic CAN).</p><h2 id="network-management" tabindex="-1"><a class="header-anchor" href="#network-management" aria-hidden="true">#</a> Network management</h2><p>The network management is handled using dedicated CAN frames with type <code>0x3</code>. These frames are mainly used for automatic CAN address assignment.</p><p>The required features of the CAN address assignment are:</p><ul><li>No central instance to assign addresses (unlike for e.g. DHCP)</li><li>Nodes must re-claim their address: <ul><li>After start-up</li><li>After bus disconnects</li></ul></li><li>Avoid error frames as much as possible</li><li>Reduce bus traffic as much as possible</li><li>Have all addresses assigned within &lt;1s for &gt;99% of the use cases</li></ul><p>Critical scenarios for testing:</p><ul><li>All nodes (max. 253) on the same bus are powered up simultaneously.</li><li>A node is connected to an an already operating network (hot-plugging) and should not disturb operation.</li></ul><h3 id="description-of-the-approach" tabindex="-1"><a class="header-anchor" href="#description-of-the-approach" aria-hidden="true">#</a> Description of the approach</h3><p>The dynamic address assignment protocol requires two dedicated frames: The <strong>Address Discovery frame</strong> and the <strong>Address Claim frame</strong>.</p><p>Dynamic address assignment capability is mandatory for each node. The nodes may have a preferred default address (e.g. manually assigned during production or based on previous successful address claims) to speed up the network start-up, but they must be able to change the address to a random number if it is already taken by another node.</p><h4 id="address-discovery-frame" tabindex="-1"><a class="header-anchor" href="#address-discovery-frame" aria-hidden="true">#</a> Address Discovery frame</h4><p>This frame is used to find out if a desired address is already taken by another node on the bus. It is sent out immediately after start-up or after re-connection to the bus.</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25 .. 24</th><th style="text-align:center;">23 .. 16</th><th style="text-align:center;">15 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority: <code>0x4</code></td><td style="text-align:center;">Type: <code>0x3</code></td><td style="text-align:center;">Random data</td><td style="text-align:center;">Target address</td><td style="text-align:center;">Source address: <code>0xFE</code></td></tr></tbody></table><ul><li>Priority (28-26): <code>0x4</code> suggested for network management frames</li><li>Type (25-24): <code>0x3</code> for network management frames</li><li>Random data (23-16): Used to select between two nodes attempting to discover an address at the same time</li><li>Target address (15-8): Desired node address (<code>0x00</code> to <code>0xFD</code>)</li><li>Source address (7-0): <code>0xFE</code> for anonymous address</li><li>Payload: None (DLC set to 0)</li></ul><p>The target address is the desired address of the node. If this address is already taken, the node with that address must immediately respond with an Address Claim frame (see below).</p><p>If the target address is set to <code>0xFF</code> (broadcast), all nodes should answer with an Address Claim frame. This method can be used to determine all connected nodes on a bus (e.g. as a gateway).</p><p>The random number in the CAN ID provides a first level of protection against collision of different nodes wanting to claim the same address. If another node with higher priority random number tries to claim the same address at the same time it will win the arbitration on the bus. The message will be received and the node has to try again with another address.</p><h4 id="address-claim-frame" tabindex="-1"><a class="header-anchor" href="#address-claim-frame" aria-hidden="true">#</a> Address Claim frame</h4><p>This frame indicates that the device with the EUI-64 in the payload uses the given source address.</p><table><thead><tr><th>Bits</th><th style="text-align:center;">28 .. 26</th><th style="text-align:center;">25 .. 24</th><th style="text-align:center;">23 .. 20</th><th style="text-align:center;">19 .. 16</th><th style="text-align:center;">15 .. 8</th><th style="text-align:center;">7 .. 0</th></tr></thead><tbody><tr><td></td><td style="text-align:center;">Priority: <code>0x4</code></td><td style="text-align:center;">Type: <code>0x3</code></td><td style="text-align:center;">Target bus</td><td style="text-align:center;">Source bus</td><td style="text-align:center;">Target address: <code>0xFF</code></td><td style="text-align:center;">Source address</td></tr></tbody></table><ul><li>Priority (28-26): <code>0x4</code> suggested for network management frames</li><li>Type (25-24): <code>0x3</code> for network management frames</li><li>Bus numbers (23-16): same as for request/response messages</li><li>Target address (15-8): <code>0xFF</code> for broadcast without a specific recipient</li><li>Source address (7-0): Source node address being claimed (<code>0x00</code> to <code>0xFD</code>)</li><li>Payload: 8-byte EUI-64 of the node</li></ul><p>The EUI-64 in the payload is required to resolve potential conflicts (see below) and can be used by other devices to keep track of the devices connected to the bus.</p><h4 id="overview-of-address-assignment-process" tabindex="-1"><a class="header-anchor" href="#overview-of-address-assignment-process" aria-hidden="true">#</a> Overview of address assignment process</h4><p>The following steps are necessary after power-up of the node or after bus re-connection:</p><ol><li>The node determines its desired address (random or previously used, e.g. read from EEPROM) and adds a CAN filter for incoming frames for this address.</li><li>The node sends out an address discovery frame.</li><li>If no other node responded with an address claim frame within a given timeout (e.g. 500 ms, t.b.d.), the node assumes it can use the address. Otherwise it restarts from step 1 with a new random address.</li><li>The node sends out an address claim frame with its new address.</li></ol><p>The node should only send out any data (e.g. publication messages) after the address assignment process has successfully finished.</p><p>For the very unlikely case that two nodes chose the same address, generated the same random number in the address discovery frame and sent out the address claim frame at exactly the same time, the non-matching EUI-64 payload will result in an error frame on the bus, in which case both devices have to repeat the overall process with a new random address.</p><h3 id="considered-alternatives" tabindex="-1"><a class="header-anchor" href="#considered-alternatives" aria-hidden="true">#</a> Considered alternatives</h3><h4 id="dhcp" tabindex="-1"><a class="header-anchor" href="#dhcp" aria-hidden="true">#</a> DHCP</h4><p>Relies on a central instance to assign addresses, which is not desired for this application.</p><h4 id="sae-j1939" tabindex="-1"><a class="header-anchor" href="#sae-j1939" aria-hidden="true">#</a> SAE J1939</h4><p>Uses a similar address claiming mechanism as described above, but without the initial step of address discovery. This leads to a higher probability of error frames because of collisions.</p>',73),x=(0,r.Uk)("Further reading: "),w={href:"https://copperhilltech.com/blog/sae-j1939-address-claim-procedure-sae-j193981-network-management/",target:"_blank",rel:"noopener noreferrer"},v=(0,r.Uk)("here"),A=(0,r.Uk)(" and "),T={href:"https://copperhilltech.com/blog/sae-j1939-network-management-and-address-claim-procedure/",target:"_blank",rel:"noopener noreferrer"},k=(0,r.Uk)("here"),C=(0,r._)("h4",{id:"uavcan-opencyphal",tabindex:"-1"},[(0,r._)("a",{class:"header-anchor",href:"#uavcan-opencyphal","aria-hidden":"true"},"#"),(0,r.Uk)(" UAVCAN / OpenCyphal")],-1),N=(0,r._)("p",null,"Rather complicated algorithm with special UAVCAN messages, which is not directly applicable.",-1),S=(0,r.Uk)("Further reading: "),I={href:"https://opencyphal.org/specification/Cyphal_Specification.pdf",target:"_blank",rel:"noopener noreferrer"},D=(0,r.Uk)("Specification"),F=(0,r._)("h4",{id:"_6locan",tabindex:"-1"},[(0,r._)("a",{class:"header-anchor",href:"#_6locan","aria-hidden":"true"},"#"),(0,r.Uk)(" 6LoCAN")],-1),_=(0,r._)("p",null,"Uses similar mechanism with random data in the CAN ID to avoid error frames, but uses RTR frames, which are discouraged.",-1),B=(0,r.Uk)("Further reading: "),E={href:"https://datatracker.ietf.org/doc/html/draft-wachter-6lo-can-00#section-3",target:"_blank",rel:"noopener noreferrer"},P=(0,r.Uk)("IETF draft"),M=(0,r.uE)('<h2 id="physical-layer" tabindex="-1"><a class="header-anchor" href="#physical-layer" aria-hidden="true">#</a> Physical layer</h2><h3 id="bit-rate" tabindex="-1"><a class="header-anchor" href="#bit-rate" aria-hidden="true">#</a> Bit rate</h3><p>ThingSet uses a fixed bit rate of 500 kbit/s, which supports a maximum bus length of 100 m according to CiA 301.</p><h3 id="connector" tabindex="-1"><a class="header-anchor" href="#connector" aria-hidden="true">#</a> Connector</h3><p>Standard RJ45 jacks as used for Ethernet are also used as the default for ThingSet via CAN. The cables should be Cat 5e twisted pair or better, allowing reliable communication with easily available parts.</p><p>The pinout of the connector is similar to the CANopen specification:</p><table><thead><tr><th>Pin #</th><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>1</td><td>CAN_H</td><td>CAN bus high signal</td></tr><tr><td>2</td><td>CAN_L</td><td>CAN bus low signal</td></tr><tr><td>3</td><td>GND</td><td>CAN and power supply GND (optional)</td></tr><tr><td>4</td><td>V+</td><td>Bus power supply (optional, 12-24V nominal)</td></tr><tr><td>5</td><td>V+</td><td>Bus power supply (optional, 12-24V nominal)</td></tr><tr><td>6</td><td>-</td><td>reserved (do not connect)</td></tr><tr><td>7</td><td>GND</td><td>CAN and power supply GND (optional)</td></tr><tr><td>8</td><td>(V+)</td><td>Unconnected by default, optional jumper to V+</td></tr></tbody></table><p>The pinout specification aims to create as little interference with existing standards as possible. Most important, any damage must be prevented if a device is accidentally connected to a standard Ethernet jack.</p>',8),U=(0,r.Uk)("In contrast to the CANopen specification, pin 8 is not used as the bus power supply (V+) by default. 10/100 MBit Ethernet jacks with integrated magnetics (e.g. "),q={href:"https://katalog.we-online.de/pbs/download/Tutorials_Connecting+LAN+Transformers_EN+%28rev1%29.pdf",target:"_blank",rel:"noopener noreferrer"},O=(0,r.Uk)("these ones"),R=(0,r.Uk)(") internally connect pin 4 to 5 and pin 7 to 8. In addition to that, Power over Ethernet (PoE) uses pins 4+5 for positive power rail and pins 7+8 for GND. So it's not ideal to use pin 7 as GND and pin 8 as V+. Boards can however offer a jumper to connect pin 8 with the other V+ pins (4 and 5) for bus supply of CANopen devices."),V=(0,r._)("p",null,"Galvanic isolation is not required, as long as all devices are connected via thick wires. This might change in the future.",-1),j=(0,r._)("p",null,"One device typically has 2 RJ45 jacks for daisy-chaining the devices and maintaining the bus topology. There is no such thing like a switch needed. However, the endpoints have to be terminated with termination plugs or resistors.",-1),W=(0,r._)("p",null,"A device that supplies power to V+ may not hard-connect the daisy-chained wires without any fuses in order to ensure that the current rating per wire is not exceeded. Devices without power supply may just route through the powered wires.",-1),J=(0,r._)("p",null,"The maximum current per wire pair is 600 mA (300 mA per wire), same as PoE+ (IEEE 802.3at Type 2) with Cat 5e cables.",-1),G={render:function(e,t){const a=(0,r.up)("OutboundLink");return(0,r.wg)(),(0,r.iD)(r.HY,null,[s,(0,r._)("p",null,[i,(0,r._)("a",n,[o,(0,r.Wm)(a)]),d]),l,h,(0,r._)("p",null,[c,(0,r._)("a",p,[f,(0,r.Wm)(a)]),u,(0,r._)("a",m,[g,(0,r.Wm)(a)]),y]),b,(0,r._)("p",null,[x,(0,r._)("a",w,[v,(0,r.Wm)(a)]),A,(0,r._)("a",T,[k,(0,r.Wm)(a)])]),C,N,(0,r._)("p",null,[S,(0,r._)("a",I,[D,(0,r.Wm)(a)])]),F,_,(0,r._)("p",null,[B,(0,r._)("a",E,[P,(0,r.Wm)(a)])]),M,(0,r._)("p",null,[U,(0,r._)("a",q,[O,(0,r.Wm)(a)]),R]),V,j,W,J],64)}}}}]);
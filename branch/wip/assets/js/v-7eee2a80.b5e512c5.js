"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1701],{9163:(e,t,a)=>{a.r(t),a.d(t,{data:()=>l});const l={key:"v-7eee2a80",path:"/spec/v0.1/can.html",title:"CAN lower layer",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"General features",slug:"general-features",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout",children:[]}]},{level:2,title:"Service message",slug:"service-message",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout-1",children:[]},{level:3,title:"Transport protocol (ISO 15765-2)",slug:"transport-protocol-iso-15765-2",children:[]},{level:3,title:"Remarks regarding existing transport protocols",slug:"remarks-regarding-existing-transport-protocols",children:[]}]},{level:2,title:"Data object publication message",slug:"data-object-publication-message",children:[{level:3,title:"CAN identifier layout",slug:"can-identifier-layout-2",children:[]},{level:3,title:"CAN data format",slug:"can-data-format",children:[]}]}],filePathRelative:"spec/v0.1/can.md",git:{updatedTime:1642774965e3}}},9049:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Ve});var l=a(6252),n=a(2253),i=a(6174),s=a(9957),o=a(818),r=a(4635);const d=(0,l._)("h1",{id:"can-lower-layer",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#can-lower-layer","aria-hidden":"true"},"#"),(0,l.Uk)(" CAN lower layer")],-1),u=(0,l._)("p",null,"This specification defines layer 3 (Network) and 4 (Transport) of the ThingSet Protocol via CAN bus. Layer 1 and 2 are provided by the CAN bus itself.",-1),c=(0,l._)("p",null,"Only the binary messages of the ThingSet Protocol are supported via CAN.",-1),f=(0,l._)("h2",{id:"general-features",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#general-features","aria-hidden":"true"},"#"),(0,l.Uk)(" General features")],-1),h=(0,l._)("ul",null,[(0,l._)("li",null,[(0,l._)("p",null,"Master-less operation")]),(0,l._)("li",null,[(0,l._)("p",null,"Automatic node ID assignment")]),(0,l._)("li",null,[(0,l._)("p",null,"Efficient useage of CAN ID and data bytes")]),(0,l._)("li",null,[(0,l._)("p",null,"Transport protocol to allow payload of more than 8 bytes")]),(0,l._)("li",null,[(0,l._)("p",null,"Two different types of messages for application layer"),(0,l._)("ul",null,[(0,l._)("li",null,"Service message (request/response)"),(0,l._)("li",null,"Data object publication message (publish/subscribe)")])]),(0,l._)("li",null,[(0,l._)("p",null,"RTR frame is not allowed")]),(0,l._)("li",null,[(0,l._)("p",null,"Fixed bitrate of 250 kbit")])],-1),p=(0,l._)("h3",{id:"can-identifier-layout",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#can-identifier-layout","aria-hidden":"true"},"#"),(0,l.Uk)(" CAN identifier layout")],-1),m=(0,l._)("p",null,"In the CAN bus, the identifier part of the CAN frame is used for arbitration and identification of the message type. Typically, it does not define the sender or receiver of the message, but the content of the message.",-1),_=(0,l._)("p",null,"For a network with connected ThingSet devices, the layout of the CAN identifier is similar to the SAE J1939 specification. Parts of the identifier define the source and destination address of the message. In addition to that, the first three bits are used to prioritize the messages.",-1),g=(0,l._)("p",null,"Two general types of messages are specified: Service message and Data object publication message. Only CAN extended ID with a size of 29 bit is used.",-1),b=(0,l._)("h2",{id:"service-message",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#service-message","aria-hidden":"true"},"#"),(0,l.Uk)(" Service message")],-1),y=(0,l._)("p",null,"A service message is used for the request/response communication model. A single byte each for source and destination node address are defined as part of the CAN ID to identify sender and receiver of the message. In addition to that, the function ID is specified as part of the CAN ID.",-1),w=(0,l._)("h3",{id:"can-identifier-layout-1",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#can-identifier-layout-1","aria-hidden":"true"},"#"),(0,l.Uk)(" CAN identifier layout")],-1),x=(0,l._)("p",null,"The service message CAN ID layout is shown in the following picture:",-1),v=(0,l._)("p",null,[(0,l._)("img",{src:n,alt:"CAN service message ID"})],-1),T=(0,l._)("ul",null,[(0,l._)("li",null,"Priority (28-26): Defines the importance of the message. For service messages, only 3 (high priority) or 7 (low priority) are valid."),(0,l._)("li",null,"Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus"),(0,l._)("li",null,"Message type (24): 0b for service message"),(0,l._)("li",null,"Function ID (23-16): Function ID of application layer protocol"),(0,l._)("li",null,"Destination address (15-8): Destination node address (255 for broadcast)"),(0,l._)("li",null,"Source address (7-0): Source node address (255 for anonymous message during address claiming)")],-1),k=(0,l._)("h3",{id:"transport-protocol-iso-15765-2",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#transport-protocol-iso-15765-2","aria-hidden":"true"},"#"),(0,l.Uk)(" Transport protocol (ISO 15765-2)")],-1),A=(0,l.Uk)("In order to transfer data with a length of more than 8 bytes, the transfer protocol specified in "),C={href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"},I=(0,l.Uk)("ISO 15765-2 (ISO-TP)"),D=(0,l.Uk)(" is used."),N=(0,l._)("p",null,"It allows a maximum number of 4095 data bytes (defined by 12 bit unsigned int length code in first frame). Flow control mechanisms ensure the reliability of data reception.",-1),S=(0,l._)("p",null,"As a very important feature, ISO-TP allows the efficient transfer of single-frame messages with only one byte of overhead (and no flow control packets). This feature is necessary, as it is not known before if a certain function of the energy management protocol will transfer only a few bytes or a large amount of data.",-1),U=(0,l.Uk)("Unfortunately, the standard is not accessible for free. However, several open source implementations (including "),P={href:"https://github.com/hartkopp/can-isotp",target:"_blank",rel:"noopener noreferrer"},O=(0,l.Uk)("SocketCAN for Linux"),E=(0,l.Uk)(") of the ISO-TP are available. Most important information about the frame layout can be found on "),M={href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"},B=(0,l.Uk)("Wikipedia"),F=(0,l.Uk)("."),j=(0,l._)("h4",{id:"single-frame-message-request-response",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#single-frame-message-request-response","aria-hidden":"true"},"#"),(0,l.Uk)(" Single-frame message request/response")],-1),R=(0,l._)("p",null,"Application protocol data of 8 bytes or lower can be transferred using a single CAN frame. The function ID of the application protocol (byte 1) is already included in the CAN indentifier. The first byte of the CAN data contains the ISO-TP header for a single-frame message. Bytes 2 to n (with n <= 8) are contained in the remaining data bytes of the CAN frame.",-1),q=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Byte 1"),(0,l._)("th",null,"Byte 2"),(0,l._)("th",null,"..."),(0,l._)("th",null,"Byte 8")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"ISO-TP header"),(0,l._)("td",null,"Application protocol (byte 2)"),(0,l._)("td",null,"..."),(0,l._)("td",null,"Application protocol (byte 8)")])])],-1),J=(0,l._)("h4",{id:"multi-frame-message-request-response",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#multi-frame-message-request-response","aria-hidden":"true"},"#"),(0,l.Uk)(" Multi-frame message request/response")],-1),H=(0,l._)("p",null,"More than 8 bytes of application protocol data are sent as multi-frame messages.",-1),W=(0,l._)("p",null,"The first message contains two bytes for the ISO-TP header (including also the total message length). As the function ID (first byte of application protocol data) is already stored in the CAN identifier, the application protocol byte numbering starts with 2.",-1),L=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Byte 1"),(0,l._)("th",null,"Byte 2"),(0,l._)("th",null,"Byte 3"),(0,l._)("th",null,"..."),(0,l._)("th",null,"Byte 8")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",{colspan:"2"},"ISO-TP header"),(0,l._)("td",null,"Application protocol (byte 2)"),(0,l._)("td",null,"..."),(0,l._)("td",null,"Application protocol (byte 7)")])])],-1),z=(0,l._)("p",null,"Consecutive messages i = 2...585 consume only one byte for the ISO-TP header:",-1),G=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Byte 1"),(0,l._)("th",null,"Byte 2"),(0,l._)("th",null,"..."),(0,l._)("th",null,"Byte 8")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"ISO-TP header"),(0,l._)("td",null,"Application protocol (byte i\\*7-6)"),(0,l._)("td",null,"..."),(0,l._)("td",null,"Application protocol (byte i\\*7)")])])],-1),V=(0,l._)("h3",{id:"remarks-regarding-existing-transport-protocols",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#remarks-regarding-existing-transport-protocols","aria-hidden":"true"},"#"),(0,l.Uk)(" Remarks regarding existing transport protocols")],-1),Y=(0,l._)("p",null,"Several other transport protocols for CAN have been defined in different standards.",-1),K=(0,l._)("p",null,[(0,l.Uk)("For the J1939 protocol, the transport protocol is specified in the standard "),(0,l._)("strong",null,"SAE J1939-21"),(0,l.Uk)(". Two types of transport protocol are defined: The Connection Mode Data Transfer (CMDT) and the Broadcast Announce Message (BAM). CMDT is used to exchange data between two nodes. It includes methods for flow control and handshake. BAM is more simple and broadcasts a multi-packet message to the bus without feedback if the message was received.")],-1),Q=(0,l._)("p",null,"CMDT and BAM allow to transfer 9 to 1785 bytes (255 packets * 7 bytes) of payload. It is not allowed to transfer 0 to 8 bytes using the J1939 transport protocols. Thus, we need to know before if a message needs the mechanisms of the transport protocol or not. This is not possible for the flexible energy management protocol, as the same functions might transfer either very little data (e.g. write 16-bit integer) or a large amount of data (e.g. write a strings). Data with less than 9 bytes would have to be stuffed, making the protocol very inefficient. A message which could fit into a single CAN frame would need 5 frames (including flow control) when using CMDT and stuffing.",-1),X=(0,l._)("p",null,[(0,l.Uk)("The "),(0,l._)("strong",null,"RV-C"),(0,l.Uk)(" standard defines a different transport protocol than SAE J1939, which also allows the transfer of up to 1785 bytes. However, is does not specify any flow control mechanisms at all. So it is not possible to determine if a message was received even for a communication between only two nodes, which is not acceptable.")],-1),Z=(0,l._)("p",null,[(0,l.Uk)("NMEA 2000 uses the same transport protocol as the SAE J1939 protocol. In addition to that, it defines a so-called fast packet protocol. With "),(0,l._)("strong",null,"NMEA 2000 fast packet protocol"),(0,l.Uk)(', 223 bytes can be transferred without flow control, thus, making it more efficient and "fast".')],-1),$=(0,l._)("p",null,"With the fast packet protocol, a single frame transfer is possible. However, a single frame message consumes 2 out of 8 bytes for the fast packet header information. This is considered too high overhead if it is unknown whether a single or multi-frame message has to be used. The Tiny-TP (see below) for the data object publication messages is based on the NMEA 2000 fast packet protocol, but reduces its overhead for single frame messages.",-1),ee=(0,l._)("p",null,"Overview of different CAN based transport protocols:",-1),te=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th"),(0,l._)("th",{style:{"text-align":"center"}},"ISO-TP"),(0,l._)("th",{style:{"text-align":"center"}},[(0,l.Uk)("NMEA 2000"),(0,l._)("br"),(0,l.Uk)("fast packet")]),(0,l._)("th",{style:{"text-align":"center"}},"SAE J1939-21"),(0,l._)("th",{style:{"text-align":"center"}},"RV-C")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"Number of data bytes"),(0,l._)("td",{style:{"text-align":"center"}},"0..4095"),(0,l._)("td",{style:{"text-align":"center"}},"0..223"),(0,l._)("td",{style:{"text-align":"center"}},"9..1785"),(0,l._)("td",{style:{"text-align":"center"}},"9..1785")]),(0,l._)("tr",null,[(0,l._)("td",null,"Flow control"),(0,l._)("td",{style:{"text-align":"center"}},"yes"),(0,l._)("td",{style:{"text-align":"center"}},"no"),(0,l._)("td",{style:{"text-align":"center"}},"yes"),(0,l._)("td",{style:{"text-align":"center"}},"no")]),(0,l._)("tr",null,[(0,l._)("td",null,"Efficient single frame"),(0,l._)("td",{style:{"text-align":"center"}},"yes"),(0,l._)("td",{style:{"text-align":"center"}},"no"),(0,l._)("td",{style:{"text-align":"center"}},"no"),(0,l._)("td",{style:{"text-align":"center"}},"no")]),(0,l._)("tr",null,[(0,l._)("td",null,"Open standard"),(0,l._)("td",{style:{"text-align":"center"}},"no"),(0,l._)("td",{style:{"text-align":"center"}},"no"),(0,l._)("td",{style:{"text-align":"center"}},"no"),(0,l._)("td",{style:{"text-align":"center"}},"yes")])])],-1),ae=(0,l._)("h2",{id:"data-object-publication-message",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#data-object-publication-message","aria-hidden":"true"},"#"),(0,l.Uk)(" Data object publication message")],-1),le=(0,l._)("h3",{id:"can-identifier-layout-2",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#can-identifier-layout-2","aria-hidden":"true"},"#"),(0,l.Uk)(" CAN identifier layout")],-1),ne=(0,l._)("p",null,"Publication messages are not sent to a single node, so the destination address does not need to be specified. So, instead of the function ID byte and the destination address byte, the data object ID is specified in the CAN identifier to have more bytes available for payload in the data bytes.",-1),ie=(0,l._)("p",null,[(0,l._)("img",{src:i,alt:"CAN data object publication message ID"})],-1),se=(0,l._)("ul",null,[(0,l._)("li",null,"Priority (28-26): Defines the importance of the message. For data object publication messages, only 4 (high priority), 5 (medium priority) and 6 (low priority) are valid."),(0,l._)("li",null,"Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus"),(0,l._)("li",null,"Message type (24): 1b for data object publication message"),(0,l._)("li",null,"Data object ID (23-8): Data object ID of application layer protocol which is published. The most significant byte of this 16-bit ID is stored first (bits 23 to 16)."),(0,l._)("li",null,"Source address (7-0): Source node address (255 for anonymous message during address claiming)")],-1),oe=(0,l._)("h3",{id:"can-data-format",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#can-data-format","aria-hidden":"true"},"#"),(0,l.Uk)(" CAN data format")],-1),re=(0,l._)("h4",{id:"data-type-and-content",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#data-type-and-content","aria-hidden":"true"},"#"),(0,l.Uk)(" Data type and content")],-1),de=(0,l._)("p",null,"The first byte of the payload defines the data type of the published data object. The data type is encoded using a 6-bit unsigned integer. The first two bits of the byte can be used for other purposes (see below).",-1),ue=(0,l._)("p",null,"The following data types are defined:",-1),ce=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"6-bit typeID"),(0,l._)("th",null,"CBOR type"),(0,l._)("th",null,"CBOR description")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"0x00"),(0,l._)("td",null,"0x18"),(0,l._)("td",null,"Unsigned integer (one-byte uint8_t follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x01"),(0,l._)("td",null,"0x19"),(0,l._)("td",null,"Unsigned integer (two-byte uint16_t follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x02"),(0,l._)("td",null,"0x1a"),(0,l._)("td",null,"Unsigned integer (four-byte uint32_t follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x03"),(0,l._)("td",null,"0x1b"),(0,l._)("td",null,"Unsigned integer (eight-byte uint64_t follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x04"),(0,l._)("td",null,"0x38"),(0,l._)("td",null,"Negative integer -1-n (one-byte uint8_t for n follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x05"),(0,l._)("td",null,"0x39"),(0,l._)("td",null,"Negative integer -1-n (two-byte uint16_t for n follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x06"),(0,l._)("td",null,"0x3a"),(0,l._)("td",null,"Negative integer -1-n (four-byte uint32_t for n follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x07"),(0,l._)("td",null,"0x3b"),(0,l._)("td",null,"Negative integer -1-n (eight-byte uint64_t for n follows)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x08"),(0,l._)("td",null,"0x58"),(0,l._)("td",null,"byte string (one-byte uint8_t for n, and then n bytes follow)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x0C"),(0,l._)("td",null,"0x78"),(0,l._)("td",null,"UTF-8 string (one-byte uint8_t for n, and then n bytes follow)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x10"),(0,l._)("td",null,"0x98"),(0,l._)("td",null,"array (one-byte uint8_t for n, and then n data items follow)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x14"),(0,l._)("td",null,"0xb8"),(0,l._)("td",null,"map (one-byte uint8_t for n, and then n pairs fo data items follow)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x1E"),(0,l._)("td",null,"0xfa"),(0,l._)("td",null,"Single-Precision Float (four-byte IEEE 754)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x1F"),(0,l._)("td",null,"0xfb"),(0,l._)("td",null,"Double-Precision Float (eight-byte IEEE 754)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x20"),(0,l._)("td",null,"0xc0"),(0,l._)("td",null,"Text-based date/time (data item follows; see section 2.4.1")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x21"),(0,l._)("td",null,"0xc1"),(0,l._)("td",null,"Epoch-based date/time (data item follows; see section 2.4.1")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x24"),(0,l._)("td",null,"0xc4"),(0,l._)("td",null,'Decimal Fraction (data item "array" follows; see Section 2.4.3')]),(0,l._)("tr",null,[(0,l._)("td",null,"0x3C"),(0,l._)("td",null,"0xf4"),(0,l._)("td",null,"False")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x3D"),(0,l._)("td",null,"0xf5"),(0,l._)("td",null,"True")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x3E"),(0,l._)("td",null,"0xf6"),(0,l._)("td",null,"Null")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x3F"),(0,l._)("td",null,"0xf7"),(0,l._)("td",null,"Undefined")])])],-1),fe=(0,l._)("p",null,"The data type is compatible with the CBOR format used in the ThingSet application layer protocol. The 6-bit data type ID can be converted to a valid CBOR first byte using simple bit-shift operations.",-1),he=(0,l._)("p",null,"Assuming the data of the CAN frame is stored in an array data[0...7], use the following operation to generate valid CBOR data for type ID < 0x20 (stored in data[0]) :",-1),pe=(0,l._)("div",{class:"language-text ext-text"},[(0,l._)("pre",{class:"language-text"},[(0,l._)("code",null,"data[0] = (data[0] & 0x1C) << 3 + (data[0] & 0x03) + 0x18\n")])],-1),me=(0,l._)("p",null,"For data type ID >= 0x20 (stored in data[0]) the bit shifting operation is slightly different:",-1),_e=(0,l._)("div",{class:"language-text ext-text"},[(0,l._)("pre",{class:"language-text"},[(0,l._)("code",null,"data[0] = (data[0] & 0x18) << 1 + (data[0] & 0x07) + 0xC0\n")])],-1),ge=(0,l._)("p",null,"Of course, you can also store a map of the above table and replace the 6-bit typeID by the CBOR type. However, the bit-shift operations will be more efficient.",-1),be=(0,l._)("p",null,"Using above method, the generated CBOR might not be the most compact form, as the values stored directly in the first byte (e.g. 0..23) are not used. However, the generated data is still valid CBOR.",-1),ye=(0,l._)("h4",{id:"time-stamp",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#time-stamp","aria-hidden":"true"},"#"),(0,l.Uk)(" Time stamp")],-1),we=(0,l._)("p",null,"In order to acquire real-time measurement values, a 16-bit timestamp (unsigned int) can be appended to the data content bytes. The timestamp contains the 16 least significant bits of the microcontroller's system clock in milliseconds. It is a rolling counter and restarts at 0 after an overflow. The timestamp cannot be used to determine the absolute time of a measurement, but the time difference between subsequent measurements. This is important to obtain correct sampling of time-series data if higher priority messages cause a delay of the data delivery on the bus.",-1),xe=(0,l._)("p",null,"The second bit of the first byte defines if the time stamp is present or not (see below).",-1),ve=(0,l._)("h4",{id:"tiny-transport-protocol-tiny-tp-for-message-broadcasting",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#tiny-transport-protocol-tiny-tp-for-message-broadcasting","aria-hidden":"true"},"#"),(0,l.Uk)(" Tiny transport protocol (Tiny-TP) for message broadcasting")],-1),Te=(0,l._)("p",null,"The transport protocol for the data object publication messages is much more simple and lightweight than the ISO-TP used for the service messages described above.",-1),ke=(0,l._)("p",null,"It fulfills the following requirements:",-1),Ae=(0,l._)("ul",null,[(0,l._)("li",null,"Minimum overhead for single-frame messages"),(0,l._)("li",null,"No flow control"),(0,l._)("li",null,"Comparably low maximum data length to allow small buffer sizes")],-1),Ce=(0,l._)("p",null,"The Tiny-TP adds a header of 1 byte to each message with the following format:",-1),Ie=(0,l._)("ul",null,[(0,l._)("li",null,"bit 7: multi-frame message"),(0,l._)("li",null,"bit 6: last frame"),(0,l._)("li",null,"bits 5-4: sequence identifier (2-bit unsigned integer)"),(0,l._)("li",null,"bits 3-0: frame count (4-bit unsigned integer)")],-1),De=(0,l._)("p",null,"For a multi-frame message, bit 7 is set to 1, for a single-frame message to 0. In case of a single-frame message, the remaining 7 bits of the Tiny-TP header might be used as payload data.",-1),Ne=(0,l._)("p",null,"The last frame is identified with bit 6 set to 1. For all other multi-frame packets it must be set to 0.",-1),Se=(0,l._)("p",null,"In order to distinguish different messages with the same CAN ID, bits 5-4 contain a sequence identifier which is incremented each time a multi-packet message transfer for the same CAN ID (i.e. data object ID) is started.",-1),Ue=(0,l._)("p",null,"The last four bits (3-0) contain a frame counter. The first frame of a multi-frame message starts with the frame counter set to 0. A maximum total number of 16 multi-frame messages is possible, resulting in a maximum of 2^4*7 = 112 bytes maximum message length.",-1),Pe=(0,l._)("p",null,"Compared to NMEA 2000 fast-packet, the Tiny-TP format reduces the overhead of single-frame messages from two bytes to as low as 1 bit.",-1),Oe=(0,l._)("h4",{id:"single-frame-data-publication-message",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#single-frame-data-publication-message","aria-hidden":"true"},"#"),(0,l.Uk)(" Single-frame data publication message")],-1),Ee=(0,l._)("p",null,"A single-frame message uses only the first bit of the Tiny-TP. The remaining bits of the first byte are used for a timestamp flag and the data type, thus using the 8 CAN data bytes very efficiently.",-1),Me=(0,l._)("p",null,[(0,l._)("img",{src:s,alt:"CAN data object publication message ID"})],-1),Be=(0,l._)("ul",null,[(0,l._)("li",null,"Multi-frame message flag: 0b (single-frame message)"),(0,l._)("li",null,"Timestamp flag: 1b if timestamp will be sent, otherwise 0b"),(0,l._)("li",null,"Data type: 6-bit unsigned int (see application protocol)"),(0,l._)("li",null,"Data / Timestamp bytes: data bytes depending on data type, 16-bit timestamp appended if timestamp flag set.")],-1),Fe=(0,l._)("h4",{id:"multi-frame-data-publication-message",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#multi-frame-data-publication-message","aria-hidden":"true"},"#"),(0,l.Uk)(" Multi-frame data publication message")],-1),je=(0,l._)("p",null,"Multi-frame messages need the entire first byte for the Tiny-TP header information. The timestamp flag and the data type are moved to the second byte, followed by the data content and timestamp (if enabled).",-1),Re=(0,l._)("p",null,[(0,l._)("img",{src:o,alt:"CAN data object publication message ID"})],-1),qe=(0,l._)("ul",null,[(0,l._)("li",null,"Multi-frame message flag: 1b"),(0,l._)("li",null,"Last frame flag: 0b"),(0,l._)("li",null,"Sequence identifier: 0-3 (incremented for each start of multi-packet message transmission for given CAN ID)"),(0,l._)("li",null,"Frame count: 0 (first frame)"),(0,l._)("li",null,"Timestamp flag: 1b if timestamp will be sent, otherwise 0b"),(0,l._)("li",null,"Data type: 6-bit unsigned int (see application protocol)"),(0,l._)("li",null,"Data / Timestamp bytes: data bytes depending on data type, 16-bit timestamp appended if timestamp flag set.")],-1),Je=(0,l._)("p",null,"Consecutive messages also contain the Tiny-TP header, directly followed by the data / timestamp bytes.",-1),He=(0,l._)("p",null,[(0,l._)("img",{src:r,alt:"CAN data object publication message ID"})],-1),We=(0,l._)("ul",null,[(0,l._)("li",null,"Multi-frame message flag: 1b"),(0,l._)("li",null,"Last frame flag: 1b if last frame, otherwise 0b"),(0,l._)("li",null,"Sequence identifier: 0-3 (see above)"),(0,l._)("li",null,"Frame count: 0-15"),(0,l._)("li",null,"Data / Timestamp bytes: data bytes depending on data type, 16-bit timestamp appended if timestamp flag set.")],-1),Le=(0,l._)("h1",{id:"can-physical-layer",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#can-physical-layer","aria-hidden":"true"},"#"),(0,l.Uk)(" CAN Physical layer")],-1),ze=(0,l._)("p",null,"ToDo:",-1),Ge=(0,l._)("ul",null,[(0,l._)("li",null,"RJ45 connector using CANopen pinout"),(0,l._)("li",null,"Bus Power supply")],-1),Ve={render:function(e,t){const a=(0,l.up)("OutboundLink");return(0,l.wg)(),(0,l.iD)(l.HY,null,[d,u,c,f,h,p,m,_,g,b,y,w,x,v,T,k,(0,l._)("p",null,[A,(0,l._)("a",C,[I,(0,l.Wm)(a)]),D]),N,S,(0,l._)("p",null,[U,(0,l._)("a",P,[O,(0,l.Wm)(a)]),E,(0,l._)("a",M,[B,(0,l.Wm)(a)]),F]),j,R,q,J,H,W,L,z,G,V,Y,K,Q,X,Z,$,ee,te,ae,le,ne,ie,se,oe,re,de,ue,ce,fe,he,pe,me,_e,ge,be,ye,we,xe,ve,Te,ke,Ae,Ce,Ie,De,Ne,Se,Ue,Pe,Oe,Ee,Me,Be,Fe,je,Re,qe,Je,He,We,Le,ze,Ge],64)}}},4635:(e,t,a)=>{e.exports=a.p+"assets/img/pub_msg_multi_consecutive.97d3d9cc.png"},818:(e,t,a)=>{e.exports=a.p+"assets/img/pub_msg_multi_first.2f6d4064.png"},9957:(e,t,a)=>{e.exports=a.p+"assets/img/pub_msg_single.058108c7.png"},6174:(e,t,a)=>{e.exports=a.p+"assets/img/publication_msg_can_id.2e18e21f.png"},2253:(e,t,a)=>{e.exports=a.p+"assets/img/service_msg_can_id.d65fe43a.png"}}]);
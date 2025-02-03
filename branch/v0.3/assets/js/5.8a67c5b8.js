(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{274:function(e,t,a){e.exports=a.p+"assets/img/service_msg_can_id.57f19456.png"},275:function(e,t,a){e.exports=a.p+"assets/img/publication_msg_can_id.7c0c857a.png"},276:function(e,t,a){e.exports=a.p+"assets/img/pub_msg_single.533953b6.png"},277:function(e,t,a){e.exports=a.p+"assets/img/pub_msg_multi_first.31050ca4.png"},278:function(e,t,a){e.exports=a.p+"assets/img/pub_msg_multi_consecutive.9036b9ff.png"},348:function(e,t,a){"use strict";a.r(t);var s=a(33),i=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"can-lower-layer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#can-lower-layer"}},[e._v("#")]),e._v(" CAN lower layer")]),e._v(" "),s("p",[e._v("This specification defines layer 3 (Network) and 4 (Transport) of the ThingSet Protocol via CAN bus. Layer 1 and 2 are provided by the CAN bus itself.")]),e._v(" "),s("p",[e._v("Only the binary messages of the ThingSet Protocol are supported via CAN.")]),e._v(" "),s("h2",{attrs:{id:"general-features"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#general-features"}},[e._v("#")]),e._v(" General features")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("Master-less operation")])]),e._v(" "),s("li",[s("p",[e._v("Automatic node ID assignment")])]),e._v(" "),s("li",[s("p",[e._v("Efficient useage of CAN ID and data bytes")])]),e._v(" "),s("li",[s("p",[e._v("Transport protocol to allow payload of more than 8 bytes")])]),e._v(" "),s("li",[s("p",[e._v("Two different types of messages for application layer")]),e._v(" "),s("ul",[s("li",[e._v("Service message (request/response)")]),e._v(" "),s("li",[e._v("Data object publication message (publish/subscribe)")])])]),e._v(" "),s("li",[s("p",[e._v("RTR frame is not allowed")])]),e._v(" "),s("li",[s("p",[e._v("Fixed bitrate of 250 kbit")])])]),e._v(" "),s("h3",{attrs:{id:"can-identifier-layout"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#can-identifier-layout"}},[e._v("#")]),e._v(" CAN identifier layout")]),e._v(" "),s("p",[e._v("In the CAN bus, the identifier part of the CAN frame is used for arbitration and identification of the message type. Typically, it does not define the sender or receiver of the message, but the content of the message.")]),e._v(" "),s("p",[e._v("For a network with connected ThingSet devices, the layout of the CAN identifier is similar to the SAE J1939 specification. Parts of the identifier define the source and destination address of the message. In addition to that, the first three bits are used to prioritize the messages.")]),e._v(" "),s("p",[e._v("Two general types of messages are specified: Service message and Data object publication message. Only CAN extended ID with a size of 29 bit is used.")]),e._v(" "),s("h2",{attrs:{id:"service-message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#service-message"}},[e._v("#")]),e._v(" Service message")]),e._v(" "),s("p",[e._v("A service message is used for the request/response communication model. A single byte each for source and destination node address are defined as part of the CAN ID to identify sender and receiver of the message. In addition to that, the function ID is specified as part of the CAN ID.")]),e._v(" "),s("h3",{attrs:{id:"can-identifier-layout-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#can-identifier-layout-2"}},[e._v("#")]),e._v(" CAN identifier layout")]),e._v(" "),s("p",[e._v("The service message CAN ID layout is shown in the following picture:")]),e._v(" "),s("p",[s("img",{attrs:{src:a(274),alt:"CAN service message ID"}})]),e._v(" "),s("ul",[s("li",[e._v("Priority (28-26): Defines the importance of the message. For service messages, only 3 (high priority) or 7 (low priority) are valid.")]),e._v(" "),s("li",[e._v("Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus")]),e._v(" "),s("li",[e._v("Message type (24): 0b for service message")]),e._v(" "),s("li",[e._v("Function ID (23-16): Function ID of application layer protocol")]),e._v(" "),s("li",[e._v("Destination address (15-8): Destination node address (255 for broadcast)")]),e._v(" "),s("li",[e._v("Source address (7-0): Source node address (255 for anonymous message during address claiming)")])]),e._v(" "),s("h3",{attrs:{id:"transport-protocol-iso-15765-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#transport-protocol-iso-15765-2"}},[e._v("#")]),e._v(" Transport protocol (ISO 15765-2)")]),e._v(" "),s("p",[e._v("In order to transfer data with a length of more than 8 bytes, the transfer protocol specified in "),s("a",{attrs:{href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"}},[e._v("ISO 15765-2 (ISO-TP)"),s("OutboundLink")],1),e._v(" is used.")]),e._v(" "),s("p",[e._v("It allows a maximum number of 4095 data bytes (defined by 12 bit unsigned int length code in first frame). Flow control mechanisms ensure the reliability of data reception.")]),e._v(" "),s("p",[e._v("As a very important feature, ISO-TP allows the efficient transfer of single-frame messages with only one byte of overhead (and no flow control packets). This feature is necessary, as it is not known before if a certain function of the energy management protocol will transfer only a few bytes or a large amount of data.")]),e._v(" "),s("p",[e._v("Unfortunately, the standard is not accessible for free. However, several open source implementations (including "),s("a",{attrs:{href:"https://github.com/hartkopp/can-isotp",target:"_blank",rel:"noopener noreferrer"}},[e._v("SocketCAN for Linux"),s("OutboundLink")],1),e._v(") of the ISO-TP are available. Most important information about the frame layout can be found on "),s("a",{attrs:{href:"https://en.wikipedia.org/wiki/ISO_15765-2",target:"_blank",rel:"noopener noreferrer"}},[e._v("Wikipedia"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("h4",{attrs:{id:"single-frame-message-request-response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#single-frame-message-request-response"}},[e._v("#")]),e._v(" Single-frame message request/response")]),e._v(" "),s("p",[e._v("Application protocol data of 8 bytes or lower can be transferred using a single CAN frame. The function ID of the application protocol (byte 1) is already included in the CAN indentifier. The first byte of the CAN data contains the ISO-TP header for a single-frame message. Bytes 2 to n (with n <= 8) are contained in the remaining data bytes of the CAN frame.")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("Byte 1")]),s("th",[e._v("Byte 2")]),s("th",[e._v("...")]),s("th",[e._v("Byte 8")])])]),s("tbody",[s("tr",[s("td",[e._v("ISO-TP header")]),e._v(" "),s("td",[e._v("Application protocol (byte 2)")]),e._v(" "),s("td",[e._v("...")]),e._v(" "),s("td",[e._v("Application protocol (byte 8)")])])])]),e._v(" "),s("h4",{attrs:{id:"multi-frame-message-request-response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multi-frame-message-request-response"}},[e._v("#")]),e._v(" Multi-frame message request/response")]),e._v(" "),s("p",[e._v("More than 8 bytes of application protocol data are sent as multi-frame messages.")]),e._v(" "),s("p",[e._v("The first message contains two bytes for the ISO-TP header (including also the total message length). As the function ID (first byte of application protocol data) is already stored in the CAN identifier, the application protocol byte numbering starts with 2.")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("Byte 1")]),s("th",[e._v("Byte 2")]),s("th",[e._v("Byte 3")]),s("th",[e._v("...")]),s("th",[e._v("Byte 8")])])]),s("tbody",[s("tr",[s("td",{attrs:{colspan:"2"}},[e._v("ISO-TP header")]),e._v(" "),s("td",[e._v("Application protocol (byte 2)")]),e._v(" "),s("td",[e._v("...")]),e._v(" "),s("td",[e._v("Application protocol (byte 7)")])])])]),e._v(" "),s("p",[e._v("Consecutive messages i = 2...585 consume only one byte for the ISO-TP header:")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("Byte 1")]),s("th",[e._v("Byte 2")]),s("th",[e._v("...")]),s("th",[e._v("Byte 8")])])]),s("tbody",[s("tr",[s("td",[e._v("ISO-TP header")]),e._v(" "),s("td",[e._v("Application protocol (byte i\\*7-6)")]),e._v(" "),s("td",[e._v("...")]),e._v(" "),s("td",[e._v("Application protocol (byte i\\*7)")])])])]),e._v(" "),s("h3",{attrs:{id:"remarks-regarding-existing-transport-protocols"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#remarks-regarding-existing-transport-protocols"}},[e._v("#")]),e._v(" Remarks regarding existing transport protocols")]),e._v(" "),s("p",[e._v("Several other transport protocols for CAN have been defined in different standards.")]),e._v(" "),s("p",[e._v("For the J1939 protocol, the transport protocol is specified in the standard "),s("strong",[e._v("SAE J1939-21")]),e._v(". Two types of transport protocol are defined: The Connection Mode Data Transfer (CMDT) and the Broadcast Announce Message (BAM). CMDT is used to exchange data between two nodes. It includes methods for flow control and handshake. BAM is more simple and broadcasts a multi-packet message to the bus without feedback if the message was received.")]),e._v(" "),s("p",[e._v("CMDT and BAM allow to transfer 9 to 1785 bytes (255 packets * 7 bytes) of payload. It is not allowed to transfer 0 to 8 bytes using the J1939 transport protocols. Thus, we need to know before if a message needs the mechanisms of the transport protocol or not. This is not possible for the flexible energy management protocol, as the same functions might transfer either very little data (e.g. write 16-bit integer) or a large amount of data (e.g. write a strings). Data with less than 9 bytes would have to be stuffed, making the protocol very inefficient. A message which could fit into a single CAN frame would need 5 frames (including flow control) when using CMDT and stuffing.")]),e._v(" "),s("p",[e._v("The "),s("strong",[e._v("RV-C")]),e._v(" standard defines a different transport protocol than SAE J1939, which also allows the transfer of up to 1785 bytes. However, is does not specify any flow control mechanisms at all. So it is not possible to determine if a message was received even for a communication between only two nodes, which is not acceptable.")]),e._v(" "),s("p",[e._v("NMEA 2000 uses the same transport protocol as the SAE J1939 protocol. In addition to that, it defines a so-called fast packet protocol. With "),s("strong",[e._v("NMEA 2000 fast packet protocol")]),e._v(', 223 bytes can be transferred without flow control, thus, making it more efficient and "fast".')]),e._v(" "),s("p",[e._v("With the fast packet protocol, a single frame transfer is possible. However, a single frame message consumes 2 out of 8 bytes for the fast packet header information. This is considered too high overhead if it is unknown whether a single or multi-frame message has to be used. The Tiny-TP (see below) for the data object publication messages is based on the NMEA 2000 fast packet protocol, but reduces its overhead for single frame messages.")]),e._v(" "),s("p",[e._v("Overview of different CAN based transport protocols:")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th"),e._v(" "),s("th",{staticStyle:{"text-align":"center"}},[e._v("ISO-TP")]),e._v(" "),s("th",{staticStyle:{"text-align":"center"}},[e._v("NMEA 2000"),s("br"),e._v("fast packet")]),e._v(" "),s("th",{staticStyle:{"text-align":"center"}},[e._v("SAE J1939-21")]),e._v(" "),s("th",{staticStyle:{"text-align":"center"}},[e._v("RV-C")])])]),e._v(" "),s("tbody",[s("tr",[s("td",[e._v("Number of data bytes")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("0..4095")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("0..223")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("9..1785")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("9..1785")])]),e._v(" "),s("tr",[s("td",[e._v("Flow control")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("yes")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("yes")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")])]),e._v(" "),s("tr",[s("td",[e._v("Efficient single frame")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("yes")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")])]),e._v(" "),s("tr",[s("td",[e._v("Open standard")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("no")]),e._v(" "),s("td",{staticStyle:{"text-align":"center"}},[e._v("yes")])])])]),e._v(" "),s("h2",{attrs:{id:"data-object-publication-message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-object-publication-message"}},[e._v("#")]),e._v(" Data object publication message")]),e._v(" "),s("h3",{attrs:{id:"can-identifier-layout-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#can-identifier-layout-3"}},[e._v("#")]),e._v(" CAN identifier layout")]),e._v(" "),s("p",[e._v("Publication messages are not sent to a single node, so the destination address does not need to be specified. So, instead of the function ID byte and the destination address byte, the data object ID is specified in the CAN identifier to have more bytes available for payload in the data bytes.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(275),alt:"CAN data object publication message ID"}})]),e._v(" "),s("ul",[s("li",[e._v("Priority (28-26): Defines the importance of the message. For data object publication messages, only 4 (high priority), 5 (medium priority) and 6 (low priority) are valid.")]),e._v(" "),s("li",[e._v("Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus")]),e._v(" "),s("li",[e._v("Message type (24): 1b for data object publication message")]),e._v(" "),s("li",[e._v("Data object ID (23-8): Data object ID of application layer protocol which is published. The most significant byte of this 16-bit ID is stored first (bits 23 to 16).")]),e._v(" "),s("li",[e._v("Source address (7-0): Source node address (255 for anonymous message during address claiming)")])]),e._v(" "),s("h3",{attrs:{id:"can-data-format"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#can-data-format"}},[e._v("#")]),e._v(" CAN data format")]),e._v(" "),s("h4",{attrs:{id:"data-type-and-content"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#data-type-and-content"}},[e._v("#")]),e._v(" Data type and content")]),e._v(" "),s("p",[e._v("The first byte of the payload defines the data type of the published data object. The data type is encoded using a 6-bit unsigned integer. The first two bits of the byte can be used for other purposes (see below).")]),e._v(" "),s("p",[e._v("The following data types are defined:")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",[e._v("6-bit typeID")]),e._v(" "),s("th",[e._v("CBOR type")]),e._v(" "),s("th",[e._v("CBOR description")])])]),e._v(" "),s("tbody",[s("tr",[s("td",[e._v("0x00")]),e._v(" "),s("td",[e._v("0x18")]),e._v(" "),s("td",[e._v("Unsigned integer (one-byte uint8_t follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x01")]),e._v(" "),s("td",[e._v("0x19")]),e._v(" "),s("td",[e._v("Unsigned integer (two-byte uint16_t follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x02")]),e._v(" "),s("td",[e._v("0x1a")]),e._v(" "),s("td",[e._v("Unsigned integer (four-byte uint32_t follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x03")]),e._v(" "),s("td",[e._v("0x1b")]),e._v(" "),s("td",[e._v("Unsigned integer (eight-byte uint64_t follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x04")]),e._v(" "),s("td",[e._v("0x38")]),e._v(" "),s("td",[e._v("Negative integer -1-n (one-byte uint8_t for n follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x05")]),e._v(" "),s("td",[e._v("0x39")]),e._v(" "),s("td",[e._v("Negative integer -1-n (two-byte uint16_t for n follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x06")]),e._v(" "),s("td",[e._v("0x3a")]),e._v(" "),s("td",[e._v("Negative integer -1-n (four-byte uint32_t for n follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x07")]),e._v(" "),s("td",[e._v("0x3b")]),e._v(" "),s("td",[e._v("Negative integer -1-n (eight-byte uint64_t for n follows)")])]),e._v(" "),s("tr",[s("td",[e._v("0x08")]),e._v(" "),s("td",[e._v("0x58")]),e._v(" "),s("td",[e._v("byte string (one-byte uint8_t for n, and then n bytes follow)")])]),e._v(" "),s("tr",[s("td",[e._v("0x0C")]),e._v(" "),s("td",[e._v("0x78")]),e._v(" "),s("td",[e._v("UTF-8 string (one-byte uint8_t for n, and then n bytes follow)")])]),e._v(" "),s("tr",[s("td",[e._v("0x10")]),e._v(" "),s("td",[e._v("0x98")]),e._v(" "),s("td",[e._v("array (one-byte uint8_t for n, and then n data items follow)")])]),e._v(" "),s("tr",[s("td",[e._v("0x14")]),e._v(" "),s("td",[e._v("0xb8")]),e._v(" "),s("td",[e._v("map (one-byte uint8_t for n, and then n pairs fo data items follow)")])]),e._v(" "),s("tr",[s("td",[e._v("0x1E")]),e._v(" "),s("td",[e._v("0xfa")]),e._v(" "),s("td",[e._v("Single-Precision Float (four-byte IEEE 754)")])]),e._v(" "),s("tr",[s("td",[e._v("0x1F")]),e._v(" "),s("td",[e._v("0xfb")]),e._v(" "),s("td",[e._v("Double-Precision Float (eight-byte IEEE 754)")])]),e._v(" "),s("tr",[s("td",[e._v("0x20")]),e._v(" "),s("td",[e._v("0xc0")]),e._v(" "),s("td",[e._v("Text-based date/time (data item follows; see section 2.4.1")])]),e._v(" "),s("tr",[s("td",[e._v("0x21")]),e._v(" "),s("td",[e._v("0xc1")]),e._v(" "),s("td",[e._v("Epoch-based date/time (data item follows; see section 2.4.1")])]),e._v(" "),s("tr",[s("td",[e._v("0x24")]),e._v(" "),s("td",[e._v("0xc4")]),e._v(" "),s("td",[e._v('Decimal Fraction (data item "array" follows; see Section 2.4.3')])]),e._v(" "),s("tr",[s("td",[e._v("0x3C")]),e._v(" "),s("td",[e._v("0xf4")]),e._v(" "),s("td",[e._v("False")])]),e._v(" "),s("tr",[s("td",[e._v("0x3D")]),e._v(" "),s("td",[e._v("0xf5")]),e._v(" "),s("td",[e._v("True")])]),e._v(" "),s("tr",[s("td",[e._v("0x3E")]),e._v(" "),s("td",[e._v("0xf6")]),e._v(" "),s("td",[e._v("Null")])]),e._v(" "),s("tr",[s("td",[e._v("0x3F")]),e._v(" "),s("td",[e._v("0xf7")]),e._v(" "),s("td",[e._v("Undefined")])])])]),e._v(" "),s("p",[e._v("The data type is compatible with the CBOR format used in the ThingSet application layer protocol. The 6-bit data type ID can be converted to a valid CBOR first byte using simple bit-shift operations.")]),e._v(" "),s("p",[e._v("Assuming the data of the CAN frame is stored in an array data[0...7], use the following operation to generate valid CBOR data for type ID < 0x20 (stored in data[0]) :")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("data[0] = (data[0] & 0x1C) << 3 + (data[0] & 0x03) + 0x18\n")])])]),s("p",[e._v("For data type ID >= 0x20 (stored in data[0]) the bit shifting operation is slightly different:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("data[0] = (data[0] & 0x18) << 1 + (data[0] & 0x07) + 0xC0\n")])])]),s("p",[e._v("Of course, you can also store a map of the above table and replace the 6-bit typeID by the CBOR type. However, the bit-shift operations will be more efficient.")]),e._v(" "),s("p",[e._v("Using above method, the generated CBOR might not be the most compact form, as the values stored directly in the first byte (e.g. 0..23) are not used. However, the generated data is still valid CBOR.")]),e._v(" "),s("h4",{attrs:{id:"time-stamp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#time-stamp"}},[e._v("#")]),e._v(" Time stamp")]),e._v(" "),s("p",[e._v("In order to acquire real-time measurement values, a 16-bit timestamp (unsigned int) can be appended to the data content bytes. The timestamp contains the 16 least significant bits of the microcontroller's system clock in milliseconds. It is a rolling counter and restarts at 0 after an overflow. The timestamp cannot be used to determine the absolute time of a measurement, but the time difference between subsequent measurements. This is important to obtain correct sampling of time-series data if higher priority messages cause a delay of the data delivery on the bus.")]),e._v(" "),s("p",[e._v("The second bit of the first byte defines if the time stamp is present or not (see below).")]),e._v(" "),s("h4",{attrs:{id:"tiny-transport-protocol-tiny-tp-for-message-broadcasting"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tiny-transport-protocol-tiny-tp-for-message-broadcasting"}},[e._v("#")]),e._v(" Tiny transport protocol (Tiny-TP) for message broadcasting")]),e._v(" "),s("p",[e._v("The transport protocol for the data object publication messages is much more simple and lightweight than the ISO-TP used for the service messages described above.")]),e._v(" "),s("p",[e._v("It fulfills the following requirements:")]),e._v(" "),s("ul",[s("li",[e._v("Minimum overhead for single-frame messages")]),e._v(" "),s("li",[e._v("No flow control")]),e._v(" "),s("li",[e._v("Comparably low maximum data length to allow small buffer sizes")])]),e._v(" "),s("p",[e._v("The Tiny-TP adds a header of 1 byte to each message with the following format:")]),e._v(" "),s("ul",[s("li",[e._v("bit 7: multi-frame message")]),e._v(" "),s("li",[e._v("bit 6: last frame")]),e._v(" "),s("li",[e._v("bits 5-4: sequence identifier (2-bit unsigned integer)")]),e._v(" "),s("li",[e._v("bits 3-0: frame count (4-bit unsigned integer)")])]),e._v(" "),s("p",[e._v("For a multi-frame message, bit 7 is set to 1, for a single-frame message to 0. In case of a single-frame message, the remaining 7 bits of the Tiny-TP header might be used as payload data.")]),e._v(" "),s("p",[e._v("The last frame is identified with bit 6 set to 1. For all other multi-frame packets it must be set to 0.")]),e._v(" "),s("p",[e._v("In order to distinguish different messages with the same CAN ID, bits 5-4 contain a sequence identifier which is incremented each time a multi-packet message transfer for the same CAN ID (i.e. data object ID) is started.")]),e._v(" "),s("p",[e._v("The last four bits (3-0) contain a frame counter. The first frame of a multi-frame message starts with the frame counter set to 0. A maximum total number of 16 multi-frame messages is possible, resulting in a maximum of 2^4*7 = 112 bytes maximum message length.")]),e._v(" "),s("p",[e._v("Compared to NMEA 2000 fast-packet, the Tiny-TP format reduces the overhead of single-frame messages from two bytes to as low as 1 bit.")]),e._v(" "),s("h4",{attrs:{id:"single-frame-data-publication-message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#single-frame-data-publication-message"}},[e._v("#")]),e._v(" Single-frame data publication message")]),e._v(" "),s("p",[e._v("A single-frame message uses only the first bit of the Tiny-TP. The remaining bits of the first byte are used for a timestamp flag and the data type, thus using the 8 CAN data bytes very efficiently.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(276),alt:"CAN data object publication message ID"}})]),e._v(" "),s("ul",[s("li",[e._v("Multi-frame message flag: 0b (single-frame message)")]),e._v(" "),s("li",[e._v("Timestamp flag: 1b if timestamp will be sent, otherwise 0b")]),e._v(" "),s("li",[e._v("Data type: 6-bit unsigned int (see application protocol)")]),e._v(" "),s("li",[e._v("Data / Timestamp bytes: data bytes depending on data type, 16-bit timestamp appended if timestamp flag set.")])]),e._v(" "),s("h4",{attrs:{id:"multi-frame-data-publication-message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multi-frame-data-publication-message"}},[e._v("#")]),e._v(" Multi-frame data publication message")]),e._v(" "),s("p",[e._v("Multi-frame messages need the entire first byte for the Tiny-TP header information. The timestamp flag and the data type are moved to the second byte, followed by the data content and timestamp (if enabled).")]),e._v(" "),s("p",[s("img",{attrs:{src:a(277),alt:"CAN data object publication message ID"}})]),e._v(" "),s("ul",[s("li",[e._v("Multi-frame message flag: 1b")]),e._v(" "),s("li",[e._v("Last frame flag: 0b")]),e._v(" "),s("li",[e._v("Sequence identifier: 0-3 (incremented for each start of multi-packet message transmission for given CAN ID)")]),e._v(" "),s("li",[e._v("Frame count: 0 (first frame)")]),e._v(" "),s("li",[e._v("Timestamp flag: 1b if timestamp will be sent, otherwise 0b")]),e._v(" "),s("li",[e._v("Data type: 6-bit unsigned int (see application protocol)")]),e._v(" "),s("li",[e._v("Data / Timestamp bytes: data bytes depending on data type, 16-bit timestamp appended if timestamp flag set.")])]),e._v(" "),s("p",[e._v("Consecutive messages also contain the Tiny-TP header, directly followed by the data / timestamp bytes.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(278),alt:"CAN data object publication message ID"}})]),e._v(" "),s("ul",[s("li",[e._v("Multi-frame message flag: 1b")]),e._v(" "),s("li",[e._v("Last frame flag: 1b if last frame, otherwise 0b")]),e._v(" "),s("li",[e._v("Sequence identifier: 0-3 (see above)")]),e._v(" "),s("li",[e._v("Frame count: 0-15")]),e._v(" "),s("li",[e._v("Data / Timestamp bytes: data bytes depending on data type, 16-bit timestamp appended if timestamp flag set.")])]),e._v(" "),s("h1",{attrs:{id:"can-physical-layer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#can-physical-layer"}},[e._v("#")]),e._v(" CAN Physical layer")]),e._v(" "),s("p",[e._v("ToDo:")]),e._v(" "),s("ul",[s("li",[e._v("RJ45 connector using CANopen pinout")]),e._v(" "),s("li",[e._v("Bus Power supply")])])])}),[],!1,null,null,null);t.default=i.exports}}]);
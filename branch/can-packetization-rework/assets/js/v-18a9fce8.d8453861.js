"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3151],{3374:(e,t,n)=>{n.r(t),n.d(t,{data:()=>l});const l={key:"v-18a9fce8",path:"/spec/v0.1/general.html",title:"General Concept",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"Message Types",slug:"message-types",children:[]},{level:2,title:"Protocol Modes",slug:"protocol-modes",children:[]},{level:2,title:"Data Objects",slug:"data-objects",children:[{level:3,title:"Data object categories",slug:"data-object-categories",children:[]},{level:3,title:"Examples",slug:"examples",children:[]},{level:3,title:"Units",slug:"units",children:[]}]},{level:2,title:"Functions",slug:"functions",children:[{level:3,title:"Overview of currently defined request functions",slug:"overview-of-currently-defined-request-functions",children:[]},{level:3,title:"Possible future request functions (not yet specified)",slug:"possible-future-request-functions-not-yet-specified",children:[]},{level:3,title:"Text-based protocol",slug:"text-based-protocol",children:[]},{level:3,title:"Response functions (status codes)",slug:"response-functions-status-codes",children:[]}]}],filePathRelative:"spec/v0.1/general.md",git:{updatedTime:170759614e4}}},6050:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ye});var l=n(6252),a=n(7341),o=n(3088);const r=(0,l._)("h1",{id:"general-concept",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#general-concept","aria-hidden":"true"},"#"),(0,l.Uk)(" General Concept")],-1),s=(0,l.Uk)("The ThingSet protocol provides a consistent, standardized way to configure, monitor and control ressource-constrained devices via different communication interfaces. It specifies the higher layers (5 to 7) of the "),i={href:"https://en.wikipedia.org/wiki/OSI_model",target:"_blank",rel:"noopener noreferrer"},u=(0,l.Uk)("OSI (Open Systems Interconnection) model"),d=(0,l.Uk)(". The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, LoRa, WiFi, Bluetooth, UART (serial) or similar."),c=(0,l._)("p",null,[(0,l._)("img",{src:a,alt:"ISO/OSI layer setup"})],-1),h=(0,l._)("p",null,"The underlying layers have to ensure reliable transfer, correct packet order (if messages are packetized) and error-checking of the transferred data.",-1),_=(0,l._)("h2",{id:"message-types",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#message-types","aria-hidden":"true"},"#"),(0,l.Uk)(" Message Types")],-1),p=(0,l._)("p",null,"ThingSet defines three types of messages: Requests, responses and publication messages.",-1),f=(0,l._)("p",null,"The communication between two specific devices uses a request/response messaging pattern via so-called channels. A communication channel can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several devices attached (e.g. CAN, Ethernet, WiFi, LoRa). In case of a network, each device/node has to be uniquely addressable.",-1),b=(0,l._)("p",null,[(0,l._)("img",{src:o,alt:"Communication Channels"})],-1),m=(0,l._)("p",null,"The device acts as the server and responds to the requests by a client. The client might be a laptop or mobile phone with a human interface application.",-1),g=(0,l._)("p",null,"The data transfer is always synchronous: The client sends a request, waits for the response (status code and/or requested data), handles the data of the response and possibly starts with additional requests.",-1),y=(0,l._)("p",null,"Monitoring data is not intended for only a single device, but could be interesting for several devices (e.g. data logger, display, human interface device, etc.). Thus, the monitoring data is exchanged via a publish/subscribe messaging pattern.",-1),v=(0,l._)("p",null,[(0,l.Uk)("Publication messages are directly broadcast through the network. There is "),(0,l._)("em",null,"no"),(0,l.Uk)(" intermediate broker (like in MQTT) to store the messages and published messages are "),(0,l._)("em",null,"not"),(0,l.Uk)(" confirmed by recipients, so there is no guarantee if the message was received.")],-1),w=(0,l._)("h2",{id:"protocol-modes",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#protocol-modes","aria-hidden":"true"},"#"),(0,l.Uk)(" Protocol Modes")],-1),x=(0,l._)("p",null,"Similar to Modbus, the ThingSet protocol supports two different modes: A human-readable text-based mode and a binary mode.",-1),k=(0,l.Uk)("In the text-based mode, payload data is encoded in JSON format ("),I={href:"https://tools.ietf.org/html/rfc8259",target:"_blank",rel:"noopener noreferrer"},D=(0,l.Uk)("RFC 8259"),T=(0,l.Uk)("). This mode is recommended when using USB or serial interfaces as the low layer protocol, as it can be easily used directly on a terminal."),U=(0,l.Uk)("The binary protocol uses the CBOR binary encoding ("),j={href:"https://tools.ietf.org/html/rfc7049",target:"_blank",rel:"noopener noreferrer"},S=(0,l.Uk)("RFC 7049"),q=(0,l.Uk)(") instead of JSON payload data in order to reduce the protocol overhead for ressource-constrained devices or low bandwith communication protocols like CAN and LoRa."),C=(0,l._)("p",null,"Each device must implement the binary encoding of the protocol. The the text-based JSON variant is optional, but recommended.",-1),F=(0,l._)("h2",{id:"data-objects",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#data-objects","aria-hidden":"true"},"#"),(0,l.Uk)(" Data Objects")],-1),R=(0,l._)("p",null,"All accessible data of a device is structured in so-called data objects. A data object might be any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar data.",-1),O=(0,l._)("p",null,'Each data object is identified by a unique Data Object ID. The ID can be chosen by the firmware developer. In addition to that, each data object has a unique name. The name is a short ASCII string without blanks, e.g. "vBat" for the battery voltage.',-1),A=(0,l.Uk)("For reduced memory useage, "),W={href:"https://en.wikipedia.org/wiki/Camel_case",target:"_blank",rel:"noopener noreferrer"},B=(0,l.Uk)("lower camel-case style"),E=(0,l.Uk)(" should be used for the data object names. The first letter(s) should specify the type of value if applicable:"),P=(0,l._)("ul",null,[(0,l._)("li",null,"v for voltage"),(0,l._)("li",null,"e for energy"),(0,l._)("li",null,"i for current"),(0,l._)("li",null,"t for time"),(0,l._)("li",null,"temp for temperature")],-1),N=(0,l._)("p",null,"The numeric IDs are used in the binary protocol for increased efficiency and performance. For all interactions with users and in the text-based mode, only the object name is used.",-1),M=(0,l._)("h3",{id:"data-object-categories",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#data-object-categories","aria-hidden":"true"},"#"),(0,l.Uk)(" Data object categories")],-1),L=(0,l._)("p",null,"Each data object belongs to one of the following categories (associated to a category ID of 4 bits):",-1),G=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Category name (JSON)"),(0,l._)("th",null,"Category ID"),(0,l._)("th",null,"Description"),(0,l._)("th",null,"Access")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"*"),(0,l._)("td",null,"0x0"),(0,l._)("td",null,"Wildcard ID, representing all IDs"),(0,l._)("td")]),(0,l._)("tr",null,[(0,l._)("td",null,"info"),(0,l._)("td",null,"0x1"),(0,l._)("td",null,"Read-only device information (e.g. manufacturer, software version)"),(0,l._)("td")]),(0,l._)("tr",null,[(0,l._)("td",null,"setup"),(0,l._)("td",null,"0x2"),(0,l._)("td",null,"User-configurable settings"),(0,l._)("td",null,"read/write access, may be protected with user password")]),(0,l._)("tr",null,[(0,l._)("td",null,"input"),(0,l._)("td",null,"0x3"),(0,l._)("td",null,"Input channels (e.g. actuators)"),(0,l._)("td",null,"write access")]),(0,l._)("tr",null,[(0,l._)("td",null,"output"),(0,l._)("td",null,"0x4"),(0,l._)("td",null,"Output channels (e.g. sensor data)"),(0,l._)("td",null,"read access")]),(0,l._)("tr",null,[(0,l._)("td",null,"rpc"),(0,l._)("td",null,"0x5"),(0,l._)("td",null,"remote procedure call"),(0,l._)("td",null,"partly access restricted")]),(0,l._)("tr",null,[(0,l._)("td",null,"calibration"),(0,l._)("td",null,"0x6"),(0,l._)("td",null,"Factory-calibrated settings"),(0,l._)("td",null,"read/write access, protected")]),(0,l._)("tr",null,[(0,l._)("td",null,"diagnosis"),(0,l._)("td",null,"0x7"),(0,l._)("td",null,"Error memory, etc.,"),(0,l._)("td",null,"read access, at least partly protected")]),(0,l._)("tr",null,[(0,l._)("td"),(0,l._)("td",null,"0x8-0xE"),(0,l._)("td",null,"Reserved for future use"),(0,l._)("td",null,"unknown")]),(0,l._)("tr",null,[(0,l._)("td"),(0,l._)("td",null,"0xF"),(0,l._)("td",null,"Reserved (termination character in binary protocol)"),(0,l._)("td",null,"n/a")])])],-1),J=(0,l._)("p",null,"Data object IDs are stored as 16-bit unsigned integers. The ID includes the category ID of 4 bits. The remaining 12 bits can be freely chosen. In total, 4095 different values can be associated via an ID per category, with 0 being the wildcard ID again. The wildcard category and data object IDs are used to query the accessible data of a device (see below).",-1),z=(0,l._)("p",null,"The follwing table describes the bits inside the 2-byte unique data object ID:",-1),K=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",{colspan:"2"},"Byte 1"),(0,l._)("th",null,"Byte 2")]),(0,l._)("tr",null,[(0,l._)("th",null,"b15 ... b12"),(0,l._)("th",null,"b11 ... b8"),(0,l._)("th",null,"b7 ... b0")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"Category ID"),(0,l._)("td",{colspan:"2"},"Object Number")]),(0,l._)("tr",null,[(0,l._)("td",{colspan:"3"},"Data Object ID")])])],-1),H=(0,l._)("h3",{id:"examples",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#examples","aria-hidden":"true"},"#"),(0,l.Uk)(" Examples")],-1),V=(0,l._)("p",null,"For explanation of the protocol functions, the following exemplary device data object structure will be used:",-1),Q=(0,l._)("pre",null,[(0,l._)("code",null,'{\n    "info" : {\n        "manufacturer" : "Test Company Inc."\n    },\n    "input" : {\n        "enableSwitch" : true\n    },\n    "output" : {\n        "vBat"     : 14.2,\n        "tAmbient" : 22\n    }\n}\n')],-1),Y=(0,l._)("p",null,"The above data structure contains 4 data objects in total, grouped into 3 different categories (info, output and input). The device will have an internal map to associate the object name with a unique ID. In C code this might look like the following:",-1),X=(0,l._)("pre",null,[(0,l._)("code",null,'struct data_object_t {\n    char* name;\n    uint16_t id;\n};\n\nconst data_object_t data_objects[] = {\n    {"manufacturer", 0x1001}, // ID = (0x1 << 12) + 1 = 0x1001\n    {"enableSwitch", 0x3001}, // ID = (0x3 << 12) + 1 = 0x3001\n    {"vBat",         0x4001}, // ID = (0x4 << 12) + 1 = 0x4001\n    {"tAmbient",     0x4002}  // ID = (0x4 << 12) + 2 = 0x4002\n};\n')],-1),Z=(0,l._)("p",null,"In addition to that, the programmer must link the name or ID to the actual variable containing the data.",-1),$=(0,l._)("h3",{id:"units",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#units","aria-hidden":"true"},"#"),(0,l.Uk)(" Units")],-1),ee=(0,l._)("p",null,"All data communicated with the outside world must use SI units, so it is not necessary to specify the unit of each data object. The data types (see below) are used for scaling of the data.",-1),te=(0,l._)("p",null,'If the basic SI unit for a given measurement value is not common or not feasible (e.g. use of kWh for energy instead of Ws), the unit must be explicitly defined with an underscore in the name of the data object, e.g. "eBattery_kWh" for the battery energy content in kWh. Units which cannot be derived from the SI basic units (e.g. °F) are not allowed.',-1),ne=(0,l._)("p",null,[(0,l._)("strong",null,"ToDo:"),(0,l.Uk)(),(0,l._)("em",null,"What about nautical miles and knots...? makes a lot of sense to allow for maritime applications. But it's not at all compatible with SI system...")],-1),le=(0,l._)("p",null,"For temperatures, Kelvin (K) is the official SI unit. However, °C is compatible with K and is allowed, if specified in the data object name.",-1),ae=(0,l._)("p",null,[(0,l.Uk)("It is "),(0,l._)("em",null,"not"),(0,l.Uk)(" allowed to publish a voltage in millivolts (mV) instead of volts (V). Instead, the decimal fraction data type of CBOR can be used in the binary protocol, if internal calculation is done in fixed point math.")],-1),oe=(0,l._)("h2",{id:"functions",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#functions","aria-hidden":"true"},"#"),(0,l.Uk)(" Functions")],-1),re=(0,l._)("p",null,"Each request fulfills a specified function, e.g. a command to read data from the device. The function is associated to a unique function ID, which defines the layout of the payload and the actions to be performed.",-1),se=(0,l._)("p",null,"The different functions are encoded using 1 byte, i.e. a number between 0 and 255.",-1),ie=(0,l._)("p",null,"Function IDs 10, 13 and 32-127 are reserved, as they represent the ASCII characters for readable text including CR and LF. Invalid function IDs are ignored by the ThingSet parser, so that other text output (e.g. status information) can be used in parallel to the ThingSet protocol on the same serial interface.",-1),ue=(0,l._)("p",null,"The ASCII characters '!', '#' and ':' (function IDs 33, 35 and 58) are used as identifiers for the text mode protocol (see below). In this way, text-based or binary mode can be automatically detected based on the first byte.",-1),de=(0,l._)("p",null,"The ID of a response includes a status code which shows if the request could be handled successfully. The ID is calculated as 0x80 + status code. For status codes between 0 and 29, the response was successful. If the status code is greater than or equal to 30, an error occured. The remaining bits are used to specify the error in more detail.",-1),ce=(0,l._)("h3",{id:"overview-of-currently-defined-request-functions",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#overview-of-currently-defined-request-functions","aria-hidden":"true"},"#"),(0,l.Uk)(" Overview of currently defined request functions")],-1),he=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Function ID"),(0,l._)("th",null,"Function name"),(0,l._)("th",null,"Description")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"0x01"),(0,l._)("td",null,"read"),(0,l._)("td",null,"Read data object(s)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x02"),(0,l._)("td",null,"write"),(0,l._)("td",null,"Write data object(s)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x03"),(0,l._)("td",null,"list"),(0,l._)("td",null,"List all data objects of one category (device-discovery)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x04"),(0,l._)("td",null,"name"),(0,l._)("td",null,"Get the name of a function by ID")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x05"),(0,l._)("td",null,"pub"),(0,l._)("td",null,"Request publication of data object(s)")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x06"),(0,l._)("td",null,"auth"),(0,l._)("td",null,"Authentication for access to access-restricted data objects")])])],-1),_e=(0,l._)("h3",{id:"possible-future-request-functions-not-yet-specified",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#possible-future-request-functions-not-yet-specified","aria-hidden":"true"},"#"),(0,l.Uk)(" Possible future request functions (not yet specified)")],-1),pe=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Function ID"),(0,l._)("th",null,"Function name"),(0,l._)("th",null,"Description")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"?"),(0,l._)("td",null,"ping"),(0,l._)("td",null,"Ping a device")]),(0,l._)("tr",null,[(0,l._)("td",null,"?"),(0,l._)("td",null,"sync"),(0,l._)("td",null,"Time synchronization")]),(0,l._)("tr",null,[(0,l._)("td",null,"?"),(0,l._)("td",null,"file"),(0,l._)("td",null,"File access")]),(0,l._)("tr",null,[(0,l._)("td",null,"?"),(0,l._)("td",null,"reset"),(0,l._)("td",null,"Reset the device")]),(0,l._)("tr",null,[(0,l._)("td",null,"?"),(0,l._)("td",null,"dfu"),(0,l._)("td",null,"Device firmware upgrade.")])])],-1),fe=(0,l._)("h3",{id:"text-based-protocol",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#text-based-protocol","aria-hidden":"true"},"#"),(0,l.Uk)(" Text-based protocol")],-1),be=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Function ID"),(0,l._)("th",null,"ASCII character"),(0,l._)("th",null,"Description")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"0x21 (33)"),(0,l._)("td",null,"!"),(0,l._)("td",null,"Request")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x3a (58)"),(0,l._)("td",null,":"),(0,l._)("td",null,"Response")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x23 (35)"),(0,l._)("td",null,"#"),(0,l._)("td",null,"Publication message")])])],-1),me=(0,l._)("h3",{id:"response-functions-status-codes",tabindex:"-1"},[(0,l._)("a",{class:"header-anchor",href:"#response-functions-status-codes","aria-hidden":"true"},"#"),(0,l.Uk)(" Response functions (status codes)")],-1),ge=(0,l._)("table",null,[(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Function ID"),(0,l._)("th",null,"Status Code"),(0,l._)("th",null,"Description")])]),(0,l._)("tbody",null,[(0,l._)("tr",null,[(0,l._)("td",null,"0x80 (128)"),(0,l._)("td",null,"0x00 (0)"),(0,l._)("td",null,"Success.")]),(0,l._)("tr",null,[(0,l._)("td",null,"0x81 (129)"),(0,l._)("td",null,"0x01 (1)"),(0,l._)("td",null,"Partial Success. (e.g. not all data values could be changed)")]),(0,l._)("tr",null,[(0,l._)("td",null,"158"),(0,l._)("td",null,"30"),(0,l._)("td",null,"General Error.")]),(0,l._)("tr",null,[(0,l._)("td",null,"159"),(0,l._)("td",null,"31"),(0,l._)("td",null,"Unknown/unsupported function.")]),(0,l._)("tr",null,[(0,l._)("td",null,"160"),(0,l._)("td",null,"32"),(0,l._)("td",null,"Unknown data object.")]),(0,l._)("tr",null,[(0,l._)("td",null,"161"),(0,l._)("td",null,"33"),(0,l._)("td",null,"Wrong format.")]),(0,l._)("tr",null,[(0,l._)("td",null,"162"),(0,l._)("td",null,"34"),(0,l._)("td",null,"Wrong data type.")]),(0,l._)("tr",null,[(0,l._)("td",null,"163"),(0,l._)("td",null,"35"),(0,l._)("td",null,"Device busy.")]),(0,l._)("tr",null,[(0,l._)("td",null,"164"),(0,l._)("td",null,"36"),(0,l._)("td",null,"Access denied.")]),(0,l._)("tr",null,[(0,l._)("td",null,"165"),(0,l._)("td",null,"37"),(0,l._)("td",null,"Request too long.")]),(0,l._)("tr",null,[(0,l._)("td",null,"166"),(0,l._)("td",null,"38"),(0,l._)("td",null,"Response too long.")])])],-1),ye={render:function(e,t){const n=(0,l.up)("OutboundLink");return(0,l.wg)(),(0,l.iD)(l.HY,null,[r,(0,l._)("p",null,[s,(0,l._)("a",i,[u,(0,l.Wm)(n)]),d]),c,h,_,p,f,b,m,g,y,v,w,x,(0,l._)("p",null,[k,(0,l._)("a",I,[D,(0,l.Wm)(n)]),T]),(0,l._)("p",null,[U,(0,l._)("a",j,[S,(0,l.Wm)(n)]),q]),C,F,R,O,(0,l._)("p",null,[A,(0,l._)("a",W,[B,(0,l.Wm)(n)]),E]),P,N,M,L,G,J,z,K,H,V,Q,Y,X,Z,$,ee,te,ne,le,ae,oe,re,se,ie,ue,de,ce,he,_e,pe,fe,be,me,ge],64)}}},3088:(e,t,n)=>{e.exports=n.p+"assets/img/communication_channels.3160ceed.png"},7341:(e,t,n)=>{e.exports=n.p+"assets/img/osi_layers.0b9d7abb.png"}}]);
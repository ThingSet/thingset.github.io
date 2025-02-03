(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{405:function(e,t,a){"use strict";a.r(t);var n=a(42),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"binary-mode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#binary-mode"}},[e._v("#")]),e._v(" Binary Mode")]),e._v(" "),a("p",[e._v("In the binary mode, the data is encoded using the CBOR format. The data structure is the same as in text mode, but numeric node IDs are used as identifiers by default instead of the node names.")]),e._v(" "),a("p",[e._v("The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.")]),e._v(" "),a("h3",{attrs:{id:"requests"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requests"}},[e._v("#")]),e._v(" Requests")]),e._v(" "),a("p",[e._v("Each request message consists of a first byte as the request method identifier, a path or ID specifying the endpoint of the request and CBOR data as payload (if applicable).")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("bin-request = bin-get / bin-post / bin-delete / bin-fetch / bin-ipatch / bin-nameid\n\nbin-get    = %x01 endpoint get-type\n\nbin-post   = %x02 endpoint cbor-data      ; exec or create is determined\n                                          ; based on node type\n\nbin-delete = %x04 endpoint cbor-uint      ; only for valid node IDs\n\nbin-fetch  = %x05 endpoint cbor-array     ; returns only values, no keys\n\nbin-ipatch = %x07 endpoint cbor-map\n\nbin-nameid = %x1E endpoint cbor-array     ; get names of ids or vice versa\n\nendpoint   = path         ; CBOR string: path same as text mode\n           / parent-id    ; CBOR uint: parent node ID instead of path\n           / %xF7         ; CBOR undefined: wildcard matching any path / parent\n\nget-type   = %xF7         ; CBOR undefined: returns array of node IDs (default)\n           / %x80         ; CBOR emtpy array: returns array of names\n           / %xA0         ; CBOR empty map: returns name:value map\n")])])]),a("h3",{attrs:{id:"response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[e._v("#")]),e._v(" Response")]),e._v(" "),a("p",[e._v("Responses in binary mode start with the error/status code as specified before, followed by the data if applicable.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("bin-response = %x80-FF [ cbor-data ]      ; response code and data\n")])])]),a("h3",{attrs:{id:"publication-message"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#publication-message"}},[e._v("#")]),e._v(" Publication message")]),e._v(" "),a("p",[e._v("Binary publication messages follow the same concept as in text mode.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("bin-pubmsg = %x1F cbor-map                ; map containing node IDs and values\n")])])]),a("h2",{attrs:{id:"name-and-id-mapping"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#name-and-id-mapping"}},[e._v("#")]),e._v(" Name and ID mapping")]),e._v(" "),a("p",[e._v("The examples in this chapter are based on the same data structure as introduced in the "),a("RouterLink",{attrs:{to:"/v0.3/2a_general.html#data-structure"}},[e._v("General Concept chapter")]),e._v(", but each node is identified by an ID. The assignment of IDs and names is shown in the following JSON-like structure (actual JSON supports neither numbers as keys nor comments):")],1),e._v(" "),a("div",{staticClass:"language-JSON extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"18"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// info")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"19"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"MPPT 1210 HUS"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// DeviceType")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"30"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// conf")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"31"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("14.4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                     "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// BatCharging_V")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"60"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// input")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"61"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("                      "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// EnableCharging")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"70"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// output")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"71"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("14.1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                     "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Bat_V")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"72"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("5.13")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                     "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Bat_A")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"73"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("22")]),e._v("                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Ambient_degC")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"A0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// rec")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"A1"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1984")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                     "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// BatChgDay_Wh")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"D0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// cal")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"E0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// exec")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"E1"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token null keyword"}},[e._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                     "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// reset")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"EF"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Password"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// auth")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F0"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                             "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// pub")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F1"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                         "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// serial")]),e._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F2"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Enable")]),e._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F3"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1.0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Interval")]),e._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F4"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"71"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"72"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// IDs")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F5"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("                         "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// can")]),e._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F6"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Enable")]),e._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F7"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0.1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Interval")]),e._v("\n            "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"F8"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"71"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("                "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// IDs")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),a("p",[e._v("The firmware developer is free to choose the IDs. However, above IDs for the nodes of the first layer are used by Libre Solar devices and recommended for the following reasons:")]),e._v(" "),a("ul",[a("li",[e._v("IDs from 0x00 to 0x17 are left for data nodes that are sent very often, as they consume only a single byte in CBOR encoding")]),e._v(" "),a("li",[e._v("The node IDs specifying the categories are spaced such that there should be enough free node IDs for most devices")]),e._v(" "),a("li",[e._v("As the node IDs are strictly increasing, the data layot is compatible with the draft standard "),a("a",{attrs:{href:"https://tools.ietf.org/html/draft-ietf-core-yang-cbor",target:"_blank",rel:"noopener noreferrer"}},[e._v("CBOR Encoding of Data Modeled with YANG"),a("OutboundLink")],1),e._v(".")])]),e._v(" "),a("p",[e._v("In contrast to the text mode, the binary mode has a special NAMEID request (without CoAP equivalent) that allows to get a name for an ID or vice versa.")]),e._v(" "),a("p",[a("strong",[e._v("Example 1:")]),e._v(" Request name of node IDs 0x71 and 0x72")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('Request:\n1E                                      NAMEID request\n   18 70                                # CBOR uint: 0x70 (parent ID)\n   82                                   # CBOR array (2 elements)\n      18 71                             # CBOR uint: 0x71 (node ID)\n      18 72                             # CBOR uint: 0x72 (node ID)\n\nResponse:\n85                                      Content.\n   82                                   # CBOR array (2 elements)\n      65 4261745F56                     # CBOR string: "Bat_V"\n      65 4261745F41                     # CBOR string: "Bat_A"\n')])])]),a("p",[e._v("If the parent ID is passed as the endpoint, only the data node name is returned. All requested nodes must be children of the same parend node in this case.")]),e._v(" "),a("p",[a("strong",[e._v("Example 2:")]),e._v(" Request full path of node ID 0x71 (Bat_V)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('Request:\n1E                                      NAMEID request\n   F7                                   # CBOR undefined as a wildcard\n   18 71                                # CBOR uint: 0x71 (node ID)\n\nResponse:\n85                                      Content.\n   6C 6F75747075742F4261745F56          # CBOR string: "output/Bat_V"\n')])])]),a("p",[e._v("If the path of a node is unknown (e.g. because it was obtained from a publication message), the entire path (see text mode) can be determined by setting the endpoint to undefined, as shown above.")]),e._v(" "),a("p",[a("strong",[e._v("Example 3:")]),e._v(" Request IDs for known data node names")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('Request:\n1E                                      NAMEID request\n   F7                                   # CBOR undefined as a wildcard\n   82                                   # CBOR array (2 elements)\n      65 4261745F56                     # CBOR string: "Bat_V"\n      65 4261745F41                     # CBOR string: "Bat_A"\n\nResponse:\n85                                      Content.\n   82                                   # CBOR array (2 elements)\n      18 71                             # CBOR uint: 0x71 (node ID)\n      18 72                             # CBOR uint: 0x72 (node ID)\n')])])]),a("p",[e._v("Also here a wildcard for the endpoint can be used to query the entire database. However, if multiple nodes with the same name are found, an error must be returned. This should not be the case for a properly designed data structure.")]),e._v(" "),a("h2",{attrs:{id:"read-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#read-data"}},[e._v("#")]),e._v(" Read data")]),e._v(" "),a("p",[e._v("Similar to the text mode, the binary variants of the GET and FETCH functions also allow to read one or more data objects. The objects are identified by their parent node (endpoint of a path) and their ID or their name.")]),e._v(" "),a("p",[e._v("The GET function is useful for device discovery, as it can list all childs of a node. Depending on the computing power of the device and the host, the GET request can either return only the IDs of the next layer or maps including the values. In order to be compatible to the text mode, it is also possible to retrieve all child nodes of a resource as a map of name/value pairs.")]),e._v(" "),a("p",[e._v("The binary mode also allows to work only with IDs and no paths or node names to keep message size at a minimum. In order to discover the nodes of a device, the host can first query all child IDs of a node (starting with root node of ID 0), afterwards query the names for each ID once and then request the value for any data object on demand.")]),e._v(" "),a("p",[a("strong",[e._v("Example 1:")]),e._v(" Discover all child nodes of the root node (i.e. categories)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("Request:\n01                                      GET request\n   00                                   # CBOR uint: 0x00 (root node)\n   F7                                   # CBOR undefined as a wildcard\n\nResponse:\n85                                      Content.\n   89                                   # CBOR array (9 elements)\n      18 18                             # CBOR uint: 0x18\n      18 30                             # CBOR uint: 0x30\n       ...\n      18 F0                             # CBOR data: 0xF0\n")])])]),a("p",[a("strong",[e._v("Example 2:")]),e._v(" Retrieve all data of output path (keys + values)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('Request (alternative 1):\n01                                      GET request\n   18 70                                # CBOR uint: 0x70\n   A0                                   # CBOR empty map\n\nRequest (alternative 2):\n01                                      GET request\n   66 6F7574707574                      # CBOR string: "output"\n   A0                                   # CBOR empty map\n\nResponse:\n85                                      Content.\n   A3                                   # CBOR map (3 elements)\n      65 4261745F56                     # CBOR string: "Bat_V"\n      FA 4161999A                       # CBOR float: 14.1\n      65 4261745F41                     # CBOR string: "Bat_A"\n      FA 40A428F6                       # CBOR float: 5.13\n      6C 416D6269656E745F64656743       # CBOR string: "Ambient_degC"\n      16                                # CBOR uint: 22\n')])])]),a("p",[e._v("Note that the empty map requests to respond with name/value pairs as specified in the request grammar at the beginning of the chapter.")]),e._v(" "),a("p",[a("strong",[e._v("Example 3:")]),e._v(' Retrieve value of data node "Bat_V"')]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('Request (alternative 1):\n05                                      FETCH request\n   66 6F7574707574                      # CBOR string: "output" (path)\n   65 4261745F56                        # CBOR string: "Bat_V" (node name)\n\nRequest (alternative 2):\n05                                      FETCH request\n   18 70                                # CBOR uint: 0x70 (parent ID)\n   18 71                                # CBOR uint: 0x71 (node ID)\n\nResponse:\n85                                      Content.\n   FA 4161999A                          # CBOR float: 14.1\n')])])]),a("p",[a("strong",[e._v("Example 4:")]),e._v(" Retrieve multiple data nodes:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("Request:\n05                                      FETCH request\n   18 70                                # CBOR uint: 0x70 (parent ID)\n   82                                   # CBOR array (2 elements)\n      18 71                             # CBOR uint: 0x71 (node ID)\n      18 72                             # CBOR uint: 0x72 (node ID)\n\nResponse:\n85                                      Content.\n   82                                   # CBOR array (2 elements)\n      FA 4161999A                       # CBOR float: 14.1\n      16                                # CBOR uint: 22\n")])])]),a("p",[e._v("The binary mode also allows to use data object names (strings) instead of numeric IDs, which increases the amount of transferred data.")]),e._v(" "),a("h2",{attrs:{id:"update-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#update-data"}},[e._v("#")]),e._v(" Update data")]),e._v(" "),a("p",[e._v("Requests to overwrite the value a data node.")]),e._v(" "),a("p",[e._v("The device must support a patch request using the same CBOR data type as used in the response of a GET or FETCH request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.")]),e._v(" "),a("p",[e._v("If the data type is not supported, an error status code (36) is responded.")]),e._v(" "),a("p",[a("strong",[e._v("Example 1:")]),e._v(" Disable charging")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("Request:\n07                                      PATCH request\n   18 70                                # CBOR uint: 0x70\n   A1                                   # CBOR map (1 element)\n      18 61                             # CBOR uint: 0x61\n      F4                                # CBOR data: false\n\nResponse:\n84                                      Changed.\n")])])]),a("p",[a("strong",[e._v("Example 2:")]),e._v(" Attempt to write read-only measurement values (output category)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("Request:\n07                                      PATCH request\n   A2                                   # CBOR map (2 elements)\n      18 71                             # CBOR uint: 0x71\n      FA 0x41633333                     # CBOR float32: 14.2\n      18 73                             # CBOR uint: 0x73\n      16                                # CBOR uint: 22\n\nResponse:\nA3                                      Forbidden.\n")])])]),a("h2",{attrs:{id:"create-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-data"}},[e._v("#")]),e._v(" Create data")]),e._v(" "),a("p",[e._v("Appends new data to a data node in a similar way as in the text mode.")]),e._v(" "),a("p",[a("strong",[e._v("Example 1:")]),e._v(" Add node ID 0x72 (Bat_A) to the serial publication channel")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("Request:\n02                                      POST request\n   18 F4                                # CBOR uint: 0xF4 (parent ID)\n   18 72                                # CBOR uint: 0x72 (node ID)\n\nResponse:\n81                                      Created.\n")])])]),a("h2",{attrs:{id:"delete-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#delete-data"}},[e._v("#")]),e._v(" Delete data")]),e._v(" "),a("p",[e._v("Removes data from a node of array type.")]),e._v(" "),a("p",[a("strong",[e._v("Example 1:")]),e._v(" Remove node ID 0x72 (Bat_A) from serial publication channel")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("Request:\n04                                      DELETE request\n   18 F4                                # CBOR uint: 0xF4 (parent ID)\n   18 72                                # CBOR uint: 0x72 (node ID)\n\nResponse:\n82                                      Deleted.\n")])])]),a("h2",{attrs:{id:"execute-function"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#execute-function"}},[e._v("#")]),e._v(" Execute function")]),e._v(" "),a("p",[e._v("For execution of a function, the same POST request is used as when creating data. The device decides based on the type of the endpoint whether the request is a function call or a request to create data.")]),e._v(" "),a("p",[a("strong",[e._v("Example 1:")]),e._v(" Reset the device")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("Request:\n02                                      POST request\n   18 E1                                # CBOR uint: 0xE1 (node ID)\n   80                                   # CBOR empty array\n\nResponse:\n83                                      Valid.\n")])])]),a("p",[e._v('Note that the endpoint is the node of the executable function itself. Data can be passed to the called function as the second parameter, but the "reset" function does not require any parameters, so it receives an empty array.')]),e._v(" "),a("h2",{attrs:{id:"other-functions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#other-functions"}},[e._v("#")]),e._v(" Other functions")]),e._v(" "),a("p",[e._v("Authentication, publication request setup and publication messages work analog to text mode.")])])}),[],!1,null,null,null);t.default=s.exports}}]);
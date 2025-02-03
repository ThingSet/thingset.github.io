"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[806],{197:(e,t,n)=>{n.r(t),n.d(t,{data:()=>a});const a={key:"v-d02b13e2",path:"/v0.3/2c_binary_mode.html",title:"Binary Mode",lang:"en",frontmatter:{},excerpt:"",headers:[{level:3,title:"Requests",slug:"requests",children:[]},{level:3,title:"Response",slug:"response",children:[]},{level:3,title:"Publication message",slug:"publication-message",children:[]},{level:2,title:"Name and ID mapping",slug:"name-and-id-mapping",children:[]},{level:2,title:"Read data",slug:"read-data",children:[]},{level:2,title:"Update data",slug:"update-data",children:[]},{level:2,title:"Create data",slug:"create-data",children:[]},{level:2,title:"Delete data",slug:"delete-data",children:[]},{level:2,title:"Execute function",slug:"execute-function",children:[]},{level:2,title:"Other functions",slug:"other-functions",children:[]}],filePathRelative:"v0.3/2c_binary_mode.md",git:{updatedTime:1628713248e3}}},4627:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var a=n(6252);const o=(0,a.uE)('<h1 id="binary-mode" tabindex="-1"><a class="header-anchor" href="#binary-mode" aria-hidden="true">#</a> Binary Mode</h1><p>In the binary mode, the data is encoded using the CBOR format. The data structure is the same as in text mode, but numeric node IDs are used as identifiers by default instead of the node names.</p><p>The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.</p><h3 id="requests" tabindex="-1"><a class="header-anchor" href="#requests" aria-hidden="true">#</a> Requests</h3><p>Each request message consists of a first byte as the request method identifier, a path or ID specifying the endpoint of the request and CBOR data as payload (if applicable).</p><pre><code>bin-request = bin-get / bin-post / bin-delete / bin-fetch / bin-ipatch / bin-nameid\n\nbin-get    = %x01 endpoint get-type\n\nbin-post   = %x02 endpoint cbor-data      ; exec or create is determined\n                                          ; based on node type\n\nbin-delete = %x04 endpoint cbor-uint      ; only for valid node IDs\n\nbin-fetch  = %x05 endpoint cbor-array     ; returns only values, no keys\n\nbin-ipatch = %x07 endpoint cbor-map\n\nbin-nameid = %x1E endpoint cbor-array     ; get names of ids or vice versa\n\nendpoint   = path         ; CBOR string: path same as text mode\n           / parent-id    ; CBOR uint: parent node ID instead of path\n           / %xF7         ; CBOR undefined: wildcard matching any path / parent\n\nget-type   = %xF7         ; CBOR undefined: returns array of node IDs (default)\n           / %x80         ; CBOR emtpy array: returns array of names\n           / %xA0         ; CBOR empty map: returns name:value map\n</code></pre><h3 id="response" tabindex="-1"><a class="header-anchor" href="#response" aria-hidden="true">#</a> Response</h3><p>Responses in binary mode start with the error/status code as specified before, followed by the data if applicable.</p><pre><code>bin-response = %x80-FF [ cbor-data ]      ; response code and data\n</code></pre><h3 id="publication-message" tabindex="-1"><a class="header-anchor" href="#publication-message" aria-hidden="true">#</a> Publication message</h3><p>Binary publication messages follow the same concept as in text mode.</p><pre><code>bin-pubmsg = %x1F cbor-map                ; map containing node IDs and values\n</code></pre><h2 id="name-and-id-mapping" tabindex="-1"><a class="header-anchor" href="#name-and-id-mapping" aria-hidden="true">#</a> Name and ID mapping</h2>',13),r=(0,a.Uk)("The examples in this chapter are based on the same data structure as introduced in the "),s=(0,a.Uk)("General Concept chapter"),i=(0,a.Uk)(", but each node is identified by an ID. The assignment of IDs and names is shown in the following JSON-like structure (actual JSON supports neither numbers as keys nor comments):"),d=(0,a._)("div",{class:"language-JSON ext-JSON"},[(0,a._)("pre",{class:"language-JSON"},[(0,a._)("code",null,'{\n    "18": {                             // info\n        "19": "MPPT 1210 HUS",          // DeviceType\n    },\n    "30": {                             // conf\n        "31": 14.4,                     // BatCharging_V\n    },\n    "60": {                             // input\n        "61": true                      // EnableCharging\n    },\n    "70": {                             // output\n        "71": 14.1,                     // Bat_V\n        "72": 5.13,                     // Bat_A\n        "73": 22                        // Ambient_degC\n    },\n    "A0": {                             // rec\n        "A1": 1984,                     // BatChgDay_Wh\n    },\n    "D0": {                             // cal\n    },\n    "E0": {                             // exec\n        "E1": null,                     // reset\n    },\n    "EF": ["Password"],                 // auth\n    "F0": {                             // pub\n        "F1": {                         // serial\n            "F2": true,                 // Enable\n            "F3": 1.0,                  // Interval\n            "F4": ["71", "72"]          // IDs\n        },\n        "F5": {                         // can\n            "F6": false,                // Enable\n            "F7": 0.1,                  // Interval\n            "F8": ["71"]                // IDs\n        }\n    }\n}\n')])],-1),u=(0,a._)("p",null,"The firmware developer is free to choose the IDs. However, above IDs for the nodes of the first layer are used by Libre Solar devices and recommended for the following reasons:",-1),p=(0,a._)("li",null,"IDs from 0x00 to 0x17 are left for data nodes that are sent very often, as they consume only a single byte in CBOR encoding",-1),l=(0,a._)("li",null,"The node IDs specifying the categories are spaced such that there should be enough free node IDs for most devices",-1),h=(0,a.Uk)("As the node IDs are strictly increasing, the data layot is compatible with the draft standard "),c={href:"https://tools.ietf.org/html/draft-ietf-core-yang-cbor",target:"_blank",rel:"noopener noreferrer"},m=(0,a.Uk)("CBOR Encoding of Data Modeled with YANG"),f=(0,a.Uk)("."),g=(0,a.uE)('<p>In contrast to the text mode, the binary mode has a special NAMEID request (without CoAP equivalent) that allows to get a name for an ID or vice versa.</p><p><strong>Example 1:</strong> Request name of node IDs 0x71 and 0x72</p><pre><code>Request:\n1E                                      NAMEID request\n   18 70                                # CBOR uint: 0x70 (parent ID)\n   82                                   # CBOR array (2 elements)\n      18 71                             # CBOR uint: 0x71 (node ID)\n      18 72                             # CBOR uint: 0x72 (node ID)\n\nResponse:\n85                                      Content.\n   82                                   # CBOR array (2 elements)\n      65 4261745F56                     # CBOR string: &quot;Bat_V&quot;\n      65 4261745F41                     # CBOR string: &quot;Bat_A&quot;\n</code></pre><p>If the parent ID is passed as the endpoint, only the data node name is returned. All requested nodes must be children of the same parend node in this case.</p><p><strong>Example 2:</strong> Request full path of node ID 0x71 (Bat_V)</p><pre><code>Request:\n1E                                      NAMEID request\n   F7                                   # CBOR undefined as a wildcard\n   18 71                                # CBOR uint: 0x71 (node ID)\n\nResponse:\n85                                      Content.\n   6C 6F75747075742F4261745F56          # CBOR string: &quot;output/Bat_V&quot;\n</code></pre><p>If the path of a node is unknown (e.g. because it was obtained from a publication message), the entire path (see text mode) can be determined by setting the endpoint to undefined, as shown above.</p><p><strong>Example 3:</strong> Request IDs for known data node names</p><pre><code>Request:\n1E                                      NAMEID request\n   F7                                   # CBOR undefined as a wildcard\n   82                                   # CBOR array (2 elements)\n      65 4261745F56                     # CBOR string: &quot;Bat_V&quot;\n      65 4261745F41                     # CBOR string: &quot;Bat_A&quot;\n\nResponse:\n85                                      Content.\n   82                                   # CBOR array (2 elements)\n      18 71                             # CBOR uint: 0x71 (node ID)\n      18 72                             # CBOR uint: 0x72 (node ID)\n</code></pre><p>Also here a wildcard for the endpoint can be used to query the entire database. However, if multiple nodes with the same name are found, an error must be returned. This should not be the case for a properly designed data structure.</p><h2 id="read-data" tabindex="-1"><a class="header-anchor" href="#read-data" aria-hidden="true">#</a> Read data</h2><p>Similar to the text mode, the binary variants of the GET and FETCH functions also allow to read one or more data objects. The objects are identified by their parent node (endpoint of a path) and their ID or their name.</p><p>The GET function is useful for device discovery, as it can list all childs of a node. Depending on the computing power of the device and the host, the GET request can either return only the IDs of the next layer or maps including the values. In order to be compatible to the text mode, it is also possible to retrieve all child nodes of a resource as a map of name/value pairs.</p><p>The binary mode also allows to work only with IDs and no paths or node names to keep message size at a minimum. In order to discover the nodes of a device, the host can first query all child IDs of a node (starting with root node of ID 0), afterwards query the names for each ID once and then request the value for any data object on demand.</p><p><strong>Example 1:</strong> Discover all child nodes of the root node (i.e. categories)</p><pre><code>Request:\n01                                      GET request\n   00                                   # CBOR uint: 0x00 (root node)\n   F7                                   # CBOR undefined as a wildcard\n\nResponse:\n85                                      Content.\n   89                                   # CBOR array (9 elements)\n      18 18                             # CBOR uint: 0x18\n      18 30                             # CBOR uint: 0x30\n       ...\n      18 F0                             # CBOR data: 0xF0\n</code></pre><p><strong>Example 2:</strong> Retrieve all data of output path (keys + values)</p><pre><code>Request (alternative 1):\n01                                      GET request\n   18 70                                # CBOR uint: 0x70\n   A0                                   # CBOR empty map\n\nRequest (alternative 2):\n01                                      GET request\n   66 6F7574707574                      # CBOR string: &quot;output&quot;\n   A0                                   # CBOR empty map\n\nResponse:\n85                                      Content.\n   A3                                   # CBOR map (3 elements)\n      65 4261745F56                     # CBOR string: &quot;Bat_V&quot;\n      FA 4161999A                       # CBOR float: 14.1\n      65 4261745F41                     # CBOR string: &quot;Bat_A&quot;\n      FA 40A428F6                       # CBOR float: 5.13\n      6C 416D6269656E745F64656743       # CBOR string: &quot;Ambient_degC&quot;\n      16                                # CBOR uint: 22\n</code></pre><p>Note that the empty map requests to respond with name/value pairs as specified in the request grammar at the beginning of the chapter.</p><p><strong>Example 3:</strong> Retrieve value of data node &quot;Bat_V&quot;</p><pre><code>Request (alternative 1):\n05                                      FETCH request\n   66 6F7574707574                      # CBOR string: &quot;output&quot; (path)\n   65 4261745F56                        # CBOR string: &quot;Bat_V&quot; (node name)\n\nRequest (alternative 2):\n05                                      FETCH request\n   18 70                                # CBOR uint: 0x70 (parent ID)\n   18 71                                # CBOR uint: 0x71 (node ID)\n\nResponse:\n85                                      Content.\n   FA 4161999A                          # CBOR float: 14.1\n</code></pre><p><strong>Example 4:</strong> Retrieve multiple data nodes:</p><pre><code>Request:\n05                                      FETCH request\n   18 70                                # CBOR uint: 0x70 (parent ID)\n   82                                   # CBOR array (2 elements)\n      18 71                             # CBOR uint: 0x71 (node ID)\n      18 72                             # CBOR uint: 0x72 (node ID)\n\nResponse:\n85                                      Content.\n   82                                   # CBOR array (2 elements)\n      FA 4161999A                       # CBOR float: 14.1\n      16                                # CBOR uint: 22\n</code></pre><p>The binary mode also allows to use data object names (strings) instead of numeric IDs, which increases the amount of transferred data.</p><h2 id="update-data" tabindex="-1"><a class="header-anchor" href="#update-data" aria-hidden="true">#</a> Update data</h2><p>Requests to overwrite the value a data node.</p><p>The device must support a patch request using the same CBOR data type as used in the response of a GET or FETCH request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.</p><p>If the data type is not supported, an error status code (36) is responded.</p><p><strong>Example 1:</strong> Disable charging</p><pre><code>Request:\n07                                      PATCH request\n   18 70                                # CBOR uint: 0x70\n   A1                                   # CBOR map (1 element)\n      18 61                             # CBOR uint: 0x61\n      F4                                # CBOR data: false\n\nResponse:\n84                                      Changed.\n</code></pre><p><strong>Example 2:</strong> Attempt to write read-only measurement values (output category)</p><pre><code>Request:\n07                                      PATCH request\n   A2                                   # CBOR map (2 elements)\n      18 71                             # CBOR uint: 0x71\n      FA 0x41633333                     # CBOR float32: 14.2\n      18 73                             # CBOR uint: 0x73\n      16                                # CBOR uint: 22\n\nResponse:\nA3                                      Forbidden.\n</code></pre><h2 id="create-data" tabindex="-1"><a class="header-anchor" href="#create-data" aria-hidden="true">#</a> Create data</h2><p>Appends new data to a data node in a similar way as in the text mode.</p><p><strong>Example 1:</strong> Add node ID 0x72 (Bat_A) to the serial publication channel</p><pre><code>Request:\n02                                      POST request\n   18 F4                                # CBOR uint: 0xF4 (parent ID)\n   18 72                                # CBOR uint: 0x72 (node ID)\n\nResponse:\n81                                      Created.\n</code></pre><h2 id="delete-data" tabindex="-1"><a class="header-anchor" href="#delete-data" aria-hidden="true">#</a> Delete data</h2><p>Removes data from a node of array type.</p><p><strong>Example 1:</strong> Remove node ID 0x72 (Bat_A) from serial publication channel</p><pre><code>Request:\n04                                      DELETE request\n   18 F4                                # CBOR uint: 0xF4 (parent ID)\n   18 72                                # CBOR uint: 0x72 (node ID)\n\nResponse:\n82                                      Deleted.\n</code></pre><h2 id="execute-function" tabindex="-1"><a class="header-anchor" href="#execute-function" aria-hidden="true">#</a> Execute function</h2><p>For execution of a function, the same POST request is used as when creating data. The device decides based on the type of the endpoint whether the request is a function call or a request to create data.</p><p><strong>Example 1:</strong> Reset the device</p><pre><code>Request:\n02                                      POST request\n   18 E1                                # CBOR uint: 0xE1 (node ID)\n   80                                   # CBOR empty array\n\nResponse:\n83                                      Valid.\n</code></pre><p>Note that the endpoint is the node of the executable function itself. Data can be passed to the called function as the second parameter, but the &quot;reset&quot; function does not require any parameters, so it receives an empty array.</p><h2 id="other-functions" tabindex="-1"><a class="header-anchor" href="#other-functions" aria-hidden="true">#</a> Other functions</h2><p>Authentication, publication request setup and publication messages work analog to text mode.</p>',47),R={render:function(e,t){const n=(0,a.up)("RouterLink"),R=(0,a.up)("OutboundLink");return(0,a.wg)(),(0,a.iD)(a.HY,null,[o,(0,a._)("p",null,[r,(0,a.Wm)(n,{to:"/v0.3/2a_general.html#data-structure"},{default:(0,a.w5)((()=>[s])),_:1}),i]),d,u,(0,a._)("ul",null,[p,l,(0,a._)("li",null,[h,(0,a._)("a",c,[m,(0,a.Wm)(R)]),f])]),g],64)}}}}]);
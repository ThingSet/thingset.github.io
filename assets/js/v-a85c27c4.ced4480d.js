"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7938],{9011:(e,t,a)=>{a.r(t),a.d(t,{data:()=>n});const n={key:"v-a85c27c4",path:"/spec/v0.3/2b_text_mode.html",title:"Text Mode",lang:"en",frontmatter:{},excerpt:"",headers:[{level:3,title:"Requests",slug:"requests",children:[]},{level:3,title:"Response",slug:"response",children:[]},{level:3,title:"Publication message",slug:"publication-message",children:[]},{level:2,title:"Read data",slug:"read-data",children:[]},{level:2,title:"Update data",slug:"update-data",children:[]},{level:2,title:"Create data",slug:"create-data",children:[]},{level:2,title:"Delete data",slug:"delete-data",children:[]},{level:2,title:"Execute function",slug:"execute-function",children:[]},{level:2,title:"Authentication",slug:"authentication",children:[]},{level:2,title:"Publication messages",slug:"publication-messages",children:[]}],filePathRelative:"spec/v0.3/2b_text_mode.md",git:{updatedTime:1738504364e3}}},7841:(e,t,a)=>{a.r(t),a.d(t,{default:()=>k});var n=a(6252);const o=(0,n._)("h1",{id:"text-mode",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#text-mode","aria-hidden":"true"},"#"),(0,n.Uk)(" Text Mode")],-1),s=(0,n.Uk)("The following description of the ThingSet text mode grammar uses ABNF according to "),r={href:"https://tools.ietf.org/html/rfc5234",target:"_blank",rel:"noopener noreferrer"},i=(0,n.Uk)("RFC 5234"),d=(0,n.Uk)("."),u=(0,n.Uk)("For rule names prefixed with "),l=(0,n._)("code",null,"json-",-1),c=(0,n.Uk)(" consider the JSON specification in "),h={href:"https://tools.ietf.org/html/rfc8259",target:"_blank",rel:"noopener noreferrer"},p=(0,n.Uk)("RFC 8259"),g=(0,n.Uk)(". In context of the ThingSet protocol, JSON data must be in the most compact form, i.e. not contain any unnecessary whitespaces or line breaks."),f=(0,n._)("h3",{id:"requests",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#requests","aria-hidden":"true"},"#"),(0,n.Uk)(" Requests")],-1),m=(0,n._)("p",null,"Each request message consists of a first character as the request method identifier, a path specifying the endpoint of the request and a JSON string for the payload data (if applicable).",-1),q=(0,n._)("pre",null,[(0,n._)("code",null,'txt-request = txt-get / txt-fetch / txt-patch / txt-create / txt-delete / txt-exec\n\ntxt-get    = "?" path [ "/" ]                   ; CoAP equivalent: GET request\n\ntxt-fetch  = "?" path " " json-array            ; CoAP equivalent: FETCH request\n\ntxt-patch  = "=" path " " json-object           ; CoAP equivalent: iPATCH request\n\ntxt-create = "+" path " " json-value            ; CoAP equivalent: POST request\n\ntxt-delete = "-" path " " json-value            ; CoAP equivalent: DELETE request\n\ntxt-exec   = "!" path [ " " json-value ]        ; CoAP equivalent: POST request\n\npath = node-name [ "/" node-name ]\n\nnode-name = ALPHA / DIGIT / "_" / "-" / "."     ; compatible to URIs (RFC 3986)\n')],-1),b=(0,n.Uk)("The path to access a specific node is a JSON pointer ("),x={href:"https://tools.ietf.org/html/rfc6901",target:"_blank",rel:"noopener noreferrer"},v=(0,n.Uk)("RFC 6901"),w=(0,n.Uk)(") without the forward slash at the beginning. The useable characters for node names are further restricted to allow un-escaped usage in URLs."),y=(0,n._)("h3",{id:"response",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#response","aria-hidden":"true"},"#"),(0,n.Uk)(" Response")],-1),_=(0,n.Uk)("The response starts with a colon ':' followed by the the status code and a plain text description of the status finished with a '.'. The description is not strictly specified and can be according to the table in the "),T=(0,n.Uk)("General Concept chapter"),C=(0,n.Uk)(" or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description."),E=(0,n.uE)('<p>The bytes after the dot contain the requested data.</p><pre><code>txt-response = &quot;:&quot; status [ &quot; &quot; json-value ]    ; response code and data\n\nstatus = status-code [ &quot; &quot; status-msg ] &quot;.&quot;\n\nstatus-code = 2( hex )\n\nstatus-msg  = *( ALPHA / SP )\n\nhex = DIGIT / %x41-46                           ; upper-case HEXDIG\n</code></pre><h3 id="publication-message" tabindex="-1"><a class="header-anchor" href="#publication-message" aria-hidden="true">#</a> Publication message</h3><p>The publication message is very simple and consists of a hash sign and a whitespace at the beginning, followed by a map of data node name/value pairs.</p><pre><code>txt-pubmsg = &quot;# &quot; json-map                      ; publication message\n</code></pre><h2 id="read-data" tabindex="-1"><a class="header-anchor" href="#read-data" aria-hidden="true">#</a> Read data</h2><p>The GET function allows to read all child nodes of the specified path. If a forward slash is appended at the end of the path, only an array with the child node names is returned. Otherwise all content below that path (names and values) is returned.</p><p>The FETCH function allows to retrieve only subset of the child nodes, defined by an array with the node names passed to the function.</p><p>Only those data nodes are returned which are at least readable. Thus, the result might differ after authentication.</p><p><strong>Example 1:</strong> Discover all child nodes of the root node (i.e. categories)</p><pre><code>?/\n:85 Content. [&quot;info&quot;,&quot;conf&quot;,&quot;input&quot;,&quot;output&quot;,&quot;rec&quot;,&quot;exec&quot;,&quot;pub&quot;]\n</code></pre><p><strong>Example 2:</strong> Retrieve all content of output path (keys + values)</p><pre><code>?output\n:85 Content. {&quot;Bat_V&quot;:14.2,&quot;Bat_A&quot;:5.13,&quot;Ambient_degC&quot;:22}\n</code></pre><p><strong>Example 3:</strong> List all sub-nodes of output path as an array</p><pre><code>?output/\n:85 Content. [&quot;Bat_V&quot;,&quot;Bat_A&quot;,&quot;Ambient_degC&quot;]\n</code></pre><p><strong>Example 4:</strong> Retrieve single data node &quot;Bat_V&quot;</p><pre><code>?output [&quot;Bat_V&quot;]\n:85 Content. [14.2]\n</code></pre><h2 id="update-data" tabindex="-1"><a class="header-anchor" href="#update-data" aria-hidden="true">#</a> Update data</h2><p>Requests to overwrite the value of a data node.</p><p>Data of category conf will be written into persistent memory, so it is not allowed to change settings periodically. Only data of category input can be changed regularly.</p><p><strong>Example 1:</strong> Disable charging</p><pre><code>=input {&quot;EnableCharging&quot;:false}\n:84 Changed.\n</code></pre><p><strong>Example 2:</strong> Attempt to write read-only measurement values (output category)</p><pre><code>=output {&quot;Bat_V&quot;:15.2,&quot;Ambient_degC&quot;:22}\n:A3 Forbiden.\n</code></pre><h2 id="create-data" tabindex="-1"><a class="header-anchor" href="#create-data" aria-hidden="true">#</a> Create data</h2><p>Appends new data to a data node.</p><p><strong>Example 1:</strong> Add &quot;Bat_V&quot; to the serial publication channel</p><pre><code>+pub/serial/ids &quot;Bat_V&quot;\n:81 Created.\n</code></pre><h2 id="delete-data" tabindex="-1"><a class="header-anchor" href="#delete-data" aria-hidden="true">#</a> Delete data</h2><p>Removes data from a node of array type.</p><p><strong>Example 1:</strong> Remove &quot;Bat_V&quot; from &quot;serial&quot; publication channel</p><pre><code>-pub/serial/ids &quot;Bat_V&quot;\n:82 Deleted.\n</code></pre><h2 id="execute-function" tabindex="-1"><a class="header-anchor" href="#execute-function" aria-hidden="true">#</a> Execute function</h2><p>Executes a function identified by a data object name of category &quot;exec&quot;</p><p><strong>Example 1:</strong> Reset the device</p><pre><code>!exec/reset\n:83 Valid.\n</code></pre><h2 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication" aria-hidden="true">#</a> Authentication</h2><p>Some of the device parameters like calibration or config settings should be protected against unauthorized change. A simple authentication method is suggested where multiple user levels can be implemented in the firmware using different passwords. The manufacturer would use a different one to authenticate than a normal user and thus get more rights to access data objects.</p><p>The password is transferred as a plain text string. Encryption has to be provided by lower layers.</p><p>Internally, the authentication function is implemented as a data node of exec type.</p><pre><code>!auth &quot;mypass&quot;\n:83 Valid.\n</code></pre><p>After successful authentication, the device exposes restricted data nodes via the normal data access requests. The authentication stays valid until another auth command is received, either without password or with a password that doesn&#39;t match.</p><h2 id="publication-messages" tabindex="-1"><a class="header-anchor" href="#publication-messages" aria-hidden="true">#</a> Publication messages</h2><p>The pub node is used to configure the device to publish certain data on a regular basis through a defined communication channel (UART, CAN, LoRa, etc.). If implemented in the firmware, the publication interval may be adjustable.</p><p><strong>Example 1:</strong> List all available publication channels</p><pre><code>?pub/\n:85 Content. [&quot;serial&quot;,&quot;can&quot;]\n</code></pre><p><strong>Example 2:</strong> Enable &quot;serial&quot; publication channel</p><pre><code>=pub/serial {&quot;Enable&quot;:true}\n:84 Changed.\n</code></pre><p>With this setting, the following message is automatically sent by the device once per second:</p><pre><code># {&quot;Bat_V&quot;:14.1,&quot;Bat_A&quot;:5.13}\n</code></pre><p>Publication messages are broadcast to all connected devices. No response is sent from devices receiving the message.</p><p>The data nodes to be published via one channel (e.g. serial) can be configured using POST and DELETE requests to the pub/serial/IDs endpoint, as shown in the examples above.</p>',52),k={render:function(e,t){const a=(0,n.up)("OutboundLink"),k=(0,n.up)("RouterLink");return(0,n.wg)(),(0,n.iD)(n.HY,null,[o,(0,n._)("p",null,[s,(0,n._)("a",r,[i,(0,n.Wm)(a)]),d]),(0,n._)("p",null,[u,l,c,(0,n._)("a",h,[p,(0,n.Wm)(a)]),g]),f,m,q,(0,n._)("p",null,[b,(0,n._)("a",x,[v,(0,n.Wm)(a)]),w]),y,(0,n._)("p",null,[_,(0,n.Wm)(k,{to:"/spec/v0.3/2a_general.html"},{default:(0,n.w5)((()=>[T])),_:1}),C]),E],64)}}}}]);
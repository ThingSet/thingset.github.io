"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3226],{8473:(e,t,a)=>{a.r(t),a.d(t,{data:()=>o});const o={key:"v-3fb76f05",path:"/spec/v0.5/appl_text_mode.html",title:"Text Mode",lang:"en",frontmatter:{},excerpt:"",headers:[{level:3,title:"Requests",slug:"requests",children:[]},{level:3,title:"Response",slug:"response",children:[]},{level:3,title:"Statement",slug:"statement",children:[]},{level:2,title:"Read data",slug:"read-data",children:[]},{level:2,title:"Update data",slug:"update-data",children:[]},{level:2,title:"Create data",slug:"create-data",children:[]},{level:2,title:"Delete data",slug:"delete-data",children:[]},{level:2,title:"Execute function",slug:"execute-function",children:[]},{level:2,title:"Authentication",slug:"authentication",children:[]},{level:2,title:"Published statements",slug:"published-statements",children:[]}],filePathRelative:"spec/v0.5/appl_text_mode.md",git:{updatedTime:170759614e4}}},3951:(e,t,a)=>{a.r(t),a.d(t,{default:()=>L});var o=a(6252);const n=(0,o._)("h1",{id:"text-mode",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#text-mode","aria-hidden":"true"},"#"),(0,o.Uk)(" Text Mode")],-1),r=(0,o.Uk)("The following description of the ThingSet text mode grammar uses ABNF according to "),s={href:"https://tools.ietf.org/html/rfc5234",target:"_blank",rel:"noopener noreferrer"},d=(0,o.Uk)("RFC 5234"),i=(0,o.Uk)("."),u=(0,o.Uk)("For rule names prefixed with "),c=(0,o._)("code",null,"json-",-1),l=(0,o.Uk)(" consider the JSON specification in "),h={href:"https://tools.ietf.org/html/rfc8259",target:"_blank",rel:"noopener noreferrer"},p=(0,o.Uk)("RFC 8259"),q=(0,o.Uk)(". In context of the ThingSet protocol, JSON data must be in the most compact form, i.e. not contain any unnecessary whitespaces or line breaks."),m=(0,o._)("h3",{id:"requests",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#requests","aria-hidden":"true"},"#"),(0,o.Uk)(" Requests")],-1),f=(0,o._)("p",null,"Each request message consists of a first character as the request method identifier, a path specifying the endpoint of the request and a JSON string for the payload data (if applicable).",-1),b=(0,o._)("pre",null,[(0,o._)("code",null,'txt-request = txt-get / txt-fetch / txt-patch / txt-create / txt-delete / txt-exec\n\ntxt-get    = "?" path [ "/" ]                   ; CoAP equivalent: GET request\n\ntxt-fetch  = "?" path " " json-array            ; CoAP equivalent: FETCH request\n\ntxt-patch  = "=" path " " json-object           ; CoAP equivalent: iPATCH request\n\ntxt-create = "+" path " " json-value            ; CoAP equivalent: POST request\n\ntxt-delete = "-" path " " json-value            ; CoAP equivalent: DELETE request\n\ntxt-exec   = "!" path [ " " json-value ]        ; CoAP equivalent: POST request\n\npath = object-name [ "/" object-name ]\n\nobject-name = ALPHA / DIGIT / "." / "_" / "-"   ; compatible to URIs (RFC 3986)\n')],-1),g=(0,o.Uk)("The path to access a specific data object is a JSON pointer ("),v={href:"https://tools.ietf.org/html/rfc6901",target:"_blank",rel:"noopener noreferrer"},x=(0,o.Uk)("RFC 6901"),w=(0,o.Uk)(") without the forward slash at the beginning. The useable characters for object names are further restricted to allow un-escaped usage in URLs."),_=(0,o._)("h3",{id:"response",tabindex:"-1"},[(0,o._)("a",{class:"header-anchor",href:"#response","aria-hidden":"true"},"#"),(0,o.Uk)(" Response")],-1),y=(0,o.Uk)("The response starts with a colon "),T=(0,o._)("code",null,":",-1),E=(0,o.Uk)(" followed by the the status code and a plain text description of the status finished with a "),C=(0,o._)("code",null,".",-1),j=(0,o.Uk)(". The description is not strictly specified and can be according to the table in the "),k=(0,o.Uk)("General Concept chapter"),A=(0,o.Uk)(" or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description."),U=(0,o.uE)('<p>The bytes after the dot contain the requested data.</p><pre><code>txt-response = &quot;:&quot; status [ &quot; &quot; json-value ]    ; response code and data\n\nstatus = status-code [ &quot; &quot; status-msg ] &quot;.&quot;\n\nstatus-code = 2( hex )\n\nstatus-msg  = *( ALPHA / SP )\n\nhex = DIGIT / %x41-46                           ; upper-case HEXDIG\n</code></pre><h3 id="statement" tabindex="-1"><a class="header-anchor" href="#statement" aria-hidden="true">#</a> Statement</h3><p>A statement starts with the hash sign and a path, followed by a whitespace and the map of actual payload data as name/value pairs.</p><pre><code>txt-statement = &quot;#&quot; path &quot; &quot; json-object\n</code></pre><p>The path is either a group (e.g. <code>Device</code>) or a subset object containing references to other data items as an array (e.g. <code>eState</code>).</p><h2 id="read-data" tabindex="-1"><a class="header-anchor" href="#read-data" aria-hidden="true">#</a> Read data</h2><p>The GET function allows to read all child objects of the specified path. If a forward slash is appended at the end of the path, only an array with the child object names is returned to allow discovering a device data structure layer by layer. Otherwise all content below that path (names and values) is returned.</p><p>If a device is not able to provide the entire content of a group or subset (e.g. because the buffer is too small), the value must be set to <code>null</code> and a new request for smaller data set should be sent. In case of records, the value must be set to the number of records instead of <code>null</code> if the content of the records cannot be returned directly. This allows to determine whether the path starting with an upper-case letter is a group or contains records.</p><p>The FETCH function allows to retrieve only subset of the child objects, defined by an array with the object names passed to the function.</p><p>Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.</p><p><strong>Example 1:</strong> Discover all child objects of the root object (i.e. categories)</p><pre><code>?/\n:85 Content. [&quot;t_s&quot;,&quot;cNodeID&quot;,&quot;cMetadataURL&quot;,&quot;Device&quot;,&quot;Bat&quot;,&quot;Solar&quot;,&quot;Load&quot;,&quot;Log&quot;,\n&quot;eBoot&quot;,&quot;eState&quot;,&quot;m&quot;,&quot;_pub&quot;]\n</code></pre><p>Note that <code>_ids</code> and <code>_paths</code> are not contained in the list, as they are only available in the binary mode.</p><p><strong>Example 2:</strong> Attempt to get all data of the device</p><pre><code>?\n:85 Content. {&quot;t_s&quot;:460677600,&quot;cNodeID&quot;:&quot;XYZ12345&quot;,&quot;cMetadataURL&quot;:&quot;https://files.\nlibre.solar/meta/cc-05.json&quot;,&quot;Device&quot;:null,&quot;Bat&quot;:null,&quot;Solar&quot;:null,&quot;Load&quot;:null,\n&quot;Log&quot;:2,&quot;eBoot&quot;:null,&quot;eState&quot;:null,&quot;m&quot;:null,&quot;_pub&quot;:null}\n</code></pre><p>The content of the groups and subsets would have resulted in a too long response for the resource-constrained device, so the values were set to <code>null</code> and can be retrieved separately as shown in the examples below.</p><p><strong>Example 3:</strong> Retrieve all content of <code>Bat</code> path (names + values)</p><pre><code>?Bat\n:85 Content. {&quot;rMeas_V&quot;:12.9,&quot;rMeas_A&quot;:-3.14,&quot;sTarget_V&quot;:14.4}\n</code></pre><p><strong>Example 4:</strong> List all sub-item names of <code>Bat</code> path as an array</p><pre><code>?Bat/\n:85 Content. [&quot;rMeas_V&quot;,&quot;rMeas_A&quot;,&quot;sTarget_V&quot;]\n</code></pre><p><strong>Example 5:</strong> Retrieve value for single data item <code>Bat/rMeas_V</code></p><pre><code>?Bat [&quot;rMeas_V&quot;]\n:85 Content. [12.9]\n</code></pre><p>A more simple way is to provide the entire path (GET instead of FETCH request):</p><pre><code>?Bat/rMeas_V\n:85 Content. 12.9\n</code></pre><p><strong>Example 6:</strong> Retrieve all records in <code>Log</code></p><pre><code>?Log\n:85 Content. [{&quot;t_s&quot;:460677000,&quot;rErrorFlags&quot;:4},{&quot;t_s&quot;:460671000,&quot;rErrorFlags&quot;:256}]\n</code></pre><p>If a device is not able to return the content of all records directly, it must return the number of stored records. This number can be used to retrieve each record individually (see below).</p><pre><code>?Log\n:85 Content. 2\n</code></pre><p><strong>Example 7:</strong> Retrieve first record in <code>Log</code></p><pre><code>?Log/0\n:85 Content. {&quot;t_s&quot;:460677000,&quot;rErrorFlags&quot;:4}\n</code></pre><h2 id="update-data" tabindex="-1"><a class="header-anchor" href="#update-data" aria-hidden="true">#</a> Update data</h2><p>The PATCH request attempts to overwrite the values of data items.</p><p>Data items prefixed with <code>s</code> will be stored in persistent memory, so it is not allowed to change settings periodically. Only data of with <code>w</code> prefix can be changed regularly.</p><p><strong>Example 1:</strong> Disable load output</p><pre><code>=Load {&quot;wEnable&quot;:false}\n:84 Changed.\n</code></pre><p><strong>Example 2:</strong> Attempt to write read-only measurement value</p><pre><code>=Bat {&quot;rMeas_A&quot;:0}\n:A3 Forbidden.\n</code></pre><h2 id="create-data" tabindex="-1"><a class="header-anchor" href="#create-data" aria-hidden="true">#</a> Create data</h2><p>The equivalent of a POST request allows to append new data to an existing data item, usually an array.</p><p>In current implementations it is not possible to add entirely new data objects, as this would be against the nature of statically allocated memory of constrained devices.</p><p><strong>Example 1:</strong> Add battery current measurement to the generic metrics subset <code>m</code></p><pre><code>+m &quot;Bat/rMeas_A&quot;\n:81 Created.\n</code></pre><h2 id="delete-data" tabindex="-1"><a class="header-anchor" href="#delete-data" aria-hidden="true">#</a> Delete data</h2><p>Deletes data from a data item of array type.</p><p><strong>Example 1:</strong> Delete <code>cMetadataURL</code> from boot events subset</p><pre><code>-eBoot &quot;cMetadataURL&quot;\n:82 Deleted.\n</code></pre><h2 id="execute-function" tabindex="-1"><a class="header-anchor" href="#execute-function" aria-hidden="true">#</a> Execute function</h2><p>Calls an executable data object. Functions are prefixed with <code>x</code>.</p><p><strong>Example 1:</strong> Reset the device</p><pre><code>!Device/xReset\n:83 Valid.\n</code></pre><h2 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication" aria-hidden="true">#</a> Authentication</h2><p>Some of the device parameters like calibration data or important settings should be protected against unauthorized change. A simple authentication method is suggested where multiple user levels can be implemented in the firmware using different passwords. The manufacturer would use a different password to authenticate than a normal user and thus get more rights to access data objects.</p><p>The password is transferred as a plain text string. Encryption has to be provided by lower layers.</p><p>Internally, the authentication function is implemented as an executable data object.</p><pre><code>!Device/xAuth &quot;mypass&quot;\n:83 Valid.\n</code></pre><p>After successful authentication, the device exposes previously restricted data objects via the normal data access requests. The authentication stays valid until another auth command is received, either without password or with a password that doesn&#39;t match.</p><h2 id="published-statements" tabindex="-1"><a class="header-anchor" href="#published-statements" aria-hidden="true">#</a> Published statements</h2><p>Published statements are broadcast to all connected devices and no response is sent from devices receiving the message.</p><p><strong>Example 1:</strong> A statement containing the <code>m</code> subset, sent out by the device every 10 seconds</p><pre><code>#m {&quot;t_s&quot;:460677600,&quot;Bat&quot;:{&quot;rMeas_V&quot;:12.9,&quot;rMeas_A&quot;:-3.14},&quot;Load&quot;:{&quot;r_W&quot;:96.5},&quot;Load&quot;:{&quot;r_W&quot;:137.0}}\n</code></pre><p>The <code>_pub</code> path is used to configure the publication process itself.</p><p><strong>Example 2:</strong> List all statements available for publication</p><pre><code>?_pub/\n:85 Content. [&quot;eState&quot;,&quot;m&quot;]\n</code></pre><p><strong>Example 3:</strong> Enable publication of <code>m</code> subset</p><pre><code>=_pub/m {&quot;sEnable&quot;:true}\n:84 Changed.\n</code></pre><p>If the published object is a subset object (and not a group), the data items contained in the messages can be configured using POST and DELETE requests to the data object as shown in the examples above.</p>',67),L={render:function(e,t){const a=(0,o.up)("OutboundLink"),L=(0,o.up)("RouterLink");return(0,o.wg)(),(0,o.iD)(o.HY,null,[n,(0,o._)("p",null,[r,(0,o._)("a",s,[d,(0,o.Wm)(a)]),i]),(0,o._)("p",null,[u,c,l,(0,o._)("a",h,[p,(0,o.Wm)(a)]),q]),m,f,b,(0,o._)("p",null,[g,(0,o._)("a",v,[x,(0,o.Wm)(a)]),w]),_,(0,o._)("p",null,[y,T,E,C,j,(0,o.Wm)(L,{to:"/spec/v0.5/2a_general.html"},{default:(0,o.w5)((()=>[k])),_:1}),A]),U],64)}}}}]);
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5160],{3344:(t,a,n)=>{n.r(a),n.d(a,{data:()=>s});const s={key:"v-19319f7b",path:"/spec/v0.4/appl_data_structure.html",title:"Data Structure",lang:"en",frontmatter:{},excerpt:"",headers:[{level:3,title:"Reserved IDs",slug:"reserved-ids",children:[]},{level:2,title:"Example Data",slug:"example-data",children:[{level:3,title:"Flat layout",slug:"flat-layout",children:[]},{level:3,title:"Grouped layout",slug:"grouped-layout",children:[]},{level:3,title:"Nested layout",slug:"nested-layout",children:[]}]},{level:2,title:"Groups",slug:"groups",children:[]},{level:2,title:"Units",slug:"units",children:[]}],filePathRelative:"spec/v0.4/appl_data_structure.md",git:{updatedTime:1707227927e3}}},9586:(t,a,n)=>{n.r(a),n.d(a,{default:()=>A});var s=n(6252);const e=(0,s._)("h1",{id:"data-structure",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#data-structure","aria-hidden":"true"},"#"),(0,s.Uk)(" Data Structure")],-1),o=(0,s.Uk)("All accessible data of a device is "),p={href:"https://en.wikipedia.org/wiki/Tree_(data_structure)",target:"_blank",rel:"noopener noreferrer"},r=(0,s.Uk)("structured as a tree"),c=(0,s.Uk)(". The nodes in the tree structure are called "),u=(0,s._)("strong",null,"data objects",-1),l=(0,s.Uk)(" and correspond to the JSON object definition."),i=(0,s.uE)('<p>Inner nodes in the structure are used to define the hierarchical structure of the data.</p><p>Actual data is stored in leaf nodes, called <strong>data items</strong>. The data items can contain any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar information.</p><p>Each data object in the tree is identified by a numeric ID and a name. The ID can be chosen by the firmware developer. The name is a short case-sensitive ASCII string containing only alphanumeric characters, dots or underscores without any whitespace characters.</p><p>The underscore is only used to specify the unit of a data item (also see below). No additional underscores are allowed in the name.</p><p>A dot is used to identify paths which are used internally by the implementation of the protocol itself (e.g. configuration of publication messages). Other usages of a dot in the data object names is not allowed.</p><p>The IDs must be unique per device. Except for internal data objects (behind in a path starting with a dot) also the name must be unique.</p><p>The IDs are used to access data objects in the binary protocol mode for reduced message size. They can also be used in the firmware to define the relations in the data structure. For all interactions with users and in the text-based mode, only the object names and paths are used.</p><h3 id="reserved-ids" tabindex="-1"><a class="header-anchor" href="#reserved-ids" aria-hidden="true">#</a> Reserved IDs</h3><p>The IDs 0x00 and 0x10-0x1F are reserved for special data objects that need to be known in advance. In addition to that, IDs starting from 0x8000 are reserved for control purposes and will be assigned in the future.</p><p>The following table shows the assigned IDs. Currently unassigned IDs might be defined in a future version of the protocol.</p><table><thead><tr><th>ID</th><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>0x00</td><td></td><td>Root object of a device</td></tr><tr><td>0x10</td><td>Time_s</td><td>Unix timestamp in seconds since Jan 01, 1970</td></tr><tr><td>0x17</td><td>.name</td><td>Endpoint used by binary protocol to determine names from IDs</td></tr><tr><td>0x18</td><td>MetadataURL</td><td>URL to JSON file containing extended information about exposed data</td></tr><tr><td>0x1D</td><td>DeviceID</td><td>Alphanumeric string (without spaces) to identify the device (should be unique per manufacturer, typical length 8 characters)</td></tr><tr><td>&gt;=0x8000</td><td>...</td><td>Control data objects with fixed IDs</td></tr></tbody></table><p>The IDs up to 0x17 consume only a single byte when encoded as CBOR, which minimizes space consumption for IDs that are used often. The <code>MetadataURL</code> is retrieved only once during startup, so it is acceptable to consume 2 bytes for its ID.</p><h2 id="example-data" tabindex="-1"><a class="header-anchor" href="#example-data" aria-hidden="true">#</a> Example Data</h2><h3 id="flat-layout" tabindex="-1"><a class="header-anchor" href="#flat-layout" aria-hidden="true">#</a> Flat layout</h3><p>Most simple valid data layout consists of key/value pairs without any hierarchy.</p><div class="language-json ext-json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;DeviceID&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ABCD1234&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;Ambient_degC&quot;</span><span class="token operator">:</span> <span class="token number">22.3</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;HeaterEnable&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;x-reset&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>A problem with this layout is that the semantics of the data is not entirely clear. For example it is not clear if <code>Ambient_degC</code> is a temperature setpoint that can be written to or if it is a read-only measurement value.</p><h3 id="grouped-layout" tabindex="-1"><a class="header-anchor" href="#grouped-layout" aria-hidden="true">#</a> Grouped layout</h3><p>The following example data structure of an MPPT charge controller will be used for further explanation of the protocol.</p><div class="language-json ext-json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                       <span class="token comment">// 0x01</span>\n        <span class="token property">&quot;MetadataURL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://files.libre.solar/tsm/cc-v03.json&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 0x18 (fixed)</span>\n        <span class="token property">&quot;DeviceID&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ABC12345&quot;</span><span class="token punctuation">,</span>                                     <span class="token comment">// 0x1D (fixed)</span>\n        <span class="token property">&quot;DeviceType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MPPT 1210 HUS&quot;</span>                               <span class="token comment">// 0x30</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;meas&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                       <span class="token comment">// 0x02</span>\n        <span class="token property">&quot;Bat_V&quot;</span><span class="token operator">:</span> <span class="token number">14.2</span><span class="token punctuation">,</span>                                              <span class="token comment">// 0x40</span>\n        <span class="token property">&quot;Bat_A&quot;</span><span class="token operator">:</span> <span class="token number">5.13</span><span class="token punctuation">,</span>                                              <span class="token comment">// 0x41</span>\n        <span class="token property">&quot;Ambient_degC&quot;</span><span class="token operator">:</span> <span class="token number">22</span>                                          <span class="token comment">// 0x42</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;state&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                      <span class="token comment">// 0x03</span>\n        <span class="token property">&quot;ChargerState&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>                                          <span class="token comment">// 0x60</span>\n        <span class="token property">&quot;ErrorFlags&quot;</span><span class="token operator">:</span> <span class="token number">0</span>                                             <span class="token comment">// 0x61</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;rec&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                        <span class="token comment">// 0x04</span>\n        <span class="token property">&quot;Time_s&quot;</span><span class="token operator">:</span> <span class="token number">460677600</span><span class="token punctuation">,</span>                                        <span class="token comment">// 0x10 (fixed)</span>\n        <span class="token property">&quot;BatChgDay_Wh&quot;</span><span class="token operator">:</span> <span class="token number">1984</span><span class="token punctuation">,</span>                                       <span class="token comment">// 0x70</span>\n        <span class="token property">&quot;AmbientMax_deg&quot;</span><span class="token operator">:</span> <span class="token number">21.6</span>                                      <span class="token comment">// 0x71</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;input&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                      <span class="token comment">// 0x05</span>\n        <span class="token property">&quot;EnableCharging&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>                                      <span class="token comment">// 0x90</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;conf&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                       <span class="token comment">// 0x06</span>\n        <span class="token property">&quot;BatCharging_V&quot;</span><span class="token operator">:</span> <span class="token number">14.4</span>                                       <span class="token comment">// 0xA0</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;rpc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                        <span class="token comment">// 0x0E</span>\n        <span class="token property">&quot;x-reset&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>                                            <span class="token comment">// 0xE0</span>\n        <span class="token property">&quot;x-auth&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Password&quot;</span><span class="token punctuation">]</span>                                      <span class="token comment">// 0xE1</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;dfu&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                        <span class="token comment">// 0x0D</span>\n        <span class="token property">&quot;x-write&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Offset_B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Data&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>                            <span class="token comment">// 0xF0</span>\n        <span class="token property">&quot;FlashSize_KiB&quot;</span><span class="token operator">:</span> <span class="token number">128</span>                                        <span class="token comment">// 0xF1</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;report&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Time_s&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bat_V&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Ambient_degC&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>                  <span class="token comment">// 0x20</span>\n    <span class="token property">&quot;ctrl&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                       <span class="token comment">// 0x0C</span>\n        <span class="token property">&quot;bus-voltage&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                            <span class="token comment">// 0xDC01</span>\n            <span class="token property">&quot;Margin_V&quot;</span><span class="token operator">:</span> <span class="token number">0.7</span><span class="token punctuation">,</span>                                        <span class="token comment">// 0x7000</span>\n            <span class="token property">&quot;AbsMax_v&quot;</span><span class="token operator">:</span> <span class="token number">30</span>                                          <span class="token comment">// 0x7001</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;.pub&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                       <span class="token comment">// 0x0F</span>\n        <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                   <span class="token comment">// 0x100</span>\n            <span class="token property">&quot;OnChange&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>                                        <span class="token comment">// 0x101</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;report&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                 <span class="token comment">// 0x102</span>\n            <span class="token property">&quot;Period_s&quot;</span><span class="token operator">:</span> <span class="token number">10</span>                                          <span class="token comment">// 0x103</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;.name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                                                      <span class="token comment">// 0x17 (fixed)</span>\n        <span class="token property">&quot;0x01&quot;</span><span class="token operator">:</span> <span class="token string">&quot;info&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;0x02&quot;</span><span class="token operator">:</span> <span class="token string">&quot;meas&quot;</span><span class="token punctuation">,</span>\n        <span class="token comment">// ...</span>\n        <span class="token property">&quot;0x40&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Bat_V&quot;</span>\n        <span class="token comment">// ...</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',20),d=(0,s.Uk)("The data objects are structured in different groups like "),k=(0,s._)("code",null,"info",-1),h=(0,s.Uk)(" and "),m=(0,s._)("code",null,"conf",-1),f=(0,s.Uk)(" as described below. By convention, data items (leaf nodes) use "),b={href:"https://en.wikipedia.org/wiki/Camel_case",target:"_blank",rel:"noopener noreferrer"},g=(0,s.Uk)("upper camel case"),y=(0,s.Uk)(" for their names, inner objects to define a path use lower case names."),q=(0,s.uE)('<p>The <code>rpc</code> group provides functions that can be called. In order to distinguish functions from normal data objects, executable object names are lower case and prefixed with <code>x-</code>.</p><p>The <code>.pub</code> path is used to configure the automatic publication of messages, so it doesn&#39;t hold normal data objects. Such internal nodes are prefixed with a <code>.</code>, similar to hidden files or folders in computer file systems.</p><p>The data node <code>report</code> in above example is a so-called <strong>subset</strong>, which contains an array pointing at existing data items. It can be used to configure the content of statements for publication if data objects of different groups should be combined in a single message.</p><h3 id="nested-layout" tabindex="-1"><a class="header-anchor" href="#nested-layout" aria-hidden="true">#</a> Nested layout</h3><p>If there are multiple entities with similar data sets inside one device, the data can be further structured as shown below.</p><div class="language-json ext-json"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n    <span class="token property">&quot;meas&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;bat1&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token property">&quot;Bat_V&quot;</span><span class="token operator">:</span> <span class="token number">14.2</span><span class="token punctuation">,</span>\n            <span class="token property">&quot;Bat_A&quot;</span><span class="token operator">:</span> <span class="token number">5.13</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;bat2&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token property">&quot;Bat_V&quot;</span><span class="token operator">:</span> <span class="token number">14.2</span><span class="token punctuation">,</span>\n            <span class="token property">&quot;Bat_A&quot;</span><span class="token operator">:</span> <span class="token number">5.13</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>In order to keep implementations simple, not all devices may implement multiple levels of hierarchies.</p><h2 id="groups" tabindex="-1"><a class="header-anchor" href="#groups" aria-hidden="true">#</a> Groups</h2><p>The following groups for data objects are used for the ThingSet protocol by default:</p><table><thead><tr><th>Group</th><th>ID</th><th>Origin</th><th>Description</th><th>Access</th></tr></thead><tbody><tr><td>info</td><td>0x01</td><td>device</td><td>Static device information (e.g. manufacturer, software version)</td><td>read</td></tr><tr><td>meas</td><td>0x02</td><td>device</td><td>Measurement data (changes regularly)</td><td>read</td></tr><tr><td>state</td><td>0x03</td><td>device</td><td>Event-based status information</td><td>read</td></tr><tr><td>rec</td><td>0x04</td><td>device</td><td>Recorded (history-dependent) data (e.g. min/max values)</td><td>read + reset</td></tr><tr><td>input</td><td>0x05</td><td>client</td><td>Input objects (e.g. actuators)</td><td>read + write</td></tr><tr><td>conf</td><td>0x06</td><td>both</td><td>Configurable settings, stored in non-volatile memory after change</td><td>read + write, partly protected</td></tr><tr><td>cal</td><td>0x07</td><td>both</td><td>Factory-calibrated settings</td><td>read + write, protected</td></tr><tr><td>rpc</td><td>0x0E</td><td>client</td><td>Executable functions</td><td>execute</td></tr><tr><td>dfu</td><td>0x0D</td><td>client</td><td>Functions and data for device firmware upgrade</td><td>read + execute</td></tr></tbody></table><p>The data objects of <code>meas</code>, <code>state</code> and <code>input</code> groups are used for instantaneous data. Changes to <code>input</code> data objects are only stored in RAM, so they get lost after a reset of the device. In contrast to that, <code>conf</code> data is stored in non-volatile memory (e.g. flash or EEPROM) after a change. As non-volatile memory has a limited amount of write cycles, configuration data should not be changed continuously.</p><p>The <code>rec</code> data group is used for history-dependent data like error memory, energy counters or min/max values of certain measurements. In contrast to data of <code>meas</code> group, recorded data cannot be obtained through measurement after reset, so the current status has to be stored in non-volatile memory on a regular basis. Also the current timestamp <code>Time_s</code> is stored in the <code>rec</code> group, as it is essentially a counter that is incremented each second.</p><p>Factory calibration data objects are only accessible for the manufacturer after authentication.</p><p>Excecutable data means that they trigger a function call in the device firmware. Child objects of the executable object can be used internally to define parameters that can be passed to the function.</p><p>Data object IDs are stored as unsigned integers. The firmware developer should assign the lowest IDs to the most used data objects, as they consume less bytes during transfer (see CBOR representation of unsigned integers).</p><h2 id="units" tabindex="-1"><a class="header-anchor" href="#units" aria-hidden="true">#</a> Units</h2>',16),x=(0,s.Uk)("Only "),v={href:"https://en.wikipedia.org/wiki/International_System_of_Units",target:"_blank",rel:"noopener noreferrer"},_=(0,s.Uk)("SI units"),w=(0,s.Uk)(" and derived units (e.g. kWh for energy instead of Ws) are allowed."),D=(0,s._)("p",null,'The unit is appended to the data object name using an underscore. In order to keep the data object name very compact, the unit is also used to identify the physical quantity of the value. So instead of "BatteryEnergy_kWh" a short name like "Bat_kWh" is preferred.',-1),j=(0,s.Uk)("Some special characters have to be replaced according to the following table in order to be compatible with URIs (see "),I={href:"https://tools.ietf.org/html/rfc3986#section-2.3",target:"_blank",rel:"noopener noreferrer"},T=(0,s.Uk)("RFC 3986, section 2.3"),C=(0,s.Uk)("):"),U=(0,s.uE)("<table><thead><tr><th>Character</th><th>Replacement</th><th>Example</th></tr></thead><tbody><tr><td>°</td><td>deg</td><td>&quot;Ambient_degC&quot; for ambient temperature in °C</td></tr><tr><td>%</td><td>pct</td><td>&quot;Humidity_pct&quot; for relative humidity in %</td></tr><tr><td>/</td><td>_</td><td>&quot;Veh_m_s&quot; for vehicle speed in m/s</td></tr><tr><td>^</td><td>(omitted)</td><td>&quot;Surface_m2&quot; for surface area in m^2</td></tr></tbody></table>",1),A={render:function(t,a){const n=(0,s.up)("OutboundLink");return(0,s.wg)(),(0,s.iD)(s.HY,null,[e,(0,s._)("p",null,[o,(0,s._)("a",p,[r,(0,s.Wm)(n)]),c,u,l]),i,(0,s._)("p",null,[d,k,h,m,f,(0,s._)("a",b,[g,(0,s.Wm)(n)]),y]),q,(0,s._)("p",null,[x,(0,s._)("a",v,[_,(0,s.Wm)(n)]),w]),D,(0,s._)("p",null,[j,(0,s._)("a",I,[T,(0,s.Wm)(n)]),C]),U],64)}}}}]);
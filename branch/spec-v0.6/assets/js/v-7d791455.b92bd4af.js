"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2037],{4344:(e,t,a)=>{a.r(t),a.d(t,{data:()=>n});const n={key:"v-7d791455",path:"/spec/v0.1/functions.html",title:"Functions",lang:"en",frontmatter:{},excerpt:"",headers:[{level:3,title:"Text mode",slug:"text-mode",children:[]},{level:3,title:"Binary mode",slug:"binary-mode",children:[]},{level:2,title:"Read data object (ID 0x01)",slug:"read-data-object-id-0x01",children:[{level:3,title:"Binary mode",slug:"binary-mode-1",children:[]}]},{level:2,title:"Write data object (0x02)",slug:"write-data-object-0x02",children:[{level:3,title:"Text mode",slug:"text-mode-2",children:[]},{level:3,title:"Binary mode",slug:"binary-mode-2",children:[]}]},{level:2,title:"List data objects (0x03)",slug:"list-data-objects-0x03",children:[{level:3,title:"Text mode",slug:"text-mode-3",children:[]},{level:3,title:"Binary mode",slug:"binary-mode-3",children:[]}]},{level:2,title:"Get data object name (0x04)",slug:"get-data-object-name-0x04",children:[{level:3,title:"Binary mode",slug:"binary-mode-4",children:[]}]},{level:2,title:"PRELIMINARY: Publication request (0x05)",slug:"preliminary-publication-request-0x05",children:[{level:3,title:"Text mode",slug:"text-mode-4",children:[]}]},{level:2,title:"PRELIMINARY: Authentication (0x06)",slug:"preliminary-authentication-0x06",children:[]}],filePathRelative:"spec/v0.1/functions.md",git:{updatedTime:1686213394e3}}},4815:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});const n=(0,a(6252).uE)('<h1 id="functions" tabindex="-1"><a class="header-anchor" href="#functions" aria-hidden="true">#</a> Functions</h1><p>The first byte of a request contains either the function ID in binary format or a text-mode identifier (one of &#39;!&#39;, &#39;:&#39; or &#39;#&#39;). Input data with unknown first byte is ignored.</p><h3 id="text-mode" tabindex="-1"><a class="header-anchor" href="#text-mode" aria-hidden="true">#</a> Text mode</h3><p>Each request message consists of a function name (e.g. read) followed by valid JSON string containing the payload data. A request starts with an exclamation mark (!) in front of the function name.</p><p>The response starts with a colon (😃 followed by the the status code and a plain text description of the status finished with a &#39;.&#39;. The description message content is not strictly specified and can be either the description from above table or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description.</p><p>The following bytes after the dot contain the requested data. The end of the data is automatically recognized when the last character for a valid JSON text is received, e.g. &#39;}&#39;. In addition to that, the response must be finished with a newline (LF recommended, but CRLF also allowed).</p><pre><code>Request:\n!(name) (options) (JSON data)\n\nResponse:\n:(status code) (status message). (JSON data)\n\nPublication message:\n# (JSON data)\n</code></pre><p>Some examples are shown below.</p><h3 id="binary-mode" tabindex="-1"><a class="header-anchor" href="#binary-mode" aria-hidden="true">#</a> Binary mode</h3><p>In the binary mode, the values of data objects are encoded using the CBOR format. Thus, numbers are encoded using big endian format (most significant byte transferred first).</p><p>The general format of a binary mode message:</p><pre><code>+-------------+====================+=============================================+\n| Function ID | Options (optional) | Payload data (object values in CBOR format) |\n+-------------+====================+=============================================+\n\nLegend:\n---------  single byte\n=========  multiple bytes\n</code></pre><p>In order to minimize data consumption, the CBOR format is only used for the actual data object values (because data format and size are unknown). Well-known data structures like arrays of Data Object IDs in read requests are encoded directly using unsigned 16-bit integers (see below).</p><p>The length of the entire request or response is not encoded in the ThingSet protocol. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.</p><p><em>Remark for future protocol versions:</em> If proven to be necessary, the data could be terminated with one 0xFF character at the end of each request. Therefore, 0xF is a reserved category ID.</p><h2 id="read-data-object-id-0x01" tabindex="-1"><a class="header-anchor" href="#read-data-object-id-0x01" aria-hidden="true">#</a> Read data object (ID 0x01)</h2><p>The read function can read one or more data objects. The objects are identified by their ID (binary mode) or by their name (text-base mode).</p><h4 id="text-mode-1" tabindex="-1"><a class="header-anchor" href="#text-mode-1" aria-hidden="true">#</a> Text mode</h4><p>The names of the data objects are passed to the function as a single string or as an array of strings.</p><p>The response contains a status code and the requested data. If a single data object was requested, the returned data is also a single JSON primitive (number, string, true/fals, depending on data type). Multiple objects were requested, the response is an array containing the requested data objects in the same order.</p><p>Example 1: Request single data object &quot;enableSwitch&quot;</p><pre><code>!read &quot;enableSwitch&quot;\n:0 Success. true\n</code></pre><p>Example 2: Request multiple data objects:</p><pre><code>!read [&quot;vBat&quot;, &quot;tAmbient&quot;]\n:0 Success. [15.2, 22]\n</code></pre><h3 id="binary-mode-1" tabindex="-1"><a class="header-anchor" href="#binary-mode-1" aria-hidden="true">#</a> Binary mode</h3><p>General format description:</p><pre><code>Request:\n+------+========+     +========+\n| 0x01 | 0xYYYY | ... | 0xYYYY |\n+------+========+     +========+\n\nResponse:\n+------+===========+     +===========+\n| 0xZZ | CBOR data | ... | CBOR data |\n+------+===========+     +===========+\n\n0xYYYY: Function ID(s)\n0xZZ:   Response code (0x80 for success)\n</code></pre><p>Example 1: Request single data object &quot;enableSwitch&quot;</p><pre><code>Request:\n0x01                Function ID (read)\n    0x3001          Data Object ID (enableSwitch)\n\nResponse:\n0x80                Status code (Success)\n    0xf5            CBOR data: true\n</code></pre><p>Example 2: Request multiple data objects:</p><pre><code>Request:\n0x01                Function ID (read)\n    0x4001          Data Object ID (vBat)\n    0x4002          Data Object ID (tAmbient)\n\nResponse:\n0x80                    Status code (Success)\n    0xfa 0x41733333     CBOR data (float32): 15.2\n    0x16                CBOR data (integer): 22\n</code></pre><h2 id="write-data-object-0x02" tabindex="-1"><a class="header-anchor" href="#write-data-object-0x02" aria-hidden="true">#</a> Write data object (0x02)</h2><p>Requests to overwrite a data object.</p><p>The device must support a write request using the same data type as used in the response of a read request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.</p><p>Data of settings will be written into persistent memory, so it is not allowed to change settings periodically. Only data types of category input might be changed regularly.</p><p>If the data type is not supported, an error status code (34) is responded.</p><h3 id="text-mode-2" tabindex="-1"><a class="header-anchor" href="#text-mode-2" aria-hidden="true">#</a> Text mode</h3><p>Example 1: Disable the switch</p><pre><code>!write {&quot;enableSwitch&quot; : false}\n:0 Success.\n</code></pre><p>Example 2: Attempt to write read-only measurement values (output category)</p><pre><code>!write { &quot;vBat&quot; : 15.2, &quot;tAmbient&quot; : 22 }\n:36 Access denied.\n</code></pre><h3 id="binary-mode-2" tabindex="-1"><a class="header-anchor" href="#binary-mode-2" aria-hidden="true">#</a> Binary mode</h3><p>General layout:</p><pre><code>Request:\n+------+========+===========+     +========+===========+\n| 0x02 | 0xYYYY | CBOR data | ... | 0xYYYY | CBOR data |\n+------+========+===========+     +========+===========+\n\nResponse:\n+------+\n| 0xZZ |\n+------+\n\n0xYYYY: Data Object ID(s)\n0xZZ:   Response code (0x80 for success)\n</code></pre><p>Example 1: Disable the switch</p><pre><code>Request:\n0x02                Function ID (write)\n    0x3001          Data Object ID (enableSwitch)\n    0xf4            CBOR data: false\n\nResponse:\n0x80                Status code: Success\n</code></pre><p>Example 2: Attempt to write read-only measurement values (output category)</p><pre><code>Request:\n0x02                    Function ID (write)\n    0x4001              Data Object ID (vBat)\n    0xfa 0x41733333     CBOR data (float32): 15.2\n    0x4002              Data Object ID (tAmbient)\n    0x16                CBOR data (integer): 22\n\nResponse:\n0xa4                    Status code (Access denied)\n</code></pre><h2 id="list-data-objects-0x03" tabindex="-1"><a class="header-anchor" href="#list-data-objects-0x03" aria-hidden="true">#</a> List data objects (0x03)</h2><p>Useful function for device discovery, as it lists all available data objects or all data objects of one category.</p><p>In binary mode, the data IDs are returned, in text mode, an array of strings.</p><p>Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.</p><h3 id="text-mode-3" tabindex="-1"><a class="header-anchor" href="#text-mode-3" aria-hidden="true">#</a> Text mode</h3><p>Example 1: List all values in category output</p><pre><code>!list &quot;output&quot;\n:0 Success. [ &quot;vBat&quot;, &quot;tAmbient&quot; ]\n</code></pre><p>Example 2: List all accessible values of the device.</p><pre><code>!list\n:0 Success. { &quot;output&quot; : [ &quot;vBat&quot;, &quot;tAmbient&quot; ], &quot;input&quot; : [ &quot;loadEn&quot; ]}\n</code></pre><h3 id="binary-mode-3" tabindex="-1"><a class="header-anchor" href="#binary-mode-3" aria-hidden="true">#</a> Binary mode</h3><p>General format description:</p><pre><code>Request:\n+------+========+\n| 0x03 | 0xXXXX |\n+------+========+\n\nResponse:\n+------+========+     +========+\n| 0xZZ | 0xYYYY | ... | 0xYYYY |\n+------+========+     +========+\n\n0xXXXX: Data Object ID wildcard (all or specific category)\n0xYYYY: Data Object ID(s) belonging to requested category\n0xZZ:   Response code (0x80 for success)\n</code></pre><p>Example 1: List all values in category output</p><pre><code>Request:\n0x03                Function ID (list)\n    0x4000          Data Object ID wildcard (category &quot;output&quot;)\n\nResponse:\n0x80                Status code (Success)\n    0x4001          Data Object ID (vBat)\n    0x4002          Data Object ID (tAmbient)\n</code></pre><p>Example 2: List all accessible values of the device.</p><pre><code>Request:\n0x03                Function ID (list)\n    0x0000          Data Object ID wildcard (all data objects)\n\nResponse:\n0x80                Status code: (Success)\n    0x1001          Data Object ID (manufacturer)\n    0x3001          Data Object ID (enableSwitch)\n    0x4001          Data Object ID (vBat)\n    0x4002          Data Object ID (tAmbient)\n</code></pre><h2 id="get-data-object-name-0x04" tabindex="-1"><a class="header-anchor" href="#get-data-object-name-0x04" aria-hidden="true">#</a> Get data object name (0x04)</h2><p>Returns the name of a data object specified by its ID. This function makes sense for binary mode only, as the text-based mode uses the names directly.</p><h3 id="binary-mode-4" tabindex="-1"><a class="header-anchor" href="#binary-mode-4" aria-hidden="true">#</a> Binary mode</h3><p>General format description:</p><pre><code>Request:\n+------+========+     +========+\n| 0x04 | 0xYYYY | ... | 0xYYYY |\n+------+========+     +========+\n\nResponse:\n+------+===========+     +===========+\n| 0xZZ | CBOR data | ... | CBOR data |\n+------+===========+     +===========+\n\n0xYYYY: Data Object ID(s)\n0xZZ:   Response code (0x80 for success)\n</code></pre><p>Example 1: Request name of data object ID 0x4001 (vBat)</p><pre><code>Request:\n0x04                        Function ID (name)\n    0x4001                  Data Object ID (vBat)\n\nResponse:\n0x80                        Status code: Success.\n    0x64 0x76426174         string of length 4: &quot;vBat&quot;\n</code></pre><p>Example 2: Request name of multiple data objects</p><pre><code>Request:\n0x04                            Function ID (name)\n    0x4001                      Data Object ID (vBat)\n    0x4002                      Data Object ID (tAmbient)\n\nResponse:\n0x80                            Status code: Success.\n    0x64 0x76426174             CBOR data (4-byte string): &quot;vBat&quot;\n    0x68 0x74416D6269656E74     CBOR data (8-byte string): &quot;tAmbient&quot;\n</code></pre><h2 id="preliminary-publication-request-0x05" tabindex="-1"><a class="header-anchor" href="#preliminary-publication-request-0x05" aria-hidden="true">#</a> PRELIMINARY: Publication request (0x05)</h2><p><em>Remark: It should be possible to tell the device to publish certain data on a regular basis through a defined communication channel (UART, CAN, LoRa, etc.). It is not feasible to define different publication intervals and communication channels for each data object, as this would create lots of programming effort. On the other hand, pre-defined fixed intervals are maybe not flexible enough.</em></p><p><em>Good ideas for simple protocol layout are welcome!</em></p><h3 id="text-mode-4" tabindex="-1"><a class="header-anchor" href="#text-mode-4" aria-hidden="true">#</a> Text mode</h3><p>Example 1: Publish two values every 1000 milliseconds</p><pre><code>!pub 1000 [&quot;vBat&quot;, &quot;tAmbient&quot;]\n:0 Success.\n</code></pre><p>Now, every second the following message is sent by the device:</p><pre><code># {&quot;vBat&quot;:15.2,&quot;tAmbient&quot;:22}\n</code></pre><h2 id="preliminary-authentication-0x06" tabindex="-1"><a class="header-anchor" href="#preliminary-authentication-0x06" aria-hidden="true">#</a> PRELIMINARY: Authentication (0x06)</h2><p>Requests a challenge from the device to authenticate using secret password + hashing function.</p><p>Procedure of authentication:</p><ol><li>The client requests a challenge from the device.</li><li>The device responds with the challenge (random number, length t.b.d.)</li><li>The client generates a response code based on the received challenge and the secret password. The response code is hashed (algorithm t.b.d., maybe SHA-3) and sent to the device.</li><li>The device calculates the same response code (with the same secret password stored in the device) and compares it with the received code. If both math, authentication was successful.</li></ol><h4 id="text-mode-5" tabindex="-1"><a class="header-anchor" href="#text-mode-5" aria-hidden="true">#</a> Text mode</h4><p>If the auth request is empty, a new challenge is responded. In the second request, the calculated response code follows after the auth request. In case of successful authentication, status code 0 is responded (without additional data).</p><pre><code>!auth\n:0 Success. &lt;challenge&gt;\n\n!auth &lt;response code&gt;\n:0 Success.\n</code></pre>',88),o={render:function(e,t){return n}}}}]);
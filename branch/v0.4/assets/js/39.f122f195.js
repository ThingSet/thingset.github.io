(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{409:function(t,e,o){"use strict";o.r(e);var n=o(42),a=Object(n.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"thingset-to-http-mapping"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#thingset-to-http-mapping"}},[t._v("#")]),t._v(" ThingSet to HTTP mapping")]),t._v(" "),o("div",{staticClass:"custom-block warning"},[o("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),o("p",[t._v("This part of the protocol specification is still work in progress.")])]),t._v(" "),o("h2",{attrs:{id:"key-concepts"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#key-concepts"}},[t._v("#")]),t._v(" Key concepts")]),t._v(" "),o("p",[t._v("ThingSet is developed for point-to-point connections or small local networks, but the protocol functions were developed such that they can be easily integrated into larger networks or the internet using an HTTP gateway.")]),t._v(" "),o("p",[t._v("Many web applications interact using JSON APIs (sometimes in a RESTful way), so the compatibility with JSON web APIs is an important feature of the ThingSet protocol.")]),t._v(" "),o("p",[t._v("In order to reduce the complexity of the protocol, the features offered by HTTP were reduced:")]),t._v(" "),o("ul",[o("li",[t._v("Convention over configuration\n"),o("ul",[o("li",[t._v("Only two content-types JSON and CBOR are supported. They are detected automatically and no content-type header is needed.")]),t._v(" "),o("li",[t._v("Predefined URI layout matching the data structure.")]),t._v(" "),o("li",[t._v("Unit of data objects stored in the name (key) of a map, so the required amount of nesting in the JSON data structure is limited to categories only.")])])])]),t._v(" "),o("p",[t._v("The response codes of ThingSet are aligned with CoAP and thus also allow a simple translation to HTTP. The main difference is that HTTP doesn't allow to indicate successful requests as fine-grained as CoAP, so the status will be mostly 200 OK or 204 No Content.")])])}),[],!1,null,null,null);e.default=a.exports}}]);
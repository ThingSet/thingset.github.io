(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{382:function(e,t,a){"use strict";a.r(t);var s=a(42),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"serial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#serial"}},[e._v("#")]),e._v(" Serial")]),e._v(" "),a("p",[e._v("The serial interface can be a hardware UART interface directly with a microcontroller a virtual serial via USB or Bluetooth.")]),e._v(" "),a("h2",{attrs:{id:"uart"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uart"}},[e._v("#")]),e._v(" UART")]),e._v(" "),a("p",[e._v("As serial communication to a microcontroller via UART does not provide any error checking, a CRC checksum is appended to each message in the text mode.")]),e._v(" "),a("p",[e._v("The following extensions for the grammar as described in "),a("RouterLink",{attrs:{to:"/2b_text_mode.html"}},[e._v("Text Mode chapter")]),e._v(" are used:")],1),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('thingset-msg  = ( request / response / pub-msg )\n\nthingset-uart = thingset-msg end\n\nend = [ " " checksum ] [ CR ] LF\n\nchecksum = 8( hex )                         ; CRC-32, hex always upper case\n')])])]),a("p",[e._v("The CRC checksum is calculated over the entire thingset-msg as defined above. The same CRC-32 polynom 0x04C11DB7 as for "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Cyclic_redundancy_check",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ethernet and many other protocols"),a("OutboundLink")],1),e._v(" is used.")]),e._v(" "),a("p",[e._v("The CRC is optional so that it is still possible to interact with the device by humans using a terminal. However, the device should always calculate the CRC and in case of M2M communication, the client should check the CRC and also provide a CRC for requests to increase reliability.")]),e._v(" "),a("p",[e._v("The baudrate of the serial interface is fixed to 115200 bps.")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[e._v("The binary protocol mode is curently not supported via simple serial interfaces, as it would require some way to determine the end of a message.")])]),e._v(" "),a("h2",{attrs:{id:"usb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usb"}},[e._v("#")]),e._v(" USB")]),e._v(" "),a("p",[e._v("USB supports a virtual COM port via the CDC ACM device class.")]),e._v(" "),a("p",[e._v("If the USB interface is directly provided by the microcontroller, the checksum as for the UART interface is not needed, USB already provides error-checking in that case.")]),e._v(" "),a("p",[e._v('If a USB-to-UART converter (e.g. FTDI) is used to interact with the device, this is not considered a "virtual serial interface", as there is still a physical UART interface used between the converter and the device. Thus, checksums should be used.')]),e._v(" "),a("h2",{attrs:{id:"bluetooth"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bluetooth"}},[e._v("#")]),e._v(" Bluetooth")]),e._v(" "),a("p",[e._v("For Bluetooth, the Serial Port Profile (SPP) is used to simulate a serial interface.")]),e._v(" "),a("p",[e._v("For CRC checksums the same rules apply as for USB.")])])}),[],!1,null,null,null);t.default=r.exports}}]);
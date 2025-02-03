"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4372],{8727:(e,a,t)=>{t.r(a),t.d(a,{data:()=>i});const i={key:"v-572e9fe0",path:"/spec/v0.5/existing_solutions.html",title:"Existing Solutions",lang:"en",frontmatter:{},excerpt:"",headers:[{level:2,title:"Protocols",slug:"protocols",children:[{level:3,title:"Modbus",slug:"modbus",children:[]},{level:3,title:"Firmata",slug:"firmata",children:[]},{level:3,title:"CANopen and EnergyBus",slug:"canopen-and-energybus",children:[]},{level:3,title:"SAE J1939 / RV-C / NMEA2000 / ISOBUS",slug:"sae-j1939-rv-c-nmea2000-isobus",children:[]},{level:3,title:"XCP (Universal Measurement and Calibration Protocol)",slug:"xcp-universal-measurement-and-calibration-protocol",children:[]},{level:3,title:"UAVCAN",slug:"uavcan",children:[]}]}],filePathRelative:"spec/v0.5/existing_solutions.md",git:{updatedTime:1709745994e3}}},5609:(e,a,t)=>{t.r(a),t.d(a,{default:()=>g});var i=t(6252);const o=(0,i.uE)('<h1 id="existing-solutions" tabindex="-1"><a class="header-anchor" href="#existing-solutions" aria-hidden="true">#</a> Existing Solutions</h1><p>In order to not re-invent the wheel, existing standards were investigated prior to the development of the ThingSet specification.</p><p>This chapter gives an overview about the advantages and disadvantages of existing solutions. If you just want to know how ThingSet works, you can move on to the next chapter.</p><p>As the ThingSet protocol was originally developed for energy management based on CAN communication, below analysis covers this aspect in more detail.</p><h2 id="protocols" tabindex="-1"><a class="header-anchor" href="#protocols" aria-hidden="true">#</a> Protocols</h2><h3 id="modbus" tabindex="-1"><a class="header-anchor" href="#modbus" aria-hidden="true">#</a> Modbus</h3><p>Modbus RTU and Modbus TCP are quite old, quasi-standard protocols to read and write registers of a device. Modbus requires knowledge of the accessible register addresses and the data format. A method to discover available settings and measurement values is not possible, so it does not fulfill the requirement to be self-describing.</p><h3 id="firmata" tabindex="-1"><a class="header-anchor" href="#firmata" aria-hidden="true">#</a> Firmata</h3>',8),n=(0,i.Uk)("In the Arduino community, a protocol called "),s={href:"http://firmata.org/wiki/Main_Page",target:"_blank",rel:"noopener noreferrer"},r=(0,i.Uk)("Firmata"),l=(0,i.Uk)(" is very popular to control Arduino devices directly via the serial interface. The protocol based on the MIDI protocol and very compact. However, the approach is very Arduino-specific and targets to remote-control as many Arduino features as possible. ThingSet aims to be a more general purpose solution."),d=(0,i.uE)('<h3 id="canopen-and-energybus" tabindex="-1"><a class="header-anchor" href="#canopen-and-energybus" aria-hidden="true">#</a> CANopen and EnergyBus</h3><p>CANopen is developed by CAN in Automation (CiA). This high level protocol uses CAN as physical layer and adds profile specifications, standardized communication protocol and advanced error handling to the core functionality of CAN. Despite the word &quot;open&quot; in the name, only the basic device profile specifications are open accessible. A paid CiA membership is necessary to access all specifications. Unfortunately, the EnergyBus profiles (CiA 454) for a CAN based energy management system are not provided with free access.</p><p>CiA DS301 specifies the basic communication functionalities of the CANopen application layer.</p><p>Every device (called CANopen node) must have an object dictionary (OD). This is a large table stored in the node which contains all kinds of data, including device parameters, measurement or control data. In addition to that, it stores also data necessary for communication e.g. which datatypes are used or how a message can be transported (broadcast, handshake, ..).</p><p>There are two different types of telegrams:</p><ul><li><p>Service Data Objects (SDOs): These are only used to access the OD. When a device receives an SDO it changes the values of parameters or other OD table entries. The communication is based on a Client/Server relationship. A client initiates an SDO communication, the server then changes its OD according to the client&#39;s instruction and sends a response. The client is typically a master device or an operator who supervises and configures the entire network.</p></li><li><p>Process Data Objects (PDOs): The majority of messages in the bus contain process information like measurement data, control data, status data, etc. The data is read from the OD and transmitted as a PDO, which is basically a pure CAN telegram without protocol overhead. The CAN-identifier of a PDO telegram does not only contain the node-ID of a device (like this is the case in &quot;pure CAN&quot;) but also what kind of content is delivered by the telegram.</p></li></ul><p>The PDO telegrams are not predefined, but they are configured separately for each network. For each device, four Receive-PDOs (RPDOs) and four Transmit-PDOs (TPDOs) can be defined. For example, the actual current of the battery could be sent as a TPDO by the battery management system and an received as RPDO in a charge controller.</p><p>The connection channels between different devices for PDO exchange are defined using a PDO mapping procedure. This has the advantage that the process data exchange between different devices can be very flexible. However, it makes an initial network setup necessary. If a device is added to the network, it has to be shut down, some PDO mappings have to be defined and afterwards the network is put into operation mode again. This contradicts to the requirement of a plug-and-play capable energy system.</p><p>An intelligent master device implementing the network management (NMT) features could be used instead of manual configuration. But also a master device is not beneficial for a distributed, fail-safe energy system.</p><p>Summary of issues:</p><ul><li>Pre-defined frame layout defined in not completely open specification</li><li>Complicated network setup (normally done using proprietary tools)</li><li>Not intended for master-less operation</li><li>Only 4 RPDOs and TPDOs possible per node ID for control functions</li></ul><h3 id="sae-j1939-rv-c-nmea2000-isobus" tabindex="-1"><a class="header-anchor" href="#sae-j1939-rv-c-nmea2000-isobus" aria-hidden="true">#</a> SAE J1939 / RV-C / NMEA2000 / ISOBUS</h3><p>The collection of SAE J1939 standards describe a well-established CAN application layer protocol. Several other protocols like RV-C (recreational vehicles), NMEA2000 (marine applications) and ISOBUS (agriculture machines) are based on SAE J1939.</p><p>Unfortunately, all SAE J1939 based standards (including the base standard itself) are proprietary and not puplic. Only RV-C is available for download.</p><p>SAE J1939 uses only the extended format CAN id with 29 bits and encodes message priority, source ID, destination ID and the type of message (Parameter Group Number, PGN) inside the CAN ID.</p><p>In general, SAE J1939 is based on fixed (specified) layout of the data fields in the CAN frame, depending on the PGN.</p><p>In addition, the protocol is not designed for configuration of parameters. Writing parameters to a device can be achieved only by specifying special PGNs. In contrast to CANopen, parameters cannot be read or written by default.</p><h3 id="xcp-universal-measurement-and-calibration-protocol" tabindex="-1"><a class="header-anchor" href="#xcp-universal-measurement-and-calibration-protocol" aria-hidden="true">#</a> XCP (Universal Measurement and Calibration Protocol)</h3><p>XCP is an established protocol for ECU (Engine Control Unit) development in the automotive industry. It is not limited to CAN as a low level interface, but CAN is probably the most commonly used lower layer.</p><p>Measurement data and calibration parameters are accessed directly via registers in the microcontroller. Thus, the register values and description has to be generated during linking of the binary code. The register description is typically saved in a .A2L file.</p><p>For an agile open source based development, the toolchain for generating the A2L file is considered too complicated. In addition to that, tools for XCP and A2L are mostly proprietary and expensive.</p><p>XCP is also not useable for a master-less control of devices in a system, as this was not a purpose of the protocol.</p><p>However, XCP offers a well-suited way for firmware upgrades of devices. This feature might be adapted in a future version of this specification.</p><h3 id="uavcan" tabindex="-1"><a class="header-anchor" href="#uavcan" aria-hidden="true">#</a> UAVCAN</h3>',24),c={href:"http://uavcan.org/",target:"_blank",rel:"noopener noreferrer"},p=(0,i.Uk)("UAVCAN"),h=(0,i.Uk)(" is a modern and lightweight protocol based on CAN, also targeting a master-less network. Main applications include aerospace and robotic applications."),u=(0,i._)("p",null,"The protocol is fully open, well-designed and easy to be implemented. However, it also uses pre-defined messages for the communication between devices.",-1),m=(0,i._)("p",null,"The node ID assignment process is more complicated compared to SAE J1939.",-1),f=(0,i._)("p",null,"Some aspects of the UAVCAN protocol might be adapted in the CAN lower layer of this specification.",-1),g={render:function(e,a){const t=(0,i.up)("OutboundLink");return(0,i.wg)(),(0,i.iD)(i.HY,null,[o,(0,i._)("p",null,[n,(0,i._)("a",s,[r,(0,i.Wm)(t)]),l]),d,(0,i._)("p",null,[(0,i._)("a",c,[p,(0,i.Wm)(t)]),h]),u,m,f],64)}}}}]);
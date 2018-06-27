# Existing Standards

In order to not re-invent the wheel, existing standards were investigated prior to the development of this specification.

This chapter gives an overview about the advantages and disadvantages of existing solutions.

## Low level communication protocols

### UART, I2C and SPI

The simple serial protocols commonly used for communication between microcontrollers are not suitable for communication between different devices inside a distributed energy system.

The UART protocol is only suitable for point-to-point communication, but not for a network of several devices connected to the same wires.

I2C features a bus structure, but needs a master and slave topology. Master-less operation is not possible because the protocol lacks collision handling on the bus. In addition to that, long distances between devices and varying ground potentials could cause signal reliability problems.

Also SPI is only suitable for single master topologies. In addition to that, each connected device would need a separate chip select wire, which is not feasible.

### RS485 and Modbus

RS485 is a differential bus and as such very reliable also for long distances. However, it does not offer collision handling and is only suitable for a single-master topology.

So, also the high level protocol Modbus RTU, which is based on RS485, is not feasible.

### Controller Area Network (CAN)

In contrast to RS485, CAN offers advanced features for collision handling. It is reliable while still quite low-cost as it is used extensively in the automotive industry.

Because of these unique features, CAN was selected as the primary low layer protocol in a master-less system.

### Ethernet

Ethernet is a feasible low layer protocol aswell, but is more complicated and expensive than CAN. Only very few microcontrollers include hardware Ethernet support.


## Application layer protocols based on CAN

As CAN is quite popular not only in automotive industry, but also in industrial automation, several high layer protocols exist.

### CANopen and EnergyBus

CANopen is developed by CAN in Automation (CiA). This high level protocol uses CAN as physical layer and adds profile specifications, standardized communication protocol and advanced error handling to the core functionality of CAN. Despite the word "open" in the name, only the basic device profile specifications are open accessible. A paid CiA membership is necessary to access all specifications. Unfortunately, the EnergyBus profiles (CiA 454) for a CAN based energy management system are not provided with free access.

CiA DS301 specifies the basic communication functionalities of the CANopen application layer.

Every device (called CANopen node) must have an object dictionary (OD). This is a large table stored in the node which contains all kinds of data, including device parameters, measurement or control data. In addition to that, it stores also data necessary for communication e.g. which datatypes are used or how a message can be transported (broadcast, handshake, ..).

There are two different types of telegrams:

- Service Data Objects (SDOs): These are only used to access the OD. When a device receives an SDO it changes the values of parameters or other OD table entries. The communication is based on a Client/Server relationship. A client initiates an SDO communication, the server then changes its OD according to the client's instruction and sends a response. The client is typically a master device or an operator who supervises and configures the entire network.

- Process Data Objects (PDOs): The majority of messages in the bus contain process information like measurement data, control data, status data, etc. The data is read from the OD and transmitted as a PDO, which is basically a pure CAN telegram without protocol overhead. The CAN-identifier of a PDO telegram does not only contain the node-ID of a device (like this is the case in "pure CAN") but also what kind of content is delivered by the telegram.

The PDO telegrams are not predefined, but they are configured separately for each network. For each device, four Receive-PDOs (RPDOs) and four Transmit-PDOs (TPDOs) can be defined. For example, the actual current of the battery could be sent as a TPDO by the battery management system and an received as RPDO in a charge controller.

The connection channels between different devices for PDO exchange are defined using a PDO mapping procedure. This has the advantage that the process data exchange between different devices can be very flexible. However, it makes an initial network setup necessary. If a device is added to the network, it has to be shut down, some PDO mappings have to be defined and afterwards the network is put into operation mode again. This contradicts to the requirement of a plug-and-play capable energy system.

An intelligen master device implementing the network management (NMT) features could be used instead of manual configuration. But also a master device is not beneficial for a distributed, fail-safe energy system.

Summary of issues:

- Complicated configuration
- Not intended for master-less operation
- Only 4 RPDOs and TPDOs possible per node ID for control functions

### SAE J1939 / RV-C / NMEA2000 / ISOBUS

The collection of SAE J1939 standards describe a well-established CAN application layer protocol. Several other protocols like RV-C (recreational vehicles), NMEA2000 (marine applications) and ISOBUS (agriculture machines) are based on SAE J1939.

Unfortunately, all SAE J1939 based standards (including the base standard itself) are proprietary and not puplic. Only RV-C is available for download.

SAE J1939 uses only the extended format CAN id with 29 bits and encodes message priority, source ID, destination ID and the type of message (Parameter Group Number, PGN) inside the CAN ID.

In general, SAE J1939 is based on fixed (specified) layout of the data fields in the CAN frame, depending on the PGN.

In addition, the protocol is not designed for configuration of parameters. Writing parameters to a device can be achieved only by specifying special PGNs. In contrast to CANopen, parameters cannot be read or write by default.

### XCP (Universal Measurement and Calibration Protocol)

XCP is an established protocol for ECU (Engine Control Unit) development in the automotive industry. It is not limited to CAN as a low level protocol, but CAN is probably the most commonly used low level protocol.

Measurement data and calibration parameters are accessed directly via registers in the microcontroller. Thus, the register values and description has to be generated during linking of the binary code. The register description is typically saved in a .A2L file.

For an agile open source based development, the toolchain for generating the A2L file is considered too complicated. In addition to that, tools for XCP and A2L are mostly proprietary and expensive.

XCP is also not useable for a master-less control of devices in a system, as this was not a purpose of the protocol.

However, XCP offers a well-suited way for firmware upgrades of devices. This feature might be adapted also in a future version of this specification.

### UAVCAN

[UAVCAN](http://uavcan.org/) is a modern and lightweight protocol based on CAN, also targeting a master-less network. Main applications include aerospace and robotic applications.

The protocol is fully open, well-designed and easy to be implemented. However, it also uses pre-defined messages for the communication between devices..

The node ID assignment process is very complicated compared to SAE J1939.

Some aspects of the UAVCAN protocol might be adapted in this specification.

## Other application layer protocols

### Sunspec Alliance (Modbus TCP)

Several global players of the solar industry united under the name Sunspec Alliance in order to define joint, open standards for information exchange in Distributed Energy Resources (DER).

Several major inverter companies (like SMA, Fronius, Solar Edge) already adopted the standards and offer communication interfaces using Sunspec information models.

As the sunspec alliance protocol is based on Modbus, read and write actions are performed directly on register level. This requires a map of registers, data types and functional description as a basis for communication. So the protocol is not self-describing, as required.

## Open Source Protocol Approach

The open source energy management protocol described in this document will use some basic features of SAE J1939. The frame format and encoding of the CAN ID will be similar. In addition to that, the address claiming procedure and the transport protocol for messages > 8 bytes will be re-used as far as possible.

ToDo:

- Publish/subscribe and request/response pattern
- High level protocol specification, useable with different base layers

One important difference compared to EnergyBus regarding energy management: Battery requests to be charged (vs. chargers are configured to deliver current). This allows master-less operation.

A similar approach is already implemented in RV-C (message type *DC Source Status 4*) and might be adapted.

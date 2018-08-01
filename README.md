# Introduction

This specification describes a communication protocol for control, configuration and monitoring of devices in a DC based energy system. The application level protocol is widely independent of the underlying transport protocols and physical interfaces, so it can be used with e.g. CAN, USB, WiFi, Bluetooth or a simple serial interface.

Even though this protocol was developed with the focus on energy management (especially the Libre Solar MPPT and BMS devices), it can be used for other purposes aswell. The specification is published under a permissive license for both commercial and personal use.

The working name of the protocol is ThingSet Protocol - a protocol for settings of "things".

# Content

1. [Energy System Layout](system_layout.md)

2. [Protocol Requirements](requirements.md)

3. [Existing Standards](existing_standards.md)

4. Application Level Protocol

	- [Communication Models](communication_models.md)
	- [ThingSet Protocol](thingset.md)
	- Control Protocol (ToDo)

5. Low Level Protocols

	- [CAN](can.md)
	- USART (ToDo)
	- USB (ToDo)
	- ...


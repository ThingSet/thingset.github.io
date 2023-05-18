# Abstract

ThingSet provides a transport-agnostic and self-explanatory way for accessing data of ressource-constrained devices.

The foundation of ThingSet is semantic data model which allows applications to discover necessary metadata from the device itself, including data types, units, or access rights.

The protocol itself allows to perform create, read, update, and delete (CRUD) actions on the data. There are two different protocol modes: A very compact binary mode based on CBOR data and a text mode using JSON, which is easily useable by humans as a shell-like interface.

Virtually any transport layer can be used to carry ThingSet messages, be it a simple serial UART, Bluetooth, CAN bus, LoRaWAN, or IP-based protocols such as MQTT or WebSockets.

This specification is published under the [CC BY-SA 4.0 License](https://creativecommons.org/licenses/by-sa/4.0/).

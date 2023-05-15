# Objectives

The main objectives of ThingSet are described below.

### Flexible

As an application layer protocol, it is largely independent of the underlying transport protocols and physical interfaces. For example, it can be used with CAN, USB, WiFi, Bluetooth, a simple serial interface, or emerging interfaces of the future.

### Compatible

Easy to integrate with existing protocols such as MQTT, HTTP or CoAP and based on common data formats such as JSON or CBOR.

### Easy to use and human-readable

The protocol has a text mode which is human-readable. This allows easy manual device communication via the serial interface. For M2M communication, a more compact binary is available.

### Compact footprint

Implementation and binary data representations are very compact to enable transport via LoRa and CAN. Standard CAN frames allow a payload of only 8 bytes per frame, LoRaWAN allows [51 bytes](https://www.thethingsnetwork.org/forum/t/limitations-data-rate-packet-size-30-seconds-uplink-and-10-messages-downlink-per-day-fair-access-policy/1300) of application payload per message.

### Schema-less and self-explanatory

It should be possible to configure and monitor a device without a manual or a configuration file. This means that the protocol needs functions to discover the features and configurable settings of an unknown device. In contrast to other protocols like Modbus, you should not need to know the variable type and register address where a setting is stored. It can be used as a [canonical data model](https://en.wikipedia.org/wiki/Canonical_model).

### Stateless

The small devices should not need to handle sessions. Each request stands for its own.

### Zero-overhead API

Strict naming conventions provide sufficient information like units and data types at a minimum of necessary bytes transferred over low bandwidth connections.

# Objectives

The main objectives of ThingSet are described below.

#### Flexible

As an application layer protocol, it is largely independent of the underlying transport protocols and physical interfaces. For example, it can be used with CAN, USB, WiFi, Bluetooth, a simple serial interface, or emerging interfaces of the future.

#### Compatible

Easy to integrate with existing protocols such as MQTT or CoAP and based on common data formats such as JSON or CBOR.

#### Easy to use and human-readable

The protocol has a text mode which is human-readable. This allows easy manual device communication via the serial interface. For M2M communication, a more compact binary is available.

#### Compact footprint

Implementation and binary data representations are very compact to enable transport via LoRa and CAN. Standard CAN frames allow a payload of only 8 bytes per frame, LoRaWAN allows [51 bytes](https://www.thethingsnetwork.org/forum/t/limitations-data-rate-packet-size-30-seconds-uplink-and-10-messages-downlink-per-day-fair-access-policy/1300) of application payload per message.

#### Schema-less and self-explanatory

It should be possible to configure and monitor a device without a manual or a configuration file. This means that the protocol needs functions to discover the features and configurable settings of an unknown device. In contrast to other protocols like Modbus, you should not need to know the variable type and register address where a setting is stored. It can be used as a [canonical data model](https://en.wikipedia.org/wiki/Canonical_model).

#### Stateless

The small devices should not need to handle sessions. Each request stands for its own.

#### Zero-overhead API

Strict naming conventions provide sufficient information like units and data types at a minimum of necessary bytes transferred over low bandwidth connections.

### Device Classes

[RFC 7228](https://datatracker.ietf.org/doc/html/rfc7228) defines three different classes of constrained devices according to the following table:

| Name        | data size (e.g., RAM) | code size (e.g., Flash) |
|-------------|-----------------------|-------------------------|
| Class 0, C0 | << 10 KiB             | << 100 KiB              |
| Class 1, C1 | ~ 10 KiB              | ~ 100 KiB               |
| Class 2, C2 | ~ 50 KiB              | ~ 250 KiB               |

The ThingSet protocol aims at being suitable for all classes.

For class 0 devices and on networks with very low bitrate and payload sizes (CAN, LoRaWAN) it is recommended to use the binary mode with numeric IDs instead of data object names to keep the messages as compact as possible.

If the payload size does not have to be optimized to its very minimum, the binary mode can be used with names instead of IDs (see [Binary Mode](2c_binary_mode.md) chapter for more details). The advantage of the binary mode is that no support for printing floating point numbers is required, which reduces firmware footprint significantly. This mode is suitable for class 0 and class 1 devices.

For most class 1 and class 2 devices, floating-point support will not be an issue, so they might also use the text mode for easier direct interactions with humans. Also gateways should typically support the text mode in order to map ThingSet to other higher-level protocols like CoAP and MQTT.

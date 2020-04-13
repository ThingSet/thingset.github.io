# Introduction

This specification describes a communication protocol for control, configuration and monitoring of connected devices. It is published under the permissive [CC BY-SA 4.0 License](https://creativecommons.org/licenses/by-sa/4.0/).

The protocol is called ThingSet - a protocol for **set**tings of **thing**s. The main goals of the protocol are:

### Flexible

As an application layer protocol it should be widely independent of the underlying transport protocols and physical interfaces. It can be used with e.g. CAN, USB, WiFi, Bluetooth, a simple serial interface or upcoming interfaces of the future.

### Easy to use and human-readable

Similar to Modbus, the protocol should have a text-based mode which is human-readable. This allows easy manual device communication via the serial interface. For M2M communication, a more compact binary mode should be available.

### Compact footprint

Implementation and binary data representations should be very compact to enable transport via LoRa and CAN. Standard CAN frames allow a payload of only 8 bytes per frame, LoRa allows [51 bytes](https://www.thethingsnetwork.org/forum/t/limitations-data-rate-packet-size-30-seconds-uplink-and-10-messages-downlink-per-day-fair-access-policy/1300) of application payload per message.

### Schema-less and self-explaining

It should be possible to configure and monitor a device without a manual or a configuration file. This means that the protocol needs functions to discover the features and configurable settings of an unknown device. In contrast to other protocols like Modbus, you should not need to know the variable type and register address where a setting is stored.

In addition to that, it should be forward and backward compatible: An old device should happily talk to a newer client application and an updated device (providing more data for example) should still be able to talk to an older client.

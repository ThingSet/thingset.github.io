# General Concept

The ThingSet protocol provides a consistent, standardized way to configure, monitor and control ressource-constrained devices via different communication interfaces. It specifies the higher layers (5 to 7) of the [OSI (Open Systems Interconnection) model](https://en.wikipedia.org/wiki/OSI_model). The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, LoRa, WiFi, Bluetooth, UART (serial) or similar.

![ISO/OSI layer setup](../images/osi_layers.png)

The underlying layers have to ensure encryption, reliable transfer, correct packet order (if messages are packetized) and error-checking of the transferred data.

A major feature of the ThingSet protocol is a seamless integration with other application layer protocols such as HTTP, [CoAP](https://tools.ietf.org/html/rfc7252) and MQTT. Suggestions for implementing gateways to convert between ThingSet messages and HTTP/CoAP/MQTT payload can be found in the Protocol Mapping sections.

## Message Types

ThingSet defines three types of messages: Requests, responses and statements.

A **request** is sent from one device (client) to a single other device (server). The server is expected to answer with a **response** containing a status code and optional payload.

A **statement** is a message that is sent without expecting a response or confirmation. It may be sent to a particular device or broadcast through the network to be received by any interested device (publish-subscribe model).

If a device receives a statement, it is considered a proposal to update the values as stated in the message. If all or some of the requested changes are invalid, they are silently ignored, as it is not possible to respond to a statement.

### Request-response model

The communication between two specific devices uses a request-response messaging pattern. A connection can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several devices attached (e.g. CAN, Ethernet, WiFi, LoRa). In case of a network, each device has to be uniquely addressable.

![Communication Channels](../images/communication_channels.png)

The client would usually be a display, a mobile phone application or a gateway.

The data transfer is always synchronous: The client sends a request and waits until it receives a response before it sends another request to the same device.

### Publish-subscribe model

Monitoring data is not intended for only a single device, but could be interesting for several devices (e.g. data logger and display). Thus, the monitoring data can be exchanged via a publish-subscribe messaging pattern to increase efficiency and avoid polling.

In contrast to MQTT, published messages are directly broadcast and there is no intermediate broker to store the messages. Published messages are not confirmed by recipients, so there is no guarantee if the message was received.

This model is mainly used for machine-to-machine (M2M) communication, e.g. to store measurements in a database. One dedicated application is the plug-and-play control of multiple energy sources and sinks in a renewable energy system. The details of the implementation are currently still work-in-progress.

## Protocol Modes

Similar to Modbus, the ThingSet protocol supports two different modes: A human-readable text mode and a binary mode.

In the text mode, payload data is encoded in JSON format ([RFC 8259](https://tools.ietf.org/html/rfc8259)). This mode is recommended when using serial communication interfaces as the low layer protocol, as it can be easily used directly on a terminal.

The binary mode uses CBOR ([RFC 7049](https://tools.ietf.org/html/rfc7049)) instead of JSON for payload data encoding in order to reduce the protocol overhead for ressource-constrained devices or low bandwith communication via CAN or LoRa.

A device may implement both variants of the protocol, but it is also allowed to support only the mode most suitable for the application.

## Device Classes

[RFC 7228](https://datatracker.ietf.org/doc/html/rfc7228) defines three different classes of constrained devices according to the following table:

| Name        | data size (e.g., RAM) | code size (e.g., Flash) |
|-------------|-----------------------|-------------------------|
| Class 0, C0 | << 10 KiB             | << 100 KiB              |
| Class 1, C1 | ~ 10 KiB              | ~ 100 KiB               |
| Class 2, C2 | ~ 50 KiB              | ~ 250 KiB               |

The ThingSet protocol aims at being suitable for all classes.

For class 0 devices and on networks with very low bitrate and payload sizes (CAN, LoRaWAN) it is recommended to use the binary mode with numeric IDs instead of data object names to keep the messages as compact as possible.

If the payload size does not have to be optimized to its very minimum, the binary mode can be used with names instead of IDs (see [Binary Mode](2c_binary_mode.md) chapter for more details). The advantage of the binary mode is that no support for floating point numbers for `printf` is required, which reduces firmware footprint significantly. This mode is suitable for class 0 and class 1 devices.

For most class 1 and class 2 devices, floating-point support will not be an issue, so they might also use the text mode for easier direct interactions with humans. Also gateways should typically support the text mode in order to map ThingSet to other higher-level protocols like HTTP and MQTT.

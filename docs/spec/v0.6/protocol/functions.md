# Access Functions

## Protocol Stack

It specifies the higher layers (5 to 7) of the [OSI (Open Systems Interconnection) model](https://en.wikipedia.org/wiki/OSI_model). The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, LoRa, WiFi, Bluetooth, UART (serial) or similar.

![ISO/OSI layer setup](../../images/osi_layers.png)

The underlying layers have to ensure encryption, reliable transfer, de-duplication, correct packet order (if messages are packetized) and error-checking of the transferred data.

A major feature of the ThingSet protocol is a seamless integration with other application layer protocols such as HTTP, [CoAP](https://tools.ietf.org/html/rfc7252) and MQTT. Suggestions for implementing gateways to convert between ThingSet messages and HTTP/CoAP/MQTT payload can be found in the Protocol Mapping sections.

## Message Types

ThingSet defines four types of messages: Requests, responses, desires and reports.

A **request** is sent from one device (client) to a single other device (server). The server is expected to answer with a **response** containing a status code and optional payload.

A **report** is a message that is sent out by a node without expecting a response or confirmation. It may be sent to a particular device or broadcast through the network to be received by any interested device (publish-subscribe model).

A **desire** is a message that is sent to a node without expecting a response or confirmation. It is considered a proposal to update the values as stated in the message. If all or some of the requested changes are invalid, they are silently ignored, as it is not possible to respond to a desire.

::: tip Idea for evaluation
After each update of a value via request/response, the device sends out a report with the updated values. This ensures that also other devices are notified (reports may be broadcast on the bus) and it allows to double-check if the value was correctly received or if it was e.g. rounded to the next possible value.
:::

### Request-response model

The communication between two specific devices uses a request-response messaging pattern. A connection can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several devices attached (e.g. CAN, Ethernet, WiFi, LoRa). In case of a network, each device has to be uniquely addressable.

![Communication Channels](../../images/communication_channels.png)

::: warning ToDo
Explain hierarchical topology of connected ThingSet nodes and define differences between Nodes, Devices and Gateways.
:::

The client would usually be a display, a mobile phone application or a gateway.

The data transfer is always synchronous: The client sends a request and waits until it receives a response before it sends another request to the same device.

### Publish-subscribe model

Monitoring data is not intended for only a single device, but could be interesting for several devices (e.g. data logger and display). Thus, the monitoring data can be exchanged via a publish-subscribe messaging pattern to increase efficiency and avoid polling. Reports are used for this purpose.

In contrast to MQTT, reports are directly broadcast and there is no intermediate broker to store the messages. Reports are not confirmed by recipients, so there is no guarantee if the message was received.

This model is mainly used for machine-to-machine (M2M) communication, e.g. to store measurements in a database. One dedicated application is the plug-and-play control of multiple energy sources and sinks in a renewable energy system. The details of the implementation are currently still work-in-progress.

## Protocol Modes

Similar to Modbus, the ThingSet protocol supports two different modes: A human-readable text mode and a binary mode.

In the text mode, payload data is encoded in JSON format ([RFC 8259](https://tools.ietf.org/html/rfc8259)). This mode is recommended when using serial communication interfaces as the low layer protocol, as it can be easily used directly on a terminal.

The binary mode uses CBOR ([RFC 8949](https://tools.ietf.org/html/rfc8949)) instead of JSON for payload data encoding in order to reduce the protocol overhead for ressource-constrained devices or low bandwith communication via CAN or LoRa.

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

## Access Functions

The first byte of a ThingSet message is either a text-mode identifier (`?`, `=`, `!`, `+`, `-`, `:`, `@` and `#`), a binary request code or a binary status code. Received data with unknown first byte is ignored, so that other text output (e.g. debug print information) can be used in parallel to the ThingSet protocol on the same serial interface.

### Requests

The protocol supports the typical [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Request codes match with CoAP to allow transparent mapping between ThingSet and HTTP APIs or CoAP devices.

| Code | Text ID | Function | CoAP equivalent | Description                    |
|------|---------|----------|--------|-----------------------------------------|
| 0x01 | ?       | GET      | GET    | Retrieve all data from a path           |
| 0x02 | !       | EXEC     | POST   | Execute a function                      |
| 0x04 | -       | DELETE   | DELETE | Delete data from an object              |
| 0x05 | ?       | FETCH    | FETCH  | Retrieve a part of the data from a path |
| 0x06 | +       | CREATE   | PATCH  | Append data to an object                |
| 0x07 | =       | UPDATE   | iPATCH | Update (overwrite) data of a path       |

The CoAP PUT method is not explicitly implemented. PUT is equivalent to an update of all sub-objects of a resource using a PATCH request. UPDATE requests for ThingSet are always idempotent, so only the iPATCH request code is used. The PATCH method is used to create new data.

Additional request codes may be introduced in the future. Codes `0x0A`, `0x0D` and `0x20`-`0x7F` are reserved, as they represent the ASCII characters for readable text including `LF` and `CR`.

### Responses

Response messages in binary format are identified by a first byte greater than or equal to 128 (`0x80`) containing a status code which shows if the request could be handled successfully. For status codes between `0x80` and `0x9F`, the response was successful. If the status code is greater than or equal to `0xA0`, an error occured.

The status codes are again aligned with [CoAP response codes](https://www.iana.org/assignments/core-parameters/core-parameters.xhtml#codes), but contain an offset so that there is no interference with ASCII characters (less than 0x80).

| Code | CoAP | HTTP | Description   | Comment                                |
|------|------|------|---------------|----------------------------------------|
| 0x81 | 2.01 | 201  | Created       | Answer to CREATE requests              |
| 0x82 | 2.02 | 204  | Deleted       | Answer to DELETE request               |
| 0x84 | 2.04 | 200/204 | Changed    | Answer to EXEC and UPDATE requests     |
| 0x85 | 2.05 | 200  | Content       | Answer to GET and FETCH requests       |
| 0xA0 | 4.00 | 400  | Bad Request   | |
| 0xA1 | 4.01 | 401  | Unauthorized  | Authentication needed       |
| 0xA3 | 4.03 | 403  | Forbidden     | Trying to write read-only value |
| 0xA4 | 4.04 | 404  | Not Found     | |
| 0xA5 | 4.05 | 405  | Method Not Allowed         | If e.g. DELETE is not allowed for that object |
| 0xA8 | 4.08 | 400  | Request Entity Incomplete  | |
| 0xA9 | 4.09 | 409  | Conflict                   | Configuration conflicts with other settings |
| 0xAD | 4.13 | 413  | Request Entity Too Large   | |
| 0xAF | 4.15 | 415  | Unsupported Content-Format | If trying to assign a string to an int |
| 0xC0 | 5.00 | 500  | Internal Server Error      | Generic catch-all response |
| 0xC1 | 5.01 | 501  | Not Implemented            | Request method is not supported |
| 0xC4 | 5.04 | 504  | Gateway Timeout            | Node cannot be reached through gateway |
| 0xC5 | 5.05 | 505  | Not a Gateway              | Node is not a gateway and does not support absolute paths |

Responses text mode use the colon `:` as the first byte identifier, followed by the hexadecimal response code converted into a string without the `0x` prefix. The binary mode uses the code directly as the first byte.

### Desires and Reports

Desires and reports are neither requests nor response messages, as they are sent without expecting a confirmation. Below table lists the message specifiers in text and binary mode.

| Code | Text ID | Description |
|------|---------|-------------|
| 0x1D | @       | Desire      |
| 0x1F | #       | Report      |

The internal path `_Reporting` is used to configure the device to publish certain data items on a regular basis through a defined communication channel (UART, CAN, LoRaWAN, etc.). If implemented in the firmware, the publication interval may be adjustable.

By convention, the object names below the `_Reporting` define which data object should be published. This can be an entire group like `Bat` or a subset data object that contains a list of references to other data items like `eChange` in the above example.

More details regarding the ThingSet protocol methods for data access will be explained in the next chapter.

::: tip Idea for evaluation
Publication of a report can be manually triggered by sending a desire with empty payload to the same path of that node.
:::

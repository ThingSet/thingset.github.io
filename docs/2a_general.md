# General Concept

The ThingSet protocol provides a consistent, standardized way to configure, monitor and control ressource-constrained devices via different communication interfaces. It specifies the higher layers (5 to 7) of the [OSI (Open Systems Interconnection) model](https://en.wikipedia.org/wiki/OSI_model). The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, LoRa, WiFi, Bluetooth, UART (serial) or similar.

![ISO/OSI layer setup](./images/osi_layers.png)

The underlying layers have to ensure encryption, reliable transfer, correct packet order (if messages are packetized) and error-checking of the transferred data.

A major feature of the ThingSet protocol is a seamless integration with other application layer protocols such as HTTP, [CoAP](https://tools.ietf.org/html/rfc7252) and MQTT. Suggestions for implementing gateways to convert between ThingSet messages and HTTP/CoAP/MQTT payload can be found in the Protocol Mapping sections.

## Message Types

ThingSet defines three types of messages: Requests, responses and statements.

A **request** is sent from one device (client) to a single other device (server). The server is expected to answer with a **response** containing a status code and optional payload.

A **statement** is a message that is sent without expecting a response or confirmation. It may be sent to a particular device or broadcast through the network to be received by any interested device (publish-subscribe model).

If a device receives a statement, it is considered a proposal to update the values as stated in the message. If all or some of the requested changes are invalid, they are silently ignored, as it is not possible to respond to a statement.

### Request-response model

The communication between two specific devices uses a request-response messaging pattern. A connection can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several devices attached (e.g. CAN, Ethernet, WiFi, LoRa). In case of a network, each device has to be uniquely addressable.

![Communication Channels](./images/communication_channels.png)

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

## Data Structure

All accessible data of a device is [structured as a tree](https://en.wikipedia.org/wiki/Tree_(data_structure)). The nodes of the tree structure are called data objects and correspond to the JSON object definition.

Inner nodes in the structure are used to define paths or endpoints for data access. Actual data is stored in the leaf nodes, which can contain any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar information.

Each data object in the tree is identified by a unique ID and a name. The ID can be chosen by the firmware developer. The name is a short case-sensitive ASCII string containing only alphanumeric characters, dots or underscores without any whitespace characters.

The underscore is only used to specify the unit of the data object (if applicable, also see below). No additional underscore is allowed in the name and the name of each object must be unique per device.

A dot is used to identify paths which are used internally by the implementation of the protocol itself (e.g. configuration of publication messages). Other usages of a dot in the data object names is not allowed.

The numeric IDs are used to access data objects in the binary protocol for reduced message size. They can also be used in the firmware to define the relations in the data structure. For all interactions with users and in the text-based mode, only the object names and paths are used.

### Reserved IDs

The IDs 0x10-0x1F are reserved for special data objects that need to be known in advance. In addition to that, IDs starting from 0x8000 are reserved for control purposes and will be assigned in the future.

The following table shows the assigned IDs. Currently unassigned IDs might be defined in a future version of the protocol.

| ID   | Name       | Description |
|------|------------|-------------|
| 0x10 | Time_s     | Unix timestamp in seconds since Jan 01, 1970 |
| 0x17 | .name      | Endpoint used by binary protocol to determine names from IDs |
| 0x18 | DataExtURL | URL to JSON file containing additional information about exposed data |
| >=0x8000 | ...    | Control data objects with fixed IDs |

The IDs up to 0x17 consume only a single byte when encoded as CBOR, which minimizes space consumption for IDs that are used often. The `DataExtURL` is retrieved only once during startup, so it is acceptable to consume 2 bytes for its ID.

### Example

For explanation of the protocol, the following simplified data structure of an MPPT charge controller will be used:

```JSON
{
    "info": {                                                       // 0x01
        "DataExtURL": "https://files.libre.solar/tsx/cc-v03.json",  // 0x18 (fixed)
        "DeviceType": "MPPT 1210 HUS",                              // 0x30
        "DeviceID": "ABC12345"                                      // 0x31
    },
    "meas": {                                                       // 0x02
        "Time_s": 460677600,                                        // 0x10 (fixed)
        "Bat_V": 14.2,                                              // 0x40
        "Bat_A": 5.13,                                              // 0x41
        "Ambient_degC": 22                                          // 0x42
    },
    "state": {                                                      // 0x03
        "ChargerState": 3,                                          // 0x60
        "ErrorFlags": 0                                             // 0x61
    },
    "rec": {                                                        // 0x04
        "BatChgDay_Wh": 1984,                                       // 0x70
        "AmbientMax_deg": 21.6                                      // 0x71
    },
    "input": {                                                      // 0x05
        "EnableCharging": true                                      // 0x90
    },
    "conf": {                                                       // 0x06
        "BatCharging_V": 14.4                                       // 0xA0
    },
    "rpc": {                                                        // 0x0E
        "x-reset": null,                                            // 0xE0
        "x-auth": ["Password"]                                      // 0xE1
    },
    "dfu": {                                                        // 0x0D
        "x-write": ["Offset_B", "Data"],                            // 0xF0
        "FlashSize_KiB": 128                                        // 0xF1
    },
    "report": {                                                     // 0x0A
        "std": ["Time_s", "Bat_V", "Ambient_degC"],                 // 0x20
        "slow": ["BatChgDay_Wh"]                                    // 0x21
    },
    "ctrl": {                                                       // 0x0C
        "bus-voltage": {                                            // 0xDC01
            "Margin_V": 0.7,                                        // 0x7000
            "AbsMax_v": 30                                          // 0x7001
        }
    },
    ".pub": {                                                       // 0x0F
        "info": {                                                   // 0x100
            "OnChange": true                                        // 0x101
        },
        "std": {                                                    // 0x102
            "Period_s": 10                                          // 0x103
        },
        "slow": {                                                   // 0x102
            "Period_h": 24                                          // 0x103
        }
    },
    ".name": {                                                      // 0x17 (fixed)
        "1": ".spec",
        "2": "info",
        // ...
        "70": "Bat_V"
    },
}
```

The data objects are structured in different categories like `info` and `conf` as described below. By convention, leaf object names use [upper camel case](https://en.wikipedia.org/wiki/Camel_case), inner objects to define a path use lower case names.

The rpc category is special, as it provides functions that can be called. In order to distinguish functions from a normal data object, executable object names are lower case and prefixed with `x-`.

The `.pub` path is used to configure the automatic publication of messages, so it doesn't hold normal data objects. Such internal nodes are prefixed with a `.`, similar to hidden files or folders in computer file systems.

### Categories

The following categories for data objects are used for the ThingSet protocol by default:

| Category | ID   | Origin | Description | Access |
|----------|------|-------|-------------|---------|
| info     | 0x01 | device | Static device information (e.g. manufacturer, software version) | read |
| meas     | 0x02 | device | Measurement data (changes regularly) | read |
| state    | 0x03 | device | Event-based status information | read |
| rec      | 0x04 | device | Recorded (history-dependent) data (e.g. min/max values) | read + reset |
| input    | 0x05 | client | Input objects (e.g. actuators) | write |
| conf     | 0x06 | both   | Configurable settings, stored in non-volatile memory after change | read + write, partly protected |
| cal      | 0x07 | both   | Factory-calibrated settings | read + write, protected |
| rpc      | 0x0E | client | Executable functions | execute |
| dfu      | 0x0D | client | Functions and data for device firmware upgrade | read + execute |

The data objects of `meas`, `state` and `input` categories are used for instantaneous data. Changes to `input` data objects are only stored in RAM, so they get lost after a reset of the device. In contrast to that, `conf` data is stored in non-volatile memory (e.g. flash or EEPROM) after a change. As non-volatile memory has a limited amount of write cycles, configuration data should not be changed continuously.

The `rec` data category is used for history-dependent data like error memory, energy counters or min/max values of certain measurements. In contrast to data of `meas` category, recorded data cannot be obtained through measurement after reset, so the current status has to be stored in non-volatile memory on a regular basis.

Factory calibration data objects are only accessible for the manufacturer after authentication.

Excecutable data means that they trigger a function call in the device firmware. Child objects of the executable object can be used to define parameters that can be passed to the function.

Data object IDs are stored as unsigned integers. The firmware developer should assign the lowest IDs to the most used data objects, as they consume less bytes during transfer (see CBOR representation of unsigned integers).

### Units

Only [SI units](https://en.wikipedia.org/wiki/International_System_of_Units) and derived units (e.g. kWh for energy instead of Ws) are allowed.

The unit is appended to the data object name using an underscore. In order to keep the data object name very compact, the unit is also used to identify the physical quantity of the value. So instead of "BatteryEnergy_kWh" a short name like "Bat_kWh" is preferred.

Some special characters have to be replaced according to the following table in order to be compatible with URIs (see [RFC 3986, section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)):

| Character | Replacement | Example                                      |
|-----------|-------------|----------------------------------------------|
| °         | deg         | "Ambient_degC" for ambient temperature in °C |
| %         | pct         | "Humidity_pct" for relative humidity in %    |
| /         | _           | "Veh_m_s" for vehicle speed in m/s           |
| ^         | (omitted)   | "Surface_m2" for surface area in m^2         |

## Device Classes

[RFC 7228](https://datatracker.ietf.org/doc/html/rfc7228) defines three different classes of constrained devices according to the following table:

| Name        | data size (e.g., RAM) | code size (e.g., Flash) |
|-------------|-----------------------|-------------------------|
| Class 0, C0 | << 10 KiB             | << 100 KiB              |
| Class 1, C1 | ~ 10 KiB              | ~ 100 KiB               |
| Class 2, C2 | ~ 50 KiB              | ~ 250 KiB               |

The ThingSet protocol aims at being suitable for all classes.

For class 0 devices and on networks with very low bitrate and payload sizes (CAN, LoRaWAN) it is recommended to use the binary mode with numeric IDs instead of data node names to keep the messages as compact as possible.

If the payload size does not have to be optimized to its very minimum, the binary mode can be used with names instead of IDs (see [Binary mode](2c_binary_mode.md) chapter for more details). The advantage of the binary mode is that no support for floating point numbers for `printf` is required, which reduces firmware footprint significantly. This mode is suitable for class 0 and class 1 devices.

For most class 1 and class 2 devices, floating-point support will not be an issue, so they might also use the text mode for easier direct interactions with humans. Also gateways should typically support the text mode in order to map ThingSet to other higher-level protocols like HTTP and MQTT.

## Function Codes

The first byte of a ThingSet message is either a text-mode identifier ('?', '=', '!', '+', '-', ':' and '#'), a binary request code or a binary status code. Received data with unknown first byte is ignored, so that other text output (e.g. debug print information) can be used in parallel to the ThingSet protocol on the same serial interface.

### Requests

The protocol supports the typical [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Request codes match with CoAP to allow transparent translation and routing between ThingSet and HTTP APIs or CoAP devices.

| Code | Text ID | Method | Description                                    |
|------|---------|--------|------------------------------------------------|
| 0x01 | ?       | GET    | Retrieve all data from a path                  |
| 0x02 | + or !  | POST   | Append data to an object or execute a function |
| 0x04 | -       | DELETE | Delete data from an object                     |
| 0x05 | ?       | FETCH  | Retrieve a subset of data from a path          |
| 0x07 | =       | iPATCH | Update (overwrite) data of a path              |

The CoAP PUT and PATCH methods are not explicitly implemented. PUT is equivalent to an update of all sub-objects of a resource using a PATCH request. PATCH requests for ThingSet are always idempotent, so only the iPATCH request code is supported. The two different text IDs for POST requests are synonyms. It is decided based on the type of the data object if the request is understood as a function call or a request to create a resource.

Additional request codes may be introduced in the future. Codes 0x0A, 0x0D and 0x20-0x7F are reserved, as they represent the ASCII characters for readable text including LF and CR.

### Responses

Response messages in binary format are identified by a first byte greater than or equal to 128 (0x80) containing a status code which shows if the request could be handled successfully. For status codes between 0x80 and 0x9F, the response was successful. If the status code is greater than or equal to 0xA0, an error occured.

The status codes are again aligned with CoAP response codes, but contain an offset so that there is no interference with ASCII characters (less than 0x80).

| Code | CoAP | HTTP | Description   | Comment                    |
|------|------|------|---------------|----------------------------|
| 0x81 | 2.01 | 201  | Created       | Answer to POST requests appending data |
| 0x82 | 2.02 | 204  | Deleted       | Answer to DELETE request   |
| 0x83 | 2.03 | 200  | Valid         | Answer to POST requests to exec objects |
| 0x84 | 2.04 | 204  | Changed       | Answer to PATCH requests   |
| 0x85 | 2.05 | 200  | Content       | Answer to GET / FETCH requests |
| 0xA0 | 4.00 | 400  | Bad Request   | |
| 0xA1 | 4.01 | 401  | Unauthorized  | Authentication needed       |
| 0xA3 | 4.03 | 403  | Forbidden     | Trying to write read-only value |
| 0xA4 | 4.04 | 404  | Not Found     | |
| 0xA5 | 4.05 | 405  | Method Not Allowed         | If e.g. DELETE is not allowed for that object |
| 0xA8 | 4.08 | 400  | Request Entity Incomplete  | |
| 0xA9 | 4.09 | 409  | Conflict                   | Configuration conflicts with other settings |
| 0xAD | 4.13 | 413  | Request Entity Too Large   | |
| 0xAF | 4.15 | 415  | Unsupported Content-Format | If trying to assign a string to an int |
| 0xC0 | 5.00 | 500  | Internal Server Error      | |
| 0xC1 | 5.01 | 501  | Not Implemented            | |

The text mode converts the the hexadecimal response code into a string without the 0x prefix. The binary mode uses the code directly as the first byte.

### Statements

Statements are neither requests nor response messages, as they are sent without expecting a confirmation. Below table lists the message specifier in text and binary mode.

| Code | Text ID | Description         |
|------|---------|---------------------|
| 0x1F | #       | Statement message   |

The internal path `.pub` is used to configure the device to publish certain data objects on a regular basis through a defined communication channel (UART, CAN, LoRaWAN, etc.). If implemented in the firmware, the publication interval may be adjustable.

By convention, the object names below the `.pub` define which data object should be published. This can be an entire category like `meas` or a data object that contains a list of links to other data objects like `std` in the above example.

If a `Period_s` data object exists, it can be set to `0` to disable publication of this message. For event-based publication, a data object `OnChange` can be specified, which publishes the message only if one of the data objects has changed.

More details regarding the ThingSet protocol methods for data access will be explained in the next chapter.

# General Concept

The ThingSet protocol provides a consistent, standardized way to configure, monitor and control ressource-constrained devices via different communication interfaces. It specifies the higher layers (5 to 7) of the [OSI (Open Systems Interconnection) model](https://en.wikipedia.org/wiki/OSI_model). The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, LoRa, WiFi, Bluetooth, UART (serial) or similar.

![ISO/OSI layer setup](./images/osi_layers.png)

The underlying layers have to ensure encryption, reliable transfer, correct packet order (if messages are packetized) and error-checking of the transferred data.

A major feature of the ThingSet protocol is a seamless integration with other application layer protocols such as HTTP and [CoAP](https://tools.ietf.org/html/rfc7252). Suggestions for implementing gateways to convert between ThingSet messages and HTTP/CoAP payload will be added in a future separate chapter.

## Message Types

ThingSet defines three types of messages: Requests, responses and publication messages.

### Request/response or client/server model

The communication between two specific devices uses a request/response messaging pattern. A connection can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several devices attached (e.g. CAN, Ethernet, WiFi, LoRa). In case of a network, each device/node has to be uniquely addressable.

![Communication Channels](./images/communication_channels.png)

The device acts as the server and responds to the requests by a client. The client might be a display, a mobile phone application or a gateway.

The data transfer is always synchronous: The client sends a request, waits for the response (status code and requested data), processes the response and possibly starts with additional requests.

### Publication messages

Monitoring data is not intended for only a single device, but could be interesting for several devices (e.g. data logger and display). Thus, the monitoring data can be exchanged via a publish/subscribe messaging pattern.

Publication messages are directly broadcast through the network. Unlike in MQTT, there is no intermediate broker to store the messages and published messages are not confirmed by recipients, so there is no guarantee if the message was received.

## Protocol Modes

Similar to Modbus, the ThingSet protocol supports two different modes: A human-readable text mode and a binary mode.

In the text mode, payload data is encoded in JSON format ([RFC 8259](https://tools.ietf.org/html/rfc8259)). This mode is recommended when using serial communication interfaces as the low layer protocol, as it can be easily used directly on a terminal.

The binary mode uses the CBOR ([RFC 7049](https://tools.ietf.org/html/rfc7049)) instead of JSON for payload data encoding in order to reduce the protocol overhead for ressource-constrained devices or low bandwith communication protocols like CAN and LoRa.

A device may implement both variants of the protocol, but it is also allowed to support only the mode most suitable for the application.

## Data Structure

All accessible data of a device is [structured as a tree](https://en.wikipedia.org/wiki/Tree_(data_structure)). Internal nodes are used to define paths or endpoints for data access. Actual data is stored in the leaf nodes and can be any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar information.

Each node is identified by a unique node ID and a name. The ID can be chosen by the firmware developer. The name is a short case-sensitive ASCII string containing only alphanumeric characters, an underscore, dots or dashes without any whitespace characters. The underscore is only used to specify the unit of the data (if applicable, also see below). No additional underscore is allowed in the name and it should be unique per device at least for nodes that are used in publication messages.

The numeric IDs are used to define the relations between nodes and to directly access data nodes in the binary protocol for reduced message size. For all interactions with users and in the text-based mode, only the node names and paths (consisting of multiple node names) are used.

### Example

For explanation of the protocol, the following simplified data structure of an MPPT charge controller will be used:

```JSON
{
    "info": {
        "DeviceType": "MPPT 1210 HUS",
    },
    "conf": {                                       // data stored in NVM
        "BatCharging_V": 14.4,
    },
    "input": {                                      // data stored in RAM
        "EnableCharging": true
    },
    "output": {
        "Bat_V": 14.1,
        "Bat_A": 5.13,
        "Ambient_degC": 22
    },
    "rec": {
        "BatChgDay_Wh": 1984,
    },
    "exec": {
        "reset": null,                              // void function
    },
    "auth": ["Password"],                           // function with 1 parameter
    "pub": {                                        // publication channels
        "serial": {
            "Enable": true,
            "Interval": 1.0,
            "Topic": "",                            // default: empty topic
            "IDs": ["Bat_V", "Bat_A"]               // array of node names
        },
        "can": {
            "Enable": false,
            "Interval": 0.1,
            "Topic": 12345,                         // e.g. CAN ID
            "IDs": ["Bat_V"]
        },
        "mqtt": {
            "Enable": true,
            "Interval": 3600,
            "Topic": "chargers/device-id/pub",
            "IDs": ["Bat_V", "Bat_A"]
        }
    },
    "sub": {                                        // subscription channels
        "mqtt": {                                   // may have callback attached
            "Topic": "chargers/device-id/sub",
            "IDs": ["EnableCharging"]
        }
    }
}
```

The data nodes are structured in the main different categories info, conf, input, output and rec. By convention, data node names use [upper camel case](https://en.wikipedia.org/wiki/Camel_case), inner nodes nodes use lower case names.

The exec category is special, as it provides functions that can be called. In order to distinguish functions from a normal data nodes, executable node names are lower case.

The pub node is used to configure different types of publication messages, so it doesn't hold normal data nodes.

### Categories

The following categories for data nodes are used for the ThingSet protocol by default:

| Category | Description | Access  |
|----------|-------------|---------|
| info     | Device information (e.g. manufacturer, software version) | read access |
| conf     | Configurable settings, stored in non-volatile memory after change | read/write access, expert settings may be password-protected |
| input    | Input nodes (e.g. actuators) | write access |
| output   | Output nodes (e.g. sensor data) | read access |
| rec      | Recorded (history-dependent) data (e.g. min/max values) | read access, restricted write access to reset |
| cal      | Factory-calibrated settings | read/write access, protected
| exec     | Executable functions | partly access restricted |

The nodes of input and output categories are used for instantaneous data. Changes to input nodes are only stored in RAM, so they get lost after a reset of the device. In contrast to that, conf data is stored in non-volatile memory (e.g. flash or EEPROM) after a change. As non-volatile memory has a limited amount of write cycles, configuration data should not be changed continously.

The recorded data category is used for history-dependent data like error memory, energy counters or min/max values of certain measurements. In contrast to data of output category, recorded data cannot be obtained through measurement after reset, so the current state has to be stored in non-volatile memory on a regular basis.

Factory calibration data nodes are only accessible for the manufacturer after authentication.

Excecutable data means that they trigger a function call in the device firmware. Child nodes of the executable node can be used to define parameters that can be passed to the function.

Data node IDs are stored as unsigned integers. The firmware developer should assign the lowest IDs to the most used data objects, as they consume less bytes during transfer (see CBOR representation of unsigned integers).

### Units

Only [SI units](https://en.wikipedia.org/wiki/International_System_of_Units) and derived units (e.g. kWh for energy instead of Ws) are allowed.

The unit is appended to the data object name using an underscore. In order to keep the data object name very compact, the unit is also used to identify the physical quantity of the value. So instead of "BatteryEnergy_kWh" a short name like "Bat_kWh" is preferred.

Some special characters have to be replaced according to the following table in order to be compatible with URIs (see [RFC 3986, section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)):

| Character | Replacement | Example                                      |
|-----------|-------------|----------------------------------------------|
| °         | deg         | "Ambient_degC" for ambient temperature in °C |
| %         | pct         | "Humidity_pct" for relative humidity in %    |
| /         | -           | "Veh_m-s" for vehicle speed in m/s           |
| ^         | (omitted)   | "Surface_m2" for surface area in m^2         |

## Function Codes

The first byte of a ThingSet message is either a text-mode identifier ('?', '=', '!', '+', '-', ':' and '#'), a binary request code or a binary status code. Received data with unknown first byte is ignored, so that other text output (e.g. debug print information) can be used in parallel to the ThingSet protocol on the same serial interface.

### Requests

The protocol supports the typical [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Request codes match with CoAP to allow transparent translation and routing between ThingSet and HTTP APIs or CoAP devices.

| Code | Text ID | Method | Description                                 |
|------|---------|--------|---------------------------------------------|
| 0x01 | ?       | GET    | Retrieve all data from a node               |
| 0x02 | + or !  | POST   | Append data to a node or execute a function |
| 0x04 | -       | DELETE | Delete data from a node                     |
| 0x05 | ?       | FETCH  | Retrieve a subset of data from a node       |
| 0x07 | =       | iPATCH | Update (overwrite) data of a node           |

The CoAP PUT and PATCH methods are not explicitly implemented. PUT is equivalent to an update of all sub-nodes of a resource using a PATCH request. PATCH requests for ThingSet are always idempotent, so only the iPATCH request code is supported. The two different text IDs for POST requests are synonyms. It is decided based on the type of the node if the request is understood as a function call or a request to create a resource.

Additional request codes may be introduced in the future. Codes 0x0A, 0x0D and 0x20-0x7F are reserved, as they represent the ASCII characters for readable text including LF and CR.

### Responses

Response messages in binary format are identified by a first byte greater than or equal to 128 (0x80) containing a status code which shows if the request could be handled successfully. For status codes between 0x80 and 0x9F, the response was successful. If the status code is greater than or equal to 0xA0, an error occured.

The status codes are again aligned with CoAP response codes, but contain an offset so that there is no interference with ASCII characters (less than 0x80).

| Code | CoAP | HTTP | Description   | Comment                    |
|------|------|------|---------------|----------------------------|
| 0x81 | 2.01 | 201  | Created.      | Answer to POST requests appending data |
| 0x82 | 2.02 | 204  | Deleted.      | Answer to DELETE request   |
| 0x83 | 2.03 | 200  | Valid.        | Answer to POST requests to exec nodes |
| 0x84 | 2.04 | 204  | Changed.      | Answer to PATCH requests   |
| 0x85 | 2.05 | 205  | Content.      | Answer to GET / FETCH requests |
| 0xA0 | 4.00 | 400  | Bad Request.  | |
| 0xA1 | 4.01 | 401  | Unauthorized. | Authentication needed       |
| 0xA3 | 4.03 | 403  | Forbidden.    | Trying to write read-only value |
| 0xA4 | 4.04 | 404  | Not Found.    | |
| 0xA5 | 4.04 | 404  | Method Not Allowed.         | If e.g. DELETE is not allowed for that node |
| 0xA8 | 4.08 |      | Request Entity Incomplete.  | |
| 0xA9 | 4.09 | 409  | Conflict.                   | Configuration conflicts with other settings |
| 0xAD | 4.13 | 413  | Request Entity Too Large.   | |
| 0xAF | 4.15 | 415  | Unsupported Content-Format. | If trying to assign a string to an int |
| 0xC0 | 5.00 | 500  | Internal Server Error.      | |
| 0xC1 | 5.01 | 501  | Not Implemented.            | |

The text mode converts the the hexadecimal response code into a string without the 0x prefix. The binary mode uses the code directly as the first byte.

### Publication messages

Publication messages are neither requests nor response messages, as they are sent without expecting a confirmation. Below table lists the message specifier in text and binary mode.

| Code | Text ID | Description         |
|------|---------|---------------------|
| 0x1F | #       | Publication message |

More details regarding the ThingSet protocol methods for data access will be explained in the next chapter.

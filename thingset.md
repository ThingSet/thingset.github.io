# ThingSet Application Layer Protocol

The ThingSet protocol provides a consistent, standardized way to configure, monitor and control ressource-constrained devices via different communication interfaces.

As an application layer protocol, ThingSet defines layer 5 to 7 of the [OSI (Open Systems Interconnection) model](https://en.wikipedia.org/wiki/OSI_model). The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, WiFi, Bluetooth, UART (serial) or similar.

![ISO/OSI layer setup](images/osi_layers.png)

The underlying layers have to ensure reliable transfer, correct packet order (if messages are packetized) and error-checking of the transferred data.

## General concepts

<!---
## General goals

- "modern" modbus
- Easy to use
- Schema-less and self-explaining
- Help to bootstrap IOT devices

## OSI layer setup

Layers 1-4 depend on the lower layer protocols used. In case of a simple serial connection between two devices, no transport and netork layers are needed. The protocol payload as specified below is directly transferred over the line.

For IP based networks (over Ethernet or Wifi), the network layer will be the IP protocol. The source and destination addresses are IP addresses in this case. The transport layer might be TCP or UDP, adding additional headers to the entire protocol frame.
-->


### Request/response messaging pattern

The ThingSet communication itself always takes place between two devices. The devices communiate via so-called channels, which can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several devices attached (e.g. CAN, Ethernet, WiFi). In case of a network, each device/node has to be uniquely addressable.

![Communication Channels](images/communication_channels.png)

For configuration of devices, a a request/response messaging pattern is used. The device acts as a server which is connected to a client. The client might be a laptop or mobile phone with a human interface application. To read data from the device or change configuration settings, the client sends requests to the device, which responds with a status message and the requested data, if applicable.

The data transfer is always synchronous: The client sends a request, waits for the response, handles the data of the response and possibly starts with additional requests.

### Publish/subscribe messaging pattern

Monitoring data is not intended for only a single device, but could be interesting for several devices (e.g. data logger, display, human interface device, etc.). Thus, the monitoring data is exchanged via a publish/subscribe messaging pattern.

One popular pub/sub protocol is MQTT, which needs an intermediate broker to store the published messages and forward them to the subscribers. In a CAN based network, the monitoring data is just published to the bus and each device can decide if it uses the published data or not.

The ThingSet protocol is mainly used to set up a pub/sub protocol, but it does not specify this type of protocol itself.

<!-- As the control protocol should be master-less and plug-and-play, also the control messages follow the pub/sub messaging paradigm.-->

### Protocol Modes

Similar to Modbus, the ThingSet protocol supports two different modes: A human-readable text-based mode and a binary mode.

In the text-based mode, payload data is encoded in standard JSON format. This mode is recommended when using USB or serial interfaces as the low layer protocol, as it can be easily used directly on a terminal.

The binary protocol uses the CBOR binary encoding instead of JSON payload data in order to reduce the protocol overhead for ressource-constrained devices or low-level communication protocols like CAN.

Each device must implement the binary encoding of the protocol. The "normal" JSON variant is optional, but recommended.

## Data Objects

All accessible data of a device is structured in so-called data objects. A data object might be a measurement value like the output current of a device or the voltage setpoint of a charger (user-configurable data).

Each data object is identified by a unique Data Object ID. The ID can be chosen by the firmware developer. In addition to that, each data object has a unique name. The name is a short ASCII string without blanks, e.g. "vBat" for the battery voltage.

For reduced memory useage, [lower camel-case style](https://en.wikipedia.org/wiki/Camel_case) should be used for the data object names. The first letter(s) should specify the type of value:

- v for voltage
- e for energy
- i for current
- t for time
- temp for temperature

The numeric IDs are used in the binary protocol for increased efficiency and performance. For all interactions with users and in the text-based mode, only the object name should be used.

### Data object categories

Each data object belongs to one of the following categories (associated to a category ID of 4 bits):

| Category name (JSON) | Category ID | Description | Access  |
|-------------|-------------|-------------|---------|
| *           | 0x0         | Wildcard ID, representing all IDs | |
| info        | 0x1         | Read-only device information (e.g. manufacturer, etc.) | |
| setup       | 0x2         | User-configurable settings  | free access, maybe with user password |
| input       | 0x3         | Input channels (e.g. actuators) | free user access |
| output      | 0x4         | Output channels (e.g. sensor data) | free user access |
| rpc         | 0x5         | remote procedure call | partly access restricted |
| calibration | 0x6         | Factory-calibrated settings | access restricted |
| diagnosis   | 0x7         | Error memory, etc., | at least partly access restricted |
|             | 0x8-0xF     | Reserved for future use | unknown |

Data object IDs are stored as a 16-bit unsigned integer. The ID includes the category ID of 4 bits. The remaining 12-bit values can be freely chosen. In total, 4095 different values can be associated via an ID per category, with 0 being the wildcard ID again. The wildcard category and data object IDs are used to query the accessible data of a device (see below).

The follwing table describes the bits inside the 2-byte unique data object ID:

<table><thead><tr>
    <th colspan="2">Byte 1</th><th>Byte 2</th>
</tr><tr>
    <th>b15 ... b12</th><th>b11 ... b8</th><th>b7 ... b0</th>
</tr></thead><tbody><tr>
    <td>Category ID</td>
    <td colspan="2">Object Number</td>
</tr><tr>
    <td colspan="3">Data Object ID</td>
</tr></tbody></table>


### Examples

For explanation of the protocol functions, the following exemplary device data object structure will be used:

```JSON
{
    "info" : {
        "manufacturer" : "Test Company Inc."
    },
    "output" : {
        "vBat"     : 14.2,
        "tAmbient" : 22
    }, 
    "input" : {
        "enableSwitch" : true
    }
}
```

The above data structure contains 4 data objects in total, grouped into 3 different categories (info, output and input). The device will have an internal map to associate the object name with a unique ID. In C code this might look like the following:

```C
struct data_object_t {
    char* name;
    uint16_t id;
};

const data_object_t data_objects[] = {
    {"manufacturer", 0x1001}, // ID = (0x1 << 12) + 1 = 0x1001
    {"vBat",         0x4001}, // ID = (0x4 << 12) + 1 = 0x4001
    {"tAmbient",     0x4002}, // ID = (0x4 << 12) + 2 = 0x4002
    {"enableSwitch", 0x3001}  // ID = (0x3 << 12) + 1 = 0x3001
};
```

In addition to that, the programmer must link the name or ID to the actual variable containing the data.

### Units

All data communicated with the outside world must use SI units, so it is not necessary to specify the unit of each data object. The data types (see below) are used for scaling of the data. 

If the basic SI unit for a given measurement value is not common or not feasible (e.g. use of kWh for energy instead of Ws), the unit must be explicitly defined with an underscore in the name of the data object, e.g. "eBattery_kWh" for the battery energy content in kWh. Units which cannot be derived from the SI basic units (e.g. °F) are not allowed.

**ToDo:** *What about nautical miles and knots...? makes a lot of sense to allow for maritime applications. But it's not at all compatible with SI system...*

For temperatures, Kelvin (K) is the official SI unit. However, °C is compatible with K and is allowed, if specified in the data object name.

It is NOT allowed to publish a voltage in millivolts (mV) instead of volts (V). Instead, the decimal fraction data type of CBOR can be used.


## Functions

Each protocol function (or message type) is associated to a unique function ID, which defines the layout of the payload and the actions to be performed. 

The different functions are encoded using 1 byte. IDs 0-127 are used for requests, 128-255 for responses.

Function IDs 48-122 are reserved, as they contain the alphanumeric ASCII characters (0-9, a-z, A-Z). These characters are used to distinguish between text and binary mode (see below).

The ID of a response includes a status code which shows if the request could be handled successfully. The ID is calculated as 0x80 + status code. For status codes between 0 and 31, the response was successful. If the status code is greater than or equal to 32, an error occured. The remaining bits are used to specify the error in more detail.

In other words:
- Status Code 0-31 (function ID 128-159): Success
    - 0: General Success
    - 1: Partial Success (e.g. not all data values could be changed)
- Status Code 32-127 (function ID 160-255): Error
    - 0: General Error
    - 1: Function unknown
    - 2: Device busy
    - 3: Unauthorized
    - 4: Request too long
    - 5: Data object ID unknown

## Message Layout

The first byte of a request contains either the function ID in binary format or the first character of the text-mode function name. If the first byte is a valid alphanumeric character, the parser is switched to text-based mode.

### Text-based mode (JSON)

Each request message consists of a function name (e.g. read) followed by valid JSON string containing the payload data.

The response starts with the status code and a plain text description of the status followed by a new-line character (\n recommended, but \r\n also allowed). The following new line(s) contain the requested data. The end of the data is automatically recognized when the last character for a valid JSON text is received, e.g. '}'. It is possible to use multiple lines for the response.

Some examples are shown below.

### Binary mode (CBOR)

In the binary mode, the payload data follows directly after the first byte defining the function ID. The payload data is encoded using the CBOR format. Thus, numbers are encoded using big endian format (most significant byte transferred first). 

Example encoding of the bits inside a 32-bit integer:

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>Byte 4</th>
</tr></thead><tbody><tr>
    <td>b31 ... b24</td>
    <td>b23 ... b16</td>
    <td>b15 ... b8</td>
	<td>b7 ... b0</td>
</tr></tbody></table>

#### Message format

    +-------------+====================+
    | Function ID | Data object(s) ... |
    +-------------+====================+

    Data = single ID/name or array of IDs (binary) or names (JSON)

## Function Overview

### Read data object (0x00)

Request data field: Single ID or array of IDs (binary) / name(s) of data objects (JSON)

Response data field: Requested data

#### Examples

<!--
Read the measurement values of *vBat* (ID 1) and *tAmbient* (ID 2):

<table><thead><tr>
    <th></th><th>JSON</th><th>CBOR (hex)</th>
</tr></thead><tbody><tr>
    <td>Request</td>
    <td>`!read [ "vBat", "tAmbient" ]`</td>
	<td>`00 82 194001 194002`</td>
</tr><tr>
    <td>Response</td>
    <td>`:0 [14.2,22]`</td>
	<td>`80 00 82 FA41633333 16`</td>
</tr></tbody></table>

Read all device information values:

<table><thead><tr>
    <th></th><th>JSON</th><th>CBOR (hex)</th>
</tr></thead><tbody><tr>
    <td>Request</td>
    <td>`!read { "info" : "*" }`</td>
	<td>`00 10 00`</td>
</tr><tr>
    <td>Response</td>
    <td>`:0 [14.2,22]`</td>
	<td>`80 00 82 FA 41633333 16`</td>
</tr></tbody></table>
-->

    read ["vBat", "tAmbient"]
    0 Success
    [15.2, 22]

    read [1, 2]
    0 Success
    [15.2, 22]

    read "vBat"
    0 Success
    15.2

    read { "output" : "*" }
    0 Success
    {"vBat":15.2,"tAmbient":22}

    read "*"
    0
    {
        "output" : {"vBat":15.2, "tAmbient":22},
        "input" : {"loadEn":false}
    }


### Write data object (0x01)

Requests to overwrite a data object.

The device must support a write request using the same data type as used in the response of a read request for the given objects. Optionally, the device may also accept different data types (e.g. int32 + exp or float32) and convert the data internally.

Data of settings will be written into persinstent memory, so it is not allowed to change settings periodically. Only data types of category input might be changed regularly.

    Request Data:
        map of { id : value } (binary) or { name : value } (JSON)
    
    Response Data:
        (empty)

If the data type is not supported, an error status code (TS_STATUS_WRONG_TYPE 0x87) is responded.

#### Examples

    write { "vBat" : 15.2, "tAmbient" : 22 }
    0 OK

    write {"vBat" : 15.2}
    0 OK

    binary:
    write {1:15.2}



### Get data object name

Returns the name of a data object specified by its ID. It makes only sense in binary mode, as the text-based mode uses the names directly.

#### Examples

    name [ 1, 2 ]
    0 OK
    [ "vBat", "tAmbient" ]

    name 1
    0 OK
    "vBat"

### List data objects

Useful function for device discovery, as it lists all available data objects of one category.

In binary mode, the data IDs are returned, in text mode, an array of strings.

#### Examples

    list { "output" : "*" }
    0 OK
    [ "vBat", "tAmbient" ]

    list "*"
    0 OK
    { "output" : [ "vBat", "tAmbient" ], "input" : [ "loadEn" ]}

    Binary: returns IDs instead of names


### Authentication challenge request

Requests a challenge from the device to authenticate using secret password + hashing function.

#### Request

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
	<td>Hash Algorithm</td>
</tr></tbody></table>

- Function ID: 0x06 (preliminary)
- Hash Algorithm: select used Hash algorithm (currently only SHA-3) supported

#### Response

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>Byte 4</th><th></th><th>Byte (n\*2)+1</th><th>Byte (n\*2)+2</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td>Status | Data Type</td>
    <td colspan="2">Challenge byte 1</td>
	<td>...</td>
    <td colspan="2">Challenge byte n</td>
</tr></tbody></table>

- Function ID: 0x86 (preliminary)
- Status | Data Type: Status code (see above) and data type (always uint8)
- Challenge bytes 1..n: The challenge to be used. Must be random number.

### Other possible functions

- Ping
- Firmware Upgrade
- Authentication
- File Access
- Time Sync?
- Shutdown/Restart
- Heartbeat?


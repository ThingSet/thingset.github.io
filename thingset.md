# ThingSet Application Layer Protocol

The ThingSet protocol provides a consistent, standardized way to configure, monitor and control ressource-constrained devices via different communication interfaces.

As an application layer protocol, ThingSet defines layer 5 to 7 of the [OSI (Open Systems Interconnection) model](https://en.wikipedia.org/wiki/OSI_model). The payload data is independent of the underlying lower layer protocol or interface, which can be CAN, USB, WiFi, Bluetooth, UART (serial) or similar.

## General concepts

<!---

![ISO/OSI layer setup](images/osi_layers.png)

## General goals

- "modern" modbus
- Easy to use
- Schema-less and self-explaining
- Help to bootstrap IOT devices

## OSI layer setup

Layers 1-4 depend on the lower layer protocols used. In case of a simple serial connection between two devices, no transport and netork layers are needed. The protocol payload as specified below is directly transferred over the line.

For IP based networks (over Ethernet or Wifi), the network layer will be the IP protocol. The source and destination addresses are IP addresses in this case. The transport layer might be TCP or UDP, adding additional headers to the entire protocol frame.
-->

The ThingSet communication itself always takes place between two devices. The devices communiate via so-called channels. The channel can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network where several devices are attached, but uniquely addressable (e.g. CAN, Ethernet, WiFi).

![Communication Channels](images/communication_channels.png)

The protocol is based on a request/response messaging pattern between the two devices. It can be used to setup other communication protocols or services like MQTT for regular data exchange in a publish/subscribe way.

Payload data is encoded in JSON format or in the compatible CBOR binary format in order to reduce the protocol overhead for ressource-constrained devices or low-level communication protocols like CAN. Each device must implement the binary encoding of the protocol. The "normal" JSON variant is optional, but recommended when using USB or serial interfaces as the low layer protocol. The ASCII protocol is human-readable and can be easily used directly on a terminal.

## Data Objects

All accessible data of a device is structured in so-called data objects. A data object might be a measurement value like the output current of a device or the voltage setpoint of a charger (user-configurable data).

Each data object is identified by a unique Data Object ID. The ID can be arbitrarily chosen by the firmware developer. In addition to that, each data object has a unique name. The name is a short ASCII string without blanks, e.g. "vBat" for the battery voltage.

For reduced memory useage, [lower camel-case style](https://en.wikipedia.org/wiki/Camel_case) should be used for the data object names. The first letter(s) should specify the type of value:

- v for voltage
- e for energy
- i for current
- t for time
- temp for temperature

The numeric IDs are only used in the binary protocol for increased efficiency and performance. For all interactions with user devices, only the object name should be used. The numeric IDs are not used at all in the ASCII protocol.

Data object IDs are stored as a 16-bit unsigned integer. Valid IDs are 0...65536.

**ToDo:** *Maybe reserve some values for special cases and future use.*

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
const char* names[] = {
    "manufacturer", // ID 0
    "vBat",         // ID 1
    "tAmbient",     // ID 2
    "enableSwitch"  // ID 3
};
```

In addition to that, the programmer must link the name or ID to the actual variable containing the data.

### Units

All data communicated with the outside world must use SI units, so it is not necessary to specify the unit of each data object. The data types (see below) are used for scaling of the data. 

If the basic SI unit for a given measurement value is not common or not feasible (e.g. use of kWh for energy instead of Ws), the unit must be explicitly defined with an underscore in the name of the data object, e.g. "eBattery_kWh" for the battery energy content in kWh. Units which cannot be derived from the SI basic units (e.g. °F) are not allowed.

**ToDo:** *What about nautical miles and knots...? makes a lot of sense to allow for maritime applications. But it's not at all compatible with SI system...*

For temperatures, Kelvin (K) is the official SI unit. However, °C is compatible with K and is allowed, if specified in the data object name.

It is NOT allowed to publish a voltage in millivolts (mV) instead of volts (V). Instead, the decimal fraction data type of CBOR can be used.

### Data object categories

Each data object belongs to one of the following categories (associated to a category ID):

- info: Read-only device information (e.g. manufacturer, etc.)
- settings: User-configurable settings (free access, maybe with user password)
- calibration: Factory-calibrated settings (access restricted)
- diagnosis: Error memory, etc., (at least partly access restricted)
- input: free user access
- output: free user access
- rpc: remote procedure call

## Function Overview

Each protocol function is associated to a unique function ID, which defines the layout of the payload and the actions to be performed. 

The different functions are encoded using 1 byte. IDs 0-127 are used for requests, 128-255 for responses.

The ID for a response is calculated by adding 128 to the ID of the request. This is equal to changing the most significant bit from 0 (request) to 1 (response).

### Status Code

Each response message contains a status byte to identify if the request could be handled successfully. If the most signigicant bit (number 7) is 0, the response was successful. The remaining bits can be used for other purposes (e.g. for the 6-bit type ID). If the most significant bit is 1, an error occured. The remaining bits are used to specify the error in more detail.

In other words:
- Status Code 0x00-0x7F (0-127): Success
- Status Code 0x80-0xFF (128-255): Error
    - 0x80: General Error
    - 0x81: Function ID unknown
    - 0x82: Device busy
    - 0x83: Unauthorized
    - 0x84: Request too long
    - 0x85: Data object ID unknown

## Binary Protocol (work in progress!)

Each ThingSet message starts with the function ID. In addition to that, it may contain status codes and payload data. The payload data is encoded using the CBOR format. Thus, numbers are encoded using big endian format (most significant byte transferred first). 

Example encoding of the bits inside a 32-bit integer:

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>Byte 4</th>
</tr></thead><tbody><tr>
    <td>b31 ... b24</td>
    <td>b23 ... b16</td>
    <td>b15 ... b8</td>
	<td>b7 ... b0</td>
</tr></tbody></table>

### General Protocol Ideas

- Each request expects to get a response. Request and response are distinguished by using a different function Id (+128 for response). This is necessary, as otherwise a response from B to A could be interpreted as a new request from B to A.
- A function processes one or more data objects (either specified in the request or the response)
- Synchronous communication: a response is expected direclty after sending a request

Open questions:

- How to ensure correct packet order? Necessary? Possible? (in UDP not possible, CoAP uses token ID or sequence ID)
- How to match request with response? In TCP/UDP, each connection opens a single port.
    - Serial processing of all 

Low layer protocol requirements:

- reliable, ordered, and error-checked 

#### Request

    +-------------+====================+
    | Function ID | Data object(s) ... |
    +-------------+====================+

    Data = single ID/name or array of IDs (binary) or names (JSON)

#### Response

Responds with a status code and the requested data (if applicable).

    +-------------+-------------+====================+
    | Function ID | Status Code | Data object(s) ... |
    +-------------+-------------+====================+


### Read data object

Requests to read a given data object.

#### Request (Function ID: 0x00)

    +--------------------+====================+
    | Function ID (0x00) | Data object(s) ... |
    +--------------------+====================+

    bin: 0x00 [id1, id2]
    txt: !req {"settings":"*"}

    Data = single ID/name or array of IDs (binary) or names (JSON)

#### Response (Function ID: 0x80)

Responds with an ACK and the requested data or an error code.

    +-------------+-------------+====================+
    | Function ID | Status Code | Data object(s) ... |
    +-------------+-------------+====================+

### Examples

Read the measurement values of *vBat* (ID 1) and *tAmbient* (ID 2):

<table><thead><tr>
    <th></th><th>JSON</th><th>CBOR (hex)</th>
</tr></thead><tbody><tr>
    <td>Request</td>
    <td>`!read [ "vBat", "tAmbient" ]`</td>
	<td>`00 82 01 02`</td>
</tr><tr>
    <td>Response</td>
    <td>`:0 [14.2,22]`</td>
	<td>`80 00 82 FA 41633333 16`</td>
</tr></tbody></table>

Read all device information values:

<table><thead><tr>
    <th></th><th>JSON</th><th>CBOR (hex)</th>
</tr></thead><tbody><tr>
    <td>Request</td>
    <td>`!read { "info" : "*" }`</td>
	<td>`?? (TODO)`</td>
</tr><tr>
    <td>Response</td>
    <td>`:0 [14.2,22]`</td>
	<td>`80 00 82 FA 41633333 16`</td>
</tr></tbody></table>


    !read [ "vBat", "tAmbient" ]
    :0 [15.2,22]

    !read [ 1, 2 ]
    :0 [15.2,22]

    !read "vBat"
    :0 15.2

    !read { "output" : "*" }
    :0 {"vBat":15.2,"tAmbient":22}

    !read "*"
    :0 {"output":{"vBat":15.2,"tAmbient":22},"input":{"loadEn":false}}


### Write data object

Requests to overwrite a data object.

The device must support a write request using the same data type as used in the response of a read request for the given objects. Optionally, the device may also accept different data types (e.g. int32 + exp or float32) and convert the data internally.

ToDo: different function ID for persistent or temporary write?

#### Request (Function ID: 0x01)

    +-------------+==========+
    | Function ID | Data ... |
    +-------------+==========+

    Data = map of { id : value } (binary) or { name : value } (JSON)
    
    Persistence?

- Data Object ID: Defines which data object should be updated / written to.
- Persistence | Data Type: Set bit 7 to 1 to write in non-volatile memory (store permanently), otherwise 0. Least significant 6 bits (0..5) for data type ID.

#### Response (Function ID: 0x81)


    +-------------+==========+
    | Function ID | Data ... |
    +-------------+==========+

    Data = Status code byte

If the data type is not supported, an error status code (TS_STATUS_WRONG_TYPE 0x87) is responded.

### Examples

    !write { "vBat" : 15.2, "tAmbient" : 22 }
    200 OK

    !write {"vBat" : 15.2}
    200 OK

    binary:
    !write {1:15.2}


### Publish data object

#### Request

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>Byte 4</th><th>Byte 5</th><th>Byte 6</th><th>Byte 7</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td colspan="2">Data Object ID</td>
    <td colspan="2">Interval</td>
    <td>Event trigger?</td>
	<td>?</td>
</tr></tbody></table>

- Function ID: 0x02 (preliminary)

#### Response

- Function ID: 0x82 (preliminary)
- Status Code: Success or error (see above)

### Examples

    !pubreq 200 ["vBat","tAmbient"]
    :pubreq 0

    !pubreq 100 "vBat"
    :pubreq 0


### Subscribe to data object

#### Request

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>Byte 4</th><th>Byte 5</th><th>Byte 6</th><th>Byte 7</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td colspan="2">Data Object ID</td>
    <td colspan="2">Pub. Data Object ID</td>
    <td>Pub. Address</td>
	<td>Fallback time</td>
</tr></tbody></table>

- Function ID: 0x03 (preliminary)

#### Response

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td>Status Code</td>
</tr></tbody></table>

- Function ID: 0x83 (preliminary)
- Status Code: Success or error (see above)


### Examples

    !subreq "vBat" {"10":{ "output":"voltage"}}
    :subreq 0

    !subreq 100 "vBat"
    :subreq 0


### Get data object name

#### Request

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td colspan="2">Data Object ID</td>
</tr></tbody></table>

- Function ID: 0x04 (preliminary)

#### Response

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th></th><th>Byte n+2</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td>Status | Data Type</td>
    <td>Data 1</td>
	<td>...</td>
	<td>Data n</td>
</tr></tbody></table>

- Function ID: 0x84 (preliminary)
- Status | Data Type: Status code (see above) and data type (bits 0..5) in case of success (bit 7 = 0).

### Examples

    !name [ 1, 2 ]
    :name 200 OK
    [ "vBat", "tAmbient" ]

    !name 1
    :name 200 OK
    "vBat"



### List data objects

#### Request

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td>Category ID</td>
</tr></tbody></table>

- Function ID: 0x05 (preliminary)
- Category ID: Data object category to list objects from (0 for all data objects)

#### Response

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>Byte 4</th><th></th><th>Byte (n\*2)+1</th><th>Byte (n\*2)+2</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td>Status | Data Type</td>
    <td colspan="2">Data Object ID 1</td>
	<td>...</td>
    <td colspan="2">Data Object ID n</td>
</tr></tbody></table>

- Function ID: 0x85 (preliminary)
- Status | Data Type: Status code (see above) and data type (always uint16)
- Data Object ID 1..n: Lists all valid data object IDs belonging to the requested category.



### Examples

    !list { "output" : "*" }
    :list 200 OK
    [ "vBat", "tAmbient" ]

    !list "*"
    :list 200 OK
    { "output" : [ "vBat", "tAmbient" ], "input" : [ "loadEn" ]}

    Binary: returns IDs instead of names?


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


### ASCII protocol selection

An ASCII protocol request starts with an exclamation mark. Consequently, function code 33 (which is the '!' sign in ASCII) is used to start the ASCII communication protocol.

#### Request

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th></th><th>Byte n+1</th><th>Byte n+2</th>
</tr></thead><tbody><tr>
	<td>Function ID</td>
    <td>ASCII Data 1</td>
	<td>...</td>
	<td>ASCII Data n</td>
	<td>\n (new line)</td>
</tr></tbody></table>

- Function ID: 0x21 = 33 = '!'

For more information about the ASCII protocol see below.

#### Response

A response in the ASCII protocol will start with a '{', as the serialization is done using JSON. Thus, the function ID with the ASCII character '{' is reserved for this type of response.

- Function ID: 0x7B = 123 = '{'

If the ASCII protocol is not supported, function code 0xA1 shall be used to respond with an error message.

*Maybe also respond with trailing '!' and error code?*

### Other possible functions

- Ping
- Firmware Upgrade
- Authentication
- File Access
- Time Sync?
- Shutdown/Restart
- Heartbeat?


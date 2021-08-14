# Protocol Functions

The first byte of a message contains either the function ID in binary format or a text-mode identifier (one of '!', ':' or '#'). Input data with unknown first byte is ignored.

### Text mode

Each request message consists of a function name (e.g. exec) followed by valid JSON string containing the payload data. A request starts with an exclamation mark (!) in front of the function name.

The response starts with a colon (:) followed by the the status code and a plain text description of the status finished with a '.'. The description message content is not strictly specified and can be either the description from above table or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description.

The following bytes after the dot contain the requested data. The end of the data is automatically recognized when the last character for a valid JSON text is received, e.g. '}'. In addition to that, the response must be finished with a newline (LF recommended, but CRLF also allowed).

    Request:
    !(function name) (JSON data)

    Response:
    :(status code)(optional status message). (JSON data)

    Publication message:
    # (JSON data)

Some examples are shown below.

### Binary mode

In the binary mode, the data is encoded using the CBOR format. Numbers are encoded using big endian format (most significant byte transferred first).

The general format of a binary mode message:

    +-------------+===========+
    | Function ID | CBOR data |
    +-------------+===========+

    Legend:
    ---------  single byte
    =========  multiple bytes

The data structure in binary mode is the same as in text mode, but the data is encoded in CBOR format and the Data Object IDs are used as identifiers instead of the names.

The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.

### Request functions

| Function ID | Function name | Description |
|-------------|---------------|--------------|
| 0x01 (1)    | !info         | List/read/write data object(s) of *info* category |
| 0x02 (2)    | !conf         | List/read/write data object(s) of *conf* category |
| 0x03 (3)    | !input        | List/read/write data object(s) of *input* category |
| 0x04 (4)    | !output       | List/read/write data object(s) of *output* category |
| 0x05 (5)    | !rec          | List/read/write data object(s) of *rec* category |
| 0x06 (6)    | !cal          | List/read/write data object(s) of *cal* category |
| 0x09 (9)    | !             | List/read data object(s) of any category (PRELIMINARY) <!-- could be useful to poll for several different data objects at once without defining a publication message) --> |
| 0x0B (11)   | !exec         | Execute function (remote procedure call) |
| 0x0E (14)   | !name         | Get the name of a data object by ID |
| 0x10 (16)   | !auth         | Authentication for access to access-restricted data objects |
| 0x11 (17)   | !log          | Access log data of device |
| 0x12 (18)   | !pub          | Request publication of data object(s) |
| 0x1F (31)   | #             | Publication message for binary protocol |

<!--| 0x0A (10)   | (reserved)    | Line feed character |-->
<!--| 0x0D (13)   | (reserved)    | Carriage return character |-->

Possible future request functions (not yet specified):

| Function ID | Function name | Description |
|-------------|---------------|--------------|
|  ?          | ping          | Ping a device |
|  ?          | sync          | Time synchronization |
|  ?          | file          | File access |
|  ?          | dfu           | Device firmware upgrade. |


### Response functions (status codes)

| Function ID | Status Code | Description |
|-------------|-------------|-------------|
| 0x80 (128)  | 0x00  (0)   | Success. |
| 0x81 (129)  | 0x01  (1)   | Partial Success. (e.g. not all data values could be changed) |
| 0xA0 (160)  | 0x20 (32)   | General Error. |
| 0xA1 (161)  | 0x21 (33)   | Unknown/unsupported function. |
| 0xA2 (162)  | 0x22 (34)   | Unknown data object. |
| 0xA3 (163)  | 0x23 (35)   | Wrong format. |
| 0xA4 (164)  | 0x24 (36)   | Wrong data type. |
| 0xA5 (165)  | 0x25 (37)   | Device busy. |
| 0xA6 (166)  | 0x26 (38)   | Access denied. |
| 0xA7 (167)  | 0x27 (39)   | Request too long. |
| 0xA8 (168)  | 0x28 (40)   | Response too long. |
| 0xA9 (169)  | 0x29 (41)   | Invalid value. (e.g. too high or low number) |
| 0xAA (170)  | 0x2A (42)   | Text-mode not supported. |


## Data object access (0x01-0x06)

Three different access methods are defined:

- List all data objects of one category
- Read the content of specific data objects
- Write new values to specific data ojbects

As data objects of each category serve different purposes, the data is accessed using their category as the function name (see above table).

## List data objects

Useful call for device discovery, as it lists all data objects of one category.

In text mode, an array of strings with the data object names is returned. In binary mode, either the names or the numeric IDs can be requested.

Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.

### Text mode

Example 1: List all names in category output

    !output
    :0 Success. ["Bat_V", "Ambient_degC"]

Example 2: List all names and their current values in category output

    !output {}
    :0 Success. {"Bat_V":14.2, "Ambient_degC":22}

### Binary mode

General format description:

    Request:
    +------+------+
    | 0xXX | 0xYY |
    +------+------+

    Response:
    +------+===========================================+
    | 0xZZ | CBOR data: ID(s), name(s) and/or value(s) |
    +------+===========================================+

    0xXX:   Function defining the category
    0xYY:   Either 0xF6 to request data object IDs, 0x80 to request data object names (strings)
            or 0xa0 to request a map of names and values
    0xZZ:   Response code (0x80 for success)

Example 1: List all data object IDs in category output

    Request:
    0x04        Function ID (output)
        0xF6    CBOR null

    Response:
    0x80        Status code (Success)
      0x82      CBOR array (2 elements)
        0x03    Data Object ID (Bat_V)
        0x04    Data Object ID (Ambient_degC)

Example 2: List all data object names in category output

    Request:
    0x04        Function ID (output)
        0x80    CBOR empty array

    Response:
    0x80                    Status code (Success)
      0x82                  CBOR array (2 elements)
        0x65 0x4261745F56   Data Object name (Bat_V)
        0x6C 0x416D6269656E745F64656743     Data Object name (Ambient_degC)

Example 3: List all data object names and their in category output

    Request:
    0x04        Function ID (output)
        0xA0    CBOR empty map

    Response:
    0x80                    Status code (Success)
      0xa2                  CBOR map (2 elements)
        0x65 0x4261745F56   Data Object name (Bat_V)
        0xFA 0x41633333     CBOR data (float32): 14.2
        0x6C 0x416D6269656E745F64656743     Data Object name (Ambient_degC)
        0x16                CBOR data (integer): 22


### Read data object(s)

Allows to read one or more data objects. The objects are identified by their ID (binary mode only) or by their name.

#### Text mode

The names of the data objects are passed to the function as a single string or as an array of strings.

The response contains a status code and the requested data. If a single data object was requested, the returned data is also a single JSON primitive (number, string, true/false, depending on data type). Multiple objects were requested, the response is an array containing the requested data objects in the same order.

Example 1: Read single data object "enableSwitch"

    !input "EnableSwitch"
    :0 Success. true

Example 2: Read multiple data objects:

    !output ["Bat_V", "Ambient_degC"]
    :0 Success. [14.2, 22]

### Binary mode

General format description:

    Request:
    +------+=============================+
    | 0xXX | CBOR data: ID(s) or name(s) |
    +------+=============================+

    Response:
    +------+=====================+
    | 0xZZ | CBOR data: value(s) |
    +------+=====================+

    0xXX:   Function defining the category
    0xZZ:   Response code (0x80 for success)

Example 1: Read single data object "EnableSwitch"

    Request:
    0x03                Function ID (input)
        0x02            Data Object ID (EnableSwitch)

    Response:
    0x80                Status code (Success)
        0xF5            CBOR data: true

Example 2: Read multiple data objects:

    Request:
    0x04                    Function ID (output)
      0x82                  CBOR array (2 elements)
        0x03                Data Object ID (Bat_V)
        0x04                Data Object ID (Ambient_degC)

    Response:
    0x80                    Status code (Success)
      0x82                  CBOR array (2 elements)
        0xFA 0x41633333     CBOR data (float32): 14.2
        0x16                CBOR data (integer): 22

The binary mode also allows to use data object names (strings) instead of numeric IDs, which increases the amount of data.

## Write data object(s)

Requests to overwrite a data object.

The device must support a write request using the same data type as used in the response of a read request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.

Data of category *conf* will be written into persistent memory, so it is not allowed to change settings periodically. Only data of category *input* might be changed regularly.

If the data type is not supported, an error status code (36) is responded.

### Text mode

Example 1: Disable the switch

    !input {"EnableSwitch":false}
    :0 Success.

Example 2: Attempt to write read-only measurement values (output category)

    !output {"Bat_V":15.2, "Ambient_degC":22}
    :38 Access denied.

### Binary mode

General layout:

    Request:
    +------+==========================+
    | 0xXX | CBOR data: key/value map |
    +------+==========================+

    Response:
    +------+
    | 0xZZ |
    +------+

    0xXX:   Function defining the category
    0xZZ:   Response code (0x80 for success)

Example 1: Disable the switch

    Request:
    0x03                Function ID (input)
      0xA1              CBOR map (1 element)
        0x02            Data Object ID (EnableSwitch)
        0xF4            CBOR data: false

    Response:
    0x80                Status code: Success

Example 2: Attempt to write read-only measurement values (output category)

    Request:
    0x04                    Function ID (output)
      0xA2                  CBOR map (2 elements)
        0x03                Data Object ID (Bat_V)
        0xFA 0x41633333     CBOR data (float32): 14.2
        0x04                Data Object ID (Ambient_degC)
        0x16                CBOR data (integer): 22

    Response:
    0xA6                    Status code (Access denied)

## Execute (0x0B)

Executes a function identified by a data object name of category "exec".

#### Text mode

Example: Go into bootloader mode

    !exec "Bootloader"
    :0 Success.

## Get data object name (0x0E)

Returns the name of a data object specified by its ID. This function makes sense for binary mode only, as the text-based mode uses the names directly.

### Binary mode

General format description:

    Request:
    +------+==================+
    | 0x0E | CBOR data: ID(s) |
    +------+==================+

    Response:
    +------+====================+
    | 0xZZ | CBOR data: name(s) |
    +------+====================+

    0xZZ:   Response code (0x80 for success)

Example 1: Request name of data object ID 0x03 (Bat_V)

    Request:
    0x0E                        Function ID (name)
        0x03                    Data Object ID (Bat_V)

    Response:
    0x80                        Status code: Success.
        0x65 0x4261745F56       String of length 5: "Bat_V"

Example 2: Request name of multiple data objects

    Request:
    0x0E                            Function ID (name)
      0x82                          CBOR array (2 elements)
        0x03                        Data Object ID (Bat_V)
        0x04                        Data Object ID (Ambient_degC)

    Response:
    0x80                            Status code: Success.
      0x82                          CBOR array (2 elements)
        0x65 0x4261745F56           Data Object name (Bat_V)
        0x6C 0x416D6269656E745F64656743     Data Object name (Ambient_degC)


## Authentication (0x10)

Some of the device parameters like calibration or config settings should be protected against unauthorized change. The protocol provides a simple authentication method. Multiple user levels can be implemented in the firmware using different passwords. The manufacturer would use a different one to authenticate than a normal user and thus get more rights to access data objects.

*Remark:* Previous versions of this specification suggested a challenge-response method with hashed passwords in order to avoid plain text transmission of the password on the bus and prevent replay attacks. However, this contradicts with the stateless nature of the protocol, as the device needs to store the challenge it sent out and wait for the second message of the host. In addition to that, it does not provide a method for verification of the sender, so any participant on the bus could change data objects requiring authentication once one of the hosts successfully authenticated. That's why it was decided to use the much more simple method with plain text password. Encryption can be added on lower layer protocols, though.

#### Text mode

The password is transferred as a plain text string.

    !auth "mypass"
    :0 Success.

After successful authentication, the device exposes restricted data objects via the normal data object access commands. The authentication stays valid until another auth command is received, either without password or with a password that doesn't match.

### Binary mode

Analog to text mode.


## Publication request (0x12)

A publication request tells the device to publish certain data on a regular basis through a defined communication channel (UART, CAN, LoRa, etc.). It is not feasible to define different publication intervals and communication channels for each data object, as this would create lots of programming effort. Instead, the firmware developer pre-defines some communication channels and a given interval (e.g. "LoRa_60min"). The available channels can be discovered using the !pub command. The !pub command can also be used to configure data objects for publication or delete objects from the publication list.

### Text mode

Example 1: List all available publication channels

    !pub
    :0 Success. ["CAN_100ms", "LoRa_60min", "Serial_1s"]

The name of the interface and the publication interval is separated by an underscore. The interval is specified in hours (h), minutes (min), seconds (s) or milliseconds (ms). Main intention of the channel description is to be human-readable (e.g. for the technician setting up the device).

Example 2: List configured data objects for second channel (LoRa_60min)

    !pub "CAN_100ms"
    :0 Success. ["Bat_V", "Ambient_degC"]

With this setting, the following message is automatically sent by the device once per hour:

    # {"Bat_V":15.2,"Ambient_degC":22}

Example 3: Change the list for the "CAN_100ms" channel.

    !pub {"CAN_100ms":["Bat_V"]}
    :0 Success.

The data object Ambient_degC is removed from the publication list.

Example 4: Enable a publication channel

    !pub {"CAN_100ms":true}
    :0 Success.

To disable the channel, send `false` instead of `true`.

### Binary mode

The format in binary mode is analog to the text mode format.

Example 1: List all available publication channels (as strings)

    Request:
    0x12                            Function ID (pub)
        0x60                        CBOR empty string (otherwise we don't know the length of the message)

    Response:
    0x80                            Status code: Success.
      0x83                          CBOR array (3 elements)
        0x69 0x43414E5F3130306D73   String of length 9: "CAN_100ms"
        0x6A 4C6F52615F36306D696E   String of length 10: "LoRa_60min"
        0x69 53657269616C5F3173     String of length 9: "Serial_1s"

Example 2: List configured data objects for second channel (LoRa_60min)

    Request:
    0x12                            Function ID (pub)
        0x69 0x43414E5F3130306D73   String of length 9: "CAN_100ms"

    Response:
    0x80                            Status code: Success.
      0x82                          CBOR array (2 elements)
        0x19 0x4001                 Data Object ID (Bat_V)
        0x19 0x4002                 Data Object ID (Ambient_degC)

Example 3: Change the list for the second channel.

    Request:
    0x12                            Function ID (pub)
      0xA1                          CBOR map (1 element)
        0x69 0x43414E5F3130306D73   String of length 9: "CAN_100ms"
        0x19 0x4001                 Data Object ID (Bat_V)

    Response:
    0x80                            Status code: Success.

With this setting, the following message is automatically sent by the device once per hour (see below for publication message definition):

    0x1F                            Function ID (publication message)
      0xA2                          CBOR map (2 elements)
        0x19 0x4001                 Data Object ID (Bat_V)
        0xFa 0x41733333             CBOR data (float32): 15.2
        0x19 0x4002                 Data Object ID (Ambient_degC)
        0x16                        CBOR data (integer): 22

Example 4: Enable a publication channel

    Request:
    0x12                            Function ID (pub)
      0xA1                          CBOR map (1 element)
        0x69 0x43414E5F3130306D73   String of length 9: "CAN_100ms"
        0xF5                        CBOR pimitive (true)

    Response:
    0x80                        Status code: Success.


## PRELIMINARY: Logging data (0x??)

*Remarks: Work on !log function is still in progress. This suggested specification is preliminary. Good suggestions and feedback are welcome!*

A device might have internal data logging features. It should be possible to read out the logging data via ThingSet.

The suggestion is that the firmware developer pre-defines different logging channels/files (e.g. "daily", "24hours"). Each channel has a number which can be discovered using the !log command.

### Text mode

Example 1: List all available log files

    !log
    :0 Success. ["daily", "24hours"]

The name of the log file should describe the log level (e.g. a daily log will contain less details per day, the logging of last 24hours may contain more data).

Example 2: List number of log entries in first log file (daily)

    !log "daily"
    :0 Success. 34

Example 3: Request log entry 20 of daily log file

    !log {"daily":1}
    :0 Success. {"BatMax_V":14.5, "Errors":7}

Maybe also allow to request multiple log file entries at the same time, like this:

Example 4: Request first and last log entry

    !log {"daily":[0,33]}
    :0 Success. [{"BatMax_V":14.5, "Errors":7},{"BatMax_V":14.3, "Errors":11}]

### Binary mode

ToDo

## Publication message (0x1F)

Publication messages are sent regularly in a specified interval. The interval and the data objects can be factory-programmed or can be configured via the !pub function. The !pub function requests data to be published, whereas the publication message actually publishes the data.

Publication messages are broadcast to all connected devices. No response is sent from devices receiving the message.

### Text mode

Example 1: Publication of a single parameter

    # "enableSwitch": false

Example 2: Publication of multiple parameters

    # {"vBat": 15.2, "tAmbient": 22}

### Binary mode

General layout:

    Publication message (broadcast):
    +------+==========================+
    | 0x1F | CBOR data: key/value map |
    +------+==========================+

Example 1: Publication of a single parameter

    Message:
    0x1F                Function ID (publication message)
      0xA1              CBOR map (1 element)
        0x19 0x3001     Data Object ID (enableSwitch)
        0xF4            CBOR data: false

Example 2: Publication of multiple parameters

    Message:
    0x1F                    Function ID (publication message)
      0xA2                  CBOR map (2 elements)
        0x19 0x4001         Data Object ID (vBat)
        0xFa 0x41733333     CBOR data (float32): 15.2
        0x19 0x4002         Data Object ID (tAmbient)
        0x16                CBOR data (integer): 22

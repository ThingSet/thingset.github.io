# Binary Mode

::: warning
The binary mode is currently being revised and may be changed significantly in the future.
:::

In the binary mode, the data is encoded using the CBOR format. Numbers are encoded using big endian format (most significant byte transferred first).

The general format of a binary mode message:

    +-------------+===========+
    | Function ID | CBOR data |
    +-------------+===========+

    Legend:
    ---------  single byte
    =========  multiple bytes

The data structure in binary mode is the same as in text mode, but the data is encoded in CBOR format and the Data Object IDs are used as identifiers by default instead of the names.

The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.


## Query and list data objects (function IDs 0x01-0x06)

Allows to read one or more data objects. The objects are identified by their ID (binary mode only) or by their name.

Useful call for device discovery, as it lists all data objects of one category.

In text mode, an array of strings with the data object names is returned. In binary mode, either the names or the numeric IDs can be requested.

Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.


The binary mode also allows to query only the IDs of all data objects in one category in order to
allow shorter messages during device recovery. So the host can first query all IDs in one category,
afterwards query the names for each ID once and then request the value for any data object on
demand.

General format description:

    Request:
    +------+=================================+
    | 0xXX | CBOR data: Query byte or string |
    +------+=================================+

    Response:
    +------+===========================================+
    | 0xZZ | CBOR data: ID(s), name(s) and/or value(s) |
    +------+===========================================+

    0xXX:   Function defining the category
    0xZZ:   Response code (0x80 for success)

Example 1: Query all data objects in category output

    Request:
    0x04        Function ID (output)
        0xA0    CBOR empty map              ToDo: empty string

    Response:
    0x80                    Status code (Success)
      0xa2                  CBOR map (2 elements)
        0x65 0x4261745F56   Data Object name (Bat_V)
        0xFA 0x41633333     CBOR data (float32): 14.2
        0x6C 0x416D6269656E745F64656743     Data Object name (Ambient_degC)
        0x16                CBOR data (integer): 22

Example 2: Query single data object "EnableSwitch" by ID

    Request:
    0x03                Function ID (input)
        0x02            Data Object ID (EnableSwitch)

    Response:
    0x80                Status code (Success)
        0xF5            CBOR data: true

Example 2: Query single data object "EnableSwitch" by name

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
        0x05                Data Object ID (Ambient_degC)

    Response:
    0x80                    Status code (Success)
      0x82                  CBOR array (2 elements)
        0xFA 0x41633333     CBOR data (float32): 14.2
        0x16                CBOR data (integer): 22

Example 1: List all data object IDs in category output

    Request:
    0x04        Function ID (output)
        0xF6    CBOR null                       ToDo: empty array

    Response:
    0x80        Status code (Success)
      0x82      CBOR array (2 elements)
        0x03    Data Object ID (Bat_V)
        0x05    Data Object ID (Ambient_degC)

Example 2: List all data object names in category output

    Request:
    0x04        Function ID (output)
        0x80    CBOR empty array                ToDo: remove

    Response:
    0x80                    Status code (Success)
      0x82                  CBOR array (2 elements)
        0x65 0x4261745F56   Data Object name (Bat_V)
        0x6C 0x416D6269656E745F64656743     Data Object name (Ambient_degC)

The binary mode also allows to use data object names (strings) instead of numeric IDs, which increases the amount of data.

## Update data object(s)

Requests to overwrite the value a data object.

The device must support a patch request using the same data type as used in the response of a GET or FETCH request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.

Data of category *conf* will be written into persistent memory, so it is not allowed to change settings periodically. Only data of category *input* might be changed regularly.

If the data type is not supported, an error status code (36) is responded.


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
        0x05                Data Object ID (Ambient_degC)
        0x16                CBOR data (integer): 22

    Response:
    0xA6                    Status code (Access denied)

## Execute (0x0B)

Executes a function identified by a data object name of category "exec".

ToDo

## Get data object name (0x0E)

Returns the name of a data object specified by its ID. This function makes sense for binary mode only, as the text-based mode uses the names directly.

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
    0x80                        Status code: OK.
        0x65 0x4261745F56       String of length 5: "Bat_V"

Example 2: Request name of multiple data objects

    Request:
    0x0E                            Function ID (name)
      0x82                          CBOR array (2 elements)
        0x03                        Data Object ID (Bat_V)
        0x04                        Data Object ID (Ambient_degC)

    Response:
    0x80                            Status code: OK.
      0x82                          CBOR array (2 elements)
        0x65 0x4261745F56           Data Object name (Bat_V)
        0x6A 0x416D6269656E745F6F43     Data Object name (Ambient_degC)


## Authentication (0x10)

Analog to text mode.


## Publication request (0x12)

The format in binary mode is analog to the text mode format.

Example 1: List all available publication channels (as strings)

    Request:
    0x12                            Function ID (pub)
        0x60                        CBOR empty string (otherwise we don't know the length of the message)

    Response:
    0x80                            Status code: OK.
      0x83                          CBOR array (3 elements)
        0x69 0x43414E5F3130306D73   String of length 9: "CAN_100ms"
        0x6A 4C6F52615F36306D696E   String of length 10: "LoRa_60min"
        0x69 53657269616C5F3173     String of length 9: "Serial_1s"

Example 2: List configured data objects for second channel (LoRa_60min)

    Request:
    0x12                            Function ID (pub)
        0x69 0x43414E5F3130306D73   String of length 9: "CAN_100ms"

    Response:
    0x80                            Status code: OK.
      0x82                          CBOR array (2 elements)
        0x19 0x03                   Data Object ID (Bat_V)
        0x19 0x05                   Data Object ID (Ambient_degC)

Example 3: Change the list for the second channel.

    Request:
    0x12                            Function ID (pub)
      0xA1                          CBOR map (1 element)
        0x69 0x43414E5F3130306D73   String of length 9: "CAN_100ms"
        0x19 0x03                   Data Object ID (Bat_V)

    Response:
    0x80                            Status code: OK.

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
    0x80                        Status code: OK.


## PRELIMINARY: Logging data (0x??)

ToDo

## Publication message (0x1F)

Publication messages are sent regularly in a specified interval. The interval and the data objects can be factory-programmed or can be configured via the !pub function. The !pub function requests data to be published, whereas the publication message actually publishes the data.

Publication messages are broadcast to all connected devices. No response is sent from devices receiving the message.


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

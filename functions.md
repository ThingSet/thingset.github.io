# ThingSet - Protocol Functions

The first byte of a request contains either the function ID in binary format or a text-mode identifier (one of '!', ':' or '#'). Input data with unknown first byte is ignored.

### Text mode

Each request message consists of a function name (e.g. read) followed by valid JSON string containing the payload data. A request starts with an exclamation mark (!) in front of the function name.

The response starts with a colon (:) followed by the the status code and a plain text description of the status finished with a '.'. The description message content is not strictly specified and can be either the description from above table or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description.

The following bytes after the dot contain the requested data. The end of the data is automatically recognized when the last character for a valid JSON text is received, e.g. '}'. In addition to that, the response must be finished with a newline (LF recommended, but CRLF also allowed).

    Request:
    !(name) (options) (JSON data)

    Response:
    :(status code) (status message). (JSON data)

    Publication message:
    # (JSON data)

Some examples are shown below.

### Binary mode

In the binary mode, the values of data objects are encoded using the CBOR format. Thus, numbers are encoded using big endian format (most significant byte transferred first).

The general format of a binary mode message:

    +-------------+====================+=============================================+
    | Function ID | Options (optional) | Payload data (object values in CBOR format) |
    +-------------+====================+=============================================+

    Legend:
    ---------  single byte
    =========  multiple bytes

In order to minimize data consumption, the CBOR format is only used for the actual data object values (because data format and size are unknown). Well-known data structures like arrays of Data Object IDs in read requests are encoded directly using unsigned 16-bit integers (see below).

The length of the entire request or response is not encoded in the ThingSet protocol. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.

*Remark for future protocol versions:* If proven to be necessary, the data could be terminated with one 0xFF character at the end of each request. Therefore, 0xF is a reserved category ID.

## Read data object (ID 0x01)

The read function can read one or more data objects. The objects are identified by their ID (binary mode) or by their name (text-base mode).

#### Text mode

The names of the data objects are passed to the function as a single string or as an array of strings.

The response contains a status code and the requested data. If a single data object was requested, the returned data is also a single JSON primitive (number, string, true/fals, depending on data type). Multiple objects were requested, the response is an array containing the requested data objects in the same order.

Example 1: Request single data object "enableSwitch"

    !read "enableSwitch"
    :0 Success. true

Example 2: Request multiple data objects:

    !read ["vBat", "tAmbient"]
    :0 Success. [15.2, 22]

### Binary mode

General format description: 

    Request:
    +------+========+     +========+
    | 0x01 | 0xYYYY | ... | 0xYYYY |
    +------+========+     +========+

    Response:
    +------+===========+     +===========+
    | 0xZZ | CBOR data | ... | CBOR data |
    +------+===========+     +===========+
    
    0xYYYY: Function ID(s)
    0xZZ:   Response code (0x80 for success)

Example 1: Request single data object "enableSwitch"

    Request:
    0x01                Function ID (read)
        0x3001          Data Object ID (enableSwitch)
       
    Response:
    0x80                Status code (Success)
        0xf5            CBOR data: true

Example 2: Request multiple data objects:

    Request:
    0x01                Function ID (read)
        0x4001          Data Object ID (vBat)
        0x4002          Data Object ID (tAmbient)
    
    Response:
    0x80                    Status code (Success)
        0xfa 0x41733333     CBOR data (float32): 15.2
        0x16                CBOR data (integer): 22 


## Write data object (0x02)

Requests to overwrite a data object.

The device must support a write request using the same data type as used in the response of a read request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.

Data of settings will be written into persistent memory, so it is not allowed to change settings periodically. Only data types of category input might be changed regularly.

If the data type is not supported, an error status code (34) is responded.

### Text mode

Example 1: Disable the switch

    !write {"enableSwitch" : false}
    :0 Success.

Example 2: Attempt to write read-only measurement values (output category)

    !write { "vBat" : 15.2, "tAmbient" : 22 }
    :36 Access denied.

### Binary mode

General layout:

    Request:
    +------+========+===========+     +========+===========+
    | 0x02 | 0xYYYY | CBOR data | ... | 0xYYYY | CBOR data |
    +------+========+===========+     +========+===========+
    
    Response:
    +------+
    | 0xZZ |
    +------+

    0xYYYY: Data Object ID(s)
    0xZZ:   Response code (0x80 for success)

Example 1: Disable the switch

    Request:
    0x02                Function ID (write)
        0x3001          Data Object ID (enableSwitch)
        0xf4            CBOR data: false

    Response:
    0x80                Status code: Success

Example 2: Attempt to write read-only measurement values (output category)

    Request:
    0x02                    Function ID (write)
        0x4001              Data Object ID (vBat)
        0xfa 0x41733333     CBOR data (float32): 15.2
        0x4002              Data Object ID (tAmbient)
        0x16                CBOR data (integer): 22 

    Response:
    0xa4                    Status code (Access denied)

## List data objects (0x03)

Useful function for device discovery, as it lists all available data objects or all data objects of one category.

In binary mode, the data IDs are returned, in text mode, an array of strings.

Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.

### Text mode

Example 1: List all values in category output

    !list "output"
    :0 Success. [ "vBat", "tAmbient" ]

Example 2: List all accessible values of the device.

    !list
    :0 Success. { "output" : [ "vBat", "tAmbient" ], "input" : [ "loadEn" ]}

### Binary mode

General format description: 

    Request:
    +------+========+
    | 0x03 | 0xXXXX |
    +------+========+

    Response:
    +------+========+     +========+
    | 0xZZ | 0xYYYY | ... | 0xYYYY |
    +------+========+     +========+

    0xXXXX: Data Object ID wildcard (all or specific category)
    0xYYYY: Data Object ID(s) belonging to requested category
    0xZZ:   Response code (0x80 for success)

Example 1: List all values in category output

    Request:
    0x03                Function ID (list)
        0x4000          Data Object ID wildcard (category "output")

    Response:
    0x80                Status code (Success)
        0x4001          Data Object ID (vBat)
        0x4002          Data Object ID (tAmbient)

Example 2: List all accessible values of the device.

    Request:
    0x03                Function ID (list)
        0x0000          Data Object ID wildcard (all data objects)

    Response:
    0x80                Status code: (Success)
        0x1001          Data Object ID (manufacturer)
        0x3001          Data Object ID (enableSwitch)
        0x4001          Data Object ID (vBat)
        0x4002          Data Object ID (tAmbient)

## Get data object name (0x04)

Returns the name of a data object specified by its ID. This function makes sense for binary mode only, as the text-based mode uses the names directly.

### Binary mode

General format description: 

    Request:
    +------+========+     +========+
    | 0x04 | 0xYYYY | ... | 0xYYYY |
    +------+========+     +========+

    Response:
    +------+===========+     +===========+
    | 0xZZ | CBOR data | ... | CBOR data |
    +------+===========+     +===========+

    0xYYYY: Data Object ID(s)
    0xZZ:   Response code (0x80 for success)

Example 1: Request name of data object ID 0x4001 (vBat)

    Request:
    0x04                        Function ID (name)
        0x4001                  Data Object ID (vBat)

    Response:
    0x80                        Status code: Success.
        0x64 0x76426174         string of length 4: "vBat"

Example 2: Request name of multiple data objects

    Request:
    0x04                            Function ID (name)
        0x4001                      Data Object ID (vBat)
        0x4002                      Data Object ID (tAmbient)

    Response:
    0x80                            Status code: Success.
        0x64 0x76426174             CBOR data (4-byte string): "vBat"
        0x68 0x74416D6269656E74     CBOR data (8-byte string): "tAmbient"

## PRELIMINARY: Publication request (0x05)

*Remark: It should be possible to tell the device to publish certain data on a regular basis through a defined communication channel (UART, CAN, LoRa, etc.). It is not feasible to define different publication intervals and communication channels for each data object, as this would create lots of programming effort. On the other hand, pre-defined fixed intervals are maybe not flexible enough.*

*Good ideas for simple protocol layout are welcome!*

### Text mode

Example 1: Publish two values every 1000 milliseconds

    !pub 1000 ["vBat", "tAmbient"]
    :0 Success.

Now, every second the following message is sent by the device:

    # {"vBat":15.2,"tAmbient":22}

## PRELIMINARY: Authentication (0x06)

Requests a challenge from the device to authenticate using secret password + hashing function.

Procedure of authentication:

1. The client requests a challenge from the device. 
2. The device responds with the challenge (random number, length t.b.d.)
3. The client generates a response code based on the received challenge and the secret password. The response code is hashed (algorithm t.b.d., maybe SHA-3) and sent to the device.
4. The device calculates the same response code (with the same secret password stored in the device) and compares it with the received code. If both math, authentication was successful.

#### Text mode

If the auth request is empty, a new challenge is responded. In the second request, the calculated response code follows after the auth request. In case of successful authentication, status code 0 is responded (without additional data).

    !auth
    :0 Success. <challenge>

    !auth <response code>
    :0 Success.

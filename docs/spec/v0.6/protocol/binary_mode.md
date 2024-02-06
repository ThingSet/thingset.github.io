# Binary Mode

## Overview

In the binary mode, the data is encoded using the CBOR format. The data structure is the same as in text mode, but numeric object IDs are used as identifiers by default instead of the object names.

The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.

The **target** of the binary mode is to work with as little payload data as possible. Hence, published reports only contain values and the corresponding IDs or names are only sent once at startup or can be requested manually later.

The **main challenge** is to still be fully discoverable via the binary mode without requiring previous knowledge of the data exposed by the device.

Requests in binary mode can either use data object IDs or names / paths. IDs offer the most compact form with least wire payload, but require some processing on the application side. For requests through gateways (using absolute paths) endpoints must be specified as strings, as numeric IDs are only unique per node.

### Requests

Each request message consists of a first byte as the request method identifier, a path or ID specifying the endpoint of the request and CBOR data as payload (if applicable).

    bin-request = bin-get / bin-fetch / bin-update / bin-create / bin-delete / bin-exec

    bin-get    = %x01 endpoint

    bin-fetch  = %x05 endpoint ( cbor-array   ; IDs or names of requested data
                               / %xF6 )       ; CBOR null: request array of all
                                              ; IDs or names behind endpoint

    bin-update = %x07 endpoint cbor-map

    bin-delete = %x04 endpoint cbor-value

    bin-create = %x06 endpoint cbor-value

    bin-exec   = %x02 endpoint cbor-array

    endpoint   = path            ; CBOR string: path same as text mode
               / parent-id       ; CBOR uint: parent object ID instead of path
               / parent-id-index ; CBOR array: parent object ID, record index

### Response

Responses in binary mode start with the error/status code as specified before, followed by the data if applicable.

    bin-response = %x80-FF                ; response code
                   ( node-id / %xF6 )     ; CBOR string with node ID or null
                   ( cbor-data / %xF6 )   ; CBOR payload data or null

### Report

Binary reports follow the same concept as in text mode.

    bin-report = %x1F endpoint cbor-map    ; map containing object IDs and values

## Name and ID mapping

The examples in this chapter are based on the same data structure as introduced in the [Data Structure chapter](appl_data_structure.md#grouped-layout), but each object is identified by the ID stated in the comment.

The firmware developer is free to choose the IDs.

In contrast to the text mode, the binary mode has the special endpoints `"_Ids"` (ID `0x16`) and `"_Paths"` (ID `0x17`) that allow to retrieve the path for a given ID or vice versa using a `FETCH` request.

**Example 1:** Request IDs of object paths `"Bat/rVoltage_V"` and `"Bat/rCurrent_A"`

    Request:
    05                                      # FETCH request
       16                                   # CBOR uint: 0x17 (_Ids endpoint)
       82                                   # CBOR array (2 elements)
          6E 4261742F72566F6C746167655F56   # CBOR string: "Bat/rVoltage_V"
          6E 4261742F7243757272656E745F41   # CBOR string: "Bat/rCurrent_A"

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       82                                   # CBOR array (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)

**Example 2:** Request paths of object IDs `0x40` and `0x41`

    Request:
    05                                      # FETCH request
       17                                   # CBOR uint: 0x17 (_Paths endpoint)
       82                                   # CBOR array (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       82                                   # CBOR array (2 elements)
          6E 4261742F72566F6C746167655F56   # CBOR string: "Bat/rVoltage_V"
          6E 4261742F7243757272656E745F41   # CBOR string: "Bat/rCurrent_A"

**Example 3:** Request paths of object ID `0x70` (part of a record)

    Request:
    05                                      # FETCH request
       17                                   # CBOR uint: 0x17 (_Paths endpoint)
       81                                   # CBOR array (1 element)
          18 70                             # CBOR uint: 0x40 (object ID)

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       81                                   # CBOR array (1 element)
          6F 4572726F724D656D6F72792F745F73 # CBOR string: "ErrorMemory/t_s"

## Read data

Similar to the text mode, the binary variants of the GET and FETCH functions also allow to read one or more data objects. The objects are identified by their parent object (endpoint of a path) and their IDs or their names.

With the GET function it is possible to retrieve all child objects of a resource as a map of key/value pairs.

The FETCH function can retrieve a specified subset of child item values. In addition to that, it can be used for device discovery, as it can list all childs of an object. Depending on the computing power and the network bandwidth, the childs can be requested as IDs or names.

### Using data object names

If a path (string containing names) is used to specify an endpoint, also names are used instead of IDs in the returned results.

**Example 1:** Retrieve all data of `Bat` path (names + values)

    Request:
    01                                          # GET
       63 426174                                # CBOR string: "Bat"

    Response:
    85                                          # Content.
       F6                                       # CBOR null (direct connection)
       A3                                       # CBOR map (3 elements)
          6A 72566F6C746167655F56               # CBOR string: "rVoltage_V"
          FA 414E6666                           # CBOR float: 12.9
          6A 7243757272656E745F41               # CBOR string: "rCurrent_A"
          FA C048F5C3                           # CBOR float: -3.14
          70 73546172676574566F6C746167655F56   # CBOR string: "sTargetVoltage_V"
          FA 41666666                           # CBOR float: 14.4

**Example 2:** Discover all child object names of the root object

    Request:
    05                                      # FETCH
       60                                   # CBOR empty string (root object)
       F6                                   # CBOR null for discovery

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       8C                                   # CBOR array (12 elements)
          63 745F73                         # CBOR string: "t_s"
          67 704E6F64654944                 # CBOR string: "pNodeID"
           ...

**Example 3:** Retrieve value for single data item `Bat/rVoltage_V`

    Request:
    05                                      # FETCH
       63 426174                            # CBOR string: "Bat" (path)
       6A 72566F6C746167655F56              # CBOR string: "rVoltage_V" (object name)

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       FA 414E6666                          # CBOR float: 12.9

### Using data object IDs

**Example 4:** Retrieve all data of meas path (IDs + values)

    Request:
    01                                      # GET
       02                                   # CBOR uint: 0x02

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       A3                                   # CBOR map (3 elements)
          18 40                             # CBOR uint: 0x40
          FA 414E6666                       # CBOR float: 12.9
          18 41                             # CBOR uint: 0x41
          FA C048F5C3                       # CBOR float: -3.14
          18 42                             # CBOR uint: 0x42
          FA 41666666                       # CBOR float: 14.4

**Example 5:** Discover all child object IDs of the root object

    Request:
    05                                      # FETCH
       00                                   # CBOR uint: 0x00 (root object)
       F6                                   # CBOR null for discovery

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       8C                                   # CBOR array (12 elements)
          01                                # CBOR uint: 0x10
          18 1D                             # CBOR uint: 0x1D
           ...

**Example 6:** Retrieve value for single data item `Bat/rVoltage_V` with ID `0x40`

    Request:
    01                                      # GET
       18 40                                # CBOR uint: 0x40 (object ID)

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       FA 414E6666                          # CBOR float: 12.9

**Example 7:** Retrieve multiple data items:

For fetching multiple data items, the IDs are provided in the array as the second argument. Even though the IDs already describe the data item unambiguously, the endpoint must still be the correct group/parent ID.

    Request:
    05                                      # FETCH
       02                                   # CBOR uint: 0x02 (parent ID)
       82                                   # CBOR array (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       82                                   # CBOR array (2 elements)
          FA 414E6666                       # CBOR float: 12.9
          FA C048F5C3                       # CBOR float: -3.14

**Example 8:** Retrieve number of records in `ErrorMemory_100`

If the endpoint is an array of records, a GET request returns all records or the number of records if not all data can be fit into the response (most likely the case).

    Request:
    01                                      # GET
       08                                   # CBOR uint: 0x08 (records ID)

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       02                                   # CBOR uint: 0x02 (2 elements)

**Example 9:** Retrieve first record in `ErrorMemory_100`

Records are always returned as key/value maps, similar to GET requests for groups.

    Request:
    01                                      # GET
       82                                   # CBOR array (2 elements)
          08                                # CBOR uint: 0x08 (parent ID)
          00                                # CBOR uint: 0x00 (index)

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       A2                                   # CBOR map (2 elements)
          18 70                             # CBOR uint: 0x70 (object ID)
          1A 1B7561E0                       # CBOR uint: 460677600
          18 71                             # CBOR uint: 0x71 (object ID)
          19 0100                           # CBOR uint: 256

**Example 10:** Attempt to retrieve a single item from a record in `ErrorMemory_100`

As there can be multiple instances of the same record sharing the same IDs for their items, it's not possible to query a record item by ID.

    Request:
    05                                      # FETCH
       00                                   # CBOR uint: 0x00 (root ID)
       82                                   # CBOR array (2 elements)
          18 70                             # CBOR uint: 0x70 (object ID)

    Response:
    A4                                      # Not Found.
       F6                                   # CBOR null (direct connection)
       F6                                   # CBOR null (no payload)

## Update data

Requests to overwrite the values of data items.

The device must support an update request using the same CBOR data type as used in the response of a GET or FETCH request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.

If the data type is not supported, an error status code (`0xAF`) is responded.

**Example 1:** Disable load output

    Request:
    07                                      # UPDATE
       04                                   # CBOR uint: 0x04 (parent ID)
       A1                                   # CBOR map (1 element)
          18 60                             # CBOR uint: 0x60 (object ID)
          F4                                # CBOR data: false

    Response:
    84                                      # Changed.
       F6                                   # CBOR null (direct connection)
       F6                                   # CBOR null (no payload)

**Example 2:** Attempt to write read-only measurement values

    Request:
    07                                      # UPDATE
       02                                   # CBOR uint: 0x02
       A1                                   # CBOR map (1 element)
          18 40                             # CBOR uint: 0x40
          FA 41633333                       # CBOR float32: 14.2

    Response:
    A3                                      # Forbidden.
       F6                                   # CBOR null (direct connection)
       F6                                   # CBOR null (no payload)

## Create data

Appends new data to a data object in a similar way as in the text mode.

**Example 1:** Add item with ID `0x41` (`Bat/rCurrent_A`) to the live metrics subset `mLive_`

    Request:
    06                                      # CREATE
       07                                   # CBOR uint: 0x07 (subset object ID)
       18 41                                # CBOR uint: 0x41

    Response:
    81                                      # Created.
       F6                                   # CBOR null (direct connection)
       F6                                   # CBOR null (no payload)

## Delete data

Removes data from an object of array type.

**Example 1:** Delete item with ID `0x61` (`Load/rPower_W`) from live metrics subset

    Request:
    04                                      # DELETE
       07                                   # CBOR uint: 0x07 (subset object ID)
       18 61                                # CBOR uint: 0x61

    Response:
    82                                      # Deleted.
       F6                                   # CBOR null (direct connection)
       F6                                   # CBOR null (no payload)

## Execute function

For execution of a function, the EXEC request is used.

**Example 1:** Reset the device

    Request:
    02                                      # EXEC
       18 34                                # CBOR uint: 0x34 (object ID)
       80                                   # CBOR empty array

    Response:
    84                                      # Changed.
       F6                                   # CBOR null (direct connection)
       F6                                   # CBOR null (no payload)

Note that the endpoint is the object of the executable function itself. Data can be passed to the called function as the second parameter, but the `Device/xReset` function does not require any parameters, so it receives an empty array.

Functions may return payload data, in which case the response is `0x85` followed by the content.

## Reporting

In contrast to text mode, reporting in binary mode only contain the values and not the corresponding names or IDs in order to reduce payload data as much as possible.

**Example 1:** A report containing the `mLive_` subset, sent out by the device every 10 seconds

    1F
       07                                   # CBOR uint: 0x07 (subset object ID)
       85                                   # CBOR array (5 elements)
          1A 1B7561E0                       # CBOR uint: 460677600
          FA 414E6666                       # CBOR float: 12.9
          FA C048F5C3                       # CBOR float: -3.14
          FA 42C10000                       # CBOR float: 96.5
          FA 43090000                       # CBOR float: 137.0

The corresponding IDs can be retrieved with a fetch request.

**Example 2:** Retrieve corresponding IDs for a received report.

    Request:
    05                                      # FETCH
       07                                   # CBOR uint: 0x07 (object ID)
       F6                                   # CBOR null for discovery

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       85                                   # CBOR array (5 elements)
          10                                # CBOR uint: 0x10 (object ID)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)
          18 51                             # CBOR uint: 0x51 (object ID)
          18 61                             # CBOR uint: 0x61 (object ID)

If the name of the object is supplied instead of the ID, paths are returned in the response.

**Example 3:** Retrieve corresponding names for a received report.

    Request:
    05                                      # FETCH
       66 6D4C6976655F                      # CBOR string: "mLive_" (object path)
       F6                                   # CBOR null for discovery

    Response:
    85                                      # Content.
       F6                                   # CBOR null (direct connection)
       84                                   # CBOR array (4 elements)
          63 745F73                         # CBOR string: "t_s" (object path)
          6E 4261742F72566F6C746167655F56   # CBOR string: "Bat/rVoltage_V" (object path)
          6E 4261742F7243757272656E745F41   # CBOR string: "Bat/rCurrent_A" (object path)
          6E 536F6C61722F72506F7765725F57   # CBOR string: "Solar/rPower_W" (object path)
          6D 4C6F61642F72506F7765725F57     # CBOR string: "Load/rPower_W" (object path)

If not all child nodes of one path fit into a single report (e.g. because the sizes of CAN and LoRa frames are limited to a few tens of bytes) it can be split. However, in this case the payload must contain the IDs together with the values, as otherwise the values cannot be mapped to the IDs anymore. The endpoint must be the root ID `0x00`.

**Example 4:** A report containing a part of the `mLive_` subset.

    1F
       00                                   # CBOR uint: 0x00 (root ID)
       A2                                   # CBOR map (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          FA 414E6666                       # CBOR float: 12.9
          18 41                             # CBOR uint: 0x41 (object ID)
          FA C048F5C3                       # CBOR float: -3.14

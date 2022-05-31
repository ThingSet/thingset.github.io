# Binary Mode

In the binary mode, the data is encoded using the CBOR format. The data structure is the same as in text mode, but numeric object IDs are used as identifiers by default instead of the object names.

The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.

The **target** of the binary mod is to work with as little payload data as possible. Hence, published statements only contain values and the corresponding IDs or names are only sent once at startup or can be requested manually later.

The **main challenge** is to still be fully discoverable via the binary mode without requiring previous knowledge of the data exposed by the device.

### Requests

Each request message consists of a first byte as the request method identifier, a path or ID specifying the endpoint of the request and CBOR data as payload (if applicable).

    bin-request = bin-get / bin-post / bin-delete / bin-fetch / bin-ipatch

    bin-get    = %x01 endpoint

    bin-post   = %x02 endpoint cbor-data      ; exec or create is determined
                                              ; based on data object type

    bin-delete = %x04 endpoint cbor-data

    bin-fetch  = %x05 endpoint ( cbor-array   ; IDs or names of requested data
                               / %xF7 )       ; CBOR undefined: request array of
                                              ; all IDs or names behind endpoint

    bin-ipatch = %x07 endpoint cbor-map

    endpoint   = path         ; CBOR string: path same as text mode
               / parent-id    ; CBOR uint: parent object ID instead of path

### Response

Responses in binary mode start with the error/status code as specified before, followed by the data if applicable.

    bin-response = %x80-FF [ cbor-data ]      ; response code and data

### Statement

Binary publication messages follow the same concept as in text mode.

    bin-statement = %x1F endpoint cbor-map    ; map containing object IDs and values

## Name and ID mapping

The examples in this chapter are based on the same data structure as introduced in the [Data Structure chapter](appl_data_structure.md#grouped-layout), but each object is identified by the ID stated in the comment.

The firmware developer is free to choose the IDs.

In contrast to the text mode, the binary mode has the special endpoints `"_ids"` (ID `0x16`) and `"_paths"` (ID `0x17`) that allow to retrieve the path for a given ID or vice versa using a `FETCH` request.

**Example 1:** Request IDs of object paths `"Bat/rMeas_V"` and `"Bat/rMeas_A"`

    Request:
    05                                      # FETCH request
       16                                   # CBOR uint: 0x17 (_ids endpoint)
       82                                   # CBOR array (2 elements)
          6B 4261742F724D6561735F56         # CBOR string: "Bat/rMeas_V"
          6B 4261742F724D6561735F41         # CBOR string: "Bat/rMeas_A"

    Response:
    85                                      # Content.
       82                                   # CBOR array (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)

**Example 2:** Request paths of object IDs `0x40` and `0x41`

    Request:
    05                                      # FETCH request
       17                                   # CBOR uint: 0x17 (_paths endpoint)
       82                                   # CBOR array (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)

    Response:
    85                                      # Content.
       82                                   # CBOR array (2 elements)
          6B 4261742F724D6561735F56         # CBOR string: "Bat/rMeas_V"
          6B 4261742F724D6561735F41         # CBOR string: "Bat/rMeas_A"

## Read data

Similar to the text mode, the binary variants of the GET and FETCH functions also allow to read one or more data objects. The objects are identified by their parent object (endpoint of a path) and their IDs or their names.

With the GET function it is possible to retrieve all child objects of a resource as a map of key/value pairs.

The FETCH function can retrieve a specified subset of child item values. In addition to that, it can be used for device discovery, as it can list all childs of an object. Depending on the computing power and the network bandwidth, the childs can be requested as IDs or names.

### Using data object names

If a path (string containing names) is used to specify an endpoint, also names are used instead of IDs in the returned results.

**Example 1:** Retrieve all data of `Bat` path (names + values)

    Request:
    01                                      # GET
       63 426174                            # CBOR string: "Bat"

    Response:
    85                                      # Content.
       A3                                   # CBOR map (3 elements)
          67 724D6561735F56                 # CBOR string: "rMeas_V"
          FA 414E6666                       # CBOR float: 12.9
          67 724D6561735F41                 # CBOR string: "rMeas_A"
          FA C048F5C3                       # CBOR float: -3.14
          69 735461726765745F56             # CBOR string: "sTarget_V"
          FA 41666666                       # CBOR float: 14.4

**Example 2:** Discover all child object names of the root object

    Request:
    05                                      # FETCH
       60                                   # CBOR empty string (root object)
       F7                                   # CBOR undefined as a wildcard

    Response:
    85                                      # Content.
       8B                                   # CBOR array (11 elements)
          63 745F73                         # CBOR string: "t_s"
          67 634E6F64654944                 # CBOR string: "cNodeID"
           ...

**Example 3:** Retrieve value for single data item `Bat/rMeas_V`

    Request:
    05                                      # FETCH
       63 426174                            # CBOR string: "Bat" (path)
       67 724D6561735F56                    # CBOR string: "rMeas_V" (object name)

    Response:
    85                                      # Content.
       FA 414E6666                          # CBOR float: 12.9

### Using data object IDs

**Example 4:** Retrieve all data of meas path (IDs + values)

    Request:
    01                                      # GET
       02                                   # CBOR uint: 0x02

    Response:
    85                                      # Content.
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
       F7                                   # CBOR undefined as a wildcard

    Response:
    85                                      # Content.
       8B                                   # CBOR array (11 elements)
          01                                # CBOR uint: 0x10
          18 1D                             # CBOR uint: 0x1D
           ...

**Example 6:** Retrieve value for single data item `Bat_V` with ID `0x40`

    Request:
    01                                      # GET
       18 40                                # CBOR uint: 0x40 (object ID)

    Response:
    85                                      # Content.
       FA 414E6666                          # CBOR float: 12.9

**Example 7:** Retrieve multiple data items:

    Request:
    05                                      # FETCH
       02                                   # CBOR uint: 0x02 (parent ID)
       82                                   # CBOR array (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)

    Response:
    85                                      # Content.
       82                                   # CBOR array (2 elements)
          FA 414E6666                       # CBOR float: 12.9
          FA C048F5C3                       # CBOR float: -3.14

## Update data

Requests to overwrite the values of data items.

The device must support a patch request using the same CBOR data type as used in the response of a GET or FETCH request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.

If the data type is not supported, an error status code (`0xAF`) is responded.

**Example 1:** Disable load output

    Request:
    07                                      # PATCH
       04                                   # CBOR uint: 0x04 (parent ID)
       A1                                   # CBOR map (1 element)
          18 60                             # CBOR uint: 0x60 (object ID)
          F4                                # CBOR data: false

    Response:
    84                                      # Changed.

**Example 2:** Attempt to write read-only measurement values

    Request:
    07                                      # PATCH
       02                                   # CBOR uint: 0x02
       A1                                   # CBOR map (1 element)
          18 40                             # CBOR uint: 0x40
          FA 41633333                       # CBOR float32: 14.2

    Response:
    A3                                      # Forbidden.

## Create data

Appends new data to a data object in a similar way as in the text mode.

**Example 1:** Add item with ID `0x41` (`Bat/rMeas_A`) to the generic metrics subset `m`

    Request:
    02                                      # POST
       07                                   # CBOR uint: 0x07 (subset object ID)
       18 41                                # CBOR uint: 0x41

    Response:
    81                                      # Created.

## Delete data

Removes data from an object of array type.

**Example 1:** Delete item with ID `0x18` (`cMetadataURL`) from boot events subset

    Request:
    04                                      # DELETE
       05                                   # CBOR uint: 0x05 (subset object ID)
       18 18                                # CBOR uint: 0x18

    Response:
    82                                      # Deleted.

## Execute function

For execution of a function, the same POST request is used as when creating data. The device decides based on the type of the endpoint whether the request is a function call or a request to create data.

**Example 1:** Reset the device

    Request:
    02                                      # POST
       18 34                                # CBOR uint: 0x34 (object ID)
       80                                   # CBOR empty array

    Response:
    83                                      # Valid.

Note that the endpoint is the object of the executable function itself. Data can be passed to the called function as the second parameter, but the `Device/xReset` function does not require any parameters, so it receives an empty array.

## Published statements

In contrast to text mode, published statements in binary mode only contain the values and not the corresponding names or IDs in order to reduce payload data as much as possible.

**Example 1:** A statement containing the `m` subset, sent out by the device every 10 seconds

    1F
       07                                   # CBOR uint: 0x07 (subset object ID)
       85                                   # CBOR array (5 elements)
          1A 1B7561E0                       # CBOR uint: 460677600
          FA 414E6666                       # CBOR float: 12.9
          FA C048F5C3                       # CBOR float: -3.14
          FA 42C10000                       # CBOR float: 96.5
          FA 43090000                       # CBOR float: 137.0

The corresponding IDs can be retrieved with a fetch request.

**Example 2:** Retrieve corresponding IDs for a received statement.

    Request:
    05                                      # FETCH
       07                                   # CBOR uint: 0x07 (object ID)
       F7                                   # CBOR undefined

    Response:
    85                                      # Content.
       85                                   # CBOR array (5 elements)
          10                                # CBOR uint: 0x10 (object ID)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)
          18 51                             # CBOR uint: 0x51 (object ID)
          18 61                             # CBOR uint: 0x61 (object ID)

If the name of the object is supplied instead of the ID, paths are returned in the response.

**Example 3:** Retrieve corresponding names for a received statement.

    Request:
    05                                      # FETCH
       61 6D                                # CBOR string: "m" (object path)
       F7                                   # CBOR undefined

    Response:
    85                                      # Content.
       84                                   # CBOR array (4 elements)
          63 745F73                         # CBOR string: "t_s" (object path)
          6B 4261742F724D6561735F56         # CBOR string: "Bat/rMeas_V" (object path)
          6B 4261742F724D6561735F41         # CBOR string: "Bat/rMeas_A" (object path)
          69 536F6C61722F725F57             # CBOR string: "Solar/r_W" (object path)
          68 4C6F61642F725F57               # CBOR string: "Load/r_W" (object path)

If not all child nodes of one path fit into a single publication message (e.g. because the sizes of CAN and LoRa frames are limited to a few tens of bytes) the statement can be split. However, in this case the payload must contain the IDs together with the values, as otherwise the values cannot be mapped to the IDs anymore.

**Example 4:** A statement containing a part of the `m` subset.

    1F
       07                                   # CBOR uint: 0x07 (object ID)
       A2                                   # CBOR map (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          FA 414E6666                       # CBOR float: 12.9
          18 41                             # CBOR uint: 0x41 (object ID)
          FA C048F5C3                       # CBOR float: -3.14

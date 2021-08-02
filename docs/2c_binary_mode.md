# Binary Mode

In the binary mode, the data is encoded using the CBOR format. The data structure is the same as in text mode, but numeric object IDs are used as identifiers by default instead of the object names.

The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.

**Target:** As little payload data as possible. IDs/names are only sent once, afterwards reports only contain values.

**Challenge:** Still be discoverable w/o requiring previous knowledge

### Requests

Each request message consists of a first byte as the request method identifier, a path or ID specifying the endpoint of the request and CBOR data as payload (if applicable).

    bin-request = bin-get / bin-post / bin-delete / bin-fetch / bin-ipatch

    bin-get    = %x01 endpoint

    bin-post   = %x02 endpoint cbor-data      ; exec or create is determined
                                              ; based on data object type

    bin-delete = %x04 endpoint cbor-data

    bin-fetch  = %x05 endpoint fetch-spec

    bin-ipatch = %x07 endpoint cbor-map

    endpoint   = path         ; CBOR string: path same as text mode
               / parent-id    ; CBOR uint: parent object ID instead of path

    fetch-spec = cbor-array   ; returns values of specified IDs or names
               / %xF7         ; CBOR undefined: returns array of all IDs
                              ; or names depending on type of endpoint

### Response

Responses in binary mode start with the error/status code as specified before, followed by the data if applicable.

    bin-response = %x80-FF [ cbor-data ]      ; response code and data

### Statement

Binary publication messages follow the same concept as in text mode.

    bin-statement = %x1F endpoint cbor-map    ; map containing object IDs and values

## Name and ID mapping

The examples in this chapter are based on the same data structure as introduced in the [General Concept chapter](2a_general.md#data-structure), but each object is identified by the ID stated in the comment.

The firmware developer is free to choose the IDs.

In contrast to the text mode, the binary mode has a special `".name"` endpoint (ID 0x17) that allows to retrieve the name for a given ID using a `FETCH` request.

**Example 1:** Request name of object IDs 0x40 and 0x41

    Request:
    05                                      # FETCH request
       0F                                   # CBOR uint: 0x0F (.name endpoint)
       82                                   # CBOR array (2 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 41                             # CBOR uint: 0x41 (object ID)

    Response:
    85                                      # Content.
       82                                   # CBOR array (2 elements)
          65 4261745F56                     # CBOR string: "Bat_V"
          65 4261745F41                     # CBOR string: "Bat_A"

## Read data

Similar to the text mode, the binary variants of the GET and FETCH functions also allow to read one or more data objects. The objects are identified by their parent object (endpoint of a path) and their ID or their name.

With the GET function it is possible to retrieve all child objects of a resource as a map of name/value pairs.

The FETCH function is useful for device discovery, as it can list all childs of an object. Depending on the computing power and the network bandwidth, the childs can be requested as IDs or names. In addition to that, the FETCH function can retrieve only a subset of child item values.

### Using data object names

If a path (string containing names) is used to specify an endpoint, also names are used instead of IDs in the returned results.

**Example 1:** Retrieve all data of meas path (names + values)

    Request:
    01                                      # GET
       66 6D656173                          # CBOR string: "meas"

    Response:
    85                                      # Content.
       A3                                   # CBOR map (3 elements)
          65 4261745F56                     # CBOR string: "Bat_V"
          FA 41633333                       # CBOR float: 14.2
          65 4261745F41                     # CBOR string: "Bat_A"
          FA 40A428F6                       # CBOR float: 5.13
          6C 416D6269656E745F64656743       # CBOR string: "Ambient_degC"
          16                                # CBOR uint: 22

**Example 2:** Discover all child object names of the root object

    Request:
    05                                      # FETCH
       60                                   # CBOR empty string (root object)
       F7                                   # CBOR undefined as a wildcard

    Response:
    85                                      # Content.
       89                                   # CBOR array (9 elements)
          64 696E666F                       # CBOR string: "info"
          64 6D656173                       # CBOR string: "meas"
           ...

**Example 3:** Retrieve value of data object "Bat_V"

    Request:
    05                                      # FETCH
       64 6D656173                          # CBOR string: "meas" (path)
       65 4261745F56                        # CBOR string: "Bat_V" (object name)

    Response:
    85                                      # Content.
       FA 41633333                          # CBOR float: 14.2

### Using data object IDs

**Example 4:** Retrieve all data of meas path (IDs + values)

    Request:
    01                                      # GET
       02                                   # CBOR uint: 0x02

    Response:
    85                                      # Content.
       A3                                   # CBOR map (3 elements)
          18 40                             # CBOR uint: 0x40
          FA 41633333                       # CBOR float: 14.2
          18 41                             # CBOR uint: 0x41
          FA 40A428F6                       # CBOR float: 5.13
          18 42                             # CBOR uint: 0x42
          16                                # CBOR uint: 22

**Example 5:** Discover all child object IDs of the root object

    Request:
    05                                      # FETCH
       00                                   # CBOR uint: 0x00 (root object)
       F7                                   # CBOR undefined as a wildcard

    Response:
    85                                      # Content.
       89                                   # CBOR array (9 elements)
          01                                # CBOR uint: 0x01
          02                                # CBOR uint: 0x02
           ...

**Example 6:** Retrieve value of data object "Bat_V"

    Request:
    01                                      # GET
       18 40                                # CBOR uint: 0x40 (object ID)

    Response:
    85                                      # Content.
       FA 41633333                          # CBOR float: 14.2

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
          FA 41633333                       # CBOR float: 14.2
          16                                # CBOR uint: 22

## Update data

Requests to overwrite the value a data object.

The device must support a patch request using the same CBOR data type as used in the response of a GET or FETCH request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.

If the data type is not supported, an error status code (36) is responded.

**Example 1:** Disable charging

    Request:
    07                                      # PATCH
       05                                   # CBOR uint: 0x05
       A1                                   # CBOR map (1 element)
          18 90                             # CBOR uint: 0x90
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

**Example 1:** Add object ID 0x41 (Bat_A) to the `report` subset

    Request:
    02                                      # POST
       18 20                                # CBOR uint: 0x20 (object ID)
       18 41                                # CBOR uint: 0x41

    Response:
    81                                      # Created.

## Delete data

Removes data from an object of array type.

**Example 1:** Remove object ID 0x41 (Bat_A) from `report` subset

    Request:
    04                                      # DELETE
       18 20                                # CBOR uint: 0x20 (object ID)
       18 41                                # CBOR uint: 0x41

    Response:
    82                                      # Deleted.

## Execute function

For execution of a function, the same POST request is used as when creating data. The device decides based on the type of the endpoint whether the request is a function call or a request to create data.

**Example 1:** Reset the device

    Request:
    02                                      # POST
       18 E0                                # CBOR uint: 0xE0 (object ID)
       80                                   # CBOR empty array

    Response:
    83                                      # Valid.

Note that the endpoint is the object of the executable function itself. Data can be passed to the called function as the second parameter, but the "reset" function does not require any parameters, so it receives an empty array.

## Published statements

In contrast to text mode, published statements in binary mode only contain the values and not the corresponding names or IDs in order to reduce payload data as much as possible.

**Example 1:** A statement containing the `report` subset, sent out by the device every 10 seconds

    1F
       18 20                                # CBOR uint: 0x20 (object ID)
       83                                   # CBOR array (3 elements)
          1A 1B7561E0                       # CBOR uint: 460677600
          FA 41633333                       # CBOR float: 14.2
          16                                # CBOR uint: 22

The corresponding IDs can be retrieved with a fetch request.

**Example 2:** Retrieve corresponding IDs for a received statement.

    Request:
    05                                      # FETCH
       18 20                                # CBOR uint: 0x20 (object ID)
       F7                                   # CBOR undefined

    Response:
    85                                      # Content.
       83                                   # CBOR array (3 elements)
          10                                # CBOR uint: 0x10 (object ID)
          18 40                             # CBOR uint: 0x40 (object ID)
          18 42                             # CBOR uint: 0x42 (object ID)

If the name of the object is supplied instead of the ID, also names are returned in the response.

**Example 3:** Retrieve corresponding names for a received statement.

    Request:
    05                                      # FETCH
       66 7265706F7274                      # CBOR string: "report" (object name)
       F7                                   # CBOR undefined

    Response:
    85                                      # Content.
       83                                   # CBOR array (3 elements)
          66 54696D655F73                   # CBOR string: "Time_s" (object name)
          65 4261745F56                     # CBOR string: "Bat_V" (object name)
          6C 416D6269656E745F64656743       # CBOR string: "Ambient_degC" (object name)

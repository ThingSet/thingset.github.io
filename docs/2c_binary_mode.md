# Binary Mode

In the binary mode, the data is encoded using the CBOR format. The data structure is the same as in text mode, but numeric node IDs are used as identifiers by default instead of the node names.

The length of the entire request or response is not encoded in the ThingSet protocol, but can be determined from the CBOR format. Packet length as well as checksums should be encoded in lower layer protocols. It is assumed that the parser always receives a complete request.

### Requests

Each request message consists of a first byte as the request method identifier, a path or ID specifying the endpoint of the request and CBOR data as payload (if applicable).

    bin-request = bin-get / bin-post / bin-delete / bin-fetch / bin-ipatch / bin-nameid

    bin-get    = %x01 endpoint get-type

    bin-post   = %x02 endpoint cbor-data      ; exec or create is determined
                                              ; based on node type

    bin-delete = %x04 endpoint cbor-uint      ; only for valid node IDs

    bin-fetch  = %x05 endpoint cbor-array     ; returns only values, no keys

    bin-ipatch = %x07 endpoint cbor-map

    bin-nameid = %x1E endpoint cbor-array     ; get names of ids or vice versa

    endpoint   = path         ; CBOR string: path same as text mode
               / parent-id    ; CBOR uint: parent node ID instead of path
               / %xF7         ; CBOR undefined: wildcard matching any path / parent

    get-type   = %xF7         ; CBOR undefined: returns array of node IDs (default)
               / %x80         ; CBOR emtpy array: returns array of names
               / %xA0         ; CBOR empty map: returns name:value map

### Response

Responses in binary mode start with the error/status code as specified before, followed by the data if applicable.

    bin-response = %x80-FF [ cbor-data ]      ; response code and data

### Publication message

Binary publication messages follow the same concept as in text mode.

    bin-pubmsg = %x1F bin-topic cbor-map      ; map containing node IDs and values

    bin-topic = cbor-string                   ; empty string 0x60 if not specified

## Name and ID mapping

The examples in this chapter are based on the same data structure as introduced in the [General Concept chapter](2a_general.md#data-structure), but each node is identified by an ID. The assignment of IDs and names is shown in the following JSON-like structure (actual JSON supports neither numbers as keys nor comments):

```JSON
{
    "18": {                             // info
        "19": "MPPT 1210 HUS",          // DeviceType
    },
    "30": {                             // conf
        "31": 14.4,                     // BatCharging_V
    },
    "60": {                             // input
        "61": true                      // EnableCharging
    },
    "70": {                             // output
        "71": 14.1,                     // Bat_V
        "72": 5.13,                     // Bat_A
        "73": 22                        // Ambient_degC
    },
    "A0": {                             // rec
        "A1": 1984,                     // BatChgDay_Wh
    },
    "D0": {                             // cal
    },
    "E0": {                             // exec
        "E1": null,                     // reset
    },
    "EF": ["Password"],                 // auth
    "F0": {                             // pub
        "F1": {                         // serial
            "F2": true,                 // Enable
            "F3": 1.0,                  // Interval
            "F4": ["71", "72"]          // IDs
        },
        "F5": {                         // can
            "F6": false,                // Enable
            "F7": 0.1,                  // Interval
            "F8": ["71"]                // IDs
        }
    }
}
```

The firmware developer is free to choose the IDs. However, above IDs for the nodes of the first layer are used by Libre Solar devices and recommended for the following reasons:

- IDs from 0x00 to 0x17 are left for data nodes that are sent very often, as they consume only a single byte in CBOR encoding
- The node IDs specifying the categories are spaced such that there should be enough free node IDs for most devices
- As the node IDs are strictly increasing, the data layot is compatible with the draft standard [CBOR Encoding of Data Modeled with YANG](https://tools.ietf.org/html/draft-ietf-core-yang-cbor).

In contrast to the text mode, the binary mode has a special NAMEID request (without CoAP equivalent) that allows to get a name for an ID or vice versa.

**Example 1:** Request name of node IDs 0x71 and 0x72

    Request:
    1E                                      NAMEID request
       18 70                                # CBOR uint: 0x70 (parent ID)
       82                                   # CBOR array (2 elements)
          18 71                             # CBOR uint: 0x71 (node ID)
          18 72                             # CBOR uint: 0x72 (node ID)

    Response:
    85                                      Content.
       82                                   # CBOR array (2 elements)
          65 4261745F56                     # CBOR string: "Bat_V"
          65 4261745F41                     # CBOR string: "Bat_A"

If the parent ID is passed as the endpoint, only the data node name is returned. All requested nodes must be children of the same parend node in this case.

**Example 2:** Request full path of node ID 0x71 (Bat_V)

    Request:
    1E                                      NAMEID request
       F7                                   # CBOR undefined as a wildcard
       18 71                                # CBOR uint: 0x71 (node ID)

    Response:
    85                                      Content.
       6C 6F75747075742F4261745F56          # CBOR string: "output/Bat_V"

If the path of a node is unknown (e.g. because it was obtained from a publication message), the entire path (see text mode) can be determined by setting the endpoint to undefined, as shown above.

**Example 3:** Request IDs for known data node names

    Request:
    1E                                      NAMEID request
       F7                                   # CBOR undefined as a wildcard
       82                                   # CBOR array (2 elements)
          65 4261745F56                     # CBOR string: "Bat_V"
          65 4261745F41                     # CBOR string: "Bat_A"

    Response:
    85                                      Content.
       82                                   # CBOR array (2 elements)
          18 71                             # CBOR uint: 0x71 (node ID)
          18 72                             # CBOR uint: 0x72 (node ID)

Also here a wildcard for the endpoint can be used to query the entire database. However, if multiple nodes with the same name are found, an error must be returned. This should not be the case for a properly designed data structure.

## Read data

Similar to the text mode, the binary variants of the GET and FETCH functions also allow to read one or more data objects. The objects are identified by their parent node (endpoint of a path) and their ID or their name.

The GET function is useful for device discovery, as it can list all childs of a node. Depending on the computing power of the device and the host, the GET request can either return only the IDs of the next layer or maps including the values. In order to be compatible to the text mode, it is also possible to retrieve all child nodes of a resource as a map of name/value pairs.

The binary mode also allows to work only with IDs and no paths or node names to keep message size at a minimum. In order to discover the nodes of a device, the host can first query all child IDs of a node (starting with root node of ID 0), afterwards query the names for each ID once and then request the value for any data object on demand.

**Example 1:** Discover all child nodes of the root node (i.e. categories)

    Request:
    01                                      GET request
       00                                   # CBOR uint: 0x00 (root node)
       F7                                   # CBOR undefined as a wildcard

    Response:
    85                                      Content.
       89                                   # CBOR array (9 elements)
          18 18                             # CBOR uint: 0x18
          18 30                             # CBOR uint: 0x30
           ...
          18 F0                             # CBOR data: 0xF0

**Example 2:** Retrieve all data of output path (keys + values)

    Request (alternative 1):
    01                                      GET request
       18 70                                # CBOR uint: 0x70
       A0                                   # CBOR empty map

    Request (alternative 2):
    01                                      GET request
       66 6F7574707574                      # CBOR string: "output"
       A0                                   # CBOR empty map

    Response:
    85                                      Content.
       A3                                   # CBOR map (3 elements)
          65 4261745F56                     # CBOR string: "Bat_V"
          FA 4161999A                       # CBOR float: 14.1
          65 4261745F41                     # CBOR string: "Bat_A"
          FA 40A428F6                       # CBOR float: 5.13
          6C 416D6269656E745F64656743       # CBOR string: "Ambient_degC"
          16                                # CBOR uint: 22

Note that the empty map requests to respond with name/value pairs as specified in the request grammar at the beginning of the chapter.

**Example 3:** Retrieve value of data node "Bat_V"

    Request (alternative 1):
    05                                      FETCH request
       66 6F7574707574                      # CBOR string: "output" (path)
       65 4261745F56                        # CBOR string: "Bat_V" (node name)

    Request (alternative 2):
    05                                      FETCH request
       18 70                                # CBOR uint: 0x70 (parent ID)
       18 71                                # CBOR uint: 0x71 (node ID)

    Response:
    85                                      Content.
       FA 4161999A                          # CBOR float: 14.1

**Example 4:** Retrieve multiple data nodes:

    Request:
    05                                      FETCH request
       18 70                                # CBOR uint: 0x70 (parent ID)
       82                                   # CBOR array (2 elements)
          18 71                             # CBOR uint: 0x71 (node ID)
          18 72                             # CBOR uint: 0x72 (node ID)

    Response:
    85                                      Content.
       82                                   # CBOR array (2 elements)
          FA 4161999A                       # CBOR float: 14.1
          16                                # CBOR uint: 22

The binary mode also allows to use data object names (strings) instead of numeric IDs, which increases the amount of transferred data.

## Update data

Requests to overwrite the value a data node.

The device must support a patch request using the same CBOR data type as used in the response of a GET or FETCH request for the given objects. Optionally, the device may also accept different data types (e.g. float32 instead of int) and convert the data internally.

If the data type is not supported, an error status code (36) is responded.

**Example 1:** Disable charging

    Request:
    07                                      PATCH request
       18 70                                # CBOR uint: 0x70
       A1                                   # CBOR map (1 element)
          18 61                             # CBOR uint: 0x61
          F4                                # CBOR data: false

    Response:
    84                                      Changed.

**Example 2:** Attempt to write read-only measurement values (output category)

    Request:
    07                                      PATCH request
       A2                                   # CBOR map (2 elements)
          18 71                             # CBOR uint: 0x71
          FA 0x41633333                     # CBOR float32: 14.2
          18 73                             # CBOR uint: 0x73
          16                                # CBOR uint: 22

    Response:
    A3                                      Forbidden.

## Create data

Appends new data to a data node in a similar way as in the text mode.

**Example 1:** Add node ID 0x72 (Bat_A) to the serial publication channel

    Request:
    02                                      POST request
       18 F4                                # CBOR uint: 0xF4 (parent ID)
       18 72                                # CBOR uint: 0x72 (node ID)

    Response:
    81                                      Created.

## Delete data

Removes data from a node of array type.

**Example 1:** Remove node ID 0x72 (Bat_A) from serial publication channel

    Request:
    04                                      DELETE request
       18 F4                                # CBOR uint: 0xF4 (parent ID)
       18 72                                # CBOR uint: 0x72 (node ID)

    Response:
    82                                      Deleted.

## Execute function

For execution of a function, the same POST request is used as when creating data. The device decides based on the type of the endpoint whether the request is a function call or a request to create data.

**Example 1:** Reset the device

    Request:
    02                                      POST request
       18 E1                                # CBOR uint: 0xE1 (node ID)
       80                                   # CBOR empty array

    Response:
    83                                      Valid.

Note that the endpoint is the node of the executable function itself. Data can be passed to the called function as the second parameter, but the "reset" function does not require any parameters, so it receives an empty array.

## Other functions

Authentication, publication request setup and publication messages work analog to text mode.

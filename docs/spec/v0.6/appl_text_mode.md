# Text Mode

The following description of the ThingSet text mode grammar uses ABNF according to [RFC 5234](https://tools.ietf.org/html/rfc5234).

For rule names prefixed with `json-` consider the JSON specification in [RFC 8259](https://tools.ietf.org/html/rfc8259). In context of the ThingSet protocol, JSON data must be in the most compact form, i.e. not contain any unnecessary whitespaces or line breaks.

### Requests

Each request message consists of a first character as the request method identifier, a path specifying the endpoint of the request and a JSON string for the payload data (if applicable).

    txt-request = txt-get / txt-fetch / txt-update / txt-create / txt-delete / txt-exec

    txt-get    = "?" [ path ]

    txt-fetch  = "?" [ path ] " " ( json-array / json-null )

    txt-update = "=" [ path ] " " json-object

    txt-create = "+" [ path ] " " json-value

    txt-delete = "-" [ path ] [ " " json-value ]

    txt-exec   = "!" [ path ] [ " " json-value ]

    path = relative-path / absolute-path

    relative-path = object-name *( "/" object-name )

    absolute-path = "/" ( node-id [ "/" relative-path ] )

    node-id = 1*( ALPHA / DIGIT )                   ; alphanumeric string

    object-name = ALPHA / DIGIT / "." / "_" / "-"   ; compatible to URIs (RFC 3986)

The path to access a specific data object is a JSON pointer ([RFC 6901](https://tools.ietf.org/html/rfc6901)). For relative paths the forward slash at the beginning is omitted. The useable characters for object names are further restricted to allow un-escaped usage in URLs.

### Response

The response starts with a colon `:` followed by the the status code and a plain text description of the status finished with a `.`. The description is not strictly specified and can be according to the table in the [General Concept chapter](2a_general.md) or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description.

The bytes after the dot contain the requested data.

    txt-response = ":" status-code status-msg [ " " json-value ]

    status-code = 2( DIGIT / %x41-46 )              ; two upper-case HEXDIGs

    status-msg  = [ " " *( ALPHA / SP ) ] "."       ; optional human-readable text

### Statement

A statement starts with the hash sign and a path, followed by a whitespace and the map of actual payload data as name/value pairs.

    txt-statement = "#" [ path ] " " json-object

The path is either a group (e.g. `Device`) or a subset object containing references to other data items as an array (e.g. `eState`).

### Absolute vs. relative paths

If the path in requests and statements starts with a `/`, the path is absolute, which means that the first element in the path identifies the node ID. This is used by gateways or in general by services which can communicate with multiple ThingSet nodes.

## Read data

The GET function allows to read all child objects below the specified path.

If a device is not able to provide the entire content of a group or subset (e.g. because the buffer is too small), the value must be set to `null` and a new request for smaller data set should be sent. In case of records, the value must be set to the number of records instead of `null` if the content of the records cannot be returned directly. This allows to determine whether the path starting with an upper-case letter is a group or contains records.

The FETCH function allows to retrieve only subset of the child objects, defined by an array with the object names passed to the function. If `null` is passed instead of the array of desired child objects, an array with the child object names is returned to allow discovering a device data structure layer by layer.

Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.

**Example 1:** Attempt to get all data of the device

    ?
    :85 Content. {"t_s":460677600,"cNodeID":"XYZ12345","cMetadataURL":"https://files.
    libre.solar/meta/cc-05.json","Device":null,"Bat":null,"Solar":null,"Load":null,
    "Log":2,"eBoot":null,"eState":null,"mLive":null,"_Pub":null}

The content of the groups and subsets would have resulted in a too long response for the resource-constrained device, so the values were set to `null` and can be retrieved separately as shown in the examples below.

Note that `_Ids` and `_Paths` are not contained in the data, as they are only available in the binary mode.

**Example 2:** Retrieve all content of `Bat` path (names + values)

    ?Bat
    :85 Content. {"rVoltage_V":12.9,"rCurrent_A":-3.14,"sTargetVoltage_V":14.4}

**Example 3:** List all sub-item names of `Bat` path as an array

    ?Bat null
    :85 Content. ["rVoltage_V","rCurrent_A","sTargetVoltage_V"]

**Example 4:** Retrieve value for single data item `Bat/rVoltage_V`

    ?Bat ["rVoltage_V"]
    :85 Content. [12.9]

A more simple way is to provide the entire path (GET instead of FETCH request):

    ?Bat/rVoltage_V
    :85 Content. 12.9

**Example 5:** Retrieve all records in `Log`

    ?Log
    :85 Content. [{"t_s":460677000,"rErrorFlags":4},{"t_s":460671000,"rErrorFlags":256}]

If a device is not able to return the content of all records directly, it must return the number of stored records. This number can be used to retrieve each record individually (see below).

    ?Log
    :85 Content. 2

**Example 6:** Retrieve first record in `Log`

    ?Log/0
    :85 Content. {"t_s":460677000,"rErrorFlags":4}

**Example 7:** Get all data of node `XYZ12345` through a gateway

    ?/XYZ12345
    :85 Content. {"t_s":460677600,"cNodeID":"XYZ12345","cMetadataURL":"https://files.
    libre.solar/meta/cc-05.json","Device":null,"Bat":null,"Solar":null,"Load":null,
    "Log":2,"eBoot":null,"eState":null,"mLive":null,"_Pub":null}

**Example 8:** List all nodes behind the gateway we are communicating with

    ?/ null
    :85 Content. ["ABCD1234","XYZ12345"]

## Update data

The UPDATE request attempts to overwrite the values of data items.

Data items prefixed with `s` will be stored in persistent memory, so it is not allowed to change settings periodically. Only data of with `w` prefix can be changed regularly.

**Example 1:** Disable load output

    =Load {"wEnable":false}
    :84 Changed.

**Example 2:** Attempt to write read-only measurement value

    =Bat {"rCurrent_A":0}
    :A3 Forbidden.

## Create data

The equivalent of a POST request allows to append new data to an existing data item, usually an array.

In current implementations it is not possible to add entirely new data objects, as this would be against the nature of statically allocated memory of constrained devices.

**Example 1:** Add battery current measurement to the generic metrics subset `mLive`

    +mLive "Bat/rCurrent_A"
    :81 Created.

## Delete data

Deletes data from a data item of array type.

**Example 1:** Delete `cMetadataURL` from boot events subset

    -eBoot "cMetadataURL"
    :82 Deleted.

## Execute function

Calls an executable data object. Functions are prefixed with `x`.

**Example 1:** Reset the device

    !Device/xReset
    :83 Valid.

## Authentication

Some of the device parameters like calibration data or important settings should be protected against unauthorized change. A simple authentication method is suggested where multiple user levels can be implemented in the firmware using different passwords. The manufacturer would use a different password to authenticate than a normal user and thus get more rights to access data objects.

The password is transferred as a plain text string. Encryption has to be provided by lower layers.

Internally, the authentication function is implemented as an executable data object.

    !Device/xAuth "mypass"
    :83 Valid.

After successful authentication, the device exposes previously restricted data objects via the normal data access requests. The authentication stays valid until another auth command is received, either without password or with a password that doesn't match.

## Published statements

Published statements are broadcast to all connected devices and no response is sent from devices receiving the message.

**Example 1:** A statement containing the `mLive` subset, sent out by the device every 10 seconds

    #mLive {"t_s":460677600,"Bat":{"rVoltage_V":12.9,"rCurrent_A":-3.14},"Solar":{"rPower_W":96.5},"Load":{"rPower_W":137.0}}

The `_Pub` path is used to configure the publication process itself.

**Example 2:** List all statements available for publication

    ?_Pub null
    :85 Content. ["eState","mLive"]

**Example 3:** Enable publication of `mLive` subset

    =_Pub/mLive {"sEnable":true}
    :84 Changed.

If the published object is a subset object (and not a group), the data items contained in the messages can be configured using POST and DELETE requests to the data object as shown in the examples above.

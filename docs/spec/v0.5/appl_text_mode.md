# Text Mode

The following description of the ThingSet text mode grammar uses ABNF according to [RFC 5234](https://tools.ietf.org/html/rfc5234).

For rule names prefixed with `json-` consider the JSON specification in [RFC 8259](https://tools.ietf.org/html/rfc8259). In context of the ThingSet protocol, JSON data must be in the most compact form, i.e. not contain any unnecessary whitespaces or line breaks.

### Requests

Each request message consists of a first character as the request method identifier, a path specifying the endpoint of the request and a JSON string for the payload data (if applicable).

    txt-request = txt-get / txt-fetch / txt-patch / txt-create / txt-delete / txt-exec

    txt-get    = "?" path [ "/" ]                   ; CoAP equivalent: GET request

    txt-fetch  = "?" path " " json-array            ; CoAP equivalent: FETCH request

    txt-patch  = "=" path " " json-object           ; CoAP equivalent: iPATCH request

    txt-create = "+" path " " json-value            ; CoAP equivalent: POST request

    txt-delete = "-" path " " json-value            ; CoAP equivalent: DELETE request

    txt-exec   = "!" path [ " " json-value ]        ; CoAP equivalent: POST request

    path = object-name [ "/" object-name ]

    object-name = ALPHA / DIGIT / "." / "_" / "-"   ; compatible to URIs (RFC 3986)

The path to access a specific data object is a JSON pointer ([RFC 6901](https://tools.ietf.org/html/rfc6901)) without the forward slash at the beginning. The useable characters for object names are further restricted to allow un-escaped usage in URLs.

### Response

The response starts with a colon `:` followed by the the status code and a plain text description of the status finished with a `.`. The description is not strictly specified and can be according to the table in the [General Concept chapter](2a_general.md) or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description.

The bytes after the dot contain the requested data.

    txt-response = ":" status [ " " json-value ]    ; response code and data

    status = status-code [ " " status-msg ] "."

    status-code = 2( hex )

    status-msg  = *( ALPHA / SP )

    hex = DIGIT / %x41-46                           ; upper-case HEXDIG

### Statement

A statement starts with the hash sign and a path, followed by a whitespace and the map of actual payload data as name/value pairs.

    txt-statement = "#" path " " json-object

The path is either a group (e.g. `Device`) or a subset object containing references to other data items as an array (e.g. `eChange`).

## Read data

The GET function allows to read all child objects of the specified path. If a forward slash is appended at the end of the path, only an array with the child object names is returned to allow discovering a device data structure layer by layer. Otherwise all content below that path (names and values) is returned.

The FETCH function allows to retrieve only subset of the child objects, defined by an array with the object names passed to the function.

Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.

**Example 1:** Discover all child objects of the root object (i.e. categories)

    ?/
    :85 Content. ["t_s","cNodeID","cMetadataURL","Device","Bat","Solar","Load","eBoot","eChange",
    "m","_pub"]

Note that `_path` is not contained in the list, as it is only available in the binary mode.

**Example 2:** Retrieve all content of `Bat` path (names + values)

    ?Bat
    :85 Content. {"rMeas_V":12.9,"rMeas_A":-3.14,"sTarget_V":14.4}

**Example 3:** List all sub-item names of `Bat` path as an array

    ?Bat/
    :85 Content. ["rMeas_V","rMeas_A","sTarget_V"]

**Example 4:** Retrieve value for single data item `Bat/rMeas_V`

    ?Bat ["rMeas_V"]
    :85 Content. [12.9]

## Update data

The PATCH request attempts to overwrite the values of data items.

Data items prefixed with `s` will be stored in persistent memory, so it is not allowed to change settings periodically. Only data of with `w` prefix can be changed regularly.

**Example 1:** Disable load output

    =Load {"wEnable":false}
    :84 Changed.

**Example 2:** Attempt to write read-only measurement value

    =Bat {"rMeas_A":0}
    :A3 Forbidden.

## Create data

The equivalent of a POST request allows to append new data to an existing data item, usually an array.

In current implementations it is not possible to add entirely new data objects, as this would be against the nature of statically allocated memory of constrained devices.

**Example 1:** Add battery current measurement to the generic metrics subset `m`

    +m "Bat/rMeas_A"
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

**Example 1:** A statement containing the `m` subset, sent out by the device every 10 seconds

    #m {"t_s":460677600,"Bat":{"rMeas_V":12.9,"rMeas_A":-3.14},"Load":{"r_W":96.5},"Load":{"r_W":137.0}}

The `_pub` path is used to configure the publication process itself.

**Example 2:** List all statements available for publication

    ?_pub/
    :85 Content. ["eChange","m"]

**Example 3:** Enable publication of `m` subset

    =_pub/m {"sEnable":true}
    :84 Changed.

If the published object is a subset object (and not a group), the data items contained in the messages can be configured using POST and DELETE requests to the data object as shown in the examples above.

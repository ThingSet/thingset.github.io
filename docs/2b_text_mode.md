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

The path to access a specific data object is a JSON pointer ([RFC 6901](https://tools.ietf.org/html/rfc6901)) without the forward slash at the beginning. The useable characters for node names are further restricted to allow un-escaped usage in URLs.

### Response

The response starts with a colon ':' followed by the the status code and a plain text description of the status finished with a '.'. The description is not strictly specified and can be according to the table in the [General Concept chapter](2a_general.md) or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description.

The bytes after the dot contain the requested data.

    txt-response = ":" status [ " " json-value ]    ; response code and data

    status = status-code [ " " status-msg ] "."

    status-code = 2( hex )

    status-msg  = *( ALPHA / SP )

    hex = DIGIT / %x41-46                           ; upper-case HEXDIG

### Statement

A statement starts with the hash sign and a path, followed by a whitespace and the map of actual payload data as name/value pairs.

    txt-statement = "#" path " " json-object

The path is either a group (e.g. `meas`) or a dedicated object (data set) containing references to other objects as an array (e.g. `report`).

## Read data

The GET function allows to read all child objects of the specified path. If a forward slash is appended at the end of the path, only an array with the child object names is returned to allow discovering a device data structure layer by layer. Otherwise all content below that path (names and values) is returned.

The FETCH function allows to retrieve only subset of the child objects, defined by an array with the object names passed to the function.

Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.

**Example 1:** Discover all child objects of the root node (i.e. categories)

    ?/
    :85 Content. ["info","meas","state","rec","input","conf","rpc","dfu","report",
    "ctrl",".pub"]

Note that `.name` is not contained in the list, as it is only available in the binary mode.

**Example 2:** Retrieve all content of meas path (keys + values)

    ?meas
    :85 Content. {"Bat_V":14.2,"Bat_A":5.13,"Ambient_degC":22}

**Example 3:** List all sub-objects of meas path as an array

    ?meas/
    :85 Content. ["Bat_V","Bat_A","Ambient_degC"]

**Example 4:** Retrieve single data object "Bat_V"

    ?meas ["Bat_V"]
    :85 Content. [14.2]

## Update data

Requests to overwrite the value of a data object.

Data of category `conf` will be written into persistent memory, so it is not allowed to change settings periodically. Only data of category `input` can be changed regularly.

**Example 1:** Disable charging

    =input {"EnableCharging":false}
    :84 Changed.

**Example 2:** Attempt to write read-only measurement values (meas category)

    =meas {"Bat_V":0}
    :A3 Forbiden.

## Create data

Appends new data to a data object.

**Example 1:** Add "Bat_A" to the `report` data set

    +report "Bat_A"
    :81 Created.

## Delete data

Removes data from an object of array type.

**Example 1:** Remove "Bat_A" from `report` data set

    -report "Bat_A"
    :82 Deleted.

## Execute function

Executes a function in the `rpc` category.

**Example 1:** Reset the device

    !rpc/x-reset
    :83 Valid.

## Authentication

Some of the device parameters like calibration or config settings should be protected against unauthorized change. A simple authentication method is suggested where multiple user levels can be implemented in the firmware using different passwords. The manufacturer would use a different one to authenticate than a normal user and thus get more rights to access data objects.

The password is transferred as a plain text string. Encryption has to be provided by lower layers.

Internally, the authentication function is implemented as a data object of exec type.

    !rpc/x-auth "mypass"
    :83 Valid.

After successful authentication, the device exposes restricted data objects via the normal data access requests. The authentication stays valid until another auth command is received, either without password or with a password that doesn't match.

## Published statements

Published statements are broadcast to all connected devices and no response is sent from devices receiving the message.

**Example 1:** A statement containing the `report` data set, sent out by the device every 10 seconds

    #report {"Time_s":460677600,"Bat_V":14.1,"Bat_A":5.13}

The `.pub` node is used to configure the publication process itself.

**Example 2:** List all statements available for publication

    ?.pub/
    :85 Content. ["info","report"]

**Example 3:** Disable publication of `report` data set

    =.pub/report {"Period_s":0}
    :84 Changed.

If the published object is a list of references to data items (and not a group), the data objects contained in the messages can be configured using POST and DELETE requests to the data object (e.g. `report`) as shown in the examples above.

# Text Mode

The following description of the ThingSet text mode grammar uses ABNF according to [RFC 5234](https://tools.ietf.org/html/rfc5234) and [RFC 7405](https://tools.ietf.org/html/rfc7405).

For rule names prefixed with `json-` consider the JSON specification in [RFC 8259](https://tools.ietf.org/html/rfc8259). For the ThingSet protocol, JSON data must be in the most compact form, i.e. not contain any unnecessary whitespaces or line breaks.

### Requests

Each request message consists of a first character as the request method identifier, a path specifying the endpoint of the request and a JSON string for the payload data (if applicable).

    request = get / fetch / patch / append / delete / exec

    get    = "?" path [ "/" ]                       ; CoAP equivalent: GET request

    fetch  = "?" path " " json-array                ; CoAP equivalent: FETCH request

    patch  = "=" path " " json-object               ; CoAP equivalent: iPATCH request

    append = "+" path " " json-value                ; CoAP equivalent: POST request

    delete = "-" path " " json-value                ; CoAP equivalent: DELETE request

    exec   = "!" path [ " " json-value ]            ; CoAP equivalent: POST request

    path = node-name [ "/" node-name ]

    node-name = ALPHA / DIGIT / "_" / "-" / "."     ; compatible to URIs (RFC 3986)

The path to access a specific node is a JSON pointer ([RFC 6901](https://tools.ietf.org/html/rfc6901)) without the forward slash at the beginning. The useable characters for node names are further restricted to allow un-escaped usage in URLs.

### Response

The response starts with a colon ':' followed by the the status code and a plain text description of the status finished with a '.'. The description message content is not strictly specified and can be either the description from the table in the [General Concept chapter](2a_general.md) or a more verbose message. However, it must contain only one dot at the end of the description, signifying the end of the description.

The bytes after the dot contain the requested data.

    response = ":" status [ " " json-value ]            ; response code and data

    status = status-code [ " " status-msg ] "."

    status-code = 2( hex )

    status-msg  = *( ALPHA / SP )

    hex = DIGIT / %x41-46                               ; upper-case HEXDIG

### Publication message

    pub-msg = "# " json-map                             ; publication message

## Read data

The GET function allows to read all child nodes of the specified path. If a forward slash is appended at the end of the path, only an array with the node names of the next level is returned. Otherwise all content below that path (names and values) is returned.

The FETCH function allows to retrieve only subset of the child nodes, defined by an array with the node names passed to the function.

Only those data objects are returned which are at least readable. Thus, the result might differ after authentication.

**Example 1:** Discover all child nodes of the root node (i.e. categories)

    ?/
    :85 Content. ["info","conf","input","output","rec","exec","pub"]

**Example 2:** Retrieve all content of output path (keys + values)

    ?output
    :85 Content. {"Bat_V":14.2,"Bat_A":0.13,"Ambient_degC":22}

**Example 3:** List all sub-nodes of output path as an array

    ?output/
    :85 Content. ["Bat_V","Bat_A","Ambient_degC"]

**Example 4:** Retrieve single data node "Bat_V"

    ?output ["Bat_V"]
    :85 Content. {"Bat_V":14.2}

## Update data

Requests to overwrite the value of a data node.

Data of category *conf* will be written into persistent memory, so it is not allowed to change settings periodically. Only data of category *input* can be changed regularly.

**Example 1:** Disable charging

    =input {"EnableCharging":false}
    :84 Changed.

**Example 2:** Attempt to write read-only measurement values (output category)

    =output {"Bat_V":15.2,"Ambient_degC":22}
    :A3 Forbiden.

## Create data

Appends new data to a data node.

**Example 1:** Add "Bat_V" to the serial publication channel

    +pub/serial/ids "Bat_V"
    :81 Created.

## Delete data

Removes data from a node of array type.

**Example 1:** Remove "Bat_V" from "serial" publication channel

    -pub/serial/ids "Bat_V"
    :82 Deleted.

## Execute function

Executes a function identified by a data object name of category "exec"

**Example 1:** Reset the device

    !exec/reset
    :83 Valid.

## Authentication

Some of the device parameters like calibration or config settings should be protected against unauthorized change. The protocol provides a simple authentication method. Multiple user levels can be implemented in the firmware using different passwords. The manufacturer would use a different one to authenticate than a normal user and thus get more rights to access data objects.

The password is transferred as a plain text string. Encryption has to be provided by lower layers.

Internally, the authentication function is implemented as a data node of exec type.

    !exec/auth "mypass"
    :83 Valid.

After successful authentication, the device exposes restricted data objects via the normal data object access commands. The authentication stays valid until another auth command is received, either without password or with a password that doesn't match.

## Publication messages

A publication request configures the device to publish certain data on a regular basis through a defined communication channel (UART, CAN, LoRa, etc.). If implemented in the firmware, the publication interval may be adjustable.

The publication subsystem is configured via the pub endpoint.

**Example 1:** List all available publication channels

    ?pub/
    :85 Content. ["serial","can"]

**Example 2:** Enable "serial" publication channel

    ?pub/serial {"Enable":true}
    :84 Changed.

With this setting, the following message is automatically sent by the device once per hour:

    # {"Bat_V":14.1,"Bat_A":5.13}

Publication messages are broadcast to all connected devices. No response is sent from devices receiving the message.

The data nodes to be published in each message can be configured using POST and DELETE requests to the pub/serial/IDs channel, as shown in the examples above.

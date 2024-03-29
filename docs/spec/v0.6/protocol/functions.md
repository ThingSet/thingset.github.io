# Access Functions

## Protocol Modes

Similar to Modbus, the ThingSet protocol supports two different modes: A human-readable text mode and a binary mode.

In the text mode, payload data is encoded in JSON format ([RFC 8259](https://tools.ietf.org/html/rfc8259)). This mode is recommended when using serial communication interfaces as the low layer protocol, as it can be easily used directly on a terminal.

The binary mode uses CBOR ([RFC 8949](https://tools.ietf.org/html/rfc8949)) instead of JSON for payload data encoding in order to reduce the protocol overhead for ressource-constrained devices or low bandwith communication via CAN or LoRa.

A device may implement both variants of the protocol, but it is also allowed to support only the mode most suitable for the application.

The first byte of a ThingSet message is either a text-mode identifier (`?`, `=`, `!`, `+`, `-`, `:`, `@` and `#`), a binary request code or a binary status code. Received data with unknown first byte is ignored, so that other text output (e.g. debug print information) can be used in parallel to the ThingSet protocol on the same serial interface.

## Requests

The protocol supports the typical [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Request codes match with CoAP to allow transparent mapping between ThingSet and CoAP devices.

| Binary mode | Text mode | Function | CoAP equivalent | Description                    |
|-------------|-----------|----------|--------|-----------------------------------------|
| 0x01        | ?         | GET      | GET    | Retrieve all data from a path           |
| 0x05        | ?         | FETCH    | FETCH  | Retrieve a part of the data from a path |
| 0x07        | =         | UPDATE   | iPATCH | Update (overwrite) data of a path       |
| 0x06        | +         | CREATE   | PATCH  | Append data to an object                |
| 0x04        | -         | DELETE   | DELETE | Delete data from an object              |
| 0x02        | !         | EXEC     | POST   | Execute a function                      |

The CoAP PUT method is not explicitly implemented. PUT is equivalent to an update of all sub-objects of a resource using a PATCH request. UPDATE requests for ThingSet are always idempotent, so only the iPATCH request code is used. The PATCH method is used to create new data.

Additional request codes may be introduced in the future. Codes `0x0A`, `0x0D` and `0x20`-`0x7F` are reserved, as they represent the ASCII characters for readable text including `LF` and `CR`.

## Responses

Response messages in binary format are identified by a first byte greater than or equal to 128 (`0x80`) containing a status code which shows if the request could be handled successfully. For status codes between `0x80` and `0x9F`, the response was successful. If the status code is greater than or equal to `0xA0`, an error occured.

The status codes are again aligned with [CoAP response codes](https://www.iana.org/assignments/core-parameters/core-parameters.xhtml#codes), but contain an offset so that there is no interference with ASCII characters (less than 0x80).

| Code | CoAP | HTTP | Description   | Comment                                |
|------|------|------|---------------|----------------------------------------|
| 0x81 | 2.01 | 201  | Created       | Answer to CREATE requests              |
| 0x82 | 2.02 | 204  | Deleted       | Answer to DELETE request               |
| 0x84 | 2.04 | 200/204 | Changed    | Answer to EXEC and UPDATE requests     |
| 0x85 | 2.05 | 200  | Content       | Answer to GET and FETCH requests       |
| 0xA0 | 4.00 | 400  | Bad Request   | |
| 0xA1 | 4.01 | 401  | Unauthorized  | Authentication needed       |
| 0xA3 | 4.03 | 403  | Forbidden     | Trying to write read-only value |
| 0xA4 | 4.04 | 404  | Not Found     | |
| 0xA5 | 4.05 | 405  | Method Not Allowed         | If e.g. DELETE is not allowed for that object |
| 0xA8 | 4.08 | 400  | Request Entity Incomplete  | |
| 0xA9 | 4.09 | 409  | Conflict                   | Configuration conflicts with other settings |
| 0xAD | 4.13 | 413  | Request Entity Too Large   | |
| 0xAF | 4.15 | 415  | Unsupported Content-Format | If trying to assign a string to an int |
| 0xC0 | 5.00 | 500  | Internal Server Error      | Generic catch-all response |
| 0xC1 | 5.01 | 501  | Not Implemented            | Request method is not supported |
| 0xC4 | 5.04 | 504  | Gateway Timeout            | Node cannot be reached through gateway |
| 0xC5 | 5.05 | 505  | Not a Gateway              | Node is not a gateway and does not support absolute paths |

Responses text mode use the colon `:` as the first byte identifier, followed by the hexadecimal response code converted into a string without the `0x` prefix. The binary mode uses the code directly as the first byte.

## Desires and Reports

Desires and reports are neither requests nor response messages, as they are sent without expecting a confirmation. Below table lists the message specifiers in text and binary mode.

| Binary mode | Text mode | Description |
|-------------|-----------|-------------|
| 0x1D        | @         | Desire      |
| 0x1F        | #         | Report      |

The overlay `_Reporting` is used to configure the device to publish certain data items on a regular basis through a defined communication channel (UART, CAN, LoRaWAN, etc.). If implemented in the firmware, the publication interval may be adjustable.

More details regarding the ThingSet protocol methods for data access will be explained in the next chapter.

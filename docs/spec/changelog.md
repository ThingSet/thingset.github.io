# Changelog

This changelog notes most important updates from one protocol version to another.

The protocol is still evolving. Until release of v1.0 even breaking changes may be introduced (even though we do our best to avoid breaking changes).

## v0.3 to v0.4

- Nomenclature changes
  - Data nodes are now called **data objects** ("node" could be confused with IoT nodes)
  - Leaf nodes containing actual data are called **data items**
  - Publication messages are called **statements**
- Statements now contain the path (necessary for better integration with MQTT)
- GET requests in binary mode do not contain any payload anymore to avoid incompatibility with CoAP and HTTP mapping. The FETCH request is used for discovery instead.
- Executable data objects are prefixed with `x-`
- Internal data objects (prefixed with `.`) are used to configure publication period, etc.
- Draft MQTT topic mapping is now part of the spec

## v0.4 to v0.5

- Data is not structured into categories like `info`, `conf` or `meas` anymore. Instead, prefixes for data items are used which define if an item is write-able, read-only, executable, stored in RAM or flash, etc. This makes the previous categories obsolete and data can be structured more logically based on features of the device.
- As data item names don't have to be globally unique anymore (e.g. there can be a measured current for the battery `Bat/rMeas_A` and the load `Load/rMeas_A`) the JSON in the statement messages needs to be nested.
- Internal data objects are now prefixed with `_` instead of `.` so that the names can still be used directly in programming languages like JavaScript.

## v0.5 to v0.6

- Paths can be absolute (starting with `/` and including the node ID) to support accessing a node behind a ThingSet gateway.
- **BREAKING change:** The node ID can now also be added to the response (text and binary mode) and the redundant status message of the text mode is replaced with an optional diagnostic payload.
- Discovery in the text mode now uses a fetch request with JSON `null` as the argument instead of a trailing `/`. This is more consistent with the binary mode and allows better mapping between the two. In addition to that it avoids confusion for `?/` requests, where it is not obvious if it's a discovery request for the root path of a node or an absolute path.
- Discovery in the binary mode now uses CBOR `null` (`0xF6`) instead of `undefined` (`0xF7`) in order to be directly compatible with the text mode. JSON has no equivalent of an `undefined` value.
- The function code for the CREATE function in binary mode is now `0x06` (mapped to CoAP PATCH) to make it clearly distinguishable from a POST request and allow unambiguous mapping to the text mode.
- A new response code C3 for "Service Unavailable" was added.
- Physical quantities (e.g. `Voltage`) must now be part of data item names and are not derived from the unit. This was necessary because a unit cannot be unambiguously mapped to a physical quantity (e.g. `Pa` can be used for a pressure as well as mechanical stress).
- Internal groups like `_Paths` (prefixed with `_`) now start with uppercase letters like all other groups.

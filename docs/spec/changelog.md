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

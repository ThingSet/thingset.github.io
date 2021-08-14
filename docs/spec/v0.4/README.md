# ThingSet v0.4 Specification

::: warning
This is the new **v0.4 specification** with the following most important updates compared to v0.3:

- Nomenclature changes
  - Data nodes are now called **data objects** ("node" could be confused with IoT nodes)
  - Leaf nodes containing actual data are called **data items**
  - Publication messages are called **statements**
- Statements now contain the path (necessary for better integration with MQTT)
- GET requests in binary mode do not contain any payload anymore to avoid incompatibility with CoAP and HTTP mapping. The FETCH request is used for discovery instead.
- Executable data objects are prefixed with `x-`
- Internal data objects (prefixed with `.`) are used to configure publication period, etc.
- Draft MQTT topic mapping is now part of the spec

Previous versions as used by older firmware can be found in the history at the top right corner.
:::

---
title: "CoAP"
---

# ThingSet to CoAP mapping

::: warning
This part of the protocol specification is still work in progress.
:::

## Key concepts

ThingSet uses only a subset of CoAPs features in order to make it more simple and compact:

- Mapping to CoAP message types:
    - ThingSet requests and responses are always CON
    - The ACK response should also contain data (piggybacked responses)
    - ThingSet reports are NON
    - RST needed? probably not...
- No message IDs: Synchronous communication necessary
- PUT request is not used.
- [Caching](https://www.rfc-editor.org/rfc/rfc7252#section-5.6.1) is not supported: Every response must explicitly set the Max-Age parameter to 0.

The binary function codes of ThingSet are the same as CoAP method codes. The status codes are also aligned, but contain an offset as explained before.

The content format of the message payload determines whether ThingSet text mode (application/json) or binary mode (application/cbor) is used.

## Node as server

This is the original way how CoAP was designed. The device provides resources which can be requested by a client. However, as this requires knowledge about the device's IP address and does not work well behind routers and firewalls, many applications use CoAP the other way round. LwM2M for example lets the device connect to the cloud first to make it known, afterwards it acts a server.

ThingSet node IDs and IP addresses of CoAP nodes have to be mapped by a ThingSet gateway, so that the node ID is not required in the CoAP message for addressing a node and only relative paths are used.

The relative path of the ThingSet request is encoded in one or multiple Uri-Path options.

For the binary mode with CBOR format, the data object ID can be encoded in a numeric Uri-Path option.

The native CoAP observe features can be used for reports. The groups or subsets that can be observed must be determined from the `_Reporting` path.

**ToDo:** Register thingset+json and thingset+cbor content-formats in [CoAP Content-Formats registry](https://www.iana.org/assignments/core-parameters/core-parameters.xhtml#content-formats)

## Node as client

In contrast to above method where the data is pulled from the node, the data can also be pushed to the cloud by the node. This method is suitable for asynchronous communication.

Reports are pushed to the following cloud endpoint:

    Method: POST
    Path: /rpt/{node-id}/{object-path}

The node can poll the following cloud endpoint to receive desires:

    Method: GET or observe
    Path: /des/{node-id}

The content of the desire must contain the aggregated data of all desires. It is not possible to provide incremental updates to the data.

Note: A node cannot be solely identified via DTLS PSK (allowing to use generic paths without the node ID) because this would not allow gateways to upload data for different nodes.

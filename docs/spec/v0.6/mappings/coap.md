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
    - ThingSet requests are always CON
    - Only publication messages are NON
    - No dedicated ACK, the response must also contain data (only piggybacked responses)
    - RST needed? probably not...
- No message IDs: Synchronous communication necessary
- PUT request is not used.

The binary function codes of ThingSet are the same as CoAP method codes. The status codes are also aligned, but contain an offset as explained before.

## Device as server

This is the original way how CoAP was designed. The device provides resources which can be requested by a client. However, as this requires knowledge about the device's IP address and does not work well behind routers and firewalls, many applications use CoAP the other way round. LwM2M for example lets the device connect to the cloud first to make it known, afterwards it acts a server.

Independent of the method how the connection is established, the data in the device can be accessed using the following Uri-Path option:

    Uri-Path option: /{device-id}/{object-path}

It is assumed that the device is a gateway and has access to multiple down-stream nodes. If the device only contains a single node, the `~` character can be used instead of the device ID to point at the device itself.

Omitting the Uri-Path option is the same as specifying `/~` and the request goes to the device itself.

The native CoAP observe features can be used to get notifications of changed subsets or groups.

If the object path is numeric, the binary mode with CBOR format is assumed and the number corresponds to the data object ID.

**ToDo:** Request thingset+json and thingset+cbor content-formats in [CoAP Content-Formats registry](https://www.iana.org/assignments/core-parameters/core-parameters.xhtml#content-formats)

## Device as client

In contrast to above method where the data is pulled from the device, the data can also be pushed from the device to the cloud.

Data from the device is pushed to the following cloud endpoint (using PATCH method):

    Uri-Path option: /{device-id}/_report/{object-path}

The device can poll the following cloud endpoint (using GET method) to receive data.

    Uri-Path option: /{device-id}/_desire

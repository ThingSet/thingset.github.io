---
title: "HTTP"
---

# ThingSet to HTTP mapping

::: warning
This part of the protocol specification is still work in progress.
:::

## Key concepts

ThingSet is developed for point-to-point connections or small local networks, but the protocol functions were developed such that they can be easily integrated into larger networks or the internet using an HTTP gateway.

Many web applications interact using JSON APIs (sometimes in a RESTful way), so the compatibility with JSON web APIs is an important feature of the ThingSet protocol.

In order to reduce the complexity of the protocol, the features offered by HTTP were reduced:

- Convention over configuration
    - Only two content-types JSON and CBOR are supported. They are detected automatically and no content-type header is needed.
    - Predefined URI layout matching the data structure.
    - Unit of data objects stored in the name (key) of a map, so the required amount of nesting in the JSON data structure is limited to categories only.

The response codes of ThingSet are aligned with CoAP and thus also allow a simple translation to HTTP. The main difference is that HTTP doesn't allow to indicate successful requests as fine-grained as CoAP, so the status will be mostly 200 OK or 204 No Content.

## URL layout

### Gateways (local access)

Gateways provide local HTTP access to multiple devices connected to it via other lower layer protocols like CAN or serial.

The ThingSet HTTP API is prefixed only with a `ts/`. In order to keep the URL short, no additional API version is included in the path. If the API should change in the future, a version can be added e.g. with `ts2`.

    http(s)://{gateway-host-or-ip}/ts/{device-id}/{object-path}

In contrast to MQTT topics, no user name is included in the URL because the gateway provides access to local devices of a single user only. Authentication and access control should be handled by the HTTP protocol.

### Internet services

Internet services that provide access to ThingSet devices may use the same API as above. However, changes of the URL schema to allow multiple users / tenants may be required in the future.

## Data processing

### HTTP via CAN

```
Dev     CAN:txt     GW   HTTP:txt   Web App
 |                  |                  |
 |                  |   req objects    |
 |   req objects    | <--------------- |
 | <--------------- |                  |
 |   resp objects   |                  |
 | ---------------> |   resp objects   |
 |                  | ---------------> |
```

### HTTP via Serial

```
Dev    UART:txt     GW   HTTP:txt   Web App
 |                  |                  |
 |                  |   req objects    |
 |   req objects    | <--------------- |
 | <--------------- |                  |
 |   resp objects   |                  |
 | ---------------> |   resp objects   |
 |                  | ---------------> |
```

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

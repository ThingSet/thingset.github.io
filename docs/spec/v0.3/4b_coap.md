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
- PUT request is not supported. Use POST to create a resource and iPATCH to update it.
- PATCH requests are always idempotent, i.e. only iPATCH is supported

The binary function codes of ThingSet are the same as CoAP method codes. The status codes are also aligned, but contain an offset as explained before.

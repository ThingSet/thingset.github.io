---
title: "MQTT"
---

# ThingSet to MQTT mapping

The MQTT protocol doesn't support the request/response part of the ThingSet protocol, but the publish/subscribe messaging pattern can be easily mapped.

## Publication

The topic used to publish to the MQTT server may contain the path of the data nodes. The topic name itself could be stored as a data node, but it's not relevant to the implementation of publication messages in the ThingSet protocool.

A ThingSet publication message starts with a first byte 0x1F in binary mode or "# " in text mode to indicate a publication message. Whether this byte is also stored in the MQTT topic depends on the application.

If a single measurement value is stored in an MQTT topic (e.g. /devices/device-id/Bat_V for the battery voltage), it is recommended that only the JSON or CBOR payload data is stored in the MQTT payload and the path of the ThingSet endpoint is contained in the topic.

If multiple data nodes are stored in the same topic, the entire ThingSet publication message could be stored to allow direct passing between MQTT topic and ThingSet.

## Subscription

Content fetched from a specific topic is forwarded to the ThingSet protocol as a publication message. The ThingSet device will parse the incoming data similar to a PATCH request. Unknown data nodes contained in the subscribed payload are silently ignored.

If the application requires some processing of incoming data before applying them to actual nodes, temporary data nodes can be created where the subscribed content is written to. Afterwards a function is called (assigned as a callback to the sub channel node) to process the incoming data and pass it on to the actual nodes.

This approach can also be used to determine if the received data has changed compared to already existing state and avoid too many storage operations in EEPROM for regularly published messages.

---
title: "MQTT"
---

# ThingSet to MQTT mapping

::: warning
The MQTT mapping is still work-in-progress and may change in the future.
:::

This chapter specifies a topic layout that supports the publish/subscribe as well as the request/response feature of ThingSet.

Typically, a gateway would be used to translate the messages between the node (connected via CAN or serial) and the MQTT broker.

## General thoughts

The basic MQTT topic layout for ThingSet follows the below structure:

    {message-type}/{node-id}/{details}

The first part of the topic indicates the message type (request, response, desire or report) and mode (text or binary). As MQTT does not allow to specify a content format, the format has to be encoded in the topic.

The second part contains the node ID, followed by further details depending on the message type.

This layout allows to easily grant access rights for individual nodes e.g. with following wild card:

    +/{node-id}/#

A Gateway that translates MQTT messages for multiple devices (e.g. connected via CAN) has to subscribe to the downlink message topics for each individual connected node.

::: tip Background information

Many MQTT services for IoT don't behave like actual MQTT brokers, but use MQTT only as an API (AWS IoT, Azure IoT, [Eclipse Hono](https://www.eclipse.org/hono/docs/user-guide/mqtt-adapter/), ThingsBoard). This allows to omit the device ID in the MQTT topic and determine the device based on the MQTT Client ID.

ThingSet supports standard MQTT brokers and thus stores the device ID in the topic. The device ID is also necessary for Gateways.

A user name is not part of the topic, as device claiming is usually part of the cloud backend and user information may not be stored in the device.

:::

## Reports and desires

### Reports

Messages in text mode are published to the `rpt` path and the payload format must be the valid JSON data extracted from a ThingSet report.

**JSON name:value map, QoS 0/1**

    rpt/{node-id}/{group}

Messages can also be published directly in the binary format to the `r` path if the device does not support the text mode.

Binary messages can either be published as a map or with IDs and values in a separate topic.

**CBOR id:value map, QoS 0/1**

    r/{node-id}/m/{group-id}

**CBOR ids, retained flag, QoS 1**

    r/{node-id}/i/{group-id}

**CBOR values, QoS 0**

    r/{node-id}/v/{group-id}

The text mode is the preferred way for MQTT communication if supported by the device or gateway.

A cloud service might subscribe to the CBOR topics and convert them into the JSON topic automatically so that they can be further processed by other services.

The link to extended device data information will be published to the topic:

    rpt/{node-id}/cMetadataURL

If the binary mode is used with separated IDs and values, the IDs should be published with QoS 1 and the retained flag in order to make sure they are always available and matching the values that are sent to the `/v/` topic.

Only static information as parts of attribute subsets may use the retained flag. Other data should not set the retained flag, as the data gets outdated quickly.

### Desires

Desires are published by the application with QoS 1 and the retained flag set.

The nodes must connect to the broker with a clean session (note: retained messages are also kept when connecting with clean session). This avoids that outdated desires are received. Same as for CoAP, the desires must contain all requested updates to the data in the device and not only an incremental update to the data.

**JSON name:value map**

    des/{node-id}/{group-name}

**CBOR id:value map**

    d/{node-id}/m/{group-id}

**CBOR ids**

    d/{node-id}/i/{group-id}

**CBOR values**

    d/{node-id}/v/{group-id}

## Request / response

For the request / response messaging mode the response has to be matched with the request. For this reason, the request is stored in a topic with an appended request ID chosen by the requesting device. The response will be stored in a topic containing the same ID.

**Requests (JSON or CBOR)**

    req/{node-id}/{cmd-id}

**Response (JSON or CBOR, same as request)**

    rsp/{node-id}/{cmd-id}

The above topics contain the entire ThingSet request or response. Hence, both binary or text mode can be used with the same topic.

## Connectivity status

::: warning
This is a first idea for an approach to store connectivity information. Expect changes in the future.

See also [here](http://www.steves-internet-guide.com/checking-active-mqtt-client-connections/) for further ideas.
:::

The following topic is used to store device connectivity status:

    rpt/{node-id}/$conn

1. Client connects and sends 1 to above topic.
2. Client sends last will and testament (LWT) with content 0 for that topic.
3. On normal disconnect, client sends 0 before disconnecting.

All messages should be retained.

**Idea:** Use this topic to tell that client is intermittent / async by design (e.g. in case of LoRaWAN).

## Incompatibilities

AWS is [not MQTT compliant](https://www.hivemq.com/blog/hivemq-cloud-vs-aws-iot/). Handling of retained messages is wrong. According to MQTT standard, subscribing to a retained topic via wild-cards would deliver the mesage. [In AWS this is not supported](https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html#mqtt-retain).

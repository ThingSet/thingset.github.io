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

The first part of the topic indicates the message type (request, response, desire or report) and mode (text or binary).

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

Messages in text mode are published to the `report` path and the payload format must be the valid JSON data extracted from a ThingSet report.

**JSON name:value map, QoS 0/1**

    report/{node-id}/{group}

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

The link to extended device data information will be published to a special topic:

    report/{node-id}/cMetadataURL

If the binary mode is used with separated IDs and values, the IDs should be published with QoS 1 and the retained flag in order to make sure they are always available and matching the values that are sent to the `/v/` topic.

If possible, static data like firmware version should only be published once after startup (e.g. as part of a dedicated subset for static data) and may use the retained flag aswell.

A gateway does not know which messages should have the retained flag, so the retained flags may only be suitable for cloud to device communication.

### Desires

**JSON name:value map**

    desire/{node-id}/{group-name}

**CBOR id:value map**

    d/{node-id}/m/{group-id}

**CBOR ids**

    d/{node-id}/i/{group-id}

**CBOR values**

    d/{node-id}/v/{group-id}

## Request / response

For the request / response messaging mode the response has to be matched with the request. For this reason, the request is stored in a topic with an appended request ID chosen by the requesting device. The response will be stored in a topic containing the same ID.

**Requests (JSON or CBOR)**

    req/{node-id}/{req-id}

**Response (JSON or CBOR, same as request)**

    res/{node-id}/{req-id}

The above topics contain the entire ThingSet request or response. Hence, both binary or text mode can be used with the same topic.

## Data Processing

The following diagrams explain the data flow between a device and an MQTT broker.

In case of LoRaWAN or CAN where the binary mode with IDs is used, an agent may be installed which subscribes to the binary messages and translates them to the JSON messages which are later on consumed by a higher-level application.

This translation can also be done on a local gateway.

The mapping of IDs and names can either be retrieved from the device (e.g. via request/response for a device connected via CAN) or it can be stored in a `.json` file on a server which contains extended information. The detailed specification of this file is still work in progress.

### Device to Broker

#### MQTT direct (low bandwidth, with agent)

- e.g. 2G with global SIM card and very low data rate
- ID mapping by data agent

```
Dev       MQTT:bin     Agent       MQTT:txt     Broker
 |                       |                        |
 |                       |                        |
 |     ids (QoS 1)       |                        |
 | --------------------> |                        |
 |    values (QoS 0)     |                        |
 | --------------------> |    objects (QoS 0)     |
 |                       | ---------------------> |
 |                       |                        |
 |         ...           |                        |
 |                       |                        |
 |    values (QoS 0)     |                        |
 | --------------------> |    objects (QoS 0)     |
 |                       | ---------------------> |
```

#### MQTT direct (sufficient bandwidth)

- e.g. LTE with local SIM card

```
Dev       MQTT:txt     Broker
 |                        |
 |    objects (QoS 0)     |
 | ---------------------> |
```

#### Serial

```
Dev    UART:txt    GW    MQTT:txt   Broker
 |                 |                  |
 |     objects     |                  |
 | --------------> |      objects     |
 |                 | ---------------> |
```

#### CAN (smart gateway)

- ID mapping and translation between binary and text mode on gateway
- Preferred way

```
Dev     CAN:bin       GW       MQTT:txt       Broker
 |                    |                         |
 |      values        |                         |
 | -----------------> |                         |
 |   req/resp names   |                         |
 | <----------------> |    objects (QoS 0)      |
 |                    | ----------------------> |
 |         ...        |                         |
 |                    |                         |
 |      values        |                         |
 | -----------------> |    objects (QoS 0)      |
 |                    | ----------------------> |
```

#### CAN (with data agent)

- ID mapping by data agent

```
Dev     CAN:bin      GW       MQTT:bin       Agent       MQTT:txt     Broker
 |                   |                         |                        |
 |      values       |                         |                        |
 | ----------------> |                         |                        |
 |   req/resp ids    |                         |                        |
 | <---------------> |     ids (QoS 1)         |                        |
 |                   | ----------------------> |                        |
 |                   |    values (QoS 0)       |                        |
 |                   | ----------------------> |    objects (QoS 0)     |
 |                   |                         | ---------------------> |
 |        ...        |                         |                        |
 |                   |                         |                        |
 |      values       |                         |                        |
 | ----------------> |    values (QoS 0)       |                        |
 |                   | ----------------------> |    objects (QoS 0)     |
 |                   |                         | ---------------------> |
```

#### LoRaWAN (smart gateway)

- ID mapping on gateway

```
Dev   LoRaWAN:bin      GW       MQTT:txt      Broker
 |                     |                        |
 |     ids (ACK-ed)    |                        |
 | ------------------> |                        |
 |       values        |                        |
 | ------------------> |    objects (QoS 0)     |
 |                     | ---------------------> |
 |        ...          |                        |
 |                     |                        |
 |       values        |                        |
 | ------------------> |    objects (QoS 0)     |
 |                     | ---------------------> |
```

#### LoRaWAN (with data agent)

- Simple forwarding of messages by gateway
- ID mapping by data agent or statically via TTN payload formatter
- Probably preferred way in order to be able to use standard TTN gateways

```
Dev   LoRaWAN:bin      GW       MQTT:bin     Agent       MQTT:txt     Broker
 |                     |                       |                        |
 |     ids (ACK-ed)    |                       |                        |
 | ------------------> |     ids (QoS 1)       |                        |
 |       values        | --------------------> |                        |
 | ------------------> |    values (QoS 0)     |                        |
 |                     | --------------------> |    objects (QoS 0)     |
 |                     |                       | ---------------------> |
 |        ...          |                       |                        |
 |                     |                       |                        |
 |       values        |                       |                        |
 | ------------------> |    values (QoS 0)     |                        |
 |                     | --------------------> |    objects (QoS 0)     |
 |                     |                       | ---------------------> |
```

### Broker to Device

#### Serial

```
Dev    UART:txt     GW   MQTT:txt    Broker
 |                  |                  |
 |                  |      objects     |
 |      objects     | <--------------- |
 | <--------------- |                  |
```

#### CAN (direct)

- No mapping of IDs needed, as incoming reports are sent via ISO-TP and can have almost arbitrary length.

```
Dev     CAN:txt      GW       MQTT:txt       Broker
 |                   |                         |
 |                   |      objects (QoS 0)    |
 |      objects      | <---------------------- |
 | <---------------- |                         |
```

#### LoRaWAN (direct)

- ID mapping on gateway

```
Dev   LoRaWAN:bin      GW       MQTT:txt      Broker
 |                     |                        |
 |    ids (ACK-ed)     |                        |
 | ------------------> |                        |
 |                     |                        |
 |        ...          |                        |
 |                     |                        |
 |                     |     objects (QoS 0)    |
 |       values        | <--------------------- |
 | <------------------ |                        |
```

#### LoRaWAN (with data agent)

- Simple forwarding of messages by gateway
- ID mapping by data agent or statically via TTN payload formatter
- Probably preferred way in order to be able to use standard TTN gateways

```
Dev   LoRaWAN:bin      GW       MQTT:bin     Agent       MQTT:txt     Broker
 |                     |                       |                        |
 |    ids (ACK-ed)     |                       |                        |
 | ------------------> |     ids (QoS 1)       |                        |
 |       values        | --------------------> |                        |
 | ------------------> |    values (QoS 0)     |                        |
 |                     | --------------------> |    objects (QoS 0)     |
 |                     |                       | ---------------------> |
 |        ...          |                       |                        |
 |                     |                       |                        |
 |       values        |                       |                        |
 | ------------------> |    values (QoS 0)     |                        |
 |                     | --------------------> |    objects (QoS 0)     |
 |                     |                       | ---------------------> |
```

### Broker to Device (requests)

ToDo

## Special topic for connectivity status

::: warning
This is a first idea for an approach to store connectivity information. Expect changes in the future.

See also [here](http://www.steves-internet-guide.com/checking-active-mqtt-client-connections/) for further ideas.
:::

The following topic is used to store device connectivity status:

    report/{node-id}/$conn

1. Client connects and sends 1 to above topic.
2. Client sends last will and testament (LWT) with content 0 for that topic.
3. On normal disconnect, client sends 0 before disconnecting.

All messages should be retained.

**Idea:** Use this topic to tell that client is intermittent / async by design (e.g. in case of LoRaWAN).

## Provider Incompatibilities

AWS is not MQTT compliant:

https://www.hivemq.com/blog/hivemq-cloud-vs-aws-iot/

Handling of retained messages is wrong. According to MQTT standard, subscribing to a retained topic via wild-cards would deliver the mesage. In AWS it doesn't.

https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html#mqtt-retain

## References

[1] [Designing MQTT Topics for AWS IoT Core](https://d1.awsstatic.com/whitepapers/Designing_MQTT_Topics_for_AWS_IoT_Core.pdf)

[2] https://pi3g.com/2019/05/29/mqtt-topic-tree-design-best-practices-tips-examples/


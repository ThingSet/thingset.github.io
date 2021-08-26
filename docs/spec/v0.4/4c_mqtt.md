---
title: "MQTT"
---

# ThingSet to MQTT mapping

::: warning
The MQTT mapping is still work-in-progress and may change in the future.
:::

This chapter specifies a topic layout that supports the publish/subscribe as well as the request/response feature of ThingSet.

A gateway has to be used to translate the messages between the device (connected via CAN or serial) and the MQTT broker.

## General thoughts

MQTT topics used for ThingSet are namespaced with a `ts/` at the very beginning. This allows to use the same broker for multiple purposes and data formats. Topics are sent with every single MQTT message. In order to keep them as short as possible, no additional versioning prefix is added.

The ThingSet-specific part of the topic starts a user or tenant name and the device ID, followed by `rx` or `tx` to indicate the direction of the message. `tx` means that a message is transmitted from the device to the cloud (uplink), `rx` means that the device receives a message from the cloud (downlink).

In environments without different users or during bootstrapping of devices, `null` shall be used instead of an actual user name.

Gateway subscribes to downlink messages with using topic

    ts/{user}/+/rx/#

and publishes uplink messages to the topic

    ts/{user}/{device-id}/tx/{path}

**Remark:** For MQTT v3.1.1 it is not possible to use the same topic for uplink and downlink messages, as a device would receive its own published message if it subscribed to the topic aswell. Only MQTT v5 has a "No Local" bit to prevent getting messages from same clientID.

This topic layout allows to easily grant access rights on user or device basis, e.g. with following wild card:

    ts/{user}/{device-id}/#

## Statements

### Device to cloud

Messages in text mode are published to the `tx` path and the payload format must be the valid JSON data extracted from a ThingSet statement.

**JSON name:value map, QoS 0/1**

    ts/{user}/{device-id}/tx/{group}

Messages can also be published directly in the binary format to the `txb` topic if the device does not support the text mode.

Binary messages can either be published as a map or with IDs and values in a separate topic.

**CBOR id:value map, QoS 0/1**

    ts/{user}/{device-id}/txb/m/{group-id}

**CBOR ids, retained flag, QoS 1**

    ts/{user}/{device-id}/txb/i/{group-id}

**CBOR values, QoS 0**

    ts/{user}/{device-id}/txb/v/{group-id}

The preferred topic is `tx/{group-name}`, which should always be used if the text mode is supported by the device or gateway. This topic is also subscribed to for writing into a database.

A cloud service might subscribe to the CBOR topics and convert them into the JSON topic automatically.

The link to extended device data information will be published to a special topic:

    ts/{user}/{device-id}/tx/DataExtURL

If the binary mode is used with separated IDs and values, the IDs should be published with QoS 1 and the retained flag in order to make sure they are always available and matching the values that are sent to the `/v/` topic.

In general, static data like firmware version from the `info` group should only be published once after startup and may use the retained flag aswell.

### Cloud to device

**JSON name:value map**

    ts/{user}/{device-id}/rx/{group-name}

**CBOR id:value map**

    ts/{user}/{device-id}/rxb/m/{group-id}

**CBOR ids**

    ts/{user}/{device-id}/rxb/i/{group-id}

**CBOR values**

    ts/{user}/{device-id}/rxb/v/{group-id}

## Request / response

For the request / response messaging mode the response has to be matched with the request. For this reason, the request is stored in a topic with an appended request ID chosen by the requesting device. The response will be stored in a topic containing the same ID.

**Requests (JSON or CBOR)**

    ts/{user}/{device-id}/req/{req-id}

**Response (JSON or CBOR, same as request)**

    ts/{user}/{device-id}/res/{req-id}

The above topics contain the entire ThingSet request or response. Hence, both binary or text mode can be used with the same topic.

## Data Processing

The following diagrams explain the data flow between a device and an MQTT broker.

In case of LoRaWAN or CAN where the binary mode with IDs is used, an agent may be installed which subscribes to the binary messages and translates them to the JSON messages which are later on consumed by a higher-level application.

This translation can also be done on a local gateway.

The mapping of IDs and names can either be retrieved from the device (e.g. via request/response for a device connected via CAN) or it can be stored in a `.json` file on a server which contains extended information. The detailed specification of this file is still work in progress.

### Device to Cloud

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
Dev    UART:txt   GW   HTTP:txt   Web App
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

### Cloud to Device

#### Serial

```
Dev    UART:txt     GW   MQTT:txt   Web App
 |                  |                  |
 |                  |      objects     |
 |      objects     | <--------------- |
 | <--------------- |                  |
```

#### CAN (direct)

- No mapping of IDs needed, as incoming statements are sent via ISO-TP and can have almost arbitrary length.

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

### Cloud to Device (requests)

ToDo

## References

[1] [Designing MQTT Topics for AWS IoT Core](https://d1.awsstatic.com/whitepapers/Designing_MQTT_Topics_for_AWS_IoT_Core.pdf)

[2] https://pi3g.com/2019/05/29/mqtt-topic-tree-design-best-practices-tips-examples/


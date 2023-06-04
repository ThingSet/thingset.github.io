# Connectivity

## Network Topology

ThingSet uses a tree topology for communication between applications, gateways and nodes.

A ThingSet **node** is an entity with a globally unique ID (`pNodeID` in the data structure). A physical **device** may contain one or more ThingSet nodes.

An **application** needs to establish a **communication channel** to the node in order to exchange ThingSet messages. This channel may be established directly with the node or accross one or multiple gateways. Nodes can also autonomously establish synchronous or asynchronous communication channels with a cloud backend, which can afterwards be used by applications or for internal services in a backend.

A **gateway** translates between nodes and an application or cloud backend. It forwards data to exactly one upstream connection. Gateways may also be used to translate foreign protocols like ModBus to ThingSet.

Data from an application towards the ThingSet node is called **downlink data**. Data from nodes towards applications or gateways is called **uplink data**.

The following picture gives an overview of the different possible connections used for ThingSet with some protocols as an example.

![ThingSet Network Topology](../../images/thingset-network-topology.svg)

## Protocol Stack

As an application layer protocol, ThingSet protocol is located in the higher layers (5 to 7) of the [OSI (Open Systems Interconnection) model](https://en.wikipedia.org/wiki/OSI_model). The payload data is independent of the underlying lower layer protocol or interface such as CAN, USB, Bluetooth, UART (serial) or IP-based protocols.

The underlying layers have to ensure encryption, reliable transfer, de-duplication, correct packet order (if messages are packetized) and error-checking of the transferred data.

A major feature of the ThingSet protocol is a seamless integration with other application layer protocols such as HTTP, [CoAP](https://tools.ietf.org/html/rfc7252) and MQTT. See the Mappings section for details.

## Communication Patterns

ThingSet defines four types of messages (requests, responses, desires and reports) which can be used in a synchronous or asynchronous fashion.

### Request-response

A **request** is sent from one node (client) to a single other node (server). The server is expected to answer with a **response** containing a status code and optional payload.

The client would usually be a display, a mobile phone application or a gateway.

A connection can be established either directly (e.g. serial interface, USB, Bluetooth) or via a network or bus with several nodes attached (e.g. CAN, Ethernet, WiFi, LoRa). In case of a network, each device has to be uniquely addressable by the lower-layer protocol.

Only a single request can be processed by a node at once. If multiple applications can access a node through a server backend, it must ensure that a response was received before another request is sent to the same node. This avoids transferring a unique message ID to match request with response.

### Publish-subscribe

Data that is not intended for a specific client and that is sent out regularly (e.g. monitoring data to be stored in a database) can be exchanged using a publish-subscribe messaging pattern to increase efficiency and avoid polling. Published messages are called **reports**. Reports are not confirmed by a receving node and may be broadcast through the network such that any interested node can receive it (subscribe).

A **desire** is a message that is sent to a node without expecting a response or confirmation. It is considered a proposal to update the values as stated in the message. If all or some of the requested changes are invalid, they are silently ignored, as it is not possible to respond to a desire.

Desires can be used to establish control loops for machine-to-machine (M2M) communication by converting reports from one node into a desire sent to another node. In addition to that, desires are useful for asynchronous communication, where an application stores desired changes to the data in the backend and the message is delivered to the device once it connects to the backend again.

### Sync and async communication

The different messaging patterns request-response and publish-subscribe make the ThingSet protocol suitable for both synchronous and asynchronous communication.

Synchronous communication means that an application has a live connection (direct or through gateways) to the device, so that it can send a request and receive a response immediately.

Asynchronous communication is more suitable for devices which don't have a continuous connection, e.g. because of unreliable networks or for power saving reasons. For asynchronous communication, messages are stored (e.g. in a cloud backend) and retrieved later upon connection of the device.

All four message types may be used for synchronous and asynchronous communication. However, applications with asynchronous communication should preferably use desires and reports.

| Message type      | Sync                     | Async                        |
|-------------------|--------------------------|------------------------------|
| Request           | yes                      | with workarounds             |
| Response          | yes                      | with workarounds             |
| Desire            | yes (requests preferred) | yes                          |
| Report            | yes                      | yes                          |

An example for the workarounds to communicate with request-response messaging pattern asynchronously is the MQTT mapping for ThingSet, where requests get an ID via the topic they are published to and responses use the same ID in their topic for matching request with response.

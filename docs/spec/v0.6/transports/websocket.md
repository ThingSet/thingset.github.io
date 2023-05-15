---
title: "WebSocket"
---

# ThingSet via WebSockets

::: warning
The WebSocket transport is still work-in-progress and may change in the future.
:::

The WebSocket transport uses normal ThingSet messages as the payload for bi-directional communication.

## Application to cloud connection (client)

Used by web front-ends to get information about multiple nodes.

    ws(s)://{cloud-host}/app/

Authentication can be achieved with HTTP basic auth.

## Live connection via cloud (client)

Used by an application to establish a direct 1:1 connection to a node.

    ws(s)://{cloud-host}/app/{node-id}

Authentication can be achieved with HTTP basic auth.

Multiple clients should be able to connect to the same node. They will all receive reports. In addition to that, reports are stored in the state DB.

Requests and responses have to be multiplexed. After a request the node is locked by a mutex which is only released after the response has been received (or after a timeout).

## Node to cloud connection

Single node

    ws(s)://{cloud-host}/node/{node-id}

Gateway

    ws(s)://{cloud-host}/gw/{gateway-id}

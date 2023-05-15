# Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119.html).

### Data object

A node in a tree-like data structure identified by a name and a unique ID (comparable to a JSON object).

### Data item

A data object where the value contains actual data and no further layers of objects. It is a leaf node of the data object tree.

### Group

A category of data objects belonging together, forming the data hierarchy.

### Subset

A collection of pointers to actual data items. The data items may be in different groups.

### Request

A ThingSet message sent from a client to a ThingSet node.

### Response

The ThingSet message sent back from the node to the client that sent the request.

### Desire

A ThingSet message sent to a node with desired data updates. In contrast to a request, the node does not answer with a response and failures are silently ignored.

### Report

A ThingSet message sent out by the node in a regular interval or upon occurence of an event. The message may be broadcast to multiple receivers/subscribers and no response is sent back to the node.

### Transport

A protocol or interface that allows to establish a bi-directional communication channel to exchange ThingSet messages transparently.

### Mapping

A protocol where ThingSet messages are translated into the format required by the used protocl, e.g. by putting request, path and payload into specified headers. The mapped protocol may not support all features of ThingSet.

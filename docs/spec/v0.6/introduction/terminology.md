# Glossary

### Data object

A node in a tree-like data structure identified by a name and a unique ID (comparable to a JSON object).

### Data item

A data object where the value contains actual data and no further layers of objects. It is a leaf node of the data object tree.

### Group

A category of data objects belonging together, forming the data hierarchy.

### Subset

A collection of pointers to actual data items. The data items may be in different groups.

Subsets can be used for flexibe configuration of reporting.

### Request

A ThingSet message sent from a client to a ThingSet node.

### Response

The message sent back from the node to the client that sent the request.

### Desire

A message sent to the node with desired changes for data items. In contrast to a patch request, the node does not answer with a response.

### Report

A message sent out by the node in a regular interval or upon occurence of an event.

### Native Transports

Protocol that directly transports ThingSet requests, responses and reports.

Protocol must support all features of ThingSet and can be used for gateways.

### Mapped Transports

Transports where ThingSet messages are translated into another protocol, e.g. by putting request, path and payload into the specified headers of the used protocol.

The protocol may not support all features of ThingSet

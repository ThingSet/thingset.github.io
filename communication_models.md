# Communication Models

The different functions of the energy management system require different types of communication models.

## Request/response messaging pattern

For configuration of devices, a point-to-point communication method is needed. The device acts as a server which is connected via a network to a client. The client might be a laptop or mobile phone with a human interface application. To read data from the device or change configuration settings, the client sends requests to the device, which responds with either the data or a status message if the request could be fulfilled successfully.

The data transfer is normally synchronous. Thus, the client sends a request, waits for the response, handles the data and possibly starts with additional requests.

## Publish/subscribe messaging pattern

Monitoring data is not intended for only a single device, but could be interesting for several devices (e.g. data logger, display, human interface device, etc.). Thus, the monitoring data is exchanged via a publish/subscribe messaging pattern.

One popular pub/sub protocol is MQTT, which needs an intermediate broker to store the published messages and forward them to the subscribers.

In a CAN based network, the monitoring data is just published to the bus and each device can decide if it uses the published data or not.

As the control protocol should be master-less and plug-and-play, also the control messages follow the pub/sub messaging paradigm.

## Status of specification

In a first step, only the configuration and monitoring messages will be specified. The messages necessary for control of the system will be defined in a second step.

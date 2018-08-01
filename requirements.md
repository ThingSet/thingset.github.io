# Protocol Requirements

## Functional Requirements

The energy management protocol should enable the following three functions [see also IEA-PVPS T11-04:2011]:

### Control (fast, high priority)

- Energy management
	- Master-less operation
	- Prioritization of energy sources, sinks and storage systems
	- Synchronization and parallel operation (e.g. for distributed AC inverters)

- Protection
	- Emergency messages and error handling

### Configuration/Service (slow, medium priority)

- Calibration of internal device parameters (restricted access)
- Initial component and system set-up
- Selection of operating modes
- Adjustment of set-points and parameters
- Firmware upgrades

### Monitoring (slow, low priority)

- Providing consolidated (measurement) data on status and performance of individual components and the entire system

## General remarks

The messages responsible for the control part must be transmitted with high priority and should consume only little amount of data. So they should consist of pre-defined bit fields. Main focus is safe operation of the energy system. Transmitted data may consist of the following:

- Essential device information as a heartbeat message (type: source/sink, actual current, voltage, etc.)
- Device limitations (voltage, current, etc.)
- Critical status information (emergency, etc.)

Messages for configuration and monitoring may consume more bandwidth (with low priority) and may take longer. So they can consist of human-readable frame content (like URLs, MQTT messages etc.) to make it compatible to other (possibly internet-based) protocols.

Basic operation of each device should be possible without prior configuration of the device. To enable the plug-and-play feature, at least the following has to be handled automatically by the energy management protocol:

- Assignment of a unique ID (e.g. CAN ID or IP address) to a newly connected devices
- Retrival of the current system status and depending on the status start of operation

At least the configuration and monitoring part of the protocol should be self-describing. It should be possible to browse features of a device instead of specifying bitsets of the communication protocol. In order to reduce overhead, the fast control part of the protocol may use pre-defined, specified bitsets.

## Existing Standards

If possible, existing standards should be used as far as they are open accessible. The following chapter will give an overview about considered existing standards and similar solutions.
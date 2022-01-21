---
title: "LoRaWAN"
---

# ThingSet via LoRaWAN

::: warning
This part of the protocol specification is still work in progress.
:::

As the data rate of LoRa is very low, only the binary protocol version is supported.

The ThingSet mapping is optimized for Class A devices, which allow only a very limited amount of downlink messages from the gateway to the device. This means that a request/response model is not suitable over LoRaWAN.

Instead, the communication mainly relies on statements sent from the device to the gateway.

## Port mapping

LoRaWAN supports to specify a so-called port for each message to differentiate between different types of payload. The port can be an integer in the range of 1..223 (0x01..0xDF).

The ports are mapped to the ThingSet data object IDs and only IDs from 0x01..0x3F are used for communication via LoRaWAN.

ToDo:

Only the values are communicated regularly. The corresponding IDs for each statement are sent only once during startup to the port with ID + 0x40.

The following table gives an overview of the LoRaWAN ports as they are planned to be used for ThingSet:

| Port(s)    | Usage |
|------------|-------|
| 0x00       | Reserved for LoRaWAN MAC messages
| 0x01..0x3F | ThingSet statement key/value pairs (corresponding to ID of subset)
| 0x40       | ThingSet request/response channel
| 0x41..0x7F | ThingSet statement values (corresponding to ID of group or subset)
| 0x80       | Reserved for future use in ThingSet
| 0x81..0xBF | ThingSet statement IDs (corresponding to ID + 0x40)
| 0xC0..0xDF | Reserved for future use in ThingSet
| 0xE0..0xFF | Reserved for LoRaWAN

Remark: key/value ports are necessary so that event statements don't have to transfer also all values of that subset that didn't change.

## Open questions

- How to transfer data object names?
- How to transfer device ID?

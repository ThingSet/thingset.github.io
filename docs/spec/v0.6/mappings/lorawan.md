---
title: "LoRaWAN"
---

# ThingSet via LoRaWAN

::: warning
This part of the protocol specification is still work in progress.
:::

As the data rate of LoRa is very low, only the binary protocol version is supported.

The ThingSet mapping is optimized for Class A devices, which allow only a very limited amount of downlink messages from the gateway to the device. This means that a request/response model is not suitable over LoRaWAN.

Instead, the communication mainly relies on reports sent from the device to the gateway.

## DevEUI as Node ID

All LoRaWAN participants use a unique DevEUI. The same EUI-64 must also be used as the `pNodeID` for ThingSet (encoded as upper-case hex string) so that it can be avoided to transfer an additional ThingSet node ID.

## Port mapping

LoRaWAN supports to specify a port for each message to differentiate between different types of payload. The port can be an integer in the range of 1..223 (0x01..0xDF).

The ports are mapped to the ThingSet data object IDs and only IDs from 0x01..0x3F are used for communication via LoRaWAN.

It is recommended to communicate only the values regularly and send corresponding IDs for each report only once during startup (port with ID + 0x40).

The following table gives an overview of the LoRaWAN ports as they are planned to be used for ThingSet:

| Port(s)    | Usage |
|------------|-------|
| 0x00       | Reserved for LoRaWAN MAC messages
| 0x01..0x3F | ThingSet report values (corresponding to ID of group or subset)
| 0x40       | Reserved for future use in ThingSet
| 0x41..0x7F | ThingSet report IDs (corresponding to ID + 0x40)
| 0x80..0xBF | ThingSet report/desire key/value pairs (corresponding to ID + 0x80)
| 0xC0..0xC7 | ThingSet request/response channels
| 0xC8..0xDF | Recommended for LoRaWAN FUOTA services
| 0xE0..0xFF | Reserved for LoRaWAN

Ports above `0x80` with key/value payload can be used to simplify the implementation if payload size is not too critical. Key/value ports sohould also be used for events where only changed values and not all values of a subset should be reported.

Desires are always sent with key and value.

Numeric IDs are suggested as the keys for the data. The data object names should be determined from the `cMetadataURL` document by the backend.

[JavaScript CBOR payload decoder](https://lupyuen.github.io/articles/payload).

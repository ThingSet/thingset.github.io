---
title: "BLE"
---

# Bluetooth Low-Energy

Bluetooth Low-Energy (BLE) is designed to transfer only relatively small amounts of data per message.

The GATT profile allows to define so-called characteristics, which are similar to a single data object in ThingSet. However, the characteristics have to be pre-defined using UUIDs and their semantics have to be known by both the device and the host. Mapping each data object to a characteristic would undermine the flexibility and discoverability of the ThingSet protocol.

Instead of defining characteristics for every data objects, one single service with two GATT characteristics is used to transfer ThingSet protocol data in a bi-directional way.

## Packetization

Long attribute values (ATT) can have a length of max. 512 bytes (see Core Spec v5.3, Section 3.2.9).

A single LinkLayer packet can have max. 251 bytes of data (LE Data Packet Length Extension, BT v4.2, see also [here](https://punchthrough.com/maximizing-ble-throughput-part-3-data-length-extension-dle-2/)). This results in 244 bytes of payload.

Above packet size (which is even lower on older phones) is not considered sufficient for ThingSet, so the messages have to be split into multiple packets and afterwards be re-assembled by the receiver.

For ThingSet, all packets exchanged over BLE are considered a continuous stream of bytes, similar to a serial interface. The SLIP protocol according to [RFC 1055](https://datatracker.ietf.org/doc/html/rfc1055) is used to distinguish single frames inside the data stream. See also [this excellent blog post](https://www.maibornwolff.de/en/blog/talk-coap-me-iot-over-bluetooth-low-energy) regarding a similar approach for CoAP over BLE.

Existing BLE stacks e.g. in Android are implemented such that the order of messages is maintained, which avoids requiring an any packet counter. The BLE LL provides reliable transport for notifications. Indications are not used, as the ACK of indications provides little to no benefit (see [here](https://stackoverflow.com/questions/36075763/ble-indications))

## BLE Service

The following UUIDs are used for the ThingSet BLE service and the two request and response characteristics:

```javascript
const UUID_THINGSET_SERVICE =  "00000001-5a19-4887-9c6a-14ad27bfc06d";
const UUID_THINGSET_REQUEST =  "00000002-5a19-4887-9c6a-14ad27bfc06d";
const UUID_THINGSET_RESPONSE = "00000003-5a19-4887-9c6a-14ad27bfc06d";
```

The request characteristic is used to send ThingSet requests from the central device to the peripheral. The peripheral uses the response characteristic to send notifications back to the central device.

The response characteristic is also used to send send ThingSet statements autonomously from peripheral to central.

## Example

For the following example, non-readable characters are displayed as their hex value wrapped in angular brackets, e.g. `<0C>`.

The following characters are used for SLIP:

| Name          | Value  |
|---------------|--------|
| SLIP_END      | `<C0>` |
| SLIP_ESC      | `<DB>` |
| SLIP_ESC_END  | `<DC>` |
| SLIP_ESC_ESC  | `<DD>` |

A SLIP_END character is also added to the beginning of each message to have a defined start after interrupted streams.

ThingSet request from BLE central to peripheral (short message, fits into a single packet):

    <C0>?Bat<C0>                                # packet 1

Response via notification from peripheral to central (message split into multiple packets, assuming 20 bytes maximum payload length):

    <C0>:85 Content. {"rMe                      # packet 1
    as_V":12.9,"rMeas_                          # packet 2
    A":-3.14,"sTarget_                          # packet 3
    V":14.4}<C0>                                # packet 4

Re-assembled response: `:85 Content. {"rMeas_V":12.9,"rMeas_A":-3.14,"sTarget_V":14.4}`

As ASCII strings (like usual ThingSet text-mode messages) never contain the `SLIP_END` character, no escaping is necessary in this example. It has to be implemented for the binary mode, though.

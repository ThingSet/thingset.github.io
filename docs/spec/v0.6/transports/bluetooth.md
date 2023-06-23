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

For ThingSet, all packets exchanged over BLE are considered a continuous stream of bytes, similar to a serial interface. A packetization mechanism similar to [RFC 1055](https://datatracker.ietf.org/doc/html/rfc1055) is used to distinguish single frames inside the data stream.

Each packet ends with a line-feed character (`0x0A`), which is never part of any ThingSet message in text mode andyway. Carriage-return characters (`0x0D`) characters are skipped in the stream so that a text file could be interpreted as a sequence of ThingSet messages independent of the line ending used, allowing to store and batch-process ThingSet messages easily.

If one of the above characters is part of an actual binary message, it is replaced with the escape character `0xCE`, followed by a special character depending on the represented character to be escaped (see table below). The escape characters were chosen such that they are not used for a ThingSet response code and not part of usual CBOR encoding (they are used for currently unassigned tags). This reduces the probability to need escaping.

An additional line-feed character may also be used at the start of a new packet to have a defined start after interrupted streams. This would lead to an empty packet, which must be ignored.

Existing BLE stacks e.g. in Android are implemented such that the order of messages is maintained, which avoids requiring an any packet counter. The BLE LL provides reliable transport for notifications. Indications are not used, as the ACK of indications provides little to no benefit (see [here](https://stackoverflow.com/questions/36075763/ble-indications))

## BLE Service

The following UUIDs are used for the ThingSet BLE service and the two request and response characteristics:

```javascript
const UUID_THINGSET_SERVICE  = "00000001-5423-4887-9c6a-14ad27bfc06d";
const UUID_THINGSET_DOWNLINK = "00000002-5423-4887-9c6a-14ad27bfc06d";
const UUID_THINGSET_UPLINK   = "00000003-5423-4887-9c6a-14ad27bfc06d";
```

The downlink characteristic is used to send ThingSet requests or desires from the central device to the peripheral. The peripheral uses the uplink characteristic to send notifications with responses or reports back to the central device.

## Example

For the following example, non-readable characters are displayed as their hex value wrapped in angular brackets, e.g. `<0A>`.

The following characters are used for SLIP:

| Name         | Value  |
|--------------|--------|
| MSG_END      | `<0A>` |
| MSG_SKIP     | `<0D>` |
| MSG_ESC      | `<CE>` |
| MSG_ESC_END  | `<CA>` |
| MSG_ESC_SKIP | `<CD>` |
| MSG_ESC_ESC  | `<CF>` |

ThingSet request from BLE central to peripheral (short message, fits into a single packet):

    ?Bat<0A>                                    # packet 1

The same message including an optional `MSG_END` character at the beginning of the message:

    <0A>?Bat<0A>                                # packet 1

Response via notification from peripheral to central (message split into multiple packets, assuming 20 bytes maximum payload length):

    :85 {"rMeas_V":12.9,                        # packet 1
    "rMeas_A":-3.14,"sTa                        # packet 2
    rget_V":14.4}<0A>                           # packet 3

Re-assembled response: `:85 {"rMeas_V":12.9,"rMeas_A":-3.14,"sTarget_V":14.4}`

As ASCII strings (like usual ThingSet text-mode messages) never contain the `MSG_END` character within the message, no escaping is necessary in this example. It has to be implemented for the binary mode, though.

A binary report containing the number 13, which is encoded as `0x0D` would look like this:

    <1F><00><A1><18><40><CE><CD><0A>            # packet 1

The un-escaped final message is as follows:

    1F
       00                                   # CBOR uint: 0x00 (root ID)
       A1                                   # CBOR map (1 elements)
          18 40                             # CBOR uint: 0x40 (object ID)
          0D                                # CBOR uint: 13

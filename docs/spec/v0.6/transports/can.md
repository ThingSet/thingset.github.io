---
title: "CAN"
---

# CAN Transport and Network Layer

::: warning
The CAN bus part of the ThingSet protocol is still in an early stage and may change in the future.
:::

This specification defines layer 3 (Network) and 4 (Transport) of the ThingSet Protocol via CAN bus. Layer 1 and 2 are provided by the CAN bus itself.

## General features

- Master-less operation
- Automatic node ID assignment without central instance
- Efficient useage of CAN ID and data bytes
- Transport protocol to allow payload of more than 8 bytes
- RTR frame is not allowed
- Fixed bitrate of 500 kbit/s

### CAN identifier layout

In the CAN bus, the identifier part of the CAN frame is used for arbitration and identification of the message type. Typically, it does not define the sender or receiver of the message, but the content of the message.

For a network with connected ThingSet devices, the layout of the CAN identifier is similar to the SAE J1939 specification. Parts of the identifier define the source and destination address of the message. In addition to that, the first three bits are used to prioritize the messages.

The node address can be in the range of `0x00` to `0xFD` (253). Node addresses `0xFE` and `0xFF` are reserved for network management purposes (see below).

| Bits | 28 .. 26 | 25 .. 24 |    23 .. 16   |    15 .. 8    |     7 .. 0     |
|------|:--------:|:--------:|:-------------:|:-------------:|:--------------:|
|      | Priority |   Type   | Variable byte | Variable byte | Source address |

There are four different message types defined for ThingSet:

- `0x0`: [Service message (request/response)](#request-response)
- `0x1`: [Packetized publication message (publish/subscribe)](#publish-subscribe)
- `0x2`: [Publication message (publish/subscribe)](#publish-subscribe)
- `0x3`: [Network management message](#network-management)

The variable bytes have a different meaning depending on the message type.

It may be possible to run ThingSet messages on the same bus with SAE J1939 (using type `0x0`) or NMEA2000 (using type `0x1`) if device addresses are chosen carefully. However, ThingSet is not meant to be compatible with mentioned protocols.

Only CAN extended IDs with a size of 29 bit are used, so it should be possible to use ThingSet together with protocols using standard IDs (e.g. CANopen) on the same bus.

## Request/response

A service message can be identified by the type bits 25-24 both set to 0. A single byte each for source and destination node address are defined as part of the CAN ID to identify sender and receiver of the message.

A service message can be routed to different physical buses by a gateway. The bus number is also encoded as part of the CAN ID.

### CAN identifier layout

The service message addressing in 29-bit CAN ID is similar to SAE J1939:

| Bits |     28 .. 26    |   25 .. 24  |    23 .. 16     |   15 .. 8      |   7 .. 0       |
|------|:---------------:|:-----------:|:---------------:|:--------------:|:--------------:|
|      | Priority: `0x6` | Type: `0x0` |   Bus number    | Target address | Source address |

- Priority (28-26): Defines the importance of the message. For service messages, only priority 6 is valid.
- Type (25-24): 0x0 for request/response message
- Bus number (23-16): Default for single bus systems is `0xDA` (218) as suggested by ISO-TP standard (ISO 15765-2) for normal fixed addressing with N_TAtype = physical
- Target address (15-8): Destination node address (`0x00` to `0xFD`)
- Source address (7-0): Source node address (`0x00` to `0xFD`)

### Transport protocol (ISO 15765-2)

In order to transfer data with a length of more than 8 bytes, the transfer protocol specified in [ISO 15765-2 (ISO-TP)](https://en.wikipedia.org/wiki/ISO_15765-2) is used.

It allows a maximum number of 4095 data bytes (defined by 12 bit unsigned int length code in first frame). Flow control mechanisms ensure the reliability of data reception.

As a very important feature, ISO-TP allows the efficient transfer of single-frame messages with only one byte of overhead (and no flow control packets). This feature is necessary, as it is not known in advance if a certain function of the ThingSet protocol will transfer only a few bytes or a large amount of data.

The ISO-TP standard is not accessible for free. However, several open source implementations (including [SocketCAN for Linux](https://github.com/hartkopp/can-isotp)) of the ISO-TP are available. Most important information about the frame layout can be found on [Wikipedia](https://en.wikipedia.org/wiki/ISO_15765-2).

#### Single-frame message request/response

Application protocol data of 7 bytes or lower can be transferred using a single CAN frame. The first byte of the CAN data contains the ISO-TP header for a single-frame message. Bytes 2 to n (with n <= 7) are contained in the remaining data bytes of the CAN frame.

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th>
</tr></thead><tbody><tr>
	<td>ISO-TP header</td>
    <td>Application protocol (byte 1)</td>
	<td>...</td>
    <td>Application protocol (byte 7)</td>
</tr></tbody></table>

#### Multi-frame message request/response

More than 7 bytes of application protocol data are sent as multi-frame messages.

The first message contains two bytes for the ISO-TP header (including the total message length).

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>...</th><th>Byte 8</th>
</tr></thead><tbody><tr>
	<td colspan="2">ISO-TP header</td>
    <td>Application protocol (byte 1)</td>
	<td>...</td>
    <td>Application protocol (byte 6)</td>
</tr></tbody></table>

Consecutive messages i = 2...585 consume only one byte for the ISO-TP header:

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th>
</tr></thead><tbody><tr>
	<td>ISO-TP header</td>
    <td>Application protocol (byte (i-1)*7)</td>
	<td>...</td>
    <td>Application protocol (byte i*7-1)</td>
</tr></tbody></table>


### Remarks regarding existing transport protocols

Several other transport protocols for CAN have been defined in different standards.

For the J1939 protocol, the transport protocol is specified in the standard **SAE J1939-21**. Two types of transport protocol are defined: The Connection Mode Data Transfer (CMDT) and the Broadcast Announce Message (BAM). CMDT is used to exchange data between two nodes. It includes methods for flow control and handshake. BAM is more simple and broadcasts a multi-packet message to the bus without feedback if the message was received.

CMDT and BAM allow to transfer 9 to 1785 bytes (255 packets * 7 bytes) of payload. It is not allowed to transfer 0 to 8 bytes using the J1939 transport protocols. Thus, we need to know before if a message needs the mechanisms of the transport protocol or not. This is not possible for the flexible ThingSet protocol, as the same functions might transfer either very little data (e.g. write 16-bit integer) or a large amount of data (e.g. write multiple values or strings). Data with less than 9 bytes would have to be stuffed, making the protocol very inefficient. A message which could fit into a single CAN frame would need 5 frames (including flow control) when using CMDT and stuffing.

The **RV-C** standard defines a different transport protocol than SAE J1939, which also allows the transfer of up to 1785 bytes. However, is does not specify any flow control mechanisms at all. So it is not possible to determine if a message was received even for a communication between only two nodes, which is not acceptable.

NMEA 2000 uses the same transport protocol as the SAE J1939 protocol. In addition to that, it defines a so-called fast packet protocol. With **NMEA 2000 fast packet protocol**, 223 bytes can be transferred without flow control, thus, making it more efficient and "fast".

With the fast packet protocol, a single frame transfer is possible. However, a single frame message consumes 2 out of 8 bytes for the fast packet header information. This is considered too high overhead if it is unknown whether a single or multi-frame message has to be used.

Overview of different CAN based transport protocols:

|                        | ISO-TP  | NMEA 2000<br/>fast packet | SAE J1939-21 | RV-C    |
|------------------------|:-------:|:-------------------------:|:------------:|:-------:|
| Number of data bytes   | 0..4095 | 0..223                    | 9..1785      | 9..1785 |
| Flow control           | yes     | no                        | yes          | no      |
| Efficient single frame | yes     | no                        | no           | no      |
| Open standard          | no      | no                        | no           | yes     |


<!---
#### NMEA2000 Fast Packet

- 3 bit sequence identifier (same for each sequence, incremented for new session)
- 5 bit frame counter
- 1 byte overall length in first frame
- Maximum data bytes: (5^2 - 1) * 7 + 6 bytes = 223
- Trailing bytes of last frame filled with 0xFF

http://www.auelectronics.com/forum/index.php?PHPSESSID=ns0k786e6jvacog3re04jh6e50&topic=421.msg1185#msg1185

First frame:
- Byte 1:
    - b0 – b4 = 00000, b0 =LSB
    - b5 – b7 = 3-bit sequence counter to distinguish separate fast-packet messages of the same PGN, b5 is the LSB of the counter.
- Byte 2: Total  number of data bytes to be transmitted in the message (0 to 223).
- After Byte 2, the frame also includes up to (6) data bytes in the first frame (and up to (7) data bytes in following frames).

Subsequent frames:
- Byte 1:
    - b0 – b4 = 1 to 31, 5 bit frame counter,  b0  =LSB
    - b5  –  b7  = 3 -bit sequence counter which shall be the same value as in the first frame, b5 is the LSB of the counter.
- Byte 2-8: 7 bytes of transmitted data. Unused bits in the last frame of a fast-packet message shall be filled with "1" bits.
-->

## Publish/subscribe

The publication message provides a very efficient way to send data at regular intervals, which is particularly suitable for monitoring purposes. For many CBOR-encoded values, a single CAN frame provides sufficient space (8 bytes for classical; 64 bytes for CAN-FD) to transmit the value without the overhead of a transport protocol. Such messages are indicated with type `0x2`. For values larger than a single frame, a simple packetization format (the same as that used for BLE) transmits the messages over multiple frames. These messages are indicated with type `0x1`.

### CAN identifier layout

Publication messages are not sent to a single node, so the destination address does not need to be specified. Instead, the data object ID is specified directly in the CAN identifier to have more bytes available for payload in the data section of the CAN frame.

| Bits | 28 .. 26 |   25 .. 24           |    23 .. 16          |   15 .. 8            |   7 .. 0       |
|------|:--------:|:--------------------:|:--------------------:|:--------------------:|:--------------:|
|      | Priority | Type: `0x1` or `0x2` | Data object ID (MSB) | Data object ID (LSB) | Source address |

- Priority (28-26): Defines the importance of the message. For publication messages, only 5 (high priority) and 7 (low priority) are valid.
- Type (25-24): `0x2` for single-frame publication messages; `0x1` for multi-frame packetized messages
- Data object ID (23-8): Data object ID as a 16-bit unsigned integer. The most significant byte is stored first (bits 23 to 16).
- Source address (7-0): Source node address (`0x00` to `0xFD`)

The data object ID is not encoded in the CBOR format, but as a raw 16-bit unsigned integer. The publication messages are limited to IDs that fit into 16 bits.

IDs >= 0x8000 are fixed and reserved for control messages, so the CAN filter can be configured to distinguish between normal data ojbects and (high priority) control messages.

### CAN data format

The data section of the CAN frame contains the CBOR-encoded value of the data object with the specified ID.

In order to acquire real-time measurement values, a 16-bit timestamp (unsigned int) can be appended to the CBOR-encoded value. The timestamp contains the 16 least significant bits of the microcontroller's system clock in milliseconds. It is a rolling counter and restarts at 0 after an overflow. The timestamp cannot be used to determine the absolute time of a measurement, but the time difference between subsequent measurements. This is important to obtain correct sampling of time-series data if higher priority messages cause a delay of the data delivery on the bus.

The maximum length of the value and the optional timestamp is defined by the maximum data section size of the CAN frame (8 bytes for classic CAN).

When transmitting multi-frame packetized reports (type `0x1`), the first byte of the data section of the CAN frame contains a sequence number.

## Network management

The network management is handled using dedicated CAN frames with type `0x3`. These frames are mainly used for automatic CAN address assignment.

The required features of the CAN address assignment are:

- No central instance to assign addresses (unlike for e.g. DHCP)
- Nodes must re-claim their address:
  - After start-up
  - After bus disconnects
- Avoid error frames as much as possible
- Reduce bus traffic as much as possible
- Have all addresses assigned within <1s for >99% of the use cases

Critical scenarios for testing:

- All nodes (max. 253) on the same bus are powered up simultaneously.
- A node is connected to an an already operating network (hot-plugging) and should not disturb operation.

### Description of the approach

The dynamic address assignment protocol requires two dedicated frames: The **Address Discovery frame** and the **Address Claim frame**.

Dynamic address assignment capability is mandatory for each node. The nodes may have a preferred default address (e.g. manually assigned during production or based on previous successful address claims) to speed up the network start-up, but they must be able to change the address to a random number if it is already taken by another node.

#### Address Discovery frame

This frame is used to find out if a desired address is already taken by another node on the bus. It is sent out immediately after start-up or after re-connection to the bus.

| Bits |     28 .. 26    |   25 .. 24  |   23 .. 16  |   15 .. 8      |        7 .. 0          |
|------|:---------------:|:-----------:|:-----------:|:--------------:|:----------------------:|
|      | Priority: `0x4` | Type: `0x3` | Random data | Target address | Source address: `0xFE` |

- Priority (28-26): `0x4` suggested for network management frames
- Type (25-24): `0x3` for network management frames
- Random data (23-16): Used to select between two nodes attempting to discover an address at the same time
- Target address (15-8): Desired node address (`0x00` to `0xFD`)
- Source address (7-0): `0xFE` for anonymous address
- Payload: None (DLC set to 0)

The target address is the desired address of the node. If this address is already taken, the node with that address must immediately respond with an Address Claim frame (see below).

The random number in the CAN ID provides a first level of protection against collision of different nodes wanting to claim the same address. If another node with higher priority random number tries to claim the same address at the same time it will win the arbitration on the bus. The message will be received and the node has to try again with another address.

#### Address Claim frame

This frame indicates that the device with the EUI-64 in the payload uses the given source address.

| Bits |    28 .. 26     |   25 .. 24  |   23 .. 16  |        15 .. 8         |     7 .. 0     |
|------|:---------------:|:-----------:|:-----------:|:----------------------:|:--------------:|
|      | Priority: `0x4` | Type: `0x3` |  Bus number | Target address: `0xFF` | Source address |

- Priority (28-26): `0x4` suggested for network management frames
- Type (25-24): `0x3` for network management frames
- Bus number (23-16): same as for request/response messages
- Target address (15-8): `0xFF` for broadcast without a specific recipient
- Source address (7-0): Source node address being claimed (`0x00` to `0xFD`)
- Payload: 8-byte EUI-64 of the node

The EUI-64 in the payload is required to resolve potential conflicts (see below) and can be used by other devices to keep track of the devices connected to the bus.

#### Overview of address assignment process

The following steps are necessary after power-up of the node or after bus re-connection:

1. The node determines its desired address (random or previously used, e.g. read from EEPROM) and adds a CAN filter for incoming frames for this address.
2. The node sends out an address discovery frame.
3. If no other node responded with an address claim frame within a given timeout (e.g. 500 ms, t.b.d.), the node assumes it can use the address. Otherwise it restarts from step 1 with a new random address.
4. The node sends out an address claim frame with its new address.

The node should only send out any data (e.g. publication messages) after the address assignment process has successfully finished.

For the very unlikely case that two nodes chose the same address, generated the same random number in the address discovery frame and sent out the address claim frame at exactly the same time, the non-matching EUI-64 payload will result in an error frame on the bus, in which case both devices have to repeat the overall process with a new random address.

### Considered alternatives

#### DHCP

Relies on a central instance to assign addresses, which is not desired for this application.

#### SAE J1939

Uses a similar address claiming mechanism as described above, but without the initial step of address discovery. This leads to a higher probability of error frames because of collisions.

Further reading: [here](https://copperhilltech.com/blog/sae-j1939-address-claim-procedure-sae-j193981-network-management/) and [here](https://copperhilltech.com/blog/sae-j1939-network-management-and-address-claim-procedure/)

#### UAVCAN / OpenCyphal

Rather complicated algorithm with special UAVCAN messages, which is not directly applicable.

Further reading: [Specification](https://opencyphal.org/specification/Cyphal_Specification.pdf)

#### 6LoCAN

Uses similar mechanism with random data in the CAN ID to avoid error frames, but uses RTR frames, which are discouraged.

Further reading: [IETF draft](https://datatracker.ietf.org/doc/html/draft-wachter-6lo-can-00#section-3)

## Physical layer

### Bit rate

ThingSet uses a fixed bit rate of 500 kbit/s, which supports a maximum bus length of 100 m according to CiA 301.

### Connector

Standard RJ45 jacks as used for Ethernet are also used as the default for ThingSet via CAN. The cables should be Cat 5e twisted pair or better, allowing reliable communication with easily available parts.

The pinout of the connector is similar to the CANopen specification:

| Pin # | Name  | Description |
|-------|-------|-------------|
| 1     | CAN_H | CAN bus high signal |
| 2     | CAN_L | CAN bus low signal |
| 3     | GND   | CAN and power supply GND (optional) |
| 4     | V+    | Bus power supply (optional, 12-24V nominal) |
| 5     | V+    | Bus power supply (optional, 12-24V nominal) |
| 6     | -     | reserved (do not connect) |
| 7     | GND   | CAN and power supply GND (optional) |
| 8     | (V+)  | Unconnected by default, optional jumper to V+ |

The pinout specification aims to create as little interference with existing standards as possible. Most important, any damage must be prevented if a device is accidentally connected to a standard Ethernet jack.

In contrast to the CANopen specification, pin 8 is not used as the bus power supply (V+) by default. 10/100 MBit Ethernet jacks with integrated magnetics (e.g. [these ones](https://katalog.we-online.de/pbs/download/Tutorials_Connecting+LAN+Transformers_EN+%28rev1%29.pdf)) internally connect pin 4 to 5 and pin 7 to 8. In addition to that, Power over Ethernet (PoE) uses pins 4+5 for positive power rail and pins 7+8 for GND. So it's not ideal to use pin 7 as GND and pin 8 as V+. Boards can however offer a jumper to connect pin 8 with the other V+ pins (4 and 5) for bus supply of CANopen devices.

Galvanic isolation is not required, as long as all devices are connected via thick wires. This might change in the future.

One device typically has 2 RJ45 jacks for daisy-chaining the devices and maintaining the bus topology. There is no such thing like a switch needed. However, the endpoints have to be terminated with termination plugs or resistors.

A device that supplies power to V+ may not hard-connect the daisy-chained wires without any fuses in order to ensure that the current rating per wire is not exceeded. Devices without power supply may just route through the powered wires.

The maximum current per wire pair is 600 mA (300 mA per wire), same as PoE+ (IEEE 802.3at Type 2) with Cat 5e cables.

---
title: "CAN"
---

# CAN Transport and Network Layer

::: warning
The CAN bus part of the ThingSet protocol is still in an early stage and may be change in the future.
:::

This specification defines layer 3 (Network) and 4 (Transport) of the ThingSet Protocol via CAN bus. Layer 1 and 2 are provided by the CAN bus itself.

Only the binary messages of the ThingSet Protocol are supported via CAN.

## General features

- Master-less operation
- Automatic node ID assignment
- Efficient useage of CAN ID and data bytes
- Transport protocol to allow payload of more than 8 bytes
- Two different types of messages for application layer
    - Service message (request/response)
    - Publication message (publish/subscribe)
- RTR frame is not allowed
- Fixed bitrate of 250 kbit

### CAN identifier layout

In the CAN bus, the identifier part of the CAN frame is used for arbitration and identification of the message type. Typically, it does not define the sender or receiver of the message, but the content of the message.

For a network with connected ThingSet devices, the layout of the CAN identifier is similar to the SAE J1939 specification. Parts of the identifier define the source and destination address of the message. In addition to that, the first three bits are used to prioritize the messages.

Two general types of messages are specified: Service message and publication message. Only CAN extended IDs with a size of 29 bit are used.

## Service message

A service message is used for the request/response messaging pattern. A single byte each for source and destination node address are defined as part of the CAN ID to identify sender and receiver of the message. In addition to that, the function code is specified as part of the CAN ID.

### CAN identifier layout

The service message CAN ID layout is shown in the following picture:

![CAN service message ID](./images/service_msg_can_id.png)

- Priority (28-26): Defines the importance of the message. For service messages, only 3 (high priority) or 7 (low priority) are valid.
- Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus
- Message type (24): 0b for service message
- Function code (23-16): Function code of application layer protocol
- Destination address (15-8): Destination node address (255 for broadcast)
- Source address (7-0): Source node address (255 for anonymous message during address claiming)

### Transport protocol (ISO 15765-2)

In order to transfer data with a length of more than 8 bytes, the transfer protocol specified in [ISO 15765-2 (ISO-TP)](https://en.wikipedia.org/wiki/ISO_15765-2) is used.

It allows a maximum number of 4095 data bytes (defined by 12 bit unsigned int length code in first frame). Flow control mechanisms ensure the reliability of data reception.

As a very important feature, ISO-TP allows the efficient transfer of single-frame messages with only one byte of overhead (and no flow control packets). This feature is necessary, as it is not known before if a certain function of the ThingSet protocol will transfer only a few bytes or a large amount of data.

The ISO-TP standard is not accessible for free. However, several open source implementations (including [SocketCAN for Linux](https://github.com/hartkopp/can-isotp)) of the ISO-TP are available. Most important information about the frame layout can be found on [Wikipedia](https://en.wikipedia.org/wiki/ISO_15765-2).

#### Single-frame message request/response

Application protocol data of 8 bytes or lower can be transferred using a single CAN frame. The function ID of the application protocol (byte 1) is already included in the CAN indentifier. The first byte of the CAN data contains the ISO-TP header for a single-frame message. Bytes 2 to n (with n <= 8) are contained in the remaining data bytes of the CAN frame.

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th>
</tr></thead><tbody><tr>
	<td>ISO-TP header</td>
    <td>Application protocol (byte 2)</td>
	<td>...</td>
    <td>Application protocol (byte 8)</td>
</tr></tbody></table>

#### Multi-frame message request/response

More than 8 bytes of application protocol data are sent as multi-frame messages.

The first message contains two bytes for the ISO-TP header (including also the total message length). As the function ID (first byte of application protocol data) is already stored in the CAN identifier, the application protocol byte numbering starts with 2.

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>Byte 3</th><th>...</th><th>Byte 8</th>
</tr></thead><tbody><tr>
	<td colspan="2">ISO-TP header</td>
    <td>Application protocol (byte 2)</td>
	<td>...</td>
    <td>Application protocol (byte 7)</td>
</tr></tbody></table>

Consecutive messages i = 2...585 consume only one byte for the ISO-TP header:

<table><thead><tr>
    <th>Byte 1</th><th>Byte 2</th><th>...</th><th>Byte 8</th>
</tr></thead><tbody><tr>
	<td>ISO-TP header</td>
    <td>Application protocol (byte i\*7-6)</td>
	<td>...</td>
    <td>Application protocol (byte i\*7)</td>
</tr></tbody></table>


### Remarks regarding existing transport protocols

Several other transport protocols for CAN have been defined in different standards.

For the J1939 protocol, the transport protocol is specified in the standard **SAE J1939-21**. Two types of transport protocol are defined: The Connection Mode Data Transfer (CMDT) and the Broadcast Announce Message (BAM). CMDT is used to exchange data between two nodes. It includes methods for flow control and handshake. BAM is more simple and broadcasts a multi-packet message to the bus without feedback if the message was received.

CMDT and BAM allow to transfer 9 to 1785 bytes (255 packets * 7 bytes) of payload. It is not allowed to transfer 0 to 8 bytes using the J1939 transport protocols. Thus, we need to know before if a message needs the mechanisms of the transport protocol or not. This is not possible for the flexible ThingSet protocol, as the same functions might transfer either very little data (e.g. write 16-bit integer) or a large amount of data (e.g. write multiple values or strings). Data with less than 9 bytes would have to be stuffed, making the protocol very inefficient. A message which could fit into a single CAN frame would need 5 frames (including flow control) when using CMDT and stuffing.

The **RV-C** standard defines a different transport protocol than SAE J1939, which also allows the transfer of up to 1785 bytes. However, is does not specify any flow control mechanisms at all. So it is not possible to determine if a message was received even for a communication between only two nodes, which is not acceptable.

NMEA 2000 uses the same transport protocol as the SAE J1939 protocol. In addition to that, it defines a so-called fast packet protocol. With **NMEA 2000 fast packet protocol**, 223 bytes can be transferred without flow control, thus, making it more efficient and "fast".

With the fast packet protocol, a single frame transfer is possible. However, a single frame message consumes 2 out of 8 bytes for the fast packet header information. This is considered too high overhead if it is unknown whether a single or multi-frame message has to be used.

Overview of different CAN based transport protocols:

|                       | ISO-TP  | NMEA 2000<br/>fast packet | SAE J1939-21 | RV-C    |
|-----------------------|:-------:|:-------------------------:|:------------:|:-------:|
|Number of data bytes   | 0..4095 | 0..223                    | 9..1785      | 9..1785 |
|Flow control           | yes     | no                        | yes          | no      |
|Efficient single frame | yes     | no                        | no           | no      |
|Open standard          | no      | no                        | no           | yes     |


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

## Publication message

The publication message provides a very efficient way to send data in a regular interval using a single CAN frame without the overhead of a transport protocol. The publication messages are mainly intended for monitoring purposes.

### CAN identifier layout

Publication messages are not sent to a single node, so the destination address does not need to be specified. Instead of the function code and the destination address byte, the data node ID is specified directly in the CAN identifier to have more bytes available for payload in the data section of the CAN frame.

![CAN publication message ID](./images/publication_msg_can_id.png)

- Priority (28-26): Defines the importance of the message. For publication messages, only 4 (high priority), 5 (medium priority) and 6 (low priority) are valid.
- Extended data page / EDP (25): Always 1b to prevent collision with SAE J1939 and NMEA2000 devices on the same bus
- Message type (24): 1b for publication message
- Data node ID (23-8): Data node ID as a 16-bit unsigned integer. The most significant byte is stored first (bits 23 to 16).
- Source address (7-0): Source node address (255 for anonymous message during address claiming)

The data node ID is not encoded in the CBOR format, but as a raw 16-bit unsigned integer. The publication messages are limited to IDs that fit into 16 bits.

### CAN data format

The data section of the CAN frame contains the CBOR-encoded value of the data node with the specified ID.

In order to acquire real-time measurement values, a 16-bit timestamp (unsigned int) can be appended to the CBOR-encoded value. The timestamp contains the 16 least significant bits of the microcontroller's system clock in milliseconds. It is a rolling counter and restarts at 0 after an overflow. The timestamp cannot be used to determine the absolute time of a measurement, but the time difference between subsequent measurements. This is important to obtain correct sampling of time-series data if higher priority messages cause a delay of the data delivery on the bus.

The maximum length of the value and the optional timestamp is defined by the maximum data section size of the CAN frame (8 bytes for classic CAN).


# CAN Physical layer

ToDo:

- RJ45 connector using CANopen pinout
- Bus Power supply


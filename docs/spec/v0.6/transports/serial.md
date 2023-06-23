---
title: "Serial"
---

# Serial

The serial interface can be a hardware UART interface directly with a microcontroller a virtual serial via USB or Bluetooth.

## UART

As serial communication to a microcontroller via UART does not provide any error checking, a CRC checksum is appended to each message in the text mode.

The following extensions for the grammar as described in [Text Mode chapter](appl_text_mode.md) are used:

    thingset-msg  = ( txt-request / txt-response / txt-report / txt-desire )

    thingset-uart = thingset-msg end

    end = [ " " checksum "#" ] [ CR ] LF

    checksum = 8( DIGIT / %x41-46 )      ; CRC-32 as HEXDIGs (always upper case)

The CRC checksum is calculated over the entire thingset-msg as defined above. The same CRC-32 polynom 0x04C11DB7 as for [Ethernet and many other protocols](https://en.wikipedia.org/wiki/Cyclic_redundancy_check) is used.

The hash sign `#` at the end of the checksum allows to detect easily whether the message contains a checksum or not by checking the last character of the message.

The CRC is optional so that it is still possible to interact with the device by humans using a terminal. However, the device should always calculate the CRC and in case of M2M communication, the client should check the CRC and also provide a CRC for requests to increase reliability.

The following UART settings must be used:

- Baudrate: `115200 bps`
- Data bits: `8`
- Parity: `None`
- Stop bits: `1`

No parity bit is used, as parity bits don't help to detect missed characters, which is a common failure mode in embedded systems with small buffers. The CRC detects missed and wrong characters.

::: warning
The binary protocol mode is curently not supported via simple serial interfaces, as it would require some way to determine the end of a message.
:::

## USB

USB supports a virtual COM port via the CDC ACM device class.

If the USB interface is directly provided by the microcontroller, the checksum as for the UART interface is not needed, USB already provides error-checking in that case.

If a USB-to-UART converter (e.g. FTDI) is used to interact with the device, this is not considered a "virtual serial interface", as there is still a physical UART interface used between the converter and the device. Thus, checksums should be used.

## Bluetooth

For Bluetooth, the Serial Port Profile (SPP) is used to simulate a serial interface.

For CRC checksums the same rules apply as for USB.

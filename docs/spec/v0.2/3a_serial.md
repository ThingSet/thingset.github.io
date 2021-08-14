---
title: "Serial"
---

# Serial

The serial interface could be a simple UART or a virtual serial via USB (CDC ACM device class).

As the serial interface does not feature any error checking, a CRC at the end of each request/response is suggested for the binary mode. Details still t.b.d.

The text-based mode will not have error-checking, as humans cannot calculate a CRC in their head. Hence, the text-based mode should not be used for safety-critical communication but mainly for monitoring.


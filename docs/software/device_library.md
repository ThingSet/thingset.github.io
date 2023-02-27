# ThingSet Device Library

The library provides all necessary functions required to parse incoming ThingSet requests and generate the responses. It is agnostic to the used transport protocol and can be used with a serial interface, CAN, Bluetooth, MQTT and other protocols.

It is written in C and provides a wrapper for C++.

**Library documentation:** [thingset.io/thingset-device-library](https://thingset.io/thingset-device-library/)

**Source repository:** [ThingSet/thingset-device-library](https://github.com/ThingSet/thingset-device-library)

## Features

### Text mode

The following ThingSet functions are fully implemented:

- GET and FETCH requests (first byte ``?``)
- PATCH request (first byte ``=``)
- POST request (first byte ``!`` or ``+``)
- DELETE request (first byte ``-``)
- Execution of functions via callbacks to certain paths or via executable objects
- Authentication via callback to ``auth`` object
- Sending of publication messages (``# {...}``)
- Setup of publication channels (enable/disable, configure data objects to be published, change
  interval)

In order to reduce code size, verbose status messages can be turned off using the
``TS_VERBOSE_STATUS_MESSAGES = 0`` in ``ts_config.h``.

### Binary mode

The following functions are fully implemented:

- GET and FETCH requests (function codes ``0x01`` and ``0x05``)
- PATCH request (function code ``0x07``)
- Publication of statements (function code ``0x1F``)

For an efficient implementation, only the most important CBOR data types are supported:

- Unsigned int up to 64 bit
- Negative int up to 64 bit
- UTF8 strings of up to 2^16-1 bytes
- Binary data of up to 2^16-1 bytes
- Float 32 bit
- Simple values true and false
- Arrays of above types

Currently, the following data type is still missing in the implementation.

- Float 64 (double)

It is possible to enable or disable 64 bit data types to decrease code size using the
``TS_64BIT_TYPES_SUPPORT`` flag in ``ts_config.h``.

## Example

The following code snippet is an example how ThingSet can be used as an interface for a smart heating thermostat.

The device can be configured for a target temperature. The measured room temperature and current state of the heater can be read and the device can be reset remotely.

```c
#include <stdio.h>
#include <thingset.h>

/* variables/functions to be exposed via ThingSet */
char node_id[] = "ABCD1234";
float room_temp = 18.3;
float target_temp = 21.0;
bool heater_on = true;
void reset(void);

/* the ThingSet object definitions */
static struct ts_data_object data_objects[] = {

    TS_ITEM_STRING(0x1D, "cNodeID", node_id, sizeof(node_id),
        TS_ID_ROOT, TS_ANY_R, 0),

    TS_ITEM_FLOAT(0x61, "rRoomTemp_degC", &room_temp, 1,
        TS_ID_ROOT, TS_ANY_R, 0),

    TS_ITEM_FLOAT(0x62, "wTargetTemp_degC", &target_temp, 1,
        TS_ID_ROOT, TS_ANY_RW, 0),

    TS_ITEM_BOOL(0x71, "rHeaterOn", &heater_on,
        TS_ID_ROOT, TS_ANY_R, 0),

    TS_FN_VOID(0xE1, "xReset", &reset,
        TS_ID_ROOT, TS_ANY_RW),
};

void reset(void)
{
    printf("Reset function called!\n");
}

int main(void)
{
    uint8_t request[512];
    uint8_t response[1024];
    struct ts_context ts;

    /* initialize ThingSet context and assign data objects */
    ts_init(&ts, data_objects, sizeof(data_objects) / sizeof(struct ts_data_object));

    while (true) {
        /* wait for requests from an interface (e.g. serial) */
        serial_readline(request, sizeof(request));

        /* process the request with ThingSet */
        int len =
            ts_process(&ts, request, strlen(request), response, sizeof(response));

        /* send response back (again using the serial as an example) */
        serial_printline(response, len);
    }

    return 0;
}
```

For setting the target temperature, the following request can be sent to the device:

```
= {"wTargetTemp_degC":22}
```

The response indicates that the new value has been written successfully:

```
:84 Changed.
```

In order to read the measured temperature and the heater state from the device, send the following command:

```
? ["rRoomTemp_degC","rHeaterOn"]
```

This request will be answered with below response:

```
:85 Content. [18.3,true]
```

Please see the specification for further protocol details.

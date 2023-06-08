# ThingSet Node Library

The library provides all necessary functions required to parse incoming ThingSet requests and generate the responses. It is agnostic to the used transport protocol and can be used with a serial interface, CAN, Bluetooth, MQTT and other protocols.

It is written in C and currently requires Zephyr RTOS. It can be used in in other embedded C environments with minor changes.

**Library documentation:** [thingset.io/thingset-node-c](https://thingset.io/thingset-node-c/)

**Source repository:** [ThingSet/thingset-node-c](https://github.com/ThingSet/thingset-node-c)

## Example

The following code snippet is an example how ThingSet can be used as an interface for a smart heating thermostat.

The device can be configured for a target temperature. The measured room temperature and current state of the heater can be read and the device can be reset remotely.

```c
#include <stdio.h>
#include <thingset.h>

/* variables/functions to be exposed via ThingSet */
char node_id[] = "C001CAFE01234567";
float room_temp = 18.3;
float target_temp = 21.0;
bool heater_on = true;
void reset(void);

/* the ThingSet object definitions */
static struct thingset_data_object data_objects[] = {
    THINGSET_ITEM_STRING(ID_ROOT, 0x1D, "pNodeID", node_id, sizeof(node_id),
        THINGSET_ANY_R, 0),
    THINGSET_ITEM_FLOAT(ID_ROOT, 0x61, "rRoomTemp_degC", &room_temp, 1,
        THINGSET_ANY_R, 0),
    THINGSET_ITEM_FLOAT(ID_ROOT, 0x62, "wTargetTemp_degC", &target_temp, 1,
        THINGSET_ANY_RW, 0),
    THINGSET_ITEM_BOOL(ID_ROOT, 0x71, "rHeaterOn", &heater_on,
        THINGSET_ANY_R, 0),
    THINGSET_FN_VOID(ID_ROOT, 0xE1, "xReset", &reset,
        THINGSET_ANY_RW),
};

void reset(void)
{
    printf("Reset function called!\n");
}

int main(void)
{
    uint8_t request[512];
    uint8_t response[1024];
    struct thingset_context ts;

    /* initialize ThingSet context and assign data objects */
    thingset_init(&ts, data_objects, sizeof(data_objects) / sizeof(struct thingset_data_object));

    while (true) {
        /* wait for requests from an interface (e.g. serial) */
        serial_readline(request, sizeof(request));

        /* process the request with ThingSet */
        int len =
            thingset_process_message(&ts, request, strlen(request), response, sizeof(response));

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
:84
```

In order to read the measured temperature and the heater state from the device, send the following command:

```
? ["rRoomTemp_degC","rHeaterOn"]
```

This request will be answered with below response:

```
:85 [18.3,true]
```

Please see the specification for further protocol details.

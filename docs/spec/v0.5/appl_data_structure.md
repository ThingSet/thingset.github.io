
# Data Structure

All accessible data of a device is [structured as a tree](https://en.wikipedia.org/wiki/Tree_(data_structure)). The nodes in the tree structure are called **data objects** and correspond to the JSON object definition.

Inner nodes in the structure are used to define the hierarchical structure of the data.

Actual data is stored in leaf nodes, called **data items**. The data items can contain any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar information.

## Names and IDs

Each data object in the tree is identified by a numeric ID and a name. The ID can be chosen by the firmware developer. The name is a short case-sensitive ASCII string containing only alphanumeric characters, dots or underscores without any whitespace characters.

The underscore is only used to specify the unit of a data item (also see below). No additional underscores are allowed in the name.

By convention, data items (leaf nodes) use [lower camel case](https://en.wikipedia.org/wiki/Camel_case) for their names where the first character is a prefix as defined below. Inner objects to define a path use upper camel case names.

A dot is used to identify paths which are used internally by the implementation of the protocol itself (e.g. configuration of publication messages). Other usages of a dot in the data object names is not allowed.

The IDs must be unique per device. There may be multiple data items with the same name if they are located in different paths in the data hierarchy.

The IDs are used to access data objects in the binary protocol mode for reduced message size. They can also be used in the firmware to define the relations in the data structure. For all interactions with users and in the text-based mode, only the object names and paths are used.

Data object IDs are stored as unsigned integers. The firmware developer should assign the lowest IDs to the most used data objects, as they consume less bytes during transfer (see CBOR representation of unsigned integers).

### Item type prefixes

Each data item is prefixed with a single character to identify its type according to below table:

| Prefix | Read | Write | TSDB  | Description                                                 |
|--------|------|-------|-------|-------------------------------------------------------------|
| c      | yes  | no    | no    | constant value (not changed during operation)               |
| r      | yes  | no    | yes   | read-only value (e.g. measurement, state)                   |
| w      | yes  | yes   | yes   | write-able value (e.g. control input, stored in RAM)        |
| p      | yes  | yes   | yes   | protected value (reset-able, normally only read)            |
| s      | yes  | yes   | no    | stored value (in non-volatile memory, typically config)     |
| m      | yes  | yes   | yes   | metrics subset (processed in regular time intervals)        |
| e      | yes  | (yes) | no    | event subset (only processed if changed/updated)            |
| b      | yes  | yes   | yes   | bi-directional (reserved for control purposes)              |
| t      | yes  | (yes) | yes   | timestamp (dedicated prefix to reduce processing effort)    |
| x      | (no) | (yes) | no    | executable item (name can be read, parameters write-only)   |

The functions to read, write and execute a data item will be explained in the next chapter.

The TSDB marks types which are suitable for storage in a time-series database (TSDB) because they may change dynamically over time (typically measurements or states). The other types are used for more static data like configuration values.

Changes to write-able data items (prefix `w`) are only stored in RAM, so they get lost after a reset of the device. In contrast to that, stored data (prefix `s`) is stored in non-volatile memory (e.g. flash or EEPROM) after a change. As non-volatile memory has a limited amount of write cycles, configuration data should not be changed continuously.

Factory calibration data items are only accessible for the manufacturer after authentication. If the user should be able to reset a value (e.g. a min/max counter), the value would be prefixed with `p` for protected. It is up to the firmware developer how the value should be protected. It may also only be marked differently to a normal input value ('w') in a user interface.

Excecutable data means that they trigger a function call in the device firmware. Child objects of the executable object can be used internally to define parameters that can be passed to the function.

### Units

Only [SI units](https://en.wikipedia.org/wiki/International_System_of_Units) and derived units (e.g. kWh for energy instead of Ws) are allowed.

The unit is appended to the data item name using an underscore. In order to keep the name very compact, the unit is also used to identify the physical quantity of the value. So instead of "rBatteryEnergy_kWh" a short name like "rBat_kWh" is preferred.

Some special characters have to be replaced according to the following table in order to be compatible with URIs (see [RFC 3986, section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)):

| Character | Replacement | Example                                       |
|-----------|-------------|-----------------------------------------------|
| °         | deg         | "rAmbient_degC" for ambient temperature in °C |
| %         | pct         | "rRelHumidity_pct" for relative humidity in % |
| /         | _           | "rVeh_m_s" for vehicle speed in m/s           |
| ^         | (omitted)   | "cSurface_m2" for surface area in m^2         |

### Reserved IDs

The IDs 0x00 and 0x10-0x1F are reserved for special data objects that need to be known in advance. In addition to that, IDs starting from 0x8000 are reserved for control purposes and will be assigned in the future.

The following table shows the assigned IDs. Currently unassigned IDs might be defined in a future version of the protocol.

| ID   | Name         | Description                                                            |
|------|--------------|------------------------------------------------------------------------|
| 0x00 |              | Root object of a device                                                |
| 0x10 | t_s          | Unix timestamp in seconds since Jan 01, 1970                           |
| 0x17 | .name        | Endpoint used by binary protocol to determine names from IDs           |
| 0x18 | cMetadataURL | URL to JSON file containing extended information about exposed data    |
| 0x1D | cDeviceID    | Alphanumeric string (without spaces) to identify the device (should be unique per manufacturer, typical length 8 characters) |
| >=0x8000 | ...      | Control data objects with fixed IDs                                    |

The IDs up to 0x17 consume only a single byte when encoded as CBOR, which minimizes space consumption for IDs that are used often. The `cMetadataURL` is retrieved only once during startup, so it is acceptable to consume 2 bytes for its ID.

## Example Data

### Flat layout

Most simple valid data layout consists of key/value pairs without any hierarchy.

The following data layout could be used for a smart heating thermostat that can be configured for a target temperature. The measured temperature and whether the heater is currently on or off can be read from the device.

``` json
{
    "cDeviceID": "ABCD1234",
    "rMeas_degC": 18.3,
    "rHeating": true,
    "sTarget_degC": 22.0,
}
```

### Grouped layout

The following example data structure of an MPPT charge controller will be used for further explanation of the protocol.

``` json
{
    "t_s": 460677600,                                               // 0x10 (fixed)
    "cDeviceID": "ABC12345",                                        // 0x1D (fixed)
    "cMetadataURL": "https://files.libre.solar/tsm/cc-v03.json",    // 0x18 (fixed)
    "Device": {                                                     // 0x01
        "cType": "MPPT 1210 HUS",                                   // 0x30
        "cFirmwareCommit": "abcdefg",
        "rUptime_s": 1234567,
        "rErrorFlags": 0,                                           // 0x61
        "xReset": null,                                             // 0xE0
        "xAuth": ["Password"],                                      // 0xE1
    },
    "Bat": {                                                        // 0x02
        "rMeas_V": 14.2,                                            // 0x40
        "rMeas_A": 5.13,                                            // 0x41
        "rMeas_degC": 22,                                           // 0x42
        "rChargerState": 3,                                         // 0x60
        "sTarget_V": 14.4,                                          // 0xA0
        "wEnableCharging": true,                                    // 0x90
        "pBatChgDay_Wh": 1984,                                      // 0x70
        "pMeasMax_deg": 21.6                                        // 0x71
    },
    "DFU": {                                                        // 0x0D
        "xWrite": ["Offset_B", "Data"],                             // 0xF0
        "rFlashSize_KiB": 128                                       // 0xF1
    },
    "eBoot": ["Device/cFirmwareCommit", "cMetadataURL"],            // 0x20
    "eState": ["Device/rErrorFlags"],
    "mReport": ["t_s", "Bat/rMeas_V", "Bat/rMeas_degC"],            // 0x20
    ".pub": {                                                       // 0x0F
        "eBoot": {                                                  // 0x100
            "sEnable": true,                                        // 0x101
            "cRateLimit_s": 10,
        },
        "eStatus": {                                                // 0x102
            "sEnable": true,                                        // 0x103
            "cRateLimit_s": 1,
        },
        "mReport": {
            "sEnable": false,
            "sPeriod_s": 1,
        }
    },
    ".path": {                                                      // 0x17 (fixed)
        "0x01": "info",
        "0x02": "meas",
        // ...
        "0x40": "Bat/rMeas_V"
        // ...
    }
}
```

The `.pub` path is used to configure the automatic publication of messages, so it doesn't hold normal data objects. Such internal nodes are prefixed with a `.`, similar to hidden files or folders in computer file systems.

The data node `report` in above example is a so-called **subset**, which contains an array pointing at existing data items. It can be used to configure the content of statements for publication if data objects of different groups should be combined in a single message.


# Data Structure

All accessible data of a device is [structured as a tree](https://en.wikipedia.org/wiki/Tree_(data_structure)). The nodes in the tree structure are called **data objects** and correspond to the JSON object definition.

Inner nodes in the structure are used to define the hierarchical structure of the data.

Actual data is stored in leaf nodes, called **data items**. The data items can contain any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar information.

## Names and IDs

Each data object in the tree is identified by a numeric ID and a name. The ID can be chosen by the firmware developer. The name is a short case-sensitive ASCII string containing only alphanumeric characters and underscores without any whitespace characters.

An underscore as the first character is used to identify paths which are used internally by the protocol itself (e.g. configuration of publication messages).

If used in the middle of the name, an underscore separates the description of the item and the unit (also see below). No additional underscores are allowed in the name.

By convention, data items (leaf nodes) use [lower camel case](https://en.wikipedia.org/wiki/Camel_case) for their names where the first character is a prefix as defined below. Inner objects to define a path use upper camel case names.

The IDs must be unique per device. However, there may be multiple data items with the same name if they are located in different paths in the data hierarchy.

The IDs are used to access data objects in the binary protocol mode for reduced message size. They can also be used in the firmware to define the relations in the data structure. For all interactions with users and in the text-based mode, only the object names and paths are used.

Data object IDs are stored as unsigned integers. The firmware developer should assign the lowest IDs to the most used data objects, as they consume less bytes during transfer (see CBOR representation of unsigned integers).

### Item type prefixes

Each data item is prefixed with a single character to identify its type according to below tables.

#### Normal items

| Prefix | Read  | Write | TSDB  | Description                                                 |
|--------|-------|-------|-------|-------------------------------------------------------------|
| c      | yes   | no    | no    | constant value (not changed during operation)               |
| r      | yes   | no    | yes   | read-only value (e.g. measurement, state)                   |
| w      | yes   | yes   | yes   | write-able value (e.g. control input, stored in RAM)        |
| p      | yes   | yes   | yes   | protected value (reset-able, normally only read)            |
| s      | yes   | yes   | no    | stored value (in non-volatile memory, typically config)     |
| t      | yes   | maybe | yes   | timestamp (dedicated prefix to reduce processing effort)    |
| o      | yes   | no    | yes   | orthogonal data (tags / labels for datasets)                |
| z      | yes   | yes   | yes   | control values (reserved for future use)                    |

The TSDB column marks types which are suitable for storage in a time-series database (TSDB) because they may change dynamically over time (typically measurements or states). The other types are used for more static data like configuration values.

The functions to read, write and execute a data item will be explained in the next chapter.

Changes to write-able data items (prefix `w`) are only stored in RAM, so they get lost after a reset of the device. In contrast to that, stored data (prefix `s`) is stored in non-volatile memory (e.g. flash or EEPROM) after a change. As non-volatile memory has a limited amount of write cycles, configuration data should not be changed continuously.

Factory calibration data items are only accessible for the manufacturer after authentication. If the user should be able to reset a value (e.g. a min/max counter), the value would be prefixed with `p` for protected. It is up to the firmware developer how the value should be protected. It may also only be marked differently to a normal input value (`w`) in a user interface.

Data prefixed with `o` can be thought of as tags for the other data in a statement. Most time-series databases allow filtering of datasets based on tags (also called labels). Be aware that the orthogonal data should be limited to a small set of different values to avoid [high-cardinality data](https://en.wikipedia.org/wiki/Cardinality_(SQL_statements)).

#### Subsets

Subset items contain an array pointing at existing data items. They can be used to configure the content of notifications if data objects of different groups should be combined in a single message.

Three different types of subsets can be defined depending on their prefix.

| Prefix | TSDB  | Description                                                 |
|--------|-------|-------------------------------------------------------------|
| a      | no    | attribute subset (only published on request)                |
| e      | maybe | event subset (only published if changed/updated)            |
| m      | yes   | metrics subset (published in regular time intervals)        |

The subset names can consist only of the prefix. If only one subset for metrics is required, the name can be `m`.

#### Executable items and parameters

Excecutable data means that they trigger a function call in the device firmware. Child objects of the executable object can be used internally to define parameters that can be passed to the function.

| Prefix | Description                                                 |
|--------|-------------------------------------------------------------|
| x      | executable item (name can be read, parameters write-only)   |

The data types of function parameters for executable items cannot be determined, as the values cannot be read. For this reason, special prefixes to define the data type according to below table are used:

| Prefix | Description                                   |
|--------|-----------------------------------------------|
| n      | natural number (unsigned)                     |
| i      | integer                                       |
| f      | floating-point number                         |
| l      | logic value (boolean)                         |
| b      | binary data (base-64 encoded)                 |
| u      | utf8-string                                   |

#### Records

It is not always feasible to statically assign IDs for all data items at compile-time:

- Where the data follows a pattern but the size of the pattern is not known in advance, e.g. logged error events, a modular system of N modules, or a multi-channel sensor/ADC input where each channel has the same configuration structure.
- If a device is trying to expose data from one or more connected devices (i.e. a protocol bridge)

Records are a collection of arbitrary key/value pairs of data (JSON objects) stored as elements of an array. The individual records can be accessed using their index in the array (starting at 0). Only entire records can be addressed. It is not possible to read or change individual items which are part of a record.

The same items in different records share their IDs. This allows to use IDs instead of names in the binary protocol, but only the class/type of items has to be known in advance, not the number of items.

It is not required that all records of one data object have the same data structure. However, using the same `struct` for all records would be most easy to implement for lower-level languages like C.

Data objects to store records don't have a prefix. Their name is similar to a group. The difference is that records are wrapped in an array of arbitrary length and not directly stored as key/value pairs in a JSON object.

### Units

The unit is appended to the data item name using an underscore.

Only [SI units](https://en.wikipedia.org/wiki/International_System_of_Units) and derived units (e.g. kWh for energy instead of Ws) should be used.

Some special characters have to be replaced according to the following table in order to be compatible with URIs (see [RFC 3986, section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)):

| Character | Replacement | Example                                       |
|-----------|-------------|-----------------------------------------------|
| °         | deg         | "rAmbient_degC" for ambient temperature in °C |
| %         | pct         | "rRelHumidity_pct" for relative humidity in % |
| /         | _           | "rVeh_m_s" for vehicle speed in m/s           |
| ^         | (omitted)   | "cSurface_m2" for surface area in m^2         |

See also the [Open Manufacturing Platform Semantic Data Model](https://openmanufacturingplatform.github.io/sds-bamm-aspect-meta-model/bamm-specification/2.0.0-M1/appendix/appendix.html#unit-catalog) for a list of common units and physical quantities.

### Reserved IDs

The IDs 0x00 and 0x10-0x1F are reserved for special data objects that need to be known in advance. In addition to that, IDs starting from 0x8000 are reserved for control purposes and will be assigned in the future.

The following table shows the assigned IDs. Currently unassigned IDs might be defined in a future version of the protocol.

| ID   | Name         | Description                                                            |
|------|--------------|------------------------------------------------------------------------|
| 0x00 |              | Root object of a device                                                |
| 0x10 | t_s          | Unix timestamp in seconds since Jan 01, 1970                           |
| 0x16 | _Ids         | Endpoint used by binary protocol to determine IDs from paths           |
| 0x17 | _Paths       | Endpoint used by binary protocol to determine paths from IDs           |
| 0x18 | cMetadataURL | URL to JSON file containing extended information about exposed data    |
| 0x1D | cNodeID      | Alphanumeric string (without spaces) to identify the device/node (should be unique per manufacturer, typical length 8 characters) |
| >=0x8000 | ...      | Control data objects with fixed IDs                                    |

The IDs up to 0x17 consume only a single byte when encoded as CBOR, which minimizes space consumption for IDs that are used often. The `cMetadataURL` is retrieved only once during startup, so it is acceptable to consume 2 bytes for its ID.

## Example Data

### Flat layout

Most simple valid data layout consists of key/value pairs without any hierarchy.

The following data layout could be used for a smart heating thermostat that can be configured for a target temperature. The measured room temperature and whether the heater is currently on or off can be read from the device.

``` json
{
    "cNodeID": "ABCD1234",
    "rRoomTemp_degC": 18.3,
    "sTargetTemp_degC": 22.0,
    "rHeaterOn": true,
}
```

### Grouped layout

The following example data structure of an MPPT solar charge controller will be used for further explanation of the protocol.

``` json
{
    "t_s": 460677600,                                               // 0x10 (fixed)
    "cNodeID": "XYZ12345",                                          // 0x1D (fixed)
    "cMetadataURL": "https://files.libre.solar/meta/cc-05.json",    // 0x18 (fixed)
    "Device": {                                                     // 0x01
        "cManufacturer": "Libre Solar",                             // 0x30
        "cType": "MPPT 4820 HC v1.1",                               // 0x31
        "cFirmwareVersion": "v21.0-g923d536",                       // 0x32
        "rErrorFlags": 0,                                           // 0x33
        "xReset": [],                                               // 0x34
        "xAuth": ["uPassword"]                                      // 0x35
    },
    "Bat": {                                                        // 0x02
        "rVoltage_V": 12.9,                                         // 0x40
        "rCurrent_A": -3.14,                                        // 0x41
        "sTargetVoltage_V": 14.4                                    // 0x42
    },
    "Solar": {                                                      // 0x03
        "rState": 1,                                                // 0x50
        "rPower_W": 96.5,                                           // 0x51
        "pThroughput_kWh": 1984                                     // 0x52
    },
    "Load": {                                                       // 0x04
        "wEnable": true,                                            // 0x60
        "rPower_W": 137.0,                                          // 0x61
        "pThroughput_kWh": 1789                                     // 0x62
    },
    "ErrorMemory": [                                                // 0x08
        {                                                           // #0
            "t_s": 460677000,                                       // 0x70 (shared)
            "rErrorFlags": 4                                        // 0x71 (shared)
        },{                                                         // #1
            "t_s": 460671000,                                       // 0x70 (shared)
            "rErrorFlags": 256                                      // 0x71 (shared)
        }
    ],
    "Log": {                                                        // 0x09
        "oLevel": 2,                                                // 0x90
        "oModule": "charge_controller",                             // 0x91
        "rMessage": "Load overcurrent: 23 A",                       // 0x92
    },
    "eBoot": ["cMetadataURL", "Device/cFirmwareCommit"],            // 0x05
    "eState": ["t_s", "Device/rErrorFlags"],                        // 0x06
    "mLive": [                                                      // 0x07
        "t_s", "Bat/rVoltage_V", "Solar/rPower_W", "Load/rPower_W"
    ],
    "_Notifications": {                                             // 0x0F
        "eState": {                                                 // 0xF0
            "sEnable": true,                                        // 0xF1
            "cRateLimit_s": 1                                       // 0xF2
        },
        "mLive": {                                                  // 0xF3
            "sEnable": false,                                       // 0xF4
            "sPeriod_s": 10                                         // 0xF5
        },
        "Log": {                                                    // 0xF6
            "sMaxLevel": 3,                                         // 0xF7
            "sRateLimit_Hz": 1                                      // 0xF8
        }
    },
    "_Ids": {                                                       // 0x16 (fixed)
        "Device": 0,
        "Bat": 2,
        // ...
        "Bat/rVoltage_V": 64,
        // ...
        "ErrorMemory/t_s": 112,
        "ErrorMemory/ErrorFlags": 113
        // ...
    },
    "_Paths": {                                                     // 0x17 (fixed)
        "0x01": "Device",
        "0x02": "Bat",
        // ...
        "0x40": "Bat/rVoltage_V",
        // ...
        "0x70": "ErrorMemory/t_s",
        "0x71": "ErrorMemory/ErrorFlags",
        // ...
    }
}
```

The `_Notifications` path is used to configure the automatic publication of messages, so it doesn't hold normal data objects. Such internal objects are prefixed with a `_`, similar to private functions in some programming languages.

### User interface processing

One major goal of ThingSet is that the data model provides sufficient semantic information to build simple user interfaces to interact with the device and read/update the data.

For the user interface, item prefixes can be used to display the data in a different way depending on its type, e.g. write-able values can be rendered as a text input or executable items as a button.

The prefixes themselves should be omitted in the user interface and single words of object names can be split. Also, units should be parsed such that the actual unit is displayed and not an equivalent like `degC` for `°C`.

Below structure gives an example of the processed user interface structure for above data. Instead of pure text, this structure could be easily rendered in a web page or phone app.

```
                       ThingSet Node XYZ12345 Data Objecs

        ├─ Device
        │  ├─ Manufacturer                                  Libre Solar
        │  ├─ Type                                    MPPT 4820 HC v1.1
        │  ├─ Firmware Version                           v21.0-g923d536
        │  ├─ Error Flags                                             0
        │  ├─ Reset                                              [ OK ]
        │  └─ Auth                                  | Password | [ OK ]
        │
        ├─ Bat
        │  ├─ Voltage                                            12.9 V
        │  ├─ Current                                           -3.14 A
        │  └─ Target Voltage                                 | 14.4 | V
        │
        ├─ Solar
        │  ├─ State                                                   1
        │  ├─ Power                                              96.4 W
        │  └─ Throughput                                       1984 kWh
        │
        ├─ Load
        │  ├─ Power                                             137.0 W
        │  ├─ Throughput                                       1789 kWh
        │  └─ Enable                                                [x]
        │
        └─ Notificatons
           │
           ├─ Boot Events
           │  └─ Items                               [ Add ] [ Delete ]
           │     ├─ Metadata URL
           │     └─ Device Firmware Version
           │
           ├─ State Events
           │  ├─ Enable                                             [x]
           │  ├─ Rate Limit                                     | 1 | s
           │  └─ Items                               [ Add ] [ Delete ]
           │     ├─ Time (s)
           │     └─ Device Error Flags
           │
           └─ Live Metrics
              ├─ Enable                                             [ ]
              ├─ Period                                        | 10 | s
              └─ Items                               [ Add ] [ Delete ]
                 ├─ Time (s)
                 ├─ Bat Voltage (V)
                 ├─ Solar Power (W)
                 └─ Load Power (W)
```

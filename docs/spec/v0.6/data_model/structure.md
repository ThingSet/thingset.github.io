---
title: "Structure"
---

# Data Structure

The accessible data of a device is [structured as a tree](https://en.wikipedia.org/wiki/Tree_(data_structure)). The data can be accessed using the protocol functions described in [separate chapter](../protocol/functions.md). This chapter will only explain the device data structure itself.

## Hierarchy

All nodes in the tree structure are called **data objects** and correspond to the JSON object definition.

Inner nodes in the structure, called **groups**, are used to define the hierarchy of the data.

Actual data is stored in leaf nodes, called **data items**. The data items can contain any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar information. Data items can contain simple values (numbers, strings and booleans) or arrays of simple values.

**Subsets** and **records** are special kinds of arrays arrays explained further down below.

## Naming Conventions

The name of a data object is a short case-sensitive ASCII string containing only alphanumeric characters and underscores without any whitespace characters.

An underscore as the first character is used to identify [overlays](overlays.md), which are sections of data used to store additional information for original data objects, e.g. metadata, min/max values or configuration of report intervals.

If used in the middle of an item name, an underscore separates the description of the item and the unit (also see below). No additional underscores are allowed in the name.

By convention, data items (leaf nodes) use [lower camel case](https://en.wikipedia.org/wiki/Camel_case) for their names where the first character is a prefix as defined below. Groups as well as records use upper camel case names.

### Data Items

Each data item is prefixed with a single character to identify its type according to below tables.

| Prefix | Read  | Write | Description                                                 |
|--------|-------|-------|-------------------------------------------------------------|
| `c`    | yes   | no    | constant value (not changed during operation)               |
| `r`    | yes   | no    | read-only value (e.g. measurement, state)                   |
| `w`    | yes   | yes   | write-able value (e.g. control input, stored in RAM)        |
| `p`    | yes   | yes   | protected value (reset-able, normally only read)            |
| `s`    | yes   | yes   | stored value (in non-volatile memory, typically config)     |
| `t`    | yes   | maybe | timestamp (dedicated prefix to reduce processing effort)    |
| `o`    | yes   | no    | orthogonal data (tags / labels for datasets)                |
| `z`    | yes   | yes   | control values (reserved for future use)                    |

Changes to write-able data items (prefix `w`) are only stored in RAM, so they get lost after a reset of the device. In contrast to that, stored data (prefix `s`) is stored in non-volatile memory (e.g. flash or EEPROM) after a change. As non-volatile memory has a limited amount of write cycles, configuration data should not be changed continuously.

A protected data item (prefix `p`) can be used for data which is usually not changed by the user (e.g. the node ID, a min/max counter or factory calibration values). Updating or resetting the value may be allowed only after authentication (e.g. through a ThingSet function call with an authentication token as a parameter). Protected values are also stored in non-volatile memory, but may be displayed differently to a normal stored value (`s`) in a user interface.

Data prefixed with `o` can be thought of as tags for the other data in a report. Most time-series databases allow filtering of datasets based on tags (also called labels). Be aware that the orthogonal data should be limited to a small set of different values to avoid [high-cardinality data](https://en.wikipedia.org/wiki/Cardinality_(SQL_reports)).

#### Executable items and parameters

Excecutable data means that they trigger a function call in the device firmware. Child objects of the executable object can be used internally to define parameters that can be passed to the function.

| Prefix | Description                                                 |
|--------|-------------------------------------------------------------|
| `x`    | executable item (name can be read, parameters write-only)   |

The data types of function parameters for executable items cannot be determined, as the values cannot be read. For this reason, special prefixes to define the data type according to below table are used:

| Prefix | Description                                   |
|--------|-----------------------------------------------|
| `n`    | natural number (unsigned)                     |
| `i`    | integer                                       |
| `f`    | floating-point number                         |
| `l`    | logic value (boolean)                         |
| `b`    | binary data (base-64 encoded)                 |
| `u`    | utf8-string                                   |

#### Units

The unit of a data item is part of its name and separated by an underscore.

Only [SI units](https://en.wikipedia.org/wiki/International_System_of_Units) and derived units (e.g. kWh for energy instead of Ws) should be used.

Some special characters have to be replaced according to the following table in order to be compatible with URIs (see [RFC 3986, section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)):

| Character | Replacement | Example                                       |
|-----------|-------------|-----------------------------------------------|
| `°`       | `deg`       | `rAmbient_degC` for ambient temperature in °C |
| `%`       | `pct`       | `rRelHumidity_pct` for relative humidity in % |
| `/`       | `_`         | `rVeh_m_s` for vehicle speed in m/s           |
| `^`       | (omitted)   | `cSurface_m2` for surface area in m^2         |

See also the [Open Manufacturing Platform Semantic Data Model](https://openmanufacturingplatform.github.io/sds-bamm-aspect-meta-model/bamm-specification/2.0.0-M1/appendix/appendix.html#unit-catalog) for a list of common units and physical quantities.

### Subsets

Three different types of subsets can be defined depending on their prefix.

| Prefix | Description                                                         |
|--------|---------------------------------------------------------------------|
| `a`    | attribute subset (only published on request or once during startup) |
| `e`    | event subset (only published if changed/updated)                    |
| `m`    | metrics subset (published in regular time intervals)                |

A backend may decide how to store published report data depending on the subset prefix. Attributes are suitable for relational databases (e.g. MySQL) or document-oriented storages (e.g. MongoDB) whereas event and metrics subsets are more suitable for storage in a time-series database (TSDB) because they may change dynamically over time (typically measurements or states).

If the subsets are editable, they must have a trailing underscore in their name (similar to editable records, see below). Updates to the subsets are expected to be stored in non-volatile memory.

### Records

Records are a collection of arbitrary key/value pairs of data (JSON objects) stored as elements of an array. The individual records can be accessed using their index in the array (starting at 0).

It is not required that all records of one data object have the same data structure. However, using the same `struct` for all records would be most easy to implement for lower-level languages like C.

The root records data object doesn't have a prefix. Its name is similar to a group. The difference is that records are wrapped in an array of arbitrary length and not directly stored as key/value pairs in a JSON object.

If records are alterable (e.g. data can be added or deleted), the maximum number of entries is appended instead of a unit (e.g. `Log_20` for max. 20 log entries). If the length is not fixed, but depends on the available RAM, only the underscore is appended, e.g. `Log_`.

If alterable, record item updates are expected to be stored in non-volatile memory.

## Data Object IDs

Each data object in the tree is identified by a numeric ID in addition to its name. The ID can be chosen by the firmware developer.

The IDs must be unique per device. However, there may be multiple data items with the same name if they are located in different paths in the data hierarchy.

The IDs are used to access data objects in the binary protocol mode for reduced message size. They can also be used in the firmware to define the relations in the data structure. For all interactions with users and in the text-based mode, only the object names and paths are used.

Data object IDs are stored as unsigned integers. The firmware developer should assign the lowest IDs to the most used data objects, as they consume less bytes during transfer (see CBOR representation of unsigned integers).

### Reserved IDs

The IDs 0x00 and 0x10-0x1F are reserved for special data objects that need to be known in advance. In addition to that, IDs starting from 0x8000 are reserved for control purposes and will be assigned in the future.

The following table shows the assigned IDs. Currently unassigned IDs might be defined in a future version of the protocol.

| ID   | Name           | Description                                                            |
|------|----------------|------------------------------------------------------------------------|
| 0x00 |                | Root object of a device                                                |
| 0x10 | `t_s`          | Unix timestamp in seconds since Jan 01, 1970                           |
| 0x16 | `_Ids`         | Endpoint used by binary protocol to determine IDs from paths           |
| 0x17 | `_Paths`       | Endpoint used by binary protocol to determine paths from IDs           |
| 0x18 | `cMetadataURL` | URL to JSON file containing extended information about exposed data    |
| 0x1D | `pNodeID`      | Unique alphanumeric string (without spaces) to identify the node       |
| 0x1E | `pNodeName`    | Optional human-readable name of a node (e.g. device type)              |
| >=0x8000 | ...        | Control data objects with fixed IDs                                    |

The IDs up to 0x17 consume only a single byte when encoded as CBOR, which minimizes space consumption for IDs that are used often. The `cMetadataURL` is retrieved only once during startup, so it is acceptable to consume 2 bytes for its ID.

The `pNodeID` value must be an alphanumeric string without white spaces. It must be globally unique or at least guaranteed to be unique for the ecosystem, as the node ID is used to identify devices in gateways and backends. It is highly recommended to use the 16 character upper-case hexadecimal representation of an [EUI-64](https://datatracker.ietf.org/doc/html/rfc4291#section-2.5.1), which can e.g. be derived from a MAC address.

### IDs in records

The same items in different records share their IDs. This allows to use IDs instead of names in the binary protocol, but only the class/type of items has to be known in advance, not the number of items.

## Example Data

### Flat layout

Most simple valid data layout consists of key/value pairs without any hierarchy.

The following data layout could be used for a smart heating thermostat that can be configured for a target temperature. The measured room temperature and whether the heater is currently on or off can be read from the device.

``` json
{
    "pNodeID": "C001CAFE01234567",
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
    "pNodeID": "DEADC0DEBAADCODE",                                  // 0x1D (fixed)
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
    "ErrorMemory_100": [                                            // 0x08
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
    "eError": ["t_s", "Device/rErrorFlags"],                        // 0x06
    "mLive_": [                                                     // 0x07
        "t_s", "Bat/rVoltage_V", "Solar/rPower_W", "Load/rPower_W"
    ]
}
```

## UI Processing

One major goal of ThingSet is that the data model provides sufficient semantic information to build simple user interfaces to interact with the device and read/update the data.

For the user interface, item prefixes can be used to display the data in a different way depending on its type, e.g. write-able values can be rendered as a text input or executable items as a button.

The prefixes themselves should be omitted in the user interface and single words of object names can be split. Also, units should be parsed such that the actual unit is displayed and not an equivalent like `degC` for `°C`.

Below structure gives an example of the processed user interface structure for most parts of above data. Instead of pure text, this structure could be easily rendered in a web page or phone app.

```
                    ThingSet Node DEADC0DEBAADCODE Data Objecs

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
        ├─ Error Events
        │  ├─ Time (s)
        │  └─ Device Error Flags
        │
        └─ Live Metrics                              [ Add ] [ Delete ]
           ├─ Time (s)
           ├─ Bat Voltage (V)
           ├─ Solar Power (W)
           └─ Load Power (W)
```


# Data Structure

All accessible data of a device is [structured as a tree](https://en.wikipedia.org/wiki/Tree_(data_structure)). The nodes in the tree structure are called **data objects** and correspond to the JSON object definition.

Inner nodes in the structure are used to define the hierarchical structure of the data.

Actual data is stored in leaf nodes, called **data items**. The data items can contain any kind of measurements (e.g. temperature), device configuration (e.g. setpoint of a controller) or similar information.

Each data object in the tree is identified by a numeric ID and a name. The ID can be chosen by the firmware developer. The name is a short case-sensitive ASCII string containing only alphanumeric characters, dots or underscores without any whitespace characters.

The underscore is only used to specify the unit of a data item (also see below). No additional underscores are allowed in the name.

A dot is used to identify paths which are used internally by the implementation of the protocol itself (e.g. configuration of publication messages). Other usages of a dot in the data object names is not allowed.

The IDs must be unique per device. Except for internal data objects (behind in a path starting with a dot) also the name must be unique.

The IDs are used to access data objects in the binary protocol mode for reduced message size. They can also be used in the firmware to define the relations in the data structure. For all interactions with users and in the text-based mode, only the object names and paths are used.

### Reserved IDs

The IDs 0x10-0x1F are reserved for special data objects that need to be known in advance. In addition to that, IDs starting from 0x8000 are reserved for control purposes and will be assigned in the future.

The following table shows the assigned IDs. Currently unassigned IDs might be defined in a future version of the protocol.

| ID   | Name        | Description |
|------|-------------|-------------|
| 0x10 | Time_s      | Unix timestamp in seconds since Jan 01, 1970 |
| 0x17 | .name       | Endpoint used by binary protocol to determine names from IDs |
| 0x18 | MetadataURL | URL to JSON file containing extended information about exposed data |
| 0x1D | DeviceID    | Alphanumeric string (without spaces) to identify the device (should be unique per manufacturer, typical length 8 characters) |
| >=0x8000 | ...     | Control data objects with fixed IDs |

The IDs up to 0x17 consume only a single byte when encoded as CBOR, which minimizes space consumption for IDs that are used often. The `MetadataURL` is retrieved only once during startup, so it is acceptable to consume 2 bytes for its ID.

### Example

For explanation of the protocol, the following simplified data structure of an MPPT charge controller will be used:

``` json
{
    "info": {                                                       // 0x01
        "MetadataURL": "https://files.libre.solar/tsm/cc-v03.json", // 0x18 (fixed)
        "DeviceID": "ABC12345",                                     // 0x1D (fixed)
        "DeviceType": "MPPT 1210 HUS"                               // 0x30
    },
    "meas": {                                                       // 0x02
        "Bat_V": 14.2,                                              // 0x40
        "Bat_A": 5.13,                                              // 0x41
        "Ambient_degC": 22                                          // 0x42
    },
    "state": {                                                      // 0x03
        "ChargerState": 3,                                          // 0x60
        "ErrorFlags": 0                                             // 0x61
    },
    "rec": {                                                        // 0x04
        "Time_s": 460677600,                                        // 0x10 (fixed)
        "BatChgDay_Wh": 1984,                                       // 0x70
        "AmbientMax_deg": 21.6                                      // 0x71
    },
    "input": {                                                      // 0x05
        "EnableCharging": true                                      // 0x90
    },
    "conf": {                                                       // 0x06
        "BatCharging_V": 14.4                                       // 0xA0
    },
    "rpc": {                                                        // 0x0E
        "x-reset": null,                                            // 0xE0
        "x-auth": ["Password"]                                      // 0xE1
    },
    "dfu": {                                                        // 0x0D
        "x-write": ["Offset_B", "Data"],                            // 0xF0
        "FlashSize_KiB": 128                                        // 0xF1
    },
    "report": ["Time_s", "Bat_V", "Ambient_degC"],                  // 0x20
    "ctrl": {                                                       // 0x0C
        "bus-voltage": {                                            // 0xDC01
            "Margin_V": 0.7,                                        // 0x7000
            "AbsMax_v": 30                                          // 0x7001
        }
    },
    ".pub": {                                                       // 0x0F
        "info": {                                                   // 0x100
            "OnChange": true                                        // 0x101
        },
        "report": {                                                 // 0x102
            "Period_s": 10                                          // 0x103
        }
    },
    ".name": {                                                      // 0x17 (fixed)
        "0x01": "info",
        "0x02": "meas",
        // ...
        "0x40": "Bat_V"
        // ...
    }
}
```

The data objects are structured in different groups like `info` and `conf` as described below. By convention, data items (leaf nodes) use [upper camel case](https://en.wikipedia.org/wiki/Camel_case) for their names, inner objects to define a path use lower case names.

The `rpc` group provides functions that can be called. In order to distinguish functions from normal data objects, executable object names are lower case and prefixed with `x-`.

The `.pub` path is used to configure the automatic publication of messages, so it doesn't hold normal data objects. Such internal nodes are prefixed with a `.`, similar to hidden files or folders in computer file systems.

The data node `report` in above example is a so-called **subset**, which contains an array pointing at existing data items. It can be used to configure the content of statements for publication if data objects of different groups should be combined in a single message.

## Groups

The following groups for data objects are used for the ThingSet protocol by default:

| Group | ID   | Origin | Description | Access |
|-------|------|--------|-------------|--------|
| info  | 0x01 | device | Static device information (e.g. manufacturer, software version) | read |
| meas  | 0x02 | device | Measurement data (changes regularly) | read |
| state | 0x03 | device | Event-based status information | read |
| rec   | 0x04 | device | Recorded (history-dependent) data (e.g. min/max values) | read + reset |
| input | 0x05 | client | Input objects (e.g. actuators) | read + write |
| conf  | 0x06 | both   | Configurable settings, stored in non-volatile memory after change | read + write, partly protected |
| cal   | 0x07 | both   | Factory-calibrated settings | read + write, protected |
| rpc   | 0x0E | client | Executable functions | execute |
| dfu   | 0x0D | client | Functions and data for device firmware upgrade | read + execute |

The data objects of `meas`, `state` and `input` groups are used for instantaneous data. Changes to `input` data objects are only stored in RAM, so they get lost after a reset of the device. In contrast to that, `conf` data is stored in non-volatile memory (e.g. flash or EEPROM) after a change. As non-volatile memory has a limited amount of write cycles, configuration data should not be changed continuously.

The `rec` data group is used for history-dependent data like error memory, energy counters or min/max values of certain measurements. In contrast to data of `meas` group, recorded data cannot be obtained through measurement after reset, so the current status has to be stored in non-volatile memory on a regular basis. Also the current timestamp `Time_s` is stored in the `rec` group, as it is essentially a counter that is incremented each second.

Factory calibration data objects are only accessible for the manufacturer after authentication.

Excecutable data means that they trigger a function call in the device firmware. Child objects of the executable object can be used internally to define parameters that can be passed to the function.

Data object IDs are stored as unsigned integers. The firmware developer should assign the lowest IDs to the most used data objects, as they consume less bytes during transfer (see CBOR representation of unsigned integers).

## Units

Only [SI units](https://en.wikipedia.org/wiki/International_System_of_Units) and derived units (e.g. kWh for energy instead of Ws) are allowed.

The unit is appended to the data object name using an underscore. In order to keep the data object name very compact, the unit is also used to identify the physical quantity of the value. So instead of "BatteryEnergy_kWh" a short name like "Bat_kWh" is preferred.

Some special characters have to be replaced according to the following table in order to be compatible with URIs (see [RFC 3986, section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)):

| Character | Replacement | Example                                      |
|-----------|-------------|----------------------------------------------|
| °         | deg         | "Ambient_degC" for ambient temperature in °C |
| %         | pct         | "Humidity_pct" for relative humidity in %    |
| /         | _           | "Veh_m_s" for vehicle speed in m/s           |
| ^         | (omitted)   | "Surface_m2" for surface area in m^2         |

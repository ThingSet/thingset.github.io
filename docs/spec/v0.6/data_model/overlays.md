---
title: "Overlays"
---

# Data Overlays

The concept of overlays is used to separate actual data from additional related information in order to minimize the amount of data frequently transferred over the wire.

Overlays are ThingSet data objects themselves and prefixed with an underscore in their root node. They can be provided by the node itself or a gateway or backend application can extend the data accessible by an application with additional overlays.

The data structure inside an overlay must only contain objects that are also present in the actual data. The additional information is stored in the leaf nodes (data items) instead of the value of the actual data.

An application like a user interface shall ignore unknown overlays.

In order to store additional information for groups (which are not leaf nodes) an object with `"_"` key is used (see [Metadata](appl_data_overlays.html#metadata) below for examples).

## Reporting

The `_Reporting` path is used to configure the automatic publication of messages. The data items to configure the individual subsets or groups that can be used for reporting can be freely chosen depending on the application (like any normal data item).

Below example shows useful settings for reporting in case of state changes, for live metrics and for logging data.

``` json
{
    "_Reporting": {                                                 // 0x0F
        "Log": {                                                    // 0xF0
            "_": {
                "sMaxLevel": 3,                                     // 0xF1
                "sRateLimit_Hz": 1                                  // 0xF2
            }
        },
        "eError": {                                                 // 0xF3
            "sEnable": true,                                        // 0xF4
            "cRateLimit_Hz": 1                                      // 0xF5
        },
        "mLive_": {                                                  // 0xF6
            "sEnable": false,                                       // 0xF7
            "sPeriod_s": 10                                         // 0xF8
        }
    }
}
```

## Metadata

::: warning
The metadata specification is still work-in-progress and may change in the future.
:::

The ThingSet data naming conventions already contain essential metadata for each item, e.g. units, access rights, etc.

However, for improved user experience, a user interface application typically needs more information like a description in different languages, min/max values of settings for validation of data prior to sending it to the device, details for enums or flags, etc..

The Metadata overlay would usually not be stored inside a constrained device. Instead, its content can be found in the URL specified in the `cMetadataURL` item.

So far the following keys are defined:

- `title`: Human-readable string to describe the data item
- `unit`: Unit of the value if it could not be described properly with alphanumeric characters (e.g. `°C` or `km/h`)
- `min`: Minimum allowed value (useful for written data items only)
- `max`: Minimum allowed value (useful for written data items only)
- `enum`: Contains an array of strings to describe an original numeric set of value.
- `flags`: Contains a map of strings and associated bit positions to describe flags of a bit field.

An example for Metadata is shown below:

```json
{
    "_Metadata": {
        "rTemp_degC": {
            "title": {
                "en": "Ambient Temperature",
                "de": "Umgebungstemperatur"
            },
            "unit": "°C"
        },
        "Heater": {
            "_": {
                "title": {
                    "en": "Heater",
                    "de": "Heizer"
                }
            },
            "sTargetTemp_degC": {
                "title": {
                    "en": "Heater Target Temperature",
                    "de": "Solltemperatur Heizer"
                },
                "unit": "°C",
                "min": 18.0,
                "max": 24.0,
            },
            "rState": {
                "enum": [
                    "HEATER_ON",
                    "HEATER_OFF",
                    "ERROR"
                ]
            },
        },
        "rErrorFlags": {
            "title": {
                "en": "Device Error Flags",
                "de": "Gerätefehler"
            },
            "flags": {
                "NO_POWER": 0,
                "OVERTEMPERATURE": 1,
                "SOMETHING_BROKEN": 2,
            }
        }
    }
}
```

## Ids and Paths

For translation between data object IDs and data object names in the binary mode of the protocol, two fixed overlays `_Ids` and `_Paths` are specified.

See [Binary Mode](appl_binary_mode.md) for examples how these overlays are used.

``` json
{
    "_Ids": {                                                       // 0x16 (fixed)
        "Device": {
            "_": 1
            // ...
        },
        "Bat": {
            "_": 2,
            "rVoltage_V": 64
            // ...
        },
        // ...
        "ErrorMemory": {
            "_": 8,
            "t_s": 112,
            "ErrorFlags": 113
            // ...
        }
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

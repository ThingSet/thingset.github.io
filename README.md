# ThingSet Protocol Specification

This repository hosts the specification of the ThingSet communication protocol for control, configuration and monitoring of connected devices. The application layer protocol is widely independent of the underlying transport protocols and physical interfaces, so it can be used with e.g. CAN, USB, WiFi, Bluetooth or a simple serial interface.

Even though this protocol was developed with the focus on energy management, it can be used for other purposes aswell. The specification is published under the [CC-BY-SA 4.0 License](https://creativecommons.org/licenses/by/4.0/) and can be freely used for private and commercial purposes.

You can contribute to the protocol specification by cloning the repository to your private GitHub workspace and sending pull-requests with updates or suggestions.

## Development status

The protocol specification is still under active development and improved based on experiences made with Libre Solar devices. A release of version v1.0 is expected end of 2020.

## Local deployment for development

 For local deployment of the website install [VuePress v1](https://v1.vuepress.vuejs.org/) and run `yarn docs:dev` in the root directory of this repository. Afterwards, you can see the result in your favourite web browser at `http://localhost:8080`.

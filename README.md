# ThingSet Protocol Specification

This repository hosts the specification of the ThingSet communication protocol for control, configuration and monitoring of connected devices. The application layer protocol is widely independent of the underlying transport protocols and physical interfaces, so it can be used with e.g. CAN, USB, WiFi, Bluetooth or a simple serial interface.

Even though this protocol was developed with the focus on energy management, it can be used for other purposes aswell. The specification is published under the [CC-BY-SA 4.0 License](https://creativecommons.org/licenses/by/4.0/) and can be freely used for private and commercial purposes.

You can contribute to the protocol specification by cloning the repository to your private GitHub workspace and sending pull-requests with updates or suggestions.

## Development status

The protocol specification is still under active development and improved based on experiences in different applications. A release of version v1.0 is expected end of 2023.

## Local deployment for development

You can contribute by cloning the repository to your private GitHub workspace and sending pull-requests with upates you made.

The website is built with [VuePress](https://vuepress.vuejs.org/).

For local deployment run the following commands in the root directory of this repository:

    export NODE_OPTIONS=--openssl-legacy-provider
    npm install
    npm run dev

Afterwards, you can see the result in your favourite web browser at `http://localhost:8080`.

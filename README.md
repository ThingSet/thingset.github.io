# EnergyCAN
Ideas about CAN based energy management protocol

- Plug and play (high-level protocol needed)
  - Only advanced features should require previous configuration
- Master-less (distributed system)
- Advanced energy management features
  - Multiple sources and sinks
  - Prioritization of nodes (e.g solar has higher priority than diesel generator, fridge has lower priority than laptop)
- Cheap and reliable
- Remote firmware flashing
- Possible candidates:
  - CAN and CANopen
  - RS485 and proprietary protocol (Modbus not capable of master-less communication)
  - TCP/IP via Ethernet or WiFi (expensive!)
  - Cheap low-power radio (e.g. NRF24L01+, RFM12, BLE)
    - Problem: How to identify plug and socket?

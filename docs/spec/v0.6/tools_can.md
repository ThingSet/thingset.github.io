# CAN bus

## Linux

### CAN interface setup

There are different USB to CAN dongles available on the market, which usually support communicating with the Linux Kernel via a serial interface.

The following command creates a `can0` interface from a dongle attached to `/dev/ttyUSB0`:

```
sudo slcan_attach /dev/ttyUSB0 -w
```

Afterwards, the interface has to be configured and started. Here we are setting the bit rate to 500 kbit/s:

```
sudo ip link set can0 type can bitrate 500000 restart-ms 500
sudo ip link set can0 up
```

If you want to see also your own messages, loopback mode has to be enabled before setting the interface up:

```
sudo ip link set can0 type can loopback on
```

Now, `candump` can be used to read all data available on the bus:

```
candump can0
```

Instead of an actual CAN device, also a virtual CAN device can be used on the Linux host:

```
sudo ip link add dev vcan0 type vcan
sudo ip link set up vcan0
```

### ISO-TP tools

The Linux kernel [supports CAN ISO-TP](https://github.com/hartkopp/can-isotp), which is used as the transport protocol for ThingSet.

Assuming a device with CAN address 1 is connected to the bus, the following command sets up an ISO-TP channel for messages from the device to the host computer (CAN address 0):

```
isotprecv -l -s 0x18000100 -d 0x18000001 can0
```

In order to request the node ID in binary mode from the device with address 1, run the following command:

```
echo "01 18 1D" | isotpsend -s 0x18000100 -d 0x18000001 can0
```

The same for text mode:

```
echo -n "?cNodeId" | hexdump -v -e '/1 "%02X "' | isotpsend -s 0x18000100 -d 0x18000001 can0
```

`isotprecv` only prints the hex values of the received data. The ASCII payload can be monitored using:

```
isotpsniffer -tA -f 2 -d 0x18000100 -s 0x18000001 can0
```

#!/bin/bash

echo BB-UART4 > /sys/devices/bone_capemgr.*/slots
chown debian /dev/ttyO4
ls -l /dev/ttyO4


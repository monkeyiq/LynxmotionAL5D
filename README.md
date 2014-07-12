
A simple web interface for controlling the Lynxmotion AL5D robotic
arm. Things are setup to use UART4 on a BeagleBone Black to
communicate with an SSC-32 on the robot arm. The code should work for
any Linux machine with a TTL serial port and a suitable wiring to the
robot arm.

On the BeagleBone Black you will want to make sure that the ttyO4 UART
is setup before use.

    root@beaglebone:/lib/firmware# echo BB-UART4 > /sys/devices/bone_capemgr.*/slots
    root@beaglebone:/lib/firmware# sleep 1
    root@beaglebone:/lib/firmware# chown debian /dev/ttyO4

You'll need to install the nodejs modules:
  socket.io 

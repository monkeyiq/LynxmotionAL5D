#!/usr/bin/node

var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");

var sp = new SerialPort("/dev/ttyO4", {
    baudrate: 115200,
    parser: serialport.parsers.readline("\r")
 });

sp.on("open", function () {
    console.log('open');
    sp.on('data', function(data) {
        console.log('data received: ' + data);
    });
    sp.write("ver\r", function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
    
    setTimeout(function() {
        sp.write("#4 P1050\r");
    }, 2000 );
    setTimeout(function() {
        sp.write("#4 P2050\r");
    }, 4000 );
});

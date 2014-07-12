var b = require('bonescript');
var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");
var io = require('socket.io').listen(8888);

var ssc32 = new SerialPort("/dev/ttyO4", {
    baudrate: 115200
});

io.sockets.on('connection', function (socket) {
    console.log("have connection");

    var timeToCompleteMove = 1500;
    var moveServo = function( servonum, perc ) {
	if( typeof perc === 'undefined')
	    return;
	var servoval = 1000 + 1000 * perc/100;
	ssc32.write("#" + servonum + " P" + servoval + " T" + timeToCompleteMove + " \r");
    }

    socket.on('base', function (v) {
	if( typeof v.value === 'undefined')
	    return;
	moveServo( 0, 100 - v.value );
    });
    socket.on('shoulder', function (v) {
	moveServo( 1, v.value );
    });
    socket.on('elbow', function (v) {
	if( typeof v.value === 'undefined')
	    return;
	moveServo( 2, 100 - v.value );
    });
    socket.on('wrist', function (v) {
	moveServo( 3, v.value );
    });
    socket.on('grabber', function (v) {
	moveServo( 4, v.value );
    });
    socket.on('time', function (v) {
	if( typeof v.value === 'undefined')
	    return;
	timeToCompleteMove = v.value;
    });
});

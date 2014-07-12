#!/usr/bin/node

var async = require("async");

var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");

var sp = new SerialPort("/dev/ttyO4", {
    baudrate: 115200
});


sp.on("open", function () {
    console.log('open');

    var waitForIdle_complete = 0;
    var waitForIdle_func = function( cb ) {
	if( waitForIdle_complete ) {
	    cb();
	} else {
	    sp.write("q\r", function( err ) {
		if( err !== undefined ) {
		    console.log('ERR ' + err);
		}
	    });
	    setTimeout( function() { waitForIdle_func(cb); }, 200 );
	}
    }
    var waitForIdle = function( cb ) {
	waitForIdle_complete = 0;
	setTimeout( function() { waitForIdle_func(cb); }, 200 );
    }


    sp.on('data', function(data) {
        console.log('data received __' + data + '__');
	if( data == '.' ) {
            console.log('movement complete!');
	    waitForIdle_complete = 1;
	}
    });


    var q = async.queue(function (task, callback) {
	console.log('queue: ' + task.name);
	if( task.cmd ) {
	    sp.write( task.cmd ); 
	    callback();
	} else {
	    waitForIdle( function() { callback(); } );
	}
    }, 1 );
    q.drain = function() {
	console.log('queue: all items have been processed');
	process.exit();
    }
    q.pushAndWait = function( name, cmd ) {
	this.push( { name: name, cmd: cmd });
	this.push( { name: 'wait',  wait: 1 } );
	}
    q.push( { name: 'close', cmd: "#4 P1050 T2000 \r" });
    q.push( { name: 'wait',  wait: 1 } );
    q.push( { name: 'open',  cmd: "#4 P1900 T2000 \r" });
    q.push( { name: 'wait',  wait: 1 } );
    q.pushAndWait( "close", "#4 P1050 T1500 \r" );
    q.pushAndWait( "open",  "#4 P1900 T2000 \r" );

});

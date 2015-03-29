#!/bin/env node

var http = require( 'http' );

var PROTOCOL = process.env.PROTOCOL || 'http';
var HOST = process.env.HOST || process.env.OPENSHIFT_NODEJS_PORT || '127.0.0.1';
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_IP || 3080;

console.log( 'server initialized..' );

var server = http.createServer(function ( req, res ){
	res.end( 'Server running at: ' + PROTOCOL + '://' + HOST + ': ' + PORT + ' - worker id: ' + process.pid );
})
.listen( PORT );



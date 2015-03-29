#!/bin/env node

var http = require( 'http' );

var PROTOCOL = process.env.PROTOCOL || 'http';
var HOST = process.env.HOST ||  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3080;

console.log( 'PORT' + process.env.OPENSHIFT_NODEJS_PORT );
console.log( 'IP' + process.env.OPENSHIFT_NODEJS_IP );

http.createServer(function ( req, res ){
	console.log( 'request' );
	res.end( 'Server running at: ' + PROTOCOL + '://' + HOST + ': ' + PORT + ' - worker id: ' + process.pid );
})
.listen( 8080, function (){
	console.log( 'Server running at: ' + PROTOCOL + '://' + HOST + ': ' + PORT + ' - worker id: ' + process.pid );
});




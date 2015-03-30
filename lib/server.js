#!/bin/env node

var express = require( 'express' );

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app = express();

app.get( '/', function ( req, res, next ){

	console.log('%s: Received %s - request: ' + req.connection.remoteAddress , Date( Date.now() ) );

	res.setHeader( 'Content-Type', 'text/html' );
	res.send( 'Zewtree app.' );

});


app.listen( port, ipaddress, function(){
	console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), ipaddress, port );
});
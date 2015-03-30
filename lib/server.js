var express = require( 'express' );
var domain = require( './domain' );
var dispatcher = require( './dispatcher' );

var PROTOCOL = process.env.PROTOCOL || 'http';
var HOST = process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

module.exports = function ( ENV, cluster ){

	var app = express();

	var server = app.listen( PORT, HOST, function () {
		setTimeout(function (){
			console.log( 'Server running at: ' + PROTOCOL + '://' + HOST + ': ' + PORT + ' - worker id: ' + process.pid );
		}, 100 );
	});

	app.get('/', function ( req, res ) {
		console.log( 'Incoming request from:', req.connection.remoteAddress, 'worker id:', process.pid )
		if( ENV == 'production' ){
			//domain( req, res, server, cluster );
			res.end( 'production ok' );
		}

		else{
			res.end( 'dev ok' );
			//dispatcher.dispatch( req, res );
		}
	});

};


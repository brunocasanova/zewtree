var express = require( 'express' );
var domain = require( './domain' );

var PROTOCOL = process.env.PROTOCOL || 'http';
var HOST = process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

module.exports = function ( ENV, cluster ){

	var app = express();

	var server = app.listen( PORT, HOST, function () {
		setTimeout(function (){
			console.log( '[SERVER]: Running at: ' + PROTOCOL + '://' + HOST + ':' + PORT, '[WORKER]: ID', process.pid + '...' );
		}, 100 );
	});

	app.get('/', function ( req, res ) {
		console.log( '[REQUEST]: Incoming request from:', req.connection.remoteAddress, '[WORKER]: ID', process.pid );

		if( ENV == 'production' ){
			
			try{
				domain( req, res, server, cluster );
			}

			catch( e ){
				console.log( '[SERVER]: ', e.stack );
				res.statusCode = 500;
				res.setHeader( 'content-type', 'text/plain' );
				res.end( 'Oops, there was a problem!\n\n[STACK]: ' + e.stack );
			}

		}

		else{
			res.end( 'dev ok' );
		}
	});

};


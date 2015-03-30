var http = require( 'http' );
var domain = require( './domain' );
var dispatcher = require( './dispatcher' );

var PROTOCOL = process.env.PROTOCOL || 'http';
var HOST = process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

module.exports = function ( ENV, cluster ){
	console.log( 'server initialized..' );

	var server = http.createServer(function ( req, res ){
		
		if( ENV == 'production' ){
			domain( req, res, server, cluster );
		}

		//dispatcher.dispatch( req, res );
		res.end( 'ok' );

	})
	.listen( PORT, HOST, function () {
		console.log( 'Server running at: ' + PROTOCOL + '://' + HOST + ': ' + PORT + ' - worker id: ' + process.pid );
	});

};


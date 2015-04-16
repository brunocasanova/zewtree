var log = require( './zlogger' );

var app = require( './app' );

// Error 400 handling
app.use(function ( req, res, next ){
	res.statusCode = 400;
	res.setHeader( 'content-type', 'text/plain' );
	res.end( 'Error 400 Page not found!');
});

// Error 500 handling
app.use(function ( err, req, res, next ){
	res.statusCode = 500;
	res.setHeader( 'content-type', 'text/plain' );
	res.end( 'Error 500 Internal server error!\n\n[ERROR STACK]: ' + err.stack || err );

	console.log( log.error.system, log.system.app, err.stack || err );
});
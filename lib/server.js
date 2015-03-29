var http = require( 'http' );

module.exports = function (){
	console.log( 'server initialized..' );

	var PROTOCOL = process.env.PROTOCOL || 'http';
	var HOST = process.env.OPENSHIFT_NODEJS_IP;
	var PORT = process.env.OPENSHIFT_NODEJS_PORT || 80;

	var server = http.createServer(function ( req, res ){
		res.end( 'ok' );
	})
	.listen( PORT );
};


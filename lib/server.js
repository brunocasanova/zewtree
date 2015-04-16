var log = require( './zlogger' );

var app = require( './app' );

app.set( 'PROTOCOL', process.env.PROTOCOL || 'http' );
app.set( 'HOST', process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1' );
app.set( 'PORT', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080 );

app.listen( app.set( 'PORT' ), app.set( 'HOST' ), function (){
	console.log(
		log.main.server, 'Running at: ' + app.get( 'PROTOCOL' ) + '://' + app.get( 'HOST' ) + ':' + app.get( 'PORT' ),
		'>', log.main.worker, process.pid
	);
});
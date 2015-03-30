
var EventEmitter = require( 'events' ).EventEmitter;
var domain = require( 'domain' );

var emitter = new EventEmitter();
emitter.setMaxListeners( 0 );

var domain = domain.create();

module.exports = function ( req, res, server, cluster ){
	console.log( '[DOMAIN]: Initialized..' );

	process.send({
		cmd: 'domain',
		error: 'domain'
	});

	domain.add( emitter );

	domain.add( req );
	domain.add( res );

	domain.once( 'error', function ( err ) {

		var killtimer = setTimeout(function() {
			process.exit( 1 );
		}, 30000 );
	
		killtimer.unref();
		server.close();
		cluster.worker.disconnect();

		process.send({
			cmd: 'error',
			error: err.stack
		});

	});

	// Attach listener
	//emitter.on( 'error', function ( err ){
	//  console.log('Handled by listener:' );
	//});

	//emitter.emit( 'error', new Error('this will be handled by listener') );

	//emitter.removeAllListeners('error');

	//emitter.emit('error', new Error('this will be handled by domain'));

	//domain.remove( emitter );

	//emitter.emit( 'error', new Error('woops, unhandled error. This is converted to an exception. Time to crash!') );

	domain.run(function () {
		// Sent the request to be dispatched
		res.end( 'production domain ok' );
	});

	

};

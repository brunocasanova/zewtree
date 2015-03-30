
var EventEmitter = require( 'events' ).EventEmitter;
var domain = require( 'domain' );

var emitter = new EventEmitter();
var domain = domain.create();

emitter.setMaxListeners( 0 );

var dispatcher = require( './dispatcher.js' );

module.exports = function ( req, res, server, cluster ){
	console.log( 'domain initialized..' );

	domain.add( emitter );

	domain.on( 'error', function ( err ) {

		try{
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
			
		}

		catch( e ){
			console.log( e.stack );
			res.statusCode = 500;
			res.setHeader( 'content-type', 'text/plain' );
			res.end( 'Oops, there was a problem!\n' );
		}

	});

	domain.add( req );
	domain.add( res );

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
		dispatcher.dispatch( req, res );
	});

	

};

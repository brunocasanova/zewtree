var log = require( './zlogger' );

module.exports = require( './env' )
.then(function ( env ){

	if( env == 'production' ){
		return require( './cluster' )()
		.then(function ( slave ){
			
			if( ! slave ) throw new Error( 'Slave not ready!' );

			return {
				worker: slave.worker || false,
				env:env,
			};

		});
	}

	return {
		worker: false,
		env: env,
	}; 

})

.then(function ( state ){

	if( state.env == 'dev' || state.worker ){
		require( './database' );
		require( './error' );
		require( './server' );
	}

})

.catch(function ( err ){
	console.log( log.error.system, log.system.system, log.color.red( err.stack || err ) );
	process.exit( 1 );
});

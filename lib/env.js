var Promise = require( 'bluebird' );

var log = require( './zlogger' );

module.exports = new Promise(function ( fullfil, reject ){

	if( process.env.ENV ) return fullfil( process.env.ENV );

	process.env.ENV = process.env.PRODUCTION && 'production' || process.env.DEV && 'dev';

	if( process.env.PRODUCTION ){
		console.log( log.main.zewtree, log.env.production, 'node version:', process.version );
		return fullfil( 'production' );
	}

	if( process.env.DEV ){
		console.log( log.main.zewtree, log.env.dev, 'node version:', process.version );

		return fullfil( 'dev' );
	}

	fullfil( false );

})
.then(function ( env ){

	// Default environment
	process.env.ENV = ! env && 'production' || env;

	if( env != 'dev' ) console.log( log.main.zewtree, log.env.production, 'node version:', process.version );

	return process.env.ENV;
})
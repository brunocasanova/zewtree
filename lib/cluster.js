var OS = require( 'os' );
var Cluster = require( 'cluster' );
var Promise = require( 'bluebird' );

var log = require( './zlogger' );

var worker = {};

module.exports = function(){

	return Cluster.isMaster && new Promise(function ( fullfil, reject ){

		if( ! Cluster.isMaster ) reject( true );

		var cpus = OS.cpus();

		if( ! cpus || cpus.length == 0 ) reject( new Error( 'Must have at least one cpu... :)' ) );

		fullfil( cpus );
	})

	// for each worker
	.each(function ( cpus ){
		worker = Cluster.fork();

		worker.setMaxListeners( 0 );

		if( ! worker || worker.__proto__.constructor.name != 'Worker' ) throw new Error( 'Defining worker gone bad!!' );

		worker.on( 'exit', exitListener );

		worker.on( 'message', messageListener );
	})

	||

	new Promise(function ( fullfil ){
		fullfil({ worker: Cluster.isWorker });
	});

	function messageListener( message ){

		console.log( 'message: ', message );
		console.log( arguments );

	}

	function exitListener( workerId, code, signal ){
		if( signal ){
			console.log( log.main.worker, log.error.system, 'Killed by signal:', signal );
			return;
		}

		if( code ){
			console.log( log.main.worker, 'Exited with error code:', code );
			return;
		}

		if( workerId ){
			var worker, id = { id: workerId };

			worker = Cluster.fork( /*id*/ );

			console.log( log.main.worker, log.system.restart, 'Restarting process..' );
		}

	}

};

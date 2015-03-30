var util = require( 'util' );
var cluster = require( 'cluster' );
var CPUcount = require( 'os' ).cpus().length;

var ENV = process.env.ENV || 'production';
var slave = cluster.isWorker && 'isWorker' || cluster.isMaster && 'isMaster';
var server, env = {};

env.dev = function (){
	require( './server' )( ENV );
};

env.production = function (){
	this[ slave ]();
};

env.isMaster = function(){
	console.log( '\x1b[32m' + '[MASTER]: ID', process.pid , 'loaded!', '\x1b[0m' );

	var map = {};

	for( var i = 0; i < CPUcount; i++ ){
		forkWorker( i );
	}

	Object.keys( cluster.workers ).forEach(function ( id ){

		cluster.workers[id].on( 'message', function ( message ){

			if( message.cmd.toLowerCase() == 'error' ){
				util.log( '\x1b[33m' + '[MASTER]:', 'MESSAGE', message.error );
			}
		});

		cluster.workers[id].on( 'exit', function ( worker, code, signal ){
			var old_worker_id = map[worker.id];
 
			delete map[worker.id];

			forkWorker( old_worker_id );

			var message = signal && '\x1b[33m' + '[MASTER]: Worker was killed by signal: ' + signal + '\x1b[0m' ||
				code !== 0 && '\x1b[33m' + '[MASTER]: Worker exited with error code: ' + code + '\x1b[0m' ||
				'\x1b[33m' + '[MASTER]: Restarting Worker...' + '\x1b[0m';

			util.log( message );
		});

	});

	function forkWorker( id ){
		cluster.schedulingPolicy = cluster.SCHED_NONE;

		var worker = cluster.fork({ id: id });

		map[ worker.id ] = id;
	}

};

env.isWorker = function(){
	server = require( './server' )( ENV, cluster );
	console.log( '\x1b[33m' + '[WORKER]: ID', process.pid, 'loaded!' + '\x1b[0m' );
};

env[ ENV.toLowerCase() ]();


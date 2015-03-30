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
	console.log( '[MASTER] ID:',process.pid , 'loaded...' );

	var map = {};

	for( var i = 0; i < CPUcount; i++ ){
		forkWorker( i );
	}

	console.log( map );

	Object.keys( cluster.workers ).forEach(function ( id ){

		cluster.workers[id].on( 'message', function ( message ){

			if( message.cmd.toLowerCase() == 'error' ){
				util.log( '[SERVER]:', message.error );
			}
		});

		cluster.workers[id].on( 'exit', function ( worker, code, signal ){
			var old_worker_id = map[worker.id];
 
			delete map[worker.id];

			forkWorker( old_worker_id );

			var message = signal && 'worker was killed by signal: ' + signal ||
				code !== 0 && 'worker exited with error code: ' + code ||
				'Restarting Worker...';

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
	console.log( '[WORKER]: ID', process.pid, 'loaded..' );
};

env[ ENV.toLowerCase() ]();

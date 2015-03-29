var util = require( 'util' );
var cluster = require( 'cluster' );
var CPUcount = require( 'os' ).cpus().length;

var ENV = process.env.ENV || 'production';
var slave = cluster.isWorker && 'isWorker' || cluster.isMaster && 'isMaster';
var server, env = {};

env.dev = function (){
	console.log( 'running in dev...' );
	require( './server' )( ENV );
};

env.production = function (){
	console.log( 'running in production...' );

	this[ slave ]();
};

env.isMaster = function(){
	console.log( 'master loaded...' );

	for( var i = 0; i < CPUcount; i++ ){
		cluster.fork();
	}

	Object.keys( cluster.workers ).forEach(function ( id ){
		message( cluster.workers[id] );
		exit( cluster.workers[id] );
	});

};

env.isWorker = function(){
	console.log( 'worker', process.pid, 'loaded..' );
	server = require( './server' )( ENV, cluster );
};

console.log( 'cluster initialized in', ENV.toLowerCase(), 'mode..' );
env[ ENV.toLowerCase() ]();

function message( worker ){
	worker.on( 'message', function ( message ){

		if( message.cmd.toLowerCase() == 'error' ){
			util.log( '[SERVER]:', message.error );
		}
	});
}

function exit( worker ){
	worker.on( 'exit', function ( code, signal ){
		var message = signal && 'worker was killed by signal: ' + signal ||
			code !== 0 && 'worker exited with error code: ' + code ||
			'Restarting Worker...';

		util.log( message );
	});
}


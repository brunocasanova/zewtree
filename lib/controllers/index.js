var Promise = require( 'bluebird' );

var fs = require( 'fs' );
var	path = require( 'path' );

var log = require( '../zlogger' );

var files = [];
var controllers = {};
controllers.routes = [];

controllers.getControllers = function (){

	var dirFiles = fs.readdirSync( __dirname );

	if( dirFiles.length < 1 ) reject( new Error( 'Controllers directory or empty!' ) );

	fullfil( dirFiles );

};

var promise = new Promise(function ( fullfil, reject ){
	
})
.each(function ( file ){
	if( ! file ) throw new Error( 'No controllers aliases found!' );

	if( file.indexOf( '.js' ) !== -1 && file !== 'index.js' ){
		files.push( path.basename( file, '.js' ) );
	}
})
.then(function (){
	if( files.length < 1 ) throw new Error( 'No controllers found!' );
	return files;
})
.each(function ( controller ){
	controllers[ controller ] = require( path.join( __dirname, controller) );
	controllers.routes.push( controllers[ controller ].routes );
	console.log( log.main.controller, controller, 'loaded!' );
})
.then(function (){
	console.log( log.main.controller, 'successfully Loaded!' );
});

module.exports = controllers;

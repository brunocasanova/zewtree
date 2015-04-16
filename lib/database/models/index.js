var Promise = require( 'bluebird' );

var fs = require( 'fs' );
var path = require( 'path' );

var log = require( '../../zlogger' );

var database = require( '../database' );

var promise = new Promise(function ( fullfil ){
	var files = fs.readdirSync( __dirname );

	if( files.length < 1 ) reject( new Error( 'Models not found!' ) );

	fullfil( files );
})
.then(function ( file ){
	if( ! file ) throw new Error( 'Error importing models!' );

	if( typeof database != 'object' ) throw new Error( 'Database not loaded!' );
	
	console.log( log.main.database, 'Sequelize version:', database.Sequelize.Utils._.VERSION );

	return file;
})
.each(function ( file ){

	if( file.indexOf( '.js' ) !== -1 && file !== 'index.js' ){
		database.sequelize.import( __dirname + '/' + file );
		console.log( log.main.models, file.replace( '.js', '' ) + ' loaded!' );
	}
	
})

module.exports = promise;
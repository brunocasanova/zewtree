var log = require( '../zlogger' );

require( './models' )
.then(function (){
	console.log( log.main.models, 'sucessfully loaded!' );
	return require( './database.js' ).sequelize.sync();
});
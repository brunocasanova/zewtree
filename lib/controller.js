var view = require( './view' );

var controller = function (){};

controller.prototype = {

	view: function( user, callback ) {
		var callback = ( typeof callback === 'function' ) ? callback : function() {};
		
		var data = {
			user : user ? user : 'nobody',
		};

		view.renderView( 'view', data, function ( data ){
			callback( data );
		});
	},

	home: function( arg, callback ) {
		var callback = ( typeof callback === 'function' ) ? callback : function() {};

		var data = {
			users: {
				name: 'link',
				viewLink: 'view',
			}
		};

		view.renderView( 'home', data, function ( data ){
			callback( data );
		});
		
	},

}

module.exports = new controller();
module.exports = [

	{
		url: [ '/' ],
		method: 'get',
		action: [ 'stack' ],

		stack: function ( req, res ) {

			console.log( 'rendered !!' );

			res.send( 'la' )
		},

	},

];
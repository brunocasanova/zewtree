var fs = require( 'fs' );
var url = require( 'url' );

var handler = require( './handler' );
var controller = require( './controller' );

this.dispatch = function( req, res ){
	console.log( 'dispatcher initialized..' );
	
	//set up response object
	responseHandler = new handler( res );

	var requestedUrl = url.parse( req.url );

	var parts, action, argument;

	if( requestedUrl.pathname == '/' ){
		action = 'home';
	}

	else{
		parts = req.url.split( '/' );
		actions = parts[1];
		argument = parts[2];
	}

	//only executing registered actions
	if( typeof controller[ action ] == 'function' ){
	
		try {
			controller[ action ]( argument, function ( content ){

				if( content ){
					responseHandler.renderHtml( content );
				}

				else{
					responseHandler.serverError( 404 );
				}

			});

		}

		catch( error ){
			console.log( error );
		}

	}

	else{
		responseHandler.renderWebroot( requestedUrl );
	}

};
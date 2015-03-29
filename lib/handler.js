var fs = require( 'fs' );
var path = require( 'path' );

// Constructor
var handler = function( res ){
	this.res = res;
};

// properties and methods
handler.prototype = {

	//store the node response object so we can operate on it
	res: {},

	serverError : function( code, content ){
		var self = this;

		self.res.writeHead( code || 500, { 'Content-Type': 'text/plain' });
		self.res.end( content || 'Unknown error.' );
	},

	renderHtml : function( content ){
		var self = this;

		self.res.writeHead( 200, { 'Content-Type': 'text/html' } );
		self.res.end( content, 'utf-8' );
	},

	renderWebroot : function( requestedUrl ){
		var self = this;
		var urlReq = path.join( __dirname, 'webroot', requestedUrl.href );

		//try and match a file in our webroot directory
		fs.readFile( urlReq, function ( error, content ){
			
			if( error ){
				self.serverError( 404, '404 Bad Request');
			}

			else{
				var extension = ( requestedUrl.pathname.split( '.' ).pop() );
				
				self.res.writeHead( 200, self.getHeadersByFileExtension( extension ) );
				self.res.end( content, 'utf-8' );
			}

		});
	},

	getHeadersByFileExtension : function( extension ){
		var self = this;
		var headers = {};

		switch( extension ){

			case 'css':
				headers[ 'Content-Type' ] = 'text/css';
			break;

			case 'js':
				headers[ 'Content-Type' ] = 'application/javascript';
			break;

			case 'ico':
				headers[ 'Content-Type' ] = 'image/x-icon';

			default:
				headers[ 'Content-Type' ] = 'text/plain';

		}

		return headers;
	},
	
};

// node.js module export
module.exports = handler;

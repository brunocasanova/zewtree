var path = require( 'path' );

var express = require( 'express' );
var app = express();

var log = require( './zlogger' );

var middlewares = {};

require( './middlewares' )
.forEach(function ( reqs ){
	middlewares[ reqs[0] ] = require( reqs[1] );
	console.log( log.main.middlewares, reqs[0], 'loaded!' );
});

app.set( 'views', path.join( __dirname, '/views/' ) );
app.set( 'view engine', 'ect' );
app.engine( 'ect', middlewares.ECT({
	watch: true,
	root: path.join( __dirname, 'views/' )
}).render );

app.use( '/assets/css', express.static( path.join( __dirname, 'assets', 'css' ) ) );
app.use( '/assets/javascript', express.static( path.join( __dirname, 'assets', 'javascript' ) ) );

app.use( middlewares.bodyParser.json() );
app.use( middlewares.bodyParser.urlencoded({
	extended: true,
}) );

app.use( middlewares.cookieParser() );
app.use( middlewares.Session({
	secret: 'session', 
	resave: false,
	saveUninitialized: true
}) );

app.use( middlewares.Router );

//app.use( middlewares.router );

module.exports = app;

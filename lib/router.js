var Router = require( 'emvici-router' );

var router = module.exports = new Router({
	/* options */
	throw404: false
});

console.log( require( './user' ) );

router.addRoutes( require( './user' ) );

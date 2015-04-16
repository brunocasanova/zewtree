module.exports = {

	routes: [
		'/',
		'/home',
		'/home/index',
		'/home/register',
	],

	index: function( req, res, next ){
		//req.body.message = req.session.message || '!Default home index message!';
		//next();

		res.send( req.config.controller );
	},

	register: function( req, res, next ){
		//req.body.message = req.session.message || '!Register view!';
		next();
	},

};
module.exports = {
	
	routes: [
		// Views
		'/user/:id',
		'/user/profile/:id',

		// Actions
		'/user/index',
		'/user/register',
		'/user/login',
		'/user/logout',
		'/user/add/:username/:password/:gender',
		'/user/remove/:id',
	],

	index: function( req, res, next ){

	},

	profile: function( req, res, next ){
		var id = req.params.id;
		if( ! id ) return next();

		req.models.user.find({
			where: {
				id: parseInt( id ),
				deleted_at: null,
			}
		})
		.then(function ( user ){
			if( ! user ){
				throw new Error( 'User not found' );
			}

			next();
		})
		.catch(function ( err ){
			req.session.message = JSON.stringify( err );

			res.redirect( '/home/index' );
		});

	},

	login: function( req, res, next ){
		if( ! req.body.username || ! req.body.password ){
			req.body.message = '!!Fields required!!';
			return res.redirect( '/home/index' );
		}

		req.models.user.find({
			where: {
				username: req.body.username,
				password: req.body.password,
			},
			attributes: [ 'id', 'username', 'gender' ],
		})
		.then(function ( user ){
			if( ! user ){
				throw new Error( 'User not found' );
			}

			this.setSession( user, req );

			res.redirect( '/home/index' );
		})
		.catch(function ( err ){
			req.session.message = err.message;

			res.redirect( '/home/index' );
		});

	},

	logout: function( req, res, next ){
		req.session.destroy();
		req.body.logged = false;

		res.redirect( '/home/index' );
	},

	register: function( req, res, next ){
		if(
			! req.body.username ||
			! req.body.password ||
			! req.body.gender
		){
			return next();
		}

		req.models.user.create({
			username: req.body.username,
			password: req.body.password,
			gender: req.body.gender
		})
		.then(function ( user ){

			this.setSession( user, req );

			res.redirect( '/home/index' );
		})
		.catch(function ( err ){
			req.session.message = JSON.stringify( err );

			res.redirect( '/home/index' );
		});
	},

	remove: function( req, res, next ){
		if( ! req.params.id || req.params.id < 1 ){
			return next();
		}

		req.models.user.destroy({
			where: {
				id: parseInt( req.params.id )
			}
		})
		.then(function ( user ){
			if( user ){
				res.send( 'User destroyed.' );
			}
		})
		.catch(function ( err ){
			req.session.message = JSON.stringify( err );

			res.redirect( '/home/index' );
		});
	},

};
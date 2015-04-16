module.exports = function( sequelize, DT ){
	
	return sequelize.define( 'email', {

		id: {
			type: DT.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},

		email: {
			type: DT.STRING,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
			unique: true,
		},
		
	});

};
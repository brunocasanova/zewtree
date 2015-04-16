module.exports = function( sequelize, DT ){
	
	return sequelize.define( 'phone', {

		id: {
			type: DT.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},

		mobile: {
			type: DT.STRING,
			validate: {
				notEmpty: true,
			},
		},

		fixed: {
			type: DT.STRING,
			validate: {
				notEmpty: true,
			},
		},
		
	});

};
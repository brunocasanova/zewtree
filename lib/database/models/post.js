module.exports = function( sequelize, DT ){
	
	return sequelize.define( 'post', {

		id: {
			type: DT.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},

		text: {
			type: DT.STRING(1000),
		},
		
	});

};
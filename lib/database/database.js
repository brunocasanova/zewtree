var config = require( './config' )[ process.env.ENV ];

var database = {};
var	options = {};

database.Sequelize = require( 'sequelize' );

options.dialect = 'mysql';
options.port = 3306;
options.logging = false; //console.log,
options.paranoid = true;
options.underscored = true;
options.freezeTableName = true;
options.syncOnAssociation = true;
options.charset = 'utf8';
options.collate = 'utf8_general_ci';
options.define = {
	paranoid: true,
	underscored: true,
	freezeTableName: true,
	syncOnAssociation: true,

	charset: 'utf8',
	collate: 'utf8_general_ci',
	
	classMethods: {
		method1: function () {
			return 'm1*****';
		}
	},
	instanceMethods: {
		method2: function () {
			return 'm2*****';
		}
	},
	
	timestamps: true
};

database.sequelize = new database.Sequelize( config.database, config.username, config.password, options );

module.exports = database;

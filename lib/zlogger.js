var log = require( 'colog' );

module.exports = {
	color: log,
	main: {
		zewtree: log.cyan( log.underline( '[ZEWTREE]' ) ),

		master: log.green( '[MASTER]:' ),

		worker: log.yellow( '[WORKER]:' ),

		server: log.cyan( '[SERVER]:' ),

		router: log.magenta( '[ROUTER]:' ),

		controller: log.blue( '[CONTROLLER]:' ),

		database: log.magenta( '[DATABASE]:' ),

		models: log.yellow( '[MODELS]:' ),

		middlewares: log.green( '[MIDDLEWARES]:' ),

	},
	default: {
		node: log.green( '[NODE]:' ),
	},
	env: {
		web: log.red( '[WEB]' ),
		dev: log.red( '[DEV]' ),
	},
	error: {
		system: log.red( '[ERROR]:' ),
	},
	system: {
		system: log.green( '[SYSTEM]' ),
		app: log.cyan( '[APP]' ),
		restart: log.red( '[RESTART]' ),
	},
};
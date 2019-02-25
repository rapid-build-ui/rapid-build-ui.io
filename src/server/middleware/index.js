/*************************
 * APPLICATION MIDDLEWARE
 *************************/
const compression = require('compression');
const httpToHttps = require('./http-to-https');

/* Constants
 ************/
const ignoreHostnames = [
	'localhost',
	'jyounce-mac.local',
	'yokun-mac.local',
	'dev.rapid-build-ui.io',
	'staging.rapid-build-ui.io'
]

/* Middleware
 *************/
const Middleware = {
	compression(app) { // :void
		if (process.env.NODE_ENV !== 'production') return;
		app.use(compression());
	},
	httpToHttps(app) { // :void
		app.use(httpToHttps({ ignoreHostnames }));
	}
}

/* Export it!
 *************/
module.exports = Middleware;
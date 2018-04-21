/*******************
 * RB-UI WEB SERVER
 *******************/
module.exports = server => {
	const app         = server.app;
	const httpToHttps = require('./middleware/http-to-https');

	/* Http to Https (301 redirect)
	 ****************/
	app.use(httpToHttps({
		ignoreHostnames: [
			'localhost',
			'jyounce-mac.local',
			'yokun-mac.local',
			'staging.rapid-build-ui.io'
		]
	}));

	/* Routes
	 *********/
	app.get('/api/superheroes', (req, res) => {
		res.json(['Superman', 'Wolverine', 'Wonder Woman']);
	});
};

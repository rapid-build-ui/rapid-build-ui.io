/****************************
 * RAPID BUILD UI WEB SERVER
 ****************************/
module.exports = async server => {
	require('./bootstrap');
	const app        = server.app;
	const middleware = require('./middleware');
	const routes     = require('./routes');

	/* Middleware
	 *************/
	middleware.compression(app);
	middleware.httpToHttps(app);

	/* Routes
	 *********/
	try {
		routes.changelog(app);
		await routes.cssVars(app, { paths: server.paths });
		routes.data(app);
		routes.examples(app, { paths: server.paths });
		routes.superheroes(app);
		routes.tests(app);
	} catch (error) {
		const eMsg = !!error.stack ? error.stack : error.toString();
		console.error(eMsg.error);
	}
};

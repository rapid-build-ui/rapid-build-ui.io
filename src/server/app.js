/****************************
 * RAPID BUILD UI WEB SERVER
 ****************************/
module.exports = server => {
	const app        = server.app;
	const middleware = require('./middleware');
	const routes     = require('./routes');

	/* Middleware
	 *************/
	middleware.compression(app);
	middleware.httpToHttps(app);

	/* Routes
	 *********/
	routes.changelog(app);
	routes.cssVars(app, { paths: server.paths });
	routes.examples(app, { paths: server.paths });
	routes.superheroes(app);
};

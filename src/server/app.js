/****************************
 * RAPID BUILD UI WEB SERVER
 ****************************/
module.exports = server => {
	const app        = server.app;
	const middleware = require('./middleware');
	const routes     = require('./routes');

	/* Middleware
	 *************/
	middleware.httpToHttps(app);

	/* Routes
	 *********/
	routes.changelog(app);
	routes.superheroes(app);
	routes.staticRoutes(app, { paths: server.paths });
};

/*********************
 * APPLICATION ROUTES
 *********************/
const changelog    = require('./changelog');
const superheroes  = require('./superheroes');
const staticRoutes = require('./static');

const Routes = {
	changelog,
	superheroes,
	staticRoutes
}

/* Export it!
 *************/
module.exports = Routes;
/*********************
 * APPLICATION ROUTES
 *********************/
const changelog   = require('./changelog');
const superheroes = require('./superheroes');

const Routes = {
	changelog,
	superheroes
}

/* Export it!
 *************/
module.exports = Routes;
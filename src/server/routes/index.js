/*********************
 * APPLICATION ROUTES
 *********************/
const changelog   = require('./changelog');
const examples    = require('./examples');
const superheroes = require('./superheroes');

const Routes = {
	changelog,
	examples,
	superheroes
}

/* Export it!
 *************/
module.exports = Routes;
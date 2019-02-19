/*********************
 * APPLICATION ROUTES
 *********************/
const changelog   = require('./changelog');
const cssVars     = require('./css-vars');
const examples    = require('./examples');
const superheroes = require('./superheroes');

const Routes = {
	changelog,
	cssVars,
	examples,
	superheroes
}

/* Export it!
 *************/
module.exports = Routes;
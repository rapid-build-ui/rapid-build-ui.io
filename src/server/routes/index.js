/*********************
 * APPLICATION ROUTES
 *********************/
const changelog   = require('./changelog');
const cssVars     = require('./css-vars');
const examples    = require('./examples');
const superheroes = require('./superheroes');
const tests       = require('./tests');

const Routes = {
	changelog,
	cssVars,
	examples,
	superheroes,
	tests
}

/* Export it!
 *************/
module.exports = Routes;
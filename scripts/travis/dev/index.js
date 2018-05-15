/*******************
 * TRAVIS DEV BUILD
 *******************/
require('../../bootstrap/colors');
const args  = process.argv.slice(2);
const paths = {
	showcase:   args[0],
	components: args[1]
};
const components = require('./components')(paths);
const steps      = require('./steps')(paths, components);

/* Build Steps: IN ORDER!
 *************************/
!async function() {
	const xxx = await steps.cloneComponentRepos();
	console.log('XXX:');
	console.log(xxx[0].stderr);
	process.exit(1);
	steps.setupComponents();
	steps.setupShowcase();
	steps.buildShowcase();
}();

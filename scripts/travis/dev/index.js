/*****************************
 * TRAVIS STEPS FOR DEV BUILD
 *****************************/
require('../../bootstrap/colors');
const args  = process.argv.slice(2);
const paths = {
	showcase:   args[0],
	components: args[1]
};
const components = require('./get-components')(paths);

console.log(components);

/* EXIT FOR TESTING
 *******************/
process.exit(1);
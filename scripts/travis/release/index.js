/***********************
 * TRAVIS RELEASE BUILD
 ***********************/
require('../../bootstrap/colors');
const args  = process.argv.slice(2);
const paths = {
	showcase: args[0]
};
const steps = require('./steps')(paths);

/* Build Steps: IN ORDER!
 *************************/
steps.installClient();
steps.installServer();
steps.buildShowcase();

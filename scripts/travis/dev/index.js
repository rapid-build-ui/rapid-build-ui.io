/* TRAVIS STEPS FOR DEV BUILD
 *****************************/
require('../bootstrap/colors');
const args  = process.argv.slice(2);
const paths = {
	showcase:   args[0],
	components: args[1]
};

console.log(paths);

/* EXIT FOR TESTING
 *******************/
process.exit(1);
/*****************************
 * TRAVIS STEPS FOR DEV BUILD
 *****************************/
require('../../bootstrap/colors');
const args  = process.argv.slice(2);
const paths = {
	showcase:   args[0],
	components: args[1]
};
const components   = require('./get-components')(paths);
const { execSync } = require('child_process');

/* CLONE COMPONENT REPOS
 ************************/
// process.chdir(paths.components);
const CLONE_CMD = 'git clone --depth 1'
const cloneOpts = { cwd: paths.components };
for (const repoName of components.repoNames) {
	let cmd    = `${CLONE_CMD} ${repoName}`;
	let result = execSync(cmd, cloneOpts).toString();
	console.info(result.minor);
}

console.log(components);
console.log(process.cwd());

/* EXIT FOR TESTING
 *******************/
process.exit(1);
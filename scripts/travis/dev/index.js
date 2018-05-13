/*****************************
 * TRAVIS STEPS FOR DEV BUILD
 *****************************/
// require('../../bootstrap/colors');
const args  = process.argv.slice(2);
const paths = {
	showcase:   args[0],
	components: args[1]
};
const components   = require('./get-components')(paths);
const { execSync } = require('child_process');
console.log(components);

/* CLONE COMPONENT REPOS
 ************************/
const CLONE_CMD = 'git clone --depth 1'
const cloneOpts = { cwd: paths.components, stdio: [0,1,2] };
for (const repoName of components.repoNames) {
	let cmd    = `${CLONE_CMD} ${repoName}`;
	let result = execSync(cmd, cloneOpts)//.toString();
	console.log(result);
}

const resultX = execSync('ls -a1', { cwd: paths.components }).toString();
console.log(resultX);
console.log(process.cwd());

/* EXIT FOR TESTING
 *******************/
process.exit(1);
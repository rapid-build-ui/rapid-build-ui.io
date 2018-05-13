/*****************************
 * TRAVIS STEPS FOR DEV BUILD
 *****************************/
const args  = process.argv.slice(2);
const paths = {
	showcase:   args[0],
	components: args[1]
};
const components   = require('./get-components')(paths);
const { execSync } = require('child_process');
// console.log(components);

/* Clone Component Repos
 ************************/
const cloneCmd  = 'git clone --depth 1'
const cloneOpts = { cwd: paths.components, stdio: [0,1,2] };
for (const repoName of components.repoNames) {
	let cmd = `${cloneCmd} ${repoName}`;
	execSync(cmd, cloneOpts); console.log();
}

/* Setup Components
 *******************/
const setupCmd  = 'rapid-build prod publish && npm run link'
const setupOpts = { stdio: [0,1,2] };
for (const name of components.names) {
	setupOpts.cwd = `${paths.components}/${name}`
	execSync(setupCmd, setupOpts); console.log();
	if (name == 'rb-alert') process.exit(1);
}

/* Extra Logging
 ****************/
execSync('ls -a1', cloneOpts);
console.log();
console.log(process.cwd());

/* EXIT FOR TESTING
 *******************/
process.exit(1);
/*****************************
 * TRAVIS STEPS FOR DEV BUILD
 *****************************/
require('../../bootstrap/colors');
const args  = process.argv.slice(2);
const paths = {
	showcase:   args[0],
	components: args[1],
	yarnLink:   args[2]
};
const components   = require('./get-components')(paths);
const { execSync } = require('child_process');

/* Clone Component Repos
 ************************/
const cloneCmd  = 'git clone --depth 1'
const cloneOpts = { cwd: paths.components, stdio: [0,1,2] };
for (const [i, repoName] of components.repoNames.entries()) {
	console.info(`cloning ${components.names[i]}`.toUpperCase().attn);
	let cmd = `${cloneCmd} ${repoName}`;
	execSync(cmd, cloneOpts); console.log();
}

/* Setup Components
 *******************/
const setupCmd  = 'rapid-build prod publish && npm run link'
const setupOpts = { stdio: [0,1,2] };
for (const name of components.names) {
	console.info(`setup component ${name}`.toUpperCase().attn);
	setupOpts.cwd = `${paths.components}/${name}`
	execSync(setupCmd, setupOpts); console.log();
}

/* Setup Showcase and Build
 ***************************/
const showcaseOpts = { cwd: paths.showcase, stdio: [0,1,2] };
const showcaseSetupCmd = 'npm run setup'
const showcaseBuildCmd = 'rapid-build prod publish'
execSync(showcaseSetupCmd, showcaseOpts); console.log();
execSync(showcaseBuildCmd, showcaseOpts); console.log();

/* Extra Logging
 ****************/
// execSync('ls -a1', { cwd: paths.components, stdio: [0,1,2] });
// console.log();
//
// execSync('ls -a1', { cwd: `${paths.yarnLink}/@rapid-build-ui`, stdio: [0,1,2] });
// console.log();
//
// console.log(process.cwd());

/* EXIT FOR TESTING
 *******************/
// process.exit(1);
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

/* Clone Component Repos
 ************************/
const cloneCmd  = 'git clone --depth 1'
const cloneOpts = { cwd: paths.components, stdio: [0,1,2] };
for (const [i, repoName] of components.repoNames.entries()) {
	console.info(`cloning ${components.names[i]}`.toUpperCase().alert);
	let cmd = `${cloneCmd} ${repoName}`;
	execSync(cmd, cloneOpts); console.log();
}

/* Setup Components
 *******************/
const setupCmd  = 'rapid-build prod publish && npm run link'
const setupOpts = { stdio: [0,1,2] };
for (const name of components.names) {
	console.info(`setup component ${name}`.toUpperCase().alert);
	setupOpts.cwd = `${paths.components}/${name}`
	execSync(setupCmd, setupOpts); console.log();
}

/* Setup Showcase
 *****************/
const showcaseSetupCmd = 'npm run setup'
const showcaseOpts     = { cwd: paths.showcase, stdio: [0,1,2] };
console.info(`setup showcase`.toUpperCase().alert);
execSync(showcaseSetupCmd, showcaseOpts); console.log();

/* Build Showcase
 *****************/
const buildCmd  = 'rapid-build prod publish'
const buildOpts = { cwd: paths.showcase, stdio: [0,1,2] };
console.info(`build showcase`.toUpperCase().alert);
execSync(buildCmd, buildOpts); console.log();
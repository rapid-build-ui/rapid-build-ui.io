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
const { execSync } = require('child_process');

/* Build Steps: IN ORDER!
 *************************/
!async function() {
	const repos           = await steps.cloneComponentRepos();
	// const setupComponents = await steps.setupComponents();
	let pathExt = '';
	// let pathExt = '/src/client/scripts';
	// let pathExt = '/dist/client/scripts';
	// console.log('REPOS:', repos);
	// console.log('REPOS:', setupComponents);
	execSync('ls -a1', { cwd: paths.components, stdio: [0,1,2] });
	execSync('ls -a1', { stdio: [0,1,2], cwd: `${paths.components}/rb-alert${pathExt}` });
	execSync('ls -a1', { stdio: [0,1,2], cwd: `${paths.components}/rb-button${pathExt}` });
	execSync('ls -a1', { stdio: [0,1,2], cwd: `${paths.components}/rb-icon${pathExt}` });
	execSync('ls -a1', { stdio: [0,1,2], cwd: `${paths.components}/rb-input${pathExt}` });
	execSync('ls -a1', { stdio: [0,1,2], cwd: `${paths.components}/rb-nav${pathExt}` });
	execSync('ls -a1', { stdio: [0,1,2], cwd: `${paths.components}/rb-popover${pathExt}` });
	console.log();
	process.exit(1);
	// steps.cloneComponentRepos();
	steps.setupComponents();
	steps.setupShowcase();
	steps.buildShowcase();
}();

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
	const repos = await steps.cloneComponentRepos();
	console.log('stdout:', repos[0].stdout);
	console.log('stderr:', repos[0].stderr);
	execSync('ls -a1', { cwd: paths.components, stdio: [0,1,2] });
	execSync('ls -a1', { cwd: paths.components+'/rb-alert/src/client/scripts', stdio: [0,1,2] });
	execSync('ls -a1', { cwd: paths.components+'/rb-button/src/client/scripts', stdio: [0,1,2] });
	execSync('ls -a1', { cwd: paths.components+'/rb-icon/src/client/scripts', stdio: [0,1,2] });
	execSync('ls -a1', { cwd: paths.components+'/rb-input/src/client/scripts', stdio: [0,1,2] });
	execSync('ls -a1', { cwd: paths.components+'/rb-nav/src/client/scripts', stdio: [0,1,2] });
	execSync('ls -a1', { cwd: paths.components+'/rb-popover/src/client/scripts', stdio: [0,1,2] });
	console.log();
	process.exit(1);
	steps.setupComponents();
	steps.setupShowcase();
	steps.buildShowcase();
}();

/*************************
 * TRAVIS DEV BUILD STEPS
 *************************/
const { exec, execSync } = require('child_process');
const util               = require('util');
const execPromise        = util.promisify(exec);

/* Steps
 ********/
const Steps = (paths, components) => { // :{}
	return {
		cloneComponentRepos() { // :Promise[{}] - (runs asynchronously)
			const cloneCmd = 'git clone --depth 1';
			const opts     = { cwd: paths.components };
			let promises   = [];
			for (const [i, repoName] of components.repoNames.entries()) {
				console.info(`cloning ${components.names[i]}`.toUpperCase().alert);
				const cmd     = `${cloneCmd} ${repoName}`;
				const promise = execPromise(cmd, opts).then(result => {
					console.log('RESULT:', result);
					return result;
				}).catch(error => {
					console.error('error: clone component repos'.toUpperCase().error);
					console.error(error);
					process.exit(1);
				});
				promises.push(promise);
			}
			return Promise.all(promises);
		},

		setupComponents() { // :Promise[{}] - (runs asynchronously)
			const cmd    = 'rapid-build prod publish && npm run link'
			let promises = [];
			for (const name of components.names) {
				console.info(`setup component ${name}`.toUpperCase().alert);
				const opts    = { cwd: `${paths.components}/${name}` };
				const promise = execPromise(cmd, opts).then(result => {
					console.log('RESULT:', result);
					return result;
				}).catch(error => {
					console.error('error: setup components'.toUpperCase().error);
					console.error(error);
					process.exit(1);
				});
				promises.push(promise);
			}
			return Promise.all(promises);
		},

		setupShowcase() { // :void - (runs synchronously)
			const cmd  = 'npm run setup'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			console.info(`setup showcase`.toUpperCase().alert);
			execSync(cmd, opts); console.log();
		},

		buildShowcase() { // :void - (runs synchronously)
			const cmd  = 'rapid-build prod publish'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			console.info(`build showcase`.toUpperCase().alert);
			execSync(cmd, opts); console.log();
		}
	};
};

/* Export It!
 *************/
module.exports = Steps;

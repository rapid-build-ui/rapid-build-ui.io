/*************************
 * TRAVIS DEV BUILD STEPS
 *************************/
const { exec, execSync, spawn } = require('child_process');
const util        = require('util');
const execPromise = util.promisify(exec);

/* Steps
 ********/
const Steps = (paths, components) => { // :{}
	return {
		// cloneComponentRepos() { // :Promise[{}] - (runs asynchronously)
		// 	// const cloneCmd = 'git clone --depth 1';
		// 	const opts   = { cwd: paths.components, stdio: [0,1,2] };
		// 	let promises = [];
		//
		// 	for (const [i, repoName] of components.repoNames.entries()) {
		// 		console.info(`cloning ${components.names[i]}`.toUpperCase().alert);
		// 		// const cmd = `${cloneCmd} ${repoName}`;
		//
		// 		const promise = new Promise((resolve, reject) => {
		// 			const git = spawn('git', ['clone', '--depth', '1', repoName], opts);
		//
		// 			// git.stdout.on('data', data => {
		// 			// 	console.log(`STDOUT: ${data}`);
		// 			// });
		//
		// 			// git.stderr.on('data', data => {
		// 			// 	console.log(`STDERR: ${data}`);
		// 			// });
		//
		// 			git.on('close', code => {
		// 				console.log(`CLOSE: child process closed with code ${code}`);
		// 				resolve(true);
		// 			});
		//
		// 			// git.on('exit', code => {
		// 			// 	console.log(`EXIT: child process exited with code ${code}`);
		// 			// 	resolve(true);
		// 			// });
		//
		// 			git.on('error', error => {
		// 				console.error('error: clone component repos'.toUpperCase().error);
		// 				console.error(error);
		// 				reject(error);
		// 			});
		// 		})
		//
		// 		promises.push(promise);
		// 	}
		//
		// 	return Promise.all(promises);
		// },

		// cloneComponentRepos() { // :Promise[{}] - (runs asynchronously)
		// 	const cloneCmd = 'git clone --depth 1';
		// 	const opts     = { cwd: paths.components };
		// 	let promises   = [];
		// 	for (const [i, repoName] of components.repoNames.entries()) {
		// 		console.info(`cloning ${components.names[i]}`.toUpperCase().alert);
		// 		const cmd     = `${cloneCmd} ${repoName}`;
		// 		const promise = execPromise(cmd, opts).then(result => {
		// 			console.info('RESULT:', result);
		// 			return result;
		// 		}).catch(error => {
		// 			console.error('error: clone component repos'.toUpperCase().error);
		// 			console.error(error);
		// 			process.exit(1);
		// 		});
		// 		promises.push(promise);
		// 	}
		// 	return Promise.all(promises).then(results => {
		// 		console.log('RESULTS:');
		// 		for (const result of results) {
		// 			console.info(`${result.stderr}`.minor); // git clone sends output to stderr
		// 		}
		// 		return results;
		// 	});
		// },

		// setupComponents() { // :Promise[{}] - (runs asynchronously)
		// 	const cmd    = 'rapid-build prod publish && npm run link'
		// 	let promises = [];
		// 	for (const name of components.names) {
		// 		console.info(`setup component ${name}`.toUpperCase().alert);
		// 		const opts    = { cwd: `${paths.components}/${name}` };
		// 		const promise = execPromise(cmd, opts).then(result => {
		// 			console.log('RESULT:', result);
		// 			return result;
		// 		}).catch(error => {
		// 			console.error('error: setup components'.toUpperCase().error);
		// 			console.error(error);
		// 			process.exit(1);
		// 		});
		// 		promises.push(promise);
		// 	}
		// 	return Promise.all(promises);
		// },

		cloneComponentRepos() {
			const cloneCmd = 'git clone --depth 1';
			const opts     = { cwd: paths.components, stdio: [0,1,2] };
			for (const [i, repoName] of components.repoNames.entries()) {
				console.info(`cloning ${components.names[i]}`.toUpperCase().alert);
				let cmd = `${cloneCmd} ${repoName}`;
				execSync(cmd, opts); console.log();
			}
		},

		setupComponents() {
			const cmd  = 'rapid-build prod publish && npm run link'
			const opts = { stdio: [0,1,2] };
			for (const name of components.names) {
				console.info(`setup component ${name}`.toUpperCase().alert);
				opts.cwd = `${paths.components}/${name}`
				execSync(cmd, opts); console.log();
			}
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

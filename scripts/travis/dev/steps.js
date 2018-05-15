/*************************
 * TRAVIS DEV BUILD STEPS
 *************************/
const { exec, execSync } = require('child_process');
const util               = require('util');
// const execPromise        = util.promisify(exec);

/* Steps
 ********/
const Steps = (paths, components) => { // :{}
	return {
		cloneComponentRepos() {
			const cloneCmd = 'git clone --depth 1';
			const opts     = { cwd: paths.components, stdio: [0,1,2] };
			let promises   = [];
			for (const [i, repoName] of components.repoNames.entries()) {
				console.info(`cloning ${components.names[i]}`.toUpperCase().alert);
				let cmd = `${cloneCmd} ${repoName}`;
				// const promise = () => { return execPromise(cmd, opts); }
				// execSync(cmd, opts); console.log();
				// promises.push(promise);
				const promise = cmd => {
					return new Promise((resolve, reject) => {
						exec(cmd, (error, stdout, stderr) => {
							if (error) {
								console.error(`exec error: ${error}`);
								reject(error);
								return;
							}
							console.log(`stdout: ${stdout}`);
							console.log(`stderr: ${stderr}`);
							resolve(true);
						});
					});
				};
				promises.push(promise);
				// promises.push(
				// 	execPromise(cmd, opts).then((x, y, z) => {
				// 		console.log(x);
				// 		console.log(y);
				// 		console.log(x);
				// 	})
				// );
			}
			return Promise.all(promises);
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

		setupShowcase() {
			const cmd  = 'npm run setup'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			console.info(`setup showcase`.toUpperCase().alert);
			execSync(cmd, opts); console.log();
		},

		buildShowcase() {
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

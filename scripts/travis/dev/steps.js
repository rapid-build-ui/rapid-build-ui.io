/*************************
 * TRAVIS DEV BUILD STEPS
 *************************/
const { exec, execSync } = require('child_process');
const util               = require('util');
const execPromise        = util.promisify(exec);
const template           = require('../../helpers/template-tags');
const clog               = require('../../helpers/component-log');

/* Loggers
 **********/
const log   = console.log.bind(console);
const info  = console.info.bind(console);
const error = console.error.bind(console);

/* Log Opts
 ***********/
const beginLogOpts = { logType: 'alert', separate: 'underline', topBumper: true };

/* Steps
 ********/
const Steps = (paths, components) => { // :{}
	return {
		cloneComponentRepos() { // :Promise[{}] - (runs asynchronously)
			clog.setupBegin(components.names, 'cloning rb components', beginLogOpts);
			const cloneCmd = 'git clone --depth 1';
			const opts     = { cwd: paths.components };
			let promises   = [];
			for (const [i, repoName] of components.repoNames.entries()) {
				const cmd     = `${cloneCmd} ${repoName}`;
				const promise = execPromise(cmd, opts);
				promises.push(promise);
			}
			return Promise.all(promises).then(results => {
				// info(template.underline`rb components: cloned`.toUpperCase().success);
				info(`✔ cloned rb components`.toUpperCase().success);
				return results; // git clone sends output to stderr
			}).catch(e => {
				error(template.underline`error: clone component repos`.toUpperCase().error);
				error(e);
				process.exit(1);
				return e;
			});
		},

		setupComponents() { // :Promise[{}] - (runs asynchronously)
			clog.setupBegin(components.names, 'rb components setup', beginLogOpts);
			const cmd    = 'rapid-build prod publish && npm run link'
			let promises = [];
			for (const name of components.names) {
				const opts    = { cwd: `${paths.components}/${name}` };
				const promise = execPromise(cmd, opts);
				promises.push(promise);
			}
			return Promise.all(promises).then(results => {
				for (const result of results) log(`${result.stdout}`);
				// info(template.underline`rb components: setup`.toUpperCase().success);
				info(`✔ setup rb components`.toUpperCase().success);
				return results;
			}).catch(e => {
				error(template.underline`error: setup components`.toUpperCase().error);
				error(e);
				process.exit(1);
				return e;
			});;
		},

		// setupComponents() { // :Promise[{}] - (runs asynchronously)
		// 	const cmd    = 'rapid-build prod publish && npm run link'
		// 	let promises = [];
		// 	for (const name of components.names) {
		// 		info(`setup component ${name}`.toUpperCase().alert);
		// 		const opts    = { cwd: `${paths.components}/${name}` };
		// 		const promise = execPromise(cmd, opts).then(result => {
		// 			log('RESULT:', result);
		// 			return result;
		// 		}).catch(e => {
		// 			error('error: setup components'.toUpperCase().error);
		// 			error(e);
		// 			process.exit(1);
		// 		});
		// 		promises.push(promise);
		// 	}
		// 	return Promise.all(promises);
		// },

		// cloneComponentRepos() {
		// 	const cloneCmd = 'git clone --depth 1';
		// 	const opts     = { cwd: paths.components, stdio: [0,1,2] };
		// 	for (const [i, repoName] of components.repoNames.entries()) {
		// 		info(`cloning ${components.names[i]}`.toUpperCase().alert);
		// 		let cmd = `${cloneCmd} ${repoName}`;
		// 		execSync(cmd, opts); log();
		// 	}
		// },

		// setupComponents() {
		// 	const cmd  = 'rapid-build prod publish && npm run link'
		// 	const opts = { stdio: [0,1,2] };
		// 	for (const name of components.names) {
		// 		info(`setup component ${name}`.toUpperCase().alert);
		// 		opts.cwd = `${paths.components}/${name}`
		// 		execSync(cmd, opts); log();
		// 	}
		// },

		setupShowcase() { // :void - (runs synchronously)
			const cmd  = 'npm run setup'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			info(`setup showcase`.toUpperCase().alert);
			execSync(cmd, opts); log();
		},

		buildShowcase() { // :void - (runs synchronously)
			const cmd  = 'rapid-build prod publish'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			info(`build showcase`.toUpperCase().alert);
			execSync(cmd, opts); log();
		}
	};
};

/* Export It!
 *************/
module.exports = Steps;

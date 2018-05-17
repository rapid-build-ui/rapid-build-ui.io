/********************************
 * TRAVIS CONTINUOUS BUILD STEPS
 ********************************/
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
const BEGIN_LOG_OPTS = { logType: 'alert', separate: 'underline', topBumper: true };

/* Steps
 ********/
const Steps = (paths, components) => { // :{}
	return {
		cloneComponentRepos() { // :Promise[{}] - (runs asynchronously)
			clog.setupBegin(components.names, 'cloning rb components', BEGIN_LOG_OPTS);
			const cloneCmd = 'git clone --depth 1';
			const opts     = { cwd: paths.components };
			let promises   = [];
			for (const [i, repoName] of components.repoNames.entries()) {
				const cmd     = `${cloneCmd} ${repoName}`;
				const promise = execPromise(cmd, opts);
				promises.push(promise);
			}
			return Promise.all(promises).then(results => {
				info(`✔ rb components cloned`.toUpperCase().success);
				return results; // git clone sends output to stderr
			}).catch(e => {
				error(template.underline`error: clone component repos`.toUpperCase().error);
				error(e);
				process.exit(1);
				return e;
			});
		},

		setupComponents() { // :Promise[{}] - (runs asynchronously)
			clog.setupBegin(components.names, 'rb components setup', BEGIN_LOG_OPTS);
			const cmd    = 'rapid-build prod publish && npm run link'
			let promises = [];
			for (const name of components.names) {
				const opts    = { cwd: `${paths.components}/${name}` };
				const promise = execPromise(cmd, opts);
				promises.push(promise);
			}
			return Promise.all(promises).then(results => {
				for (const result of results) log(`${result.stdout}`);
				info(`✔ rb components setup`.toUpperCase().success);
				return results;
			}).catch(e => {
				error(template.underline`error: setup components`.toUpperCase().error);
				error(e);
				process.exit(1);
				return e;
			});
		},

		setupShowcase() { // :void - (runs synchronously)
			info();
			info(template.underline`begin showcase setup`.toUpperCase().alert);
			const cmd  = 'npm run setup'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			execSync(cmd, opts); log();
			info(`✔ showcase setup`.toUpperCase().success);
		},

		buildShowcase() { // :void - (runs synchronously)
			info();
			info(template.underline`begin showcase build`.toUpperCase().alert);
			const cmd  = 'rapid-build prod publish'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			execSync(cmd, opts); log();
			info(`✔ showcase built`.toUpperCase().success);
		}
	};
};

/* Export It!
 *************/
module.exports = Steps;

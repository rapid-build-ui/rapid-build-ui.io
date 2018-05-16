/*****************************
 * TRAVIS RELEASE BUILD STEPS
 *****************************/
const { execSync } = require('child_process');
const template     = require('../../helpers/template-tags');

/* Loggers
 **********/
const log   = console.log.bind(console);
const info  = console.info.bind(console);
const error = console.error.bind(console);

/* Steps
 ********/
const Steps = paths => { // :{}
	return {
		installClient() { // :void - (runs synchronously)
			info();
			info(template.underline`begin showcase client install`.toUpperCase().alert);
			const cmd  = 'npm run install-client'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			execSync(cmd, opts); log();
			info(`✔ showcase client installed`.toUpperCase().success);
		},

		installServer() { // :void - (runs synchronously)
			info();
			info(template.underline`begin showcase server install`.toUpperCase().alert);
			const cmd  = 'npm run install-server'
			const opts = { cwd: paths.showcase, stdio: [0,1,2] };
			execSync(cmd, opts); log();
			info(`✔ showcase server installed`.toUpperCase().success);
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

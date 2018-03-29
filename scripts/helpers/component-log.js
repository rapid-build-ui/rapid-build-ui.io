/* COMPONENT LOG
 ****************/
const template = require('./template-tags');

/* Loggers
 **********/
const log   = console.log.bind(console);
const info  = console.info.bind(console);
const error = console.error.bind(console);

/* API (all return string)
 ******/
const Log = {
	noComponents(opts={}) {
		error(template.unindent`
			${template.separate`
				setup failed: no rb-components linked
			`.toUpperCase().error}
			Go to every component directory and run:
			npm run setup
		`.info, '\n');
		opts.exit && process.exit();
	},

	noComponent(name, opts={}) {
		error(template.unindent`
			${template.separate`
				setup failed: ${name} must be linked
			`.toUpperCase().error}
			Go to ${name}'s directory and run:
			npm run setup
		`.info, '\n');
		opts.exit && process.exit();
	},

	invalidComponent(name, opts={}) {
		error(template.unindent`
			${template.separate`
				setup failed: invalid component name
			`.toUpperCase()}
			${name}
		`.error, '\n');
		opts.exit && process.exit();
	},

	pullComponent(name, cmd, opts={}) {
		info(template.separate`
			${`${name} running`.toUpperCase()}: ${cmd}
		`.alert, '\n');
	},

	setupComponent(name, cmd, opts={}) {
		info(template.separate`
			${`${name} running`.toUpperCase()}: ${cmd}
		`.alert, '\n');
	},

	setupBegin(names, message, opts={}) {
		names = names.map((val, i) => `${i+1}. ${val}`).join('\n');
		opts.prepend = !!opts.prepend ? `${opts.prepend}\n` : '';
		opts.append  = !!opts.append  ? `\n${opts.append}`  : '';
		info(template.underline`
			${template.separate`
				begin ${message}
			`.toUpperCase()}
			${opts.prepend}${names}${opts.append}
		`.attn, '\n');
	},

	setupComplete(names, message, opts={}) {
		names = names.map((val, i) => `${i+1}. ${val}`).join('\n');
		opts.prepend = !!opts.prepend ? `${opts.prepend}\n` : '';
		opts.append  = !!opts.append  ? `\n${opts.append}`  : '';
		info(template.underline`
			${template.separate`
				${message} complete
			`.toUpperCase()}
			${opts.prepend}${names}${opts.append}
		`.attn, '\n');
	}
}

/* Export It!
 *************/
module.exports = Log;
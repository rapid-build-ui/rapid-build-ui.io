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

	noComponentRepo(name, opts={}) {
		error(template.unindent`
			${template.separate`
				failed: github repo ${name} does not exist
			`.toUpperCase().error}
			Go to github and create repo ${name}:
			https://github.com/rapid-build-ui?tab=repositories
		`.info, '\n');
		opts.exit && process.exit();
	},

	componentRepoEmpty(name, opts={}) {
		error(template.unindent`
			${template.separate`
				failed: repo must have at least one file
			`.toUpperCase().error}
			Go to github and create a README.md file:
			https://github.com/rapid-build-ui/${name}/new/master?readme=1
		`.info, '\n');
		opts.exit && process.exit();
	},

	notCollaborator(name, opts={}) {
		error(template.unindent`
			${template.separate`
				failed: not a collaborator github repo ${name}
			`.toUpperCase().error}
			Go to github and add yourself as a collaborator:
			https://github.com/rapid-build-ui/${name}/settings/collaboration
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

	componentExist(name, opts={}) {
		error(template.unindent`
			${template.separate`
				failed: component already exist
			`.toUpperCase()}
			${name}
		`.error, '\n');
		opts.exit && process.exit();
	},

	componentRequired(opts={}) {
		error(template.separate`
			failed: component name required
		`.toUpperCase().error, '\n');
		opts.exit && process.exit();
	},

	pullComponent(name, cmd, opts={}) {
		info(template.separate`
			${`${name} running`.toUpperCase()}: ${cmd}
		`.alert, '\n');
	},

	pushComponent(name, cmd, opts={}) {
		info(template.separate`
			pushing to github: ${name}
		`.alert, '\n');
	},

	pushComponent(name, cmd, opts={}) {
		info(template.unindent`
			${template.separate`
				pushing to github: ${name}
			`.toUpperCase()}
			${cmd}
		`.alert, '\n');
	},

	setupComponent(name, cmd, opts={}) {
		info(template.separate`
			${`${name} running`.toUpperCase()}: ${cmd}
		`.alert, '\n');
	},

	setupBegin(names, message, opts={}) { // names: string[] | string
		names = typeof names === 'string' ? [names] : names;
		names = names.map((val, i) => `${i+1}. ${val}`).join('\n');
		opts.logType = opts.logType || 'attn';
		opts.prepend = !!opts.prepend ? `${opts.prepend}\n` : '';
		opts.append  = !!opts.append  ? `\n${opts.append}`  : '';
		info(template.underline`
			${template.separate`
				begin ${message}
			`.toUpperCase()}
			${opts.prepend}${names}${opts.append}
		`[opts.logType], '\n');
	},

	setupComplete(names, message, opts={}) { // names: string[] | string
		names = typeof names === 'string' ? [names] : names;
		names = names.map((val, i) => `${i+1}. ${val}`).join('\n');
		opts.logType = opts.logType || 'attn';
		opts.prepend = !!opts.prepend ? `${opts.prepend}\n` : '';
		opts.append  = !!opts.append  ? `\n${opts.append}`  : '';
		info(template.underline`
			${template.separate`
				${message} complete
			`.toUpperCase()}
			${opts.prepend}${names}${opts.append}
		`[opts.logType], '\n');
	}
}

/* Export It!
 *************/
module.exports = Log;
angular.module('rapid-build').constant('RB_ALERT_SRC_NAV', () => { // :object
	const component = 'rb-alert';
	const package   = `https://www.npmjs.com/package/@rapid-build-ui/${component}`;
	const repo      = `https://github.com/rapid-build-ui/${component}`;
	const src       = `${repo}/blob/master/src/client`;
	return {
		package,
		code: [
			{ type: 'github', url: `${repo}/tree/master` },
			{ type: 'js',     url: `${src}/scripts/${component}.js` },
			{ type: 'html',   url: `${src}/views/${component}.html` },
			{ type: 'css',    url: `${src}/styles/${component}.scss` }
		]
	}
});
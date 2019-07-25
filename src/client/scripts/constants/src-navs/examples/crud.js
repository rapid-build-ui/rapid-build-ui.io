angular.module('rapid-build').constant('CRUD_EXAMPLE_SRC_NAV', () => { // :object
	const repo = 'https://github.com/rapid-build-ui/rapid-build-ui.io';
	const src  = `${repo}/blob/master/src/client`;
	return {
		code: [
			{ type: 'js',   url: `${src}/scripts/controllers/examples/crud.js` },
			{ type: 'html', url: `${src}/views/examples/crud.html` },
		]
	}
});
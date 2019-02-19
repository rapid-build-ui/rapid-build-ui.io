/***********************
 * CSS VARIABLES ROUTES
 ***********************/
const cssVarsSvc = require('./../services/css-vars');

/* Routes
 *********/
const Routes = (app, opts={}) => {
	const clientPath = opts.paths.client;

	app.get('/api/css-vars/:component', async (req, res) => {
		try {
			const component = req.params.component;
			const theme     = req.query.theme; // common | light | dark
			const cssVars   = await cssVarsSvc.getCssVars(clientPath, component, theme);
			res.json(cssVars);
		} catch (error) {
			const { code, message } = error;
			const status = code && code.toLowerCase() === 'module_not_found' ? 404 : 500;
			const data = { code, message, status };
			res.type('json').status(status).send(data);
		}
	});
}

/* Export it!
 *************/
module.exports = Routes;
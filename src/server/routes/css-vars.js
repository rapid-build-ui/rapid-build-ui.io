/***********************
 * CSS VARIABLES ROUTES
 ***********************/
const cssVarsSvc = require('./../services/css-vars');

/* Routes
 *********/
const Routes = async (app, opts={}) => { // :Promise<void>
	app.get('/api/css-variables/:component', async (req, res) => {
		try {
			const component = req.params.component;
			const theme     = req.query.theme; // common | light | dark
			const cssVars   = await cssVarsSvc.getCssVars(component, theme);
			res.json(cssVars);
		} catch (error) {
			const { code, message } = error;
			const status = code && code.toLowerCase() === 'module_not_found' ? 404 : 500;
			const data = { code, message, status };
			res.type('json').status(status).send(data);
		}
	});

	/* Init
	 *******/
	await cssVarsSvc.init(opts.paths); // paths = client & server
	return cssVarsSvc.makeCssVars();
}

/* Export it!
 *************/
module.exports = Routes;
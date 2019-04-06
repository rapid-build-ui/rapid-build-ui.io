/*****************
 * EXAMPLE ROUTES
 *****************/
const Routes = (app, opts={}) => {
	app.get('/examples/bare-bones', (req, res) => {
		res.sendFile('examples/bare-bones.html', { root: opts.paths.client });
	});

	// partial for rb-toggle fetch option
	app.get('/examples/toggle', (req, res) => {
		res.sendFile('examples/toggle.html', { root: opts.paths.client });
	});
}

/* Export it!
 *************/
module.exports = Routes;
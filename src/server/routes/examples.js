/*****************
 * EXAMPLE ROUTES
 *****************/
const Routes = (app, opts={}) => {
	app.get('/examples/bare-bones', (req, res) => {
		res.sendFile('examples/bare-bones.html', { root: opts.paths.client });
	});
}

/* Export it!
 *************/
module.exports = Routes;
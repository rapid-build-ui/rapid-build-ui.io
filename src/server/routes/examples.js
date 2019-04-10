/*****************
 * EXAMPLE ROUTES
 *****************/
const Routes = (app, opts={}) => {
	app.get('/examples/bare-bones', (req, res) => {
		res.sendFile('examples/bare-bones.html', { root: opts.paths.client });
	});

	/* Partial for rb-toggle
	 * fetch option uses: get
	 * fetch-opts option uses: post
	 *******************************/
	app.all('/examples/toggle', (req, res) => {
		// setTimeout(() => {
		res.sendFile('examples/toggle.html', { root: opts.paths.client });
		// }, 3000)
	});
}

/* Export it!
 *************/
module.exports = Routes;
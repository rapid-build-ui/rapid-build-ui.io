/****************
 * STATIC ROUTES
 ****************/
const Routes = (app, opts) => {
	app.get('/components/on-bare-bones-page', (req, res) => {
		res.sendFile('bare-bones.html', { root: opts.paths.client });
	});
}

/* Export it!
 *************/
module.exports = Routes;
/*******************
 * RB-UI WEB SERVER
 *******************/
module.exports = server => {
	var app = server.app;

	/* Routes
	 *********/
	app.get('/api/superheroes', (req, res) => {
		res.json(['Superman', 'Wolverine', 'Wonder Woman']);
	});
};

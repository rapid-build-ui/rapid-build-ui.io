/**************
 * DATA ROUTES
 **************/
const Route  = require('./../services/route');
const States = require('./../data/us-states.json');

/* Data Clones
 **************/
const Data = {
	states: [...States]
};

/* Routes
 *********/
const Routes = (app, opts={}) => {
	app.get('/api/data/us-states', async (req, res) => {
		const code  = Route.get.code(req);
		const delay = await Route.get.delay(req);
		res.status(code).json(Data.states);
	});
}

/* Export it!
 *************/
module.exports = Routes;
/**************
 * TEST ROUTES
 **************/
const Routes = (app, opts={}) => {
	app.get('/api/test/error', async (req, res) => {
		let { code = 500 } = req.query;
		code = typeof code === 'string'
			? !isNaN(parseInt(code)) ? parseInt(code) : 500
			: code;
		res.status(code).json({ status: code });
	});

	app.get('/api/test/slow-request', async (req, res) => {
		let { delay = 3 } = req.query;
		delay = typeof delay === 'string'
			? delay.trim().length ? parseFloat(delay) : 0
			: delay;
		delay *= 1000; // seconds to milliseconds
		await new Promise(resolve => setTimeout(resolve, delay));
		res.json({ message: 'WOW! That was slow!'});
	});
}

/* Export it!
 *************/
module.exports = Routes;
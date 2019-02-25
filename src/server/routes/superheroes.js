/*******************
 * SUPERHERO ROUTES
 *******************/
const Superheroes = require('./../services/superheroes');

/* Routes (crud)
 ****************/
const Routes = (app, opts={}) => {
	app.get('/api/superheroes', (req, res) => {
		const restore = req.query.restore !== undefined;
		if (restore) Superheroes.restore();
		res.json(Superheroes.get());
	});

	app.get('/api/superheroes/:id', (req, res) => {
		const id  = req.params.id;
		const key = req.query.key !== undefined ? req.query.key : 'id';
		const superhero = Superheroes.get(id, key);
		res.json(superhero);
	});

	app.delete('/api/superheroes/:id', (req, res) => {
		const id = req.params.id;
		const superhero = Superheroes.delete(id);
		res.json(superhero);
	});

	app.put('/api/superheroes/:id', (req, res) => {
		const id = req.params.id;
		const superhero = Superheroes.update(id, req.body);
		res.json(superhero);
	});

	app.post('/api/superheroes', (req, res) => {
		const superhero = Superheroes.create(req.body);
		res.json(superhero);
	});
}

/* Export it!
 *************/
module.exports = Routes;
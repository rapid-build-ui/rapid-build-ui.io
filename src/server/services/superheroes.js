/**************
 * SUPERHEROES
 **************/
const Superheroes = require('./../data/superheroes');

/* Private
 **********/
const _ = {
	heroes: undefined, // :object[] | undefined

	getIndex(val, key='id', heroes) { // :number (index)
		val = key === 'id' ? parseInt(val) : val.toLowerCase();
		return heroes.map(hero => {
			let val = hero[key];
			return typeof val === 'string' ? val.toLowerCase() : val;
		}).indexOf(val);
	}
}

/* API
 ******/
module.exports = {
	/* Props
	 ********/
	get superheroes() { // :object[]
		if (_.heroes) return _.heroes;
		this.superheroes = Superheroes;
		return _.heroes;
	},

	set superheroes(heroes) {
		_.heroes = heroes.slice();
	},

	/* Methods
	 **********/
	get(val, key='id') { // :object[] | object | null
		if (val === undefined) return this.superheroes;
		const index = _.getIndex(val, key, this.superheroes);
		if (index === -1) return null;
		return this.superheroes[index];
	},

	delete(val, key='id') { // :object | null
		const index = _.getIndex(val, key, this.superheroes);
		if (index === -1) return null;
		return this.superheroes.splice(index, 1);
	},

	update(id, superhero) { // :object | null
		const index = _.getIndex(id, 'id', this.superheroes);
		if (index === -1) return null;
		Object.assign(this.superheroes[index], superhero);
		return this.superheroes[index];
	},

	create(superhero) { // :object | null
		console.log(this.superheroes.length);
		const id = this.superheroes[this.superheroes.length - 1].id + 1;
		superhero = Object.assign({ id }, superhero);
		this.superheroes.push(superhero);
		return superhero;
	},

	restore() { // :void
		this.superheroes = Superheroes;
	}
}
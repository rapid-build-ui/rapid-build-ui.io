/**************
 * SUPERHEROES
 **************/
const Superheroes = [
	{ id: 1, name: 'Superman' },
	{ id: 2, name: 'Wolverine' },
	{ id: 3, name: 'Wonder Woman' }
]

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

	restore() { // :void
		this.superheroes = Superheroes;
	}
}
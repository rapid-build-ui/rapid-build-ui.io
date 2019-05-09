angular.module('rapid-build').value('usStatesValue', {
	_names: [],
	_objects: [],

	get names() { // string[]
		return this._names;
	},
	get objects() { // object[]
		return this._objects;
	},
	set names(states) {
		const names = [];
		for (const state of states)
			names.push(state.name);
		this._names = names;
	},
	set objects(states) {
		this._objects = states;
	},

	async init() { // :Promise<void> (only fetch once)
		if (this.names.length) return Promise.resolve();
		const fetched = await fetch('/api/data/us-states');
		return fetched.json().then(states => {
			this.names   = states;
			this.objects = states;
		});
	}
});
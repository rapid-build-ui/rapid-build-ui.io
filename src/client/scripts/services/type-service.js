angular.module('rapid-build').service('typeService', [function() {
	/* Public Methods
	 *****************/
	this.get = (v) => { // :string
		for (let key in this.is) {
			if (!this.is.hasOwnProperty(key)) continue;
			if (key === 'stringArray') continue;
			if (this.is[key](v)) return key;
		}
	};
	this.is = {
		array: v => {
			return Array.isArray(v);
		},
		boolean: v => {
			return typeof v === 'boolean';
		},
		function: v => {
			return typeof v === 'function';
		},
		int: v => {
			return Number.isInteger(v);
		},
		null: v => {
			return v === null;
		},
		number: function(v) {
			if (this.null(v)) return false;
			if (this.array(v)) return false;
			if (this.string(v)) return false;
			if (this.boolean(v)) return false;
			return !isNaN(v);
		},
		object: function(v) {
			if (typeof v !== 'object') return false;
			if (v === null) return false;
			if (this.array(v)) return false;
			return true;
		},
		string: v => {
			return typeof v === 'string';
		},
		stringArray: function(v) {
			var i, len, val;
			if (!this.array(v)) return false;
			if (!v.length) return false;
			for (i = 0, len = v.length; i < len; i++) {
				val = v[i];
				if (!this.string(val)) return false;
			}
			return true;
		},
		undefined: v => {
			return v === void 0;
		}
	};
	return this;
}]);

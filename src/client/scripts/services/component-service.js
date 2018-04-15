angular.module('rapid-build').service('componentService', ['$injector',
	function($injector) {
		/* Prep name to be equal to angular constant.
		 * ex result: RB_ICON_API
		 * ex params: name='icon', prefix='rb', suffix='nav'
		 ****************************************************/
		this.getConstantName = (name, prefix, suffix) => { // :string
			prefix = `${prefix}-`;
			suffix = `-${suffix}`;
			name   = name.toLowerCase().replace(prefix,'');
			name   = `${prefix}${name}${suffix}`.replace(/-/g,'_').toUpperCase();
			return name;
		};

		this.getConstant = (name, prefix, suffix) => { // :mixed
			name = this.getConstantName(name, prefix, suffix);
			return $injector.get(name);
		};

		return this;
	}
]);

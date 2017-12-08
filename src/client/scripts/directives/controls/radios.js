angular.module('rapid-build').directive('rbaRadios', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('.caption').remove();
		return Link;
	}

	/* LINK
	 *******/
	var Link = (scope, iElement, iAttrs) => {
		scope.name = scope.name || iAttrs.model;
		var toggle = iAttrs.toggle !== undefined; // togglable

		/* Methods
		 **********/
		scope.select = (item) => {
			if (!toggle) return scope.model = item;
			scope.model = scope.model === item ? undefined : item;
		}
	}

	/* API
	 ******/
	return {
		compile: Compile,
		restrict: 'E',
		templateUrl: '/views/directives/controls/radios.html',
		scope: {
			model:    '=',  // :any
			data:     '=',  // :[any]
			name:     '@?', // :string | *attrs.model
			caption:  '@?', // :string
			/* VALUELESS
			 ************/
			inline:   '@?',
			stacked:  '@?',
			toggle:   '@?',
			vertical: '@?'
		}
	};
}]);
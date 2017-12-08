angular.module('rapid-build').directive('rbaSelect', [() => {
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
	}

	/* API
	 ******/
	return {
		compile: Compile,
		restrict: 'E',
		templateUrl: '/views/directives/controls/select.html',
		scope: {
			model:       '=',  // :any
			data:        '=',  // :[any]
			name:        '@?', // :string | *attrs.model
			caption:     '@?', // :string
			/* VALUELESS
			 ************/
			inline:      '@',
			vertical:    '@',
			placeholder: '@' // :string | undefined
		}
	};
}]);
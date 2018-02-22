angular.module('rapid-build').directive('rbaInput', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('.caption').remove();
		if (typeof tAttrs.placeholder === 'undefined')
			tElement[0].querySelector('input').removeAttribute('placeholder');

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
		templateUrl: '/views/directives/controls/input.html',
		scope: {
			model:       '=',  // :string
			name:        '@?', // :string | *attrs.model
			caption:     '@?', // :string
			placeholder: '@?', // :string
			/* VALUELESS
			 ************/
			inline:   '@?',
			vertical: '@?'
		}
	};
}]);
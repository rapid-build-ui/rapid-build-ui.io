angular.module('rapid-build').directive('rbaTextarea', [() => {
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
		templateUrl: '/views/directives/controls/textarea.html',
		scope: {
			model:    '=',  // :any
			name:     '@?', // :string | *attrs.model
			caption:  '@?', // :string
			/* VALUELESS
			 ************/
			inline:   '@',
			vertical: '@'
		}
	};
}]);
angular.module('rapid-build').directive('rbaInput', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('label').remove();

		return Link;
	}

	/* LINK
	 *******/
	var Link = (scope, iElement, iAttrs) => {

	}

	/* API
	 ******/
	return {
		compile: Compile,
		replace: false,
		restrict: 'E',
		templateUrl: '/views/directives/input.html',
		scope: {
			model:   '=',
			caption: '@'
		}
	};
}]);
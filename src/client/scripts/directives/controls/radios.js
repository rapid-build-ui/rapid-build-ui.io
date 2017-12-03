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
	}

	/* API
	 ******/
	return {
		compile: Compile,
		restrict: 'E',
		templateUrl: '/views/directives/controls/radios.html',
		scope: {
			data:     '=',
			model:    '=',
			name:     '@',
			caption:  '@',
			inline:   '@',
			stacked:  '@',
			vertical: '@'
		}
	};
}]);
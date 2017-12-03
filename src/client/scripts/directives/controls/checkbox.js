angular.module('rapid-build').directive('rbaCheckbox', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('.caption').remove();
		if (typeof tAttrs.subCaption === 'undefined')
			tElement[0].querySelector('.sub-caption').remove();
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
		templateUrl: '/views/directives/controls/checkbox.html',
		scope: {
			model:      '=',
			name:       '@',
			caption:    '@',
			subCaption: '@',
			inline:     '@',
			vertical:   '@'
		}
	};
}]);
angular.module('rapid-build').directive('rbaCheckbox', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		var input = tElement[0].querySelector('input');
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('.caption').remove();
		if (typeof tAttrs.subCaption === 'undefined')
			tElement[0].querySelector('.sub-caption').remove();
		typeof tAttrs.checked !== 'undefined' ?
			input.removeAttribute('ng-model') :
			input.removeAttribute('ng-checked');
			
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
			name:       '@',
			model:      '=',
			caption:    '@',
			subCaption: '@',
			inline:     '@',
			vertical:   '@',
			click:      '&',
			checked:    '=' // should not be used together with model option
		}
	};
}]);
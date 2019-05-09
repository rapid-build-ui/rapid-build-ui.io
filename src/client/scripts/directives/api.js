/****************
 * API DIRECTIVE
 ****************/
angular.module('rapid-build').directive('rbaApi', [
	() => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			// ex: rb-alert -> RB_ALERT_API (angular constant)
			const component = `${tAttrs.component}-api`.replace(/-/g,'_').toUpperCase();
			tElement[0].querySelector('rba-table').setAttribute('source',component);
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/api.html',
			scope: false
		};
	}
]);

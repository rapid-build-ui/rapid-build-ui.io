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
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			const toggle = iElement[0].querySelector('rb-toggle');
			const search = iElement[0].querySelector('[data-search]');

			/* RB TOGGLE EVENTS
			 *******************/
			const ontoggle = evt =>
				search.toggleAttribute('hidden');

			toggle.addEventListener('toggled', ontoggle);

			/* Destroy
			 **********/
			const destroy = scope.$on('$destroy', () => {
				toggle.removeEventListener('toggled', ontoggle);
				destroy();
			});
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

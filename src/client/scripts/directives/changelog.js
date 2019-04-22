/**********************
 * CHANGELOG DIRECTIVE
 **********************/
angular.module('rapid-build').directive('rbaChangelog', ['changelogService',
	(changelogService) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			/* RB TOGGLE
			 ************/
			iElement[0].querySelector('rb-toggle').onclick = () =>
				changelogService.get(scope.component)
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/changelog.html',
			scope: {
				component: '@'
			}
		};
	}
]);

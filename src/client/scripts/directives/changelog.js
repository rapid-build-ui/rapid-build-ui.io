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
			/* Methods
			 **********/
			scope.getChangelog = component => { // :void
				return changelogService.get(component).then(changelog => {
					return changelog;
				});
			};
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

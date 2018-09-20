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
			/* Props
			 ********/
			scope.toggle = 'closed';

			/* Methods
			 **********/
			scope.setChangelog = component => { // :void
				if (scope.changelog) {
					scope.toggle    = 'closed'
					scope.changelog = null;
					return;
				}
				changelogService.get(component).then(changelog => {
					scope.toggle    = 'open';
					scope.changelog = changelog;
				});
			};
		}

		/* HELPERS
		 **********/
		// const Helpers = {
		// 	getComponentName(name) { // :string
		// 		if (typeof name !== 'string') return name;
		// 		if (name.includes('rb-')) return name;
		// 		return `rb-${name}`;
		// 	}
		// }

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/changelog.html',
			scope: {
				src: '@source'
			}
		};
	}
]);

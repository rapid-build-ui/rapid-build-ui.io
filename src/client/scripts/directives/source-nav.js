angular.module('rapid-build').directive('rbaSourceNav', ['componentService',
	componentService => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			let source = componentService.getConstant(scope.src, 'rb', 'nav');
			scope.source = source;
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/source-nav.html',
			scope: {
				src: '@source'
			}
		};
	}
]);

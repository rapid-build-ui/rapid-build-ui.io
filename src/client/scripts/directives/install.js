angular.module('rapid-build').directive('rbaInstall', ['$injector',
	($injector) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			scope.source = $injector.get('INSTALL_COMPONENTS')[scope.src];
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/install.html',
			scope: {
				src: '@source',
				iconSize: '@?'
			}
		};
}]);

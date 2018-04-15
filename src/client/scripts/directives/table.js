angular.module('rapid-build').directive('rbaTable', ['componentService',
	componentService => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			let source = componentService.getConstant(scope.src, 'rb', 'api');
				source = angular.copy(source); // removes angular's $$hashKey
			scope.source   = source;
			scope.headings = Object.keys(source[0]); // props of first object
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/table.html',
			scope: {
				src: '@source'
			}
		};
	}
]);

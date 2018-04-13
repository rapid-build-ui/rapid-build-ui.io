angular.module('rapid-build').directive('rbaTable', ['$injector',
	($injector) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			/* Prep the source to be
			 * equal to the angular constant.
			 * ex result: RB_ICON_API
			 *********************************/
			const prefix = 'rb-';
			const suffix = '-api';
			let source = scope.src.toLowerCase().replace(prefix,'');
				source = `${prefix}${source}${suffix}`.replace(/-/g,'_').toUpperCase();
				source = $injector.get(source);
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

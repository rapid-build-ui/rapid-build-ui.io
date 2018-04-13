angular.module('rapid-build').directive('rbaSourceNav', ['$injector',
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
			 * ex result: RB_ICON_NAV
			 *********************************/
			const prefix = 'rb-';
			const suffix = '-nav';
			let source = scope.src.toLowerCase().replace(prefix,'');
				source = `${prefix}${source}${suffix}`.replace(/-/g,'_').toUpperCase();
				source = $injector.get(source);
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

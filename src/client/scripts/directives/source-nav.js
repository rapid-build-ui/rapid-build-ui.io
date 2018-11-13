angular.module('rapid-build').directive('rbaSourceNav', ['$injector', 'ENV',
	($injector, ENV) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* Helpers
		 **********/
		const Helpers = {
			updateDevUrls(source) { // void (mutator: source[].url)
				for (const obj of source) {
					if (!obj.url) continue;
					if (obj.type === 'github' && !obj.url.includes('master'))
						obj.url += '/tree/master';
					obj.url = obj.url.replace('master', 'continuous');
				}
			}
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			const inject = typeof iAttrs.inject === 'string';
			let source = inject ? $injector.get(iAttrs.source) : scope.src;
			source = angular.copy(source); // copy to not modify constant

			if (ENV.is.dev)
				Helpers.updateDevUrls(source); // prep source urls for environment

			/* Props
			 ********/
			scope.source = source;
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/source-nav.html',
			scope: {
				src: '<source',
				/* VALUELESS
				 ************/
				// inject: '@?'
			}
		};
	}
]);

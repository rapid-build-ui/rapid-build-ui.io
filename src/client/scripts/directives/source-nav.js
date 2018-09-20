angular.module('rapid-build').directive('rbaSourceNav', ['componentService', 'ENV',
	(componentService, ENV) => {
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
			const source = angular.copy( // creates deep copy
				componentService.getConstant(scope.src, 'rb', 'nav')
			);

			/* Prep Source Urls for Environment
			 ***********************************/
			if (ENV.is.dev)
				Helpers.updateDevUrls(source);

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
				src: '@source'
			}
		};
	}
]);

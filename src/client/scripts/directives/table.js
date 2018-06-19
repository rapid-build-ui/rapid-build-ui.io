angular.module('rapid-build').directive('rbaTable', ['$filter', '$injector', 'preService',
	($filter, $injector, preService) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			const inject   = typeof iAttrs.inject === 'string';
			const source   = inject ? $injector.get(iAttrs.source) : scope.src;
			const headings = angular.copy(source[0]); // removes angular's $$hashKey

			/* Props
		 	 ********/
			scope.source   = source;
			scope.headings = Object.keys(headings); // props of first object

			/* Methods
		 	 **********/
			scope.getHtml = (key, val) => {
				const filter = item =>
					val = $filter(item)(val);

				switch (key) {
					case 'type':
					case 'options':
						['na', 'optionize'].forEach(filter);
						break;
					case 'required':
						['required'].forEach(filter);
						break;
				}

				val = preService.get.pre(val); // get formatted pre if exists
				return $filter('trustHtml')(val);
			}
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/table.html',
			scope: {
				src: '<source',
				/* VALUELESS
				 ************/
				// inject: '@?'
			}
		};
}]);

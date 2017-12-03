angular.module('rapid-build').directive('rbaCompile', ['$compile',
	function($compile) {
		var link;
		link = function(scope, iElement, iAttrs, controller) {
			var hasProp = {}.hasOwnProperty; // add by coffee compile
			if (!controller) return;
			if (!iAttrs.rbaCompile) return;

			var scopeWatch = scope.$watch(function(scope) {
				return scope.$eval(scope.rbaCompile);
			}, function(content) {
				var key, ref, val;
				if (!content) {
					return iElement.remove();
				}
				iElement.html(content);
				ref = controller.scope;
				for (key in ref) {
					if (!hasProp.call(ref, key)) continue;
					val = ref[key];
					if (key.indexOf('$') === -1 && key.indexOf('this') === -1) {
						if (!scope.hasOwnProperty(key)) {
							scope[key] = val;
						}
					}
				}
				return $compile(iElement.contents())(scope);
			});
			var x = scope.$on('$destroy', function() {
				scopeWatch();
				return x();
			});
		};
		return {
			link: link,
			replace: true,
			restrict: 'A',
			transclude: true,
			require: '?^ngController',
			scope: {
				rbaCompile: '&',
				model: '='
			}
		};
	}
]);

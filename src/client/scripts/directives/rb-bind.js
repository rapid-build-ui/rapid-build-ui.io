/********************************************************
 * RB-BIND DIRECTIVE
 * -----------------------------------------------------
 * In order to gain an angular performance boost via
 * $compileProvider.debugInfoEnabled(false)
 * (see performance.js) we need to store rb element's
 * scope in angular's element.data() so we can access
 * it later in rb-event-service.js.
 * Reason, when disabling debugInfo you can not get the
 * scope of and element via angular.element(elm).scope()
 ********************************************************/
angular.module('rapid-build').directive('rbBind', [() => {
	return {
		scope: false,
		restrict: 'A',
		link(scope, iElement) {
			iElement.data({ scope });
		}
	};
}]);
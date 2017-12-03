angular.module('rapid-build').directive('rbaCompile', ['$compile', ($compile) => {
	/* LINK
	 *******/
	var Link = (scope, iElement, iAttrs) => {
		if (!iAttrs.rbaCompile) return;

		/* Compiler
		 **********/
		var scopeWatch = scope.$watch(() => {
			return scope.$eval(iAttrs.rbaCompile);
		}, content => {
			/* In case value is a TrustedValueHolderType, sometimes it
			 * needs to be explicitly called into a string in order to
			 * get the HTML string.
			 **********************************************************/
			iElement.html(content && content.toString());

			// If scope is provided use it, otherwise use parent scope.
			var compileScope = iAttrs.rbaCompileScope ?
				scope.$eval(iAttrs.rbaCompileScope) : scope;

			$compile(iElement.contents())(compileScope);
		});

		/* Destroy
		 **********/
		var x = scope.$on('$destroy', () => {
			scopeWatch();
			return x();
		});
	};

	/* API
	 ******/
	return {
		link: Link,
		restrict: 'A'
	};
}]);

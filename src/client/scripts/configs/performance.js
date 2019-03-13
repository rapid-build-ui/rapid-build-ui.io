angular.module('rapid-build').config(['$compileProvider',
	$compileProvider => {

	// TODO: uncomment when builder does not use elm.scope()
	// $compileProvider.debugInfoEnabled(false);
	$compileProvider.commentDirectivesEnabled(false);
	$compileProvider.cssClassDirectivesEnabled(false);

}]);
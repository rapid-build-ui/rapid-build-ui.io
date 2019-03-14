angular.module('rapid-build').config(['$compileProvider',
	$compileProvider => {

	// By disabling debug info elm.scope() will not work.
	$compileProvider.debugInfoEnabled(false);
	$compileProvider.commentDirectivesEnabled(false);
	$compileProvider.cssClassDirectivesEnabled(false);

}]);
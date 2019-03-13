angular.module('rapid-build').config(['$compileProvider',
	$compileProvider => {

	// $compileProvider.debugInfoEnabled(false); // causes exception in rb-event-service.js
	$compileProvider.commentDirectivesEnabled(false);
	$compileProvider.cssClassDirectivesEnabled(false);

}]);
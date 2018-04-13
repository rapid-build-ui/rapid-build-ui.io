angular.module('rapid-build').filter('trustHtml', ['$sce', $sce => {
	return $sce.trustAsHtml;
}]);
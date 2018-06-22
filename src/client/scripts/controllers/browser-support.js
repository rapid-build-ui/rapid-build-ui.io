angular.module('rapid-build').controller('browserSupportController', ['$scope', 'BROWSER_SUPPORT',
	($scope, BROWSER_SUPPORT) => {

		$scope.browsers = BROWSER_SUPPORT;

}]);
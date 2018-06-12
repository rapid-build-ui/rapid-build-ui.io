angular.module('rapid-build').controller('versionsController', ['$scope', 'SHOWCASE_VERSION',
	($scope, SHOWCASE_VERSION) => {

		$scope.showcaseVersion = `v${SHOWCASE_VERSION}`;

}]);
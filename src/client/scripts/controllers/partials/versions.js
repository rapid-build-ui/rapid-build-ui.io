angular.module('rapid-build').controller('versionsController', ['$scope', 'VERSIONS',
	($scope, VERSIONS) => {

		$scope.showcaseVersion = `v${VERSIONS.showcase}`;

}]);
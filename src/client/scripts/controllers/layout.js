angular.module('rapid-build').controller('layoutController', ['$scope',
	($scope) => {

		$scope.$on('$routeChangeSuccess', (event, current, previous) => {
			$scope.layout = current.$$route.layout || 'superman';
		});

}]);
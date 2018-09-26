angular.module('rapid-build').controller('componentsNavController', ['$scope', 'ENV',
	($scope, ENV) => {

		$scope.env = ENV;

}]);
angular.module('showcase').controller('rbIconController', ['$scope', '$element',
	($scope, $element) => {
		$scope.kind       = 'user';
		$scope.sizeValues = ['default','small', 'big'];
		$scope.activeSize = "";
}]);
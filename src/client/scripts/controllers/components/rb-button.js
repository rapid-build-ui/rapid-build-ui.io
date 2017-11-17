angular.module('showcase').controller('rbButtonController', ['$scope', '$element',
	($scope, $element) => {

		$scope.sizeValues = ['default','small', 'big']
		$scope.kindValues = ['default', 'primary', 'success', 'info', 'warning', 'error']
		$scope.activeState = {
			size: '',
			kind: ''
		}
		$scope.iconOptions = {
			kind: 'info'
		}
}])
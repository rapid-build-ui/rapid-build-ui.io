angular.module('rapid-build').run(['$rootScope', 'ENV', ($rootScope, ENV) => {

	$rootScope.env = ENV;

}]);
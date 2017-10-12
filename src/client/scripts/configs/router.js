angular.module('showcase').config(['$routeProvider',
	$routeProvider => {

		$routeProvider
			.when('/', {
				templateUrl: 'views/mains/home.html'
			})
			.when('/icon', {
				templateUrl: 'views/mains/icon.html'
			})
			.when('/nav', {
				templateUrl: 'views/mains/nav.html'
			})
			.otherwise({
				redirectTo: '/'
			});

}]);
angular.module('showcase').config(['$routeProvider',
	$routeProvider => {

		$routeProvider
			.when('/', {
				templateUrl: '/views/home.html'
			})
			.when('/components/:component', { templateUrl: params => {
				return `/views/components/${params.component}.html`;
			}})
			.otherwise({
				redirectTo: '/'
			});

}]);
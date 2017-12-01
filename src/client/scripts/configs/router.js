angular.module('rapid-build').config(['$routeProvider',
	$routeProvider => {

		$routeProvider
			.when('/', {
				templateUrl: '/views/home.html'
			})
			.when('/components/:component', { templateUrl: params => {
				return `/views/rb-components/${params.component}.html`;
			}})
			.otherwise({
				redirectTo: '/'
			});

}]);
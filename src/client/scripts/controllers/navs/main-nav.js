angular.module('showcase').controller('mainNavController', ['$scope', '$location',
	($scope, $location) => {
		/* Public
		 *********/
		$scope.links  = [
			{ caption: 'home',      url: '/' },
			{ caption: 'rb-button', url: '/components/rb-button' },
			{ caption: 'rb-icon',   url: '/components/rb-icon' },
			{ caption: 'rb-nav',    url: '/components/rb-nav' }
		]

		/* Private
		 **********/
		var setActivePath = () => {
			$scope.activePath = $location.path();
		}

		/* Watch
		 ********/
		$scope.$on('$locationChangeSuccess', setActivePath);

		/* Init
		 *******/
		setActivePath();
}]);
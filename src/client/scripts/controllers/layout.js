angular.module('rapid-build').controller('layoutController', ['$scope', 'RB_LAYOUTS', ($scope, RB_LAYOUTS) => {
	$scope.$on('$routeChangeSuccess', (event, current, previous) => {
		var layout = current.$$route.layout || 'superman',
			main   = current.loadedTemplateUrl,
			views  = current.$$route.views || {};

		layout = RB_LAYOUTS[layout];

		$scope.rbLayout = {
			layout,
			main,
			views
		};
	});
}]);
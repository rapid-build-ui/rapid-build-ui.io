angular.module('rapid-build').controller('layoutController', ['$anchorScroll', '$scope', 'LAYOUTS', ($anchorScroll, $scope, LAYOUTS) => {
	$scope.$on('$routeChangeSuccess', (event, current, previous) => {
		var layout    = current.$$route.layout || 'superman',
			main      = current.loadedTemplateUrl,
			views     = current.$$route.views || {},
			heroClass = `${layout}-layout`; // layout css class

		layout = LAYOUTS[layout];

		$scope.rbLayout = {
			heroClass,
			layout,
			main,
			views
		};

		$anchorScroll();
	});
}]);
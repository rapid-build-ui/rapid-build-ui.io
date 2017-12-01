angular.module('rapid-build').filter('typeof', () => {
	return val => {
		return typeof val;
	};
});
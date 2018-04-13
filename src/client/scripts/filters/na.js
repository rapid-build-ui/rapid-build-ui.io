/*********************
 * CURRENTLY ONLY FOR (component api table)
 *********************/
angular.module('rapid-build').filter('na', () => {
	return val => {
		return !!val ? val : 'n/a';
	};
});
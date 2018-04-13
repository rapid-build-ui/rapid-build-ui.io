/*********************
 * CURRENTLY ONLY FOR (component api table)
 *********************/
angular.module('rapid-build').filter('required', () => {
	return val => {
		return !!val ? 'yes' : 'no';
	};
});
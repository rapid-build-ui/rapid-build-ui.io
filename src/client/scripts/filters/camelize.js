/***********
 * CAMELIZE
 ***********/
angular.module('rapid-build').filter('camelize', () => {
	return val => {
		if (!val) return val;
		return val
			.replace(/[\s|_|-](.)/g, $1 => $1.toUpperCase())
			.replace(/[\s|_|-]/g, '')
			.replace(/^(.)/, $1 => $1.toLowerCase())
	};
});
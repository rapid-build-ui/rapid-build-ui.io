/*******************
 * CSS VARS SERVICE
 *******************/
angular.module('rapid-build').service('cssVarsService', ['$http', 'ENV',
	function($http, ENV) {

		this.get = (component, theme='common') => { // :Promise<object|string>
			const config = {
				method: 'GET',
				url: `/api/css-vars/${component}`,
				params: { theme }
			}

			if (!ENV.is.local)
				config.cache = true;

			return $http(config).then(res => {
				return res.data; // css variables
			});
		};

}]);

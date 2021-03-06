/********************
 * CHANGELOG SERVICE
 ********************/
angular.module('rapid-build').service('changelogService', ['$http', 'ENV',
	function($http, ENV) {

		this.get = component => { // :promise
			const config = {
				method: 'GET',
				url: `/api/changelogs/${component}`
			}

			if (!ENV.is.local)
				config.cache = true;

			if (ENV.is.dev)
				config.params = { branch: 'continuous' };

			return $http(config).then(res => {
				return res.data;
			}).catch(error => {
				return error.data.message;
			});
		};

}]);

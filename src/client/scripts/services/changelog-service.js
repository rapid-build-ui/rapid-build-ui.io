/********************
 * CHANGELOG SERVICE
 ********************/
angular.module('rapid-build').service('changelogService', ['$http',
	function($http) {

		this.get = component => { // :promise
			const config = {
				method: 'GET',
				cache: true,
				url: `/api/${component}/changelog`
			}
			// config.params = { branch: 'continuous' }

			return $http(config).then(res => {
				return res.data;
			}).catch(error => {
				return error.data.message;
			});
		};

	}
]);

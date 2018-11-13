/********************
 * SUPERHERO FACTORY
 ********************/
angular.module('rapid-build').factory('Superhero', ['$resource',
	function($resource) {
		return $resource('/api/superheroes/:id', { id: '@id' }, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

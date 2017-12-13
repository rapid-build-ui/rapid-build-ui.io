angular.module('rapid-build').config ['$routeProvider', ($routeProvider) ->
	$routeProvider
		.when '/',
			layout: 'superman'
			templateUrl: '/views/home.html'

		.when '/components/:component',
			layout: 'superman'
			# title: format: false
			title: format: 'uppercase'
			templateUrl: (params) ->
				"/views/rb-components/#{params.component}.html"

		.otherwise
			redirectTo: '/'
]

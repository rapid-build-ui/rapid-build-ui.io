angular.module('rapid-build').config ['$routeProvider', ($routeProvider) ->
	$routeProvider
		.when '/',
			layout: 'star-lord'
			templateUrl: '/views/mains/home.html'

		.when '/how-to-use',
			layout: 'superman'
			templateUrl: '/views/mains/how-to-use.html'

		.when '/components/:component',
			layout: 'wolverine'
			reloadOnSearch: false
			title: format: 'uppercase'
			views: aside: '/views/navs/components-nav.html'
			templateUrl: (params) -> "/views/rb-components/#{params.component}.html"

		.when '/components/',
			redirectTo: '/components/rb-button'

		.otherwise
			redirectTo: '/'
]

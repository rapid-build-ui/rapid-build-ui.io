angular.module('rapid-build').config ['$routeProvider', ($routeProvider) ->
	$routeProvider
		.when '/',
			layout: 'star-lord'
			templateUrl: '/views/mains/home.html'

		.when '/getting-started',
			layout: 'superman'
			templateUrl: '/views/mains/getting-started.html'

		.when '/components/:component',
			layout: 'wolverine'
			reloadOnSearch: false
			title: format: 'uppercase'
			views: aside: '/views/navs/components-nav.html'
			templateUrl: (params) -> "/views/components/#{params.component}.html"

		.when '/components/',
			redirectTo: '/components/rb-alert'

		.otherwise
			redirectTo: '/'
]

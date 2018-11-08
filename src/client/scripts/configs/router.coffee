angular.module('rapid-build').config ['$routeProvider', ($routeProvider) ->
	$routeProvider
		.when '/',
			layout: 'star-lord'
			templateUrl: '/views/mains/home.html'

		.when '/getting-started',
			layout: 'superman'
			templateUrl: '/views/mains/getting-started.html'

		.when '/browser-support',
			layout: 'superman'
			templateUrl: '/views/mains/browser-support.html'

		.when '/components/:component',
			layout: 'wolverine'
			reloadOnSearch: false
			title: format: 'uppercase'
			views: aside: '/views/navs/components-nav.html'
			templateUrl: (params) ->
				view = params.component.replace /rb-/i, ''
				"/views/components/#{view}.html"

		.when '/components/',
			redirectTo: '/components/rb-alert'

		.when '/examples/:example',
			layout: 'wolverine'
			reloadOnSearch: false
			views: aside: '/views/navs/examples-nav.html'
			templateUrl: (params) ->
				view = params.example
				"/views/examples/#{view}.html"

		.when '/examples/',
			redirectTo: '/examples/crud'

		.otherwise
			redirectTo: '/'
]

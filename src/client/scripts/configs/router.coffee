angular.module('rapid-build').config ['$routeProvider', ($routeProvider) ->
	$routeProvider
		# UNIQUES (unclassified root level routes)
		# =======
		.when '/',
			layout: 'superman'
			templateUrl: '/views/mains/uniques/home.html'

		.when '/builder',
			layout: 'thor'
			templateUrl: '/views/mains/uniques/builder.html'

		.when '/getting-started',
			layout: 'thor'
			templateUrl: '/views/mains/uniques/getting-started.html'

		# COMPONENTS (Oh Yeah!)
		# ==========
		.when '/components/',
			redirectTo: '/components/rb-alert'

		.when '/components/:component',
			layout: 'wolverine'
			reloadOnSearch: false
			title: format: 'uppercase'
			views: aside: '/views/navs/components-nav.html'
			templateUrl: (params) ->
				view = params.component.replace /rb-/i, ''
				"/views/mains/components/#{view}.html"

		# THEMES
		# ======
		.when '/themes/',
			redirectTo: '/themes/introduction'

		.when '/themes/:page',
			layout: 'wolverine'
			reloadOnSearch: false
			views: aside: '/views/navs/themes-nav.html'
			templateUrl: (params) ->
				view = params.page
				"/views/mains/themes/#{view}.html"

		.when '/themes/css-variables/:page',
			layout: 'wolverine'
			reloadOnSearch: false
			views: aside: '/views/navs/themes-nav.html'
			templateUrl: (params) ->
				view = params.page
				"/views/mains/themes/css-variables/#{view}.html"

		# EXAMPLES
		# ========
		.when '/examples/',
			redirectTo: '/examples/crud'

		.when '/examples/:page',
			layout: 'wolverine'
			reloadOnSearch: false
			views: aside: '/views/navs/examples-nav.html'
			templateUrl: (params) ->
				view = params.page
				"/views/mains/examples/#{view}.html"

		# FAQ
		# ===
		.when '/faq/',
			redirectTo: '/faq/list'

		.when '/faq/:page',
			layout: 'wolverine'
			reloadOnSearch: false
			views: aside: '/views/navs/faq-nav.html'
			templateUrl: (params) ->
				view = params.page
				view = 'faq' if view is 'list'
				"/views/mains/faq/#{view}.html"

		# OTHERWISE (Go Home!)
		# =========
		.otherwise
			redirectTo: '/'
]

angular.module('rapid-build').controller 'rbNavController', ['$scope', '$element',
	($scope, $element) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{nt}dark" if $scope.a.dark
			attrs += "#{nt}inline" if $scope.a.inline
			attrs += "#{nt}vertical" if $scope.a.vertical
			attrs += "#{nt}dividers" if $scope.a.dividers
			attrs += "#{nt}responsive" if $scope.a.responsive
			attrs += "#{nt}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{nt}active=\"#{$scope.a.active}\"" if $scope.a.active? and !($scope.a.active.param or $scope.a.active.segment)
			attrs += "#{nt}active='#{angular.toJson($scope.a.active)}'" if $scope.a.active and ($scope.a.active.param or $scope.a.active.segment)
			content = "#{nt}#{formatContent($scope.a.content)}#{n}" if $scope.a.content

			"<rb-nav#{attrs}>#{content}</rb-nav>"

		links = """
			<a href="#home">home</a>
			<a href="#about">about</a>
			<a href="#contact">contact</a>
		"""
		# <a href="#contact">contact <rb-icon kind="heart"></rb-icon></a>

		# links = """
		# 	<h3>Components</h3>
		# 	<a href="#home">home</a>
		# 	<a href="#about">about</a>
		# 	<a href="#contact">contact</a>
		# """

		# links = """
		# 	<h3>Rapid</h3>
		# 	<a href="#home">home</a>
		# 	<a href="#about">about</a>
		# 	<a href="#contact">contact</a>
		# """

		# links = """
		# 	<h3>X</h3>
		# 	<a href="#home">home</a>
		# 	<a href="#about">about</a>
		# 	<h3>X</h3>
		# 	<a href="#contact">contact</a>
		# """

		# links = """
		# 	<a target="_blank" href="https://www.npmjs.com/~rapid-build-ui">
		# 		Chrome <rb-icon source="brands" kind="chrome"></rb-icon>
		# 	</a>
		# 	<a target="_blank" href="https://github.com/rapid-build-ui">
		# 		GitHub <rb-icon source="brands" kind="github"></rb-icon>
		# 	</a>
		# """

		# links = """
		# 	<a href="?name=home#home">home</a>
		# 	<a href="?name=about#about">about</a>
		# 	<a href="/components/rb-nav?name=contact#contact">contact</a>
		# """

		$scope.links = [
			href:    'home'
			content: 'home'
		,
			href:    'about'
			content: 'about'
		,
			href:    'contact'
			content: 'contact <rb-icon kind="heart"></rb-icon></a>'
		]

		linkCnt = 1
		$scope.addLink = ->
			newLink = "link#{linkCnt++}"
			newLink = href: newLink, content: newLink
			$scope.links.push newLink

		$scope.removeLink = ->
			$scope.links.pop()
			linkCnt--

		# HELPERS
		# =======
		formatContent = (content) ->
			return '' unless content
			content.replace /\n/g, '\n\t'

		# Props
		# =====
		$scope.kinds = ['primary']
		$scope.actives = [
			false
			'hash'
			'path'
			{ param: 'name' }
			{ segment: 2 }
		]

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				content: links # :string | html
				# active: $scope.actives[4]
				# active: false
				# active: 'hash'
				# active: 'path'
				# kind:       'primary'
				# dark:       true
				# dividers:   true
				# vertical:   true
				# responsive: true


		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Event Handlers
		# ==============
		resetFrm = -> $scope.$apply $scope.reset
		resetBtn = $element[0].querySelector('[data-reset]')
		resetBtn.addEventListener 'clicked', resetFrm

		# Init
		# ====
		$scope.reset()

		# Destroys
		# ========
		$scope.$on '$destroy', ->
			resetBtn.removeEventListener 'clicked', resetFrm
			markupWatch()
]

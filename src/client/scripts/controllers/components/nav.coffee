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
			attrs += "#{nt}responsive" if $scope.a.responsive is $scope.responsives[0]
			attrs += "#{nt}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{nt}active=\"#{$scope.a.active}\"" if $scope.a.active? and !($scope.a.active.param or $scope.a.active.segment)
			attrs += "#{nt}active='#{angular.toJson($scope.a.active)}'" if $scope.a.active and ($scope.a.active.param or $scope.a.active.segment)
			attrs += "#{nt}responsive='#{JSON.stringify(responsiveOpts, null, '\t')}'" if $scope.a.responsive is $scope.responsives[1]
			content = "#{nt}#{formatContent($scope.a.content)}#{n}" if $scope.a.content

			"<rb-nav#{attrs}>#{content}</rb-nav>"

		links = """
			<a href="#home">home</a>
			<a href="#about">about</a>
			<a href="#contact">contact</a>
		"""

		# links = """
		# 	<h3>Controls</h3>
		# 	<a href="#home">home</a>
		# 	<a href="#about">about</a>
		# 	<a href="#contact">contact</a>
		# """

		# links = """
		# 	<h3>Components</h3>
		# 	<a href="#home">home</a>
		# 	<a href="#about">about</a>
		# 	<a href="#contact">contact</a>
		# 	<h3>Form Controls</h3>
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

		# linkCnt = 1
		# $element[0].querySelector('[data-add-link]').onclick = ->
		# 	newLink = "link#{linkCnt++}"
		# 	newLink = href: newLink, content: newLink
		# 	$scope.links.push newLink
		# 	$scope.$apply()
		# $element[0].querySelector('[data-remove-link]').onclick = ->
		# 	$scope.links.pop()
		# 	linkCnt--
		# 	$scope.$apply()

		# HELPERS
		# =======
		formatContent = (content) ->
			return '' unless content
			content.replace /\n/g, '\n\t'

		# Responsive Options
		# ==================
		responsiveOpts =
			# at: 960
			at: 775
			show: true
			dividers: true
			closeOnClick: false

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
		$scope.responsives = [
			'enable'
			'with options'
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
				# dark:       true
				# kind:       'primary'
				# dividers:   true
				# vertical:   true
				# responsive: $scope.responsives[0]
				# responsive: $scope.responsives[1]

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Event Handlers
		# ==============
		resetFrm = -> $scope.$apply $scope.reset
		resetBtn = $element[0].querySelector '[data-reset]'
		resetBtn.onclick = resetFrm

		# Init
		# ====
		$scope.reset()

		# Destroys
		# ========
		$scope.$on '$destroy', ->
			markupWatch()
]

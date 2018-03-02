angular.module('rapid-build').controller 'rbNavController', ['$scope', '$element',
	($scope, $element) ->
		# Private
		# =======
		formatContent = (content) ->
			return '' unless content
			content.replace /\n/g, '\n\t'

		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}active=\"#{$scope.a.active}\"" if $scope.a.active? and !($scope.a.active.param or $scope.a.active.segment)
			attrs += "#{s}active='#{angular.toJson($scope.a.active)}'" if $scope.a.active and ($scope.a.active.param or $scope.a.active.segment)
			attrs += "#{s}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
			attrs += "#{s}inline" if $scope.a.inline
			attrs += "#{s}vertical" if $scope.a.vertical
			attrs += "#{s}dividers" if $scope.a.dividers
			attrs += "#{s}responsive" if $scope.a.responsive
			content = "#{nt}#{formatContent($scope.a.content)}#{n}" if $scope.a.content

			"<rb-nav#{attrs}>#{content}</rb-nav>"

		links = """
			<a href="#home">home</a>
			<a href="#about">about</a>
			<a href="#contact">contact</a>
		"""

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
			'home',
			'about',
			'contact'
		]

		linkCnt = 1
		$scope.addLink = ->
			$scope.links.push " link#{linkCnt++} "

		# Props
		# =====
		$scope.kinds = ['tabs']
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
				# caption: 'Components'
				# active: $scope.actives[4]
				# active: false
				# active: 'hash'
				# active: 'path'
				# kind:    'tabs'
				# dividers: true
				# vertical: true


		# Watches
		# =======
		markupWatch = $scope.$watch ->
			$scope.markup = createMarkup()

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
angular.module('rapid-build').controller 'rbNavController', ['$scope',
	($scope) ->
		# Private
		# =======
		formatContent = (content) ->
			return '' unless content
			content.replace /\n/g, '\n\t'

		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}dividers" if $scope.a.dividers
			attrs += "#{s}inline" if $scope.a.inline
			attrs += "#{s}vertical" if $scope.a.vertical
			attrs += "#{s}unresponsive" if $scope.a.unresponsive
			attrs += "#{s}active=\"#{$scope.a.active}\"" if $scope.a.active?
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
			content = "#{nt}#{formatContent($scope.a.content)}#{n}" if $scope.a.content

			"<rb-nav#{attrs}>#{content}</rb-nav>"

		links = """
			<a href="#home">home</a>
			<a href="#about">about</a>
			<a href="#contact">contact</a>
		"""

		# links = """
		# 	<a href="/home">home</a>
		# 	<a href="/components/rb-icon#faq">faq</a>
		# 	<a href="/components/rb-button?name=rapid">about</a>
		# 	<a href="/components/rb-nav?name=rapid#build">contact</a>
		# """

		$scope.links = [
			'home',
			'about',
			'contact'
		]

		linkCnt = 1
		$scope.addLink = ->
			$scope.links.push "link#{linkCnt++}"

		# Props
		# =====
		$scope.kinds = ['tabs']
		$scope.actives = [
			false
			'hash'
			'path'
			# { param: 'status' }
			# { segment: 1 }
		]

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				content: links # :string | html
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

		# Init
		# ====
		$scope.reset()

		# Destroys
		# ========
		$scope.$on '$destroy', ->
			markupWatch()
]
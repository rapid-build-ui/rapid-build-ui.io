angular.module('rapid-build').controller 'rbNavController', ['$scope',
	($scope) ->
		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}layout=\"#{$scope.a.layout}\"" if $scope.a.layout
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-nav#{attrs}>#{content}</rb-nav>"

		links = """
			<a href="/">home</a>
			<a href="/contact">contact</a>
			<a href="/examples">examples</a>
		"""

		# Props
		# =====
		$scope.layout = 'vertical'

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				content: links # :string | html

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
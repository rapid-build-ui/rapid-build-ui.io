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
			attrs += "#{s}vertical" if $scope.a.vertical
			attrs += "#{s}unresponsive" if $scope.a.unresponsive
			attrs += "#{s}active=\"#{$scope.a.active}\"" if $scope.a.active
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
			content = "#{nt}#{formatContent($scope.a.content)}#{n}" if $scope.a.content

			"<rb-nav#{attrs}>#{content}</rb-nav>"

		links = """
			<a>home</a>
			<a>about</a>
			<a>contact</a>
		"""

		# Props
		# =====
		$scope.kinds = ['tabs']
		$scope.actives = ['disabled','hash','path','segment']

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
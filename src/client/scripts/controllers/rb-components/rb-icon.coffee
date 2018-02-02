angular.module('rapid-build').controller 'rbIconController', ['$scope',
	($scope) ->
		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}source=\"#{$scope.a.source}\"" if $scope.a.source
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind

			"<rb-icon#{attrs}>#{content}</rb-icon>"

		# Props
		# =====
		$scope.kinds = ['heart','github','user']
		$scope.sources = ['solid','light', 'branded']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				kind: 'heart' # :string (required)
				source: 'regular'

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
angular.module('rapid-build').controller 'rbIconController', ['$scope',
	($scope) ->
		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}bold" if $scope.a.bold
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind isnt 'nil'
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size isnt 'nil'

			"<rb-icon#{attrs}>#{content}</rb-icon>"

		# Props
		# =====
		$scope.kinds = ['heart','github','user']
		$scope.sizes = ['nil','small','big']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				kind: 'heart' # :string (required)
				bold: false   # :valueless
				size: 'nil'   # :string

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
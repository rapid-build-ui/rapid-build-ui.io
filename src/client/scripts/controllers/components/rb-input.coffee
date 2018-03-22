angular.module('rapid-build').controller 'rbInputController', ['$scope', '$element', 'RB_INPUT_API',
	($scope, $element, RB_INPUT_API) ->
		$scope.api = RB_INPUT_API

		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{s}model=\"#{$scope.a.model}\"" if $scope.a.model

			"<rb-input#{attrs}></rb-input>"

		# Props
		# =====

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				label: 'My Input'

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

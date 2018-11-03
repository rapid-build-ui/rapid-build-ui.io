angular.module('rapid-build').controller 'rbIconController', ['$scope', '$element',
	($scope, $element) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}source=\"#{$scope.a.source}\"" if $scope.a.source
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{s}vertical=\"#{$scope.a.vertical}\"" if $scope.a.vertical

			"<rb-icon#{attrs}></rb-icon>"

		# Props
		# =====
		$scope.kinds     = ['heart','user','github']
		$scope.sources   = ['solid','brands']
		$scope.verticals = ['bottom','middle','top']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				kind: 'heart' # :string (required)

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

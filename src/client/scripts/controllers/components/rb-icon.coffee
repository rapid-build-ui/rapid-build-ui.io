angular.module('rapid-build').controller 'rbIconController', ['$scope', '$element', 'RB_ICON_API',
	($scope, $element, RB_ICON_API) ->
		$scope.api = RB_ICON_API

		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}source=\"#{$scope.a.source}\"" if $scope.a.source
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size

			"<rb-icon#{attrs}></rb-icon>"

		# Props
		# =====
		$scope.kinds   = ['heart','user','github']
		$scope.sources = ['solid','brands']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				kind: 'heart' # :string (required)

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

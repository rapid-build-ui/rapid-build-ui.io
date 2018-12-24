angular.module('rapid-build').controller 'rbIconController', ['$scope', '$element',
	($scope, $element) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{nt}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{nt}source=\"#{$scope.a.source}\"" if $scope.a.source
			attrs += "#{nt}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{nt}valign=\"#{$scope.a.valign}\"" if $scope.a.valign

			"<rb-icon#{attrs}>#{n}</rb-icon>"

		# Props
		# =====
		$scope.kinds   = ['heart','user','github']
		$scope.sources = ['solid','brands']
		$scope.valigns = ['bottom','middle','top']

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

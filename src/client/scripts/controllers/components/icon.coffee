angular.module('rapid-build').controller 'rbIconController', ['$scope', '$element', 'typeService',
	($scope, $element, type) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{nt}dark" if $scope.a.dark # TODO
			attrs += "#{nt}spin" if $scope.a.spin
			attrs += "#{nt}burst" if $scope.a.burst
			attrs += "#{nt}pulse" if $scope.a.pulse
			attrs += "#{nt}flip=\"#{$scope.a.flip}\"" if $scope.a.flip
			attrs += "#{nt}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{nt}speed=\"#{$scope.a.speed}\"" if $scope.a.speed
			attrs += "#{nt}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{nt}source=\"#{$scope.a.source}\"" if $scope.a.source
			attrs += "#{nt}rotate=\"#{$scope.a.rotate}\"" if $scope.a.rotate
			attrs += "#{nt}valign=\"#{$scope.a.valign}\"" if $scope.a.valign
			attrs += "#{nt}animate=\'#{JSON.stringify($scope.a.animate)}\'" if $scope.a.animate and $scope.a.animate.length
			attrs += "#{nt}library=\"#{$scope.a.library}\"" if $scope.a.library

			"<rb-icon#{attrs}>#{n}</rb-icon>"

		# Props
		# =====
		# $scope.libraries = ['material']
		$scope.kinds     = ['heart','spinner','github']
		$scope.sources   = ['solid','brands']
		$scope.flip      = ['horizontal', 'vertical', 'both']
		$scope.valigns   = ['bottom','middle','top']

		# Methods
		# =======
		$scope.updateIcon = -> # :void (for testing only)
			rbIcon = $element[0].querySelector '[id^="built__"]'
			rbIcon.spin  = !rbIcon.spin  unless type.is.undefined rbIcon.spin
			rbIcon.burst = !rbIcon.burst unless type.is.undefined rbIcon.burst
			rbIcon.pulse = !rbIcon.pulse unless type.is.undefined rbIcon.pulse
			rbIcon.flip  = 'both'

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

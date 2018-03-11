angular.module('rapid-build').controller 'rbPopoverController', ['$scope', '$element', 'RB_POPOVER_API'
	($scope, $element, RB_POPOVER_API) ->
		$scope.componentApi = RB_POPOVER_API
		
		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}position=\"#{$scope.a.position}\"" if $scope.a.position
			attrs += "#{s}trigger=\"#{$scope.trigger}\"" if $scope.a.trigger
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-popover#{attrs}>#{content}</rb-popover>"

		# Props
		# =====
		$scope.kinds     = ['success','danger','warning','info']
		$scope.positions = ['top','bottom','left']
		$scope.trigger   = 'hover'

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				content: 'Hello popover!'
				caption: 'Caption'

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

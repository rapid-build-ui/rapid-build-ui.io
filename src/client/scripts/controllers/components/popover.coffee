angular.module('rapid-build').controller 'rbPopoverController', ['$scope', '$element',
	($scope, $element) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}hover" if $scope.a.hover
			attrs += "#{s}unstyled" if $scope.a.unstyled
			attrs += "#{s}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}position=\"#{$scope.a.position}\"" if $scope.a.position
			attrs += "#{s}icon=\"#{$scope.a.icon}\"" if $scope.a.icon
			attrs += "#{s}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			# attrs += "#{s}icon-size=\"#{$scope.a.iconSize}\"" if $scope.a.iconSize
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-popover#{attrs}>#{content}</rb-popover>"

		# Props
		# =====
		$scope.kinds       = ['success','danger','warning','info']
		$scope.positions   = ['top','bottom','left']
		$scope.icons       = ['question-circle','download','github']
		$scope.iconSources = ['solid','brands']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				caption: 'Caption'
				content: 'Now that\'s poppin!'

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

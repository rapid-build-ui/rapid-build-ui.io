angular.module('rapid-build').controller 'rbPopoverController', ['$scope', '$element',
	($scope, $element) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}fit-content" if $scope.a.fitContent
			attrs += "#{s}hover" if $scope.a.hover
			attrs += "#{s}unstyled" if $scope.a.unstyled
			attrs += "#{s}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}position=\"#{$scope.a.position}\"" if $scope.a.position
			attrs += "#{s}show-popover=\"#{$scope.a.showPopover}\"" if $scope.a.showPopover
			attrs += "#{s}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{s}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{s}icon-size=\"#{$scope.a.iconSize}\"" if $scope.a.iconSize
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-popover#{attrs}>#{content}</rb-popover>"

		# Props
		# =====
		$scope.kinds       = ['success','danger','warning','info']
		$scope.positions   = ['top','bottom','left']
		$scope.iconKinds   = ['question-circle','download','github']
		$scope.iconSources = ['solid','brands']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				caption: 'hello world'
				content: 'Now that\'s poppin!'

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

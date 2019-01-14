angular.module('rapid-build').controller 'rbPopoverController', ['$scope', '$element',
	($scope, $element) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{nt}pin" if $scope.a.pin
			attrs += "#{nt}dark" if $scope.a.dark # TODO
			attrs += "#{nt}hover" if $scope.a.hover
			attrs += "#{nt}unstyled" if $scope.a.unstyled
			attrs += "#{nt}fit-content" if $scope.a.fitContent
			attrs += "#{nt}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{nt}position=\"#{$scope.a.position}\"" if $scope.a.position
			attrs += "#{nt}show-popover=\"#{$scope.a.showPopover}\"" if $scope.a.showPopover
			attrs += "#{nt}icon-size=\"#{$scope.a.iconSize}\"" if $scope.a.iconSize
			attrs += "#{nt}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{nt}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{nt}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
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

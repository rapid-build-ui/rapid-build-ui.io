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
			attrs += "#{nt}icon-spin" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'spin'
			attrs += "#{nt}icon-burst" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'burst'
			attrs += "#{nt}icon-pulse" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'pulse'
			attrs += "#{nt}fit-content" if $scope.a.fitContent
			attrs += "#{nt}inherit-color" if $scope.a.inheritColor
			attrs += "#{nt}open=\"#{$scope.a.open}\"" if $scope.a.open
			attrs += "#{nt}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{nt}position=\"#{$scope.a.position}\"" if $scope.a.position
			attrs += "#{nt}icon-flip=\"#{$scope.a.iconFlip}\"" if $scope.a.iconFlip
			attrs += "#{nt}icon-size=\"#{$scope.a.iconSize}\"" if $scope.a.iconSize
			attrs += "#{nt}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{nt}icon-speed=\"#{$scope.a.iconSpeed}\"" if $scope.a.iconSpeed
			attrs += "#{nt}icon-rotate=\"#{$scope.a.iconRotate}\"" if $scope.a.iconRotate
			attrs += "#{nt}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{nt}caption=\"#{$scope.a.caption}\"" if $scope.a.caption
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-popover#{attrs}>#{content}</rb-popover>"

		# Props
		# =====
		$scope.kinds         = ['danger','info','neutral','success','warning']
		$scope.positions     = ['bottom','left','right']
		$scope.iconFlips     = ['horizontal','vertical','both']
		$scope.iconKinds     = ['question-circle','download','github']
		$scope.iconSources   = ['solid','brands']
		$scope.iconAnimation = ['burst','pulse','spin']

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
		resetBtn = $element[0].querySelector '[data-reset]'
		resetBtn.onclick = resetFrm

		# Init
		# ====
		$scope.reset()

		# Destroys
		# ========
		$scope.$on '$destroy', ->
			markupWatch()
]

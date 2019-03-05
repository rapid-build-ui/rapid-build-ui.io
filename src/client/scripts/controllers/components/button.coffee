angular.module('rapid-build').controller 'rbButtonController', ['$scope', '$element',
	($scope, $element) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{nt}dark" if $scope.a.dark # TODO
			attrs += "#{nt}disabled" if $scope.a.disabled
			attrs += "#{nt}icon-spin" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'spin'
			attrs += "#{nt}icon-burst" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'burst'
			attrs += "#{nt}icon-pulse" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'pulse'
			attrs += "#{nt}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{nt}type=\"#{$scope.a.type}\"" if $scope.a.type
			attrs += "#{nt}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{nt}icon-flip=\"#{$scope.a.iconFlip}\"" if $scope.a.iconFlip
			attrs += "#{nt}icon-size=\"#{$scope.a.iconSize}\"" if $scope.a.iconSize
			attrs += "#{nt}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{nt}icon-speed=\"#{$scope.a.iconSpeed}\"" if $scope.a.iconSpeed
			attrs += "#{nt}icon-rotate=\"#{$scope.a.iconRotate}\"" if $scope.a.iconRotate
			attrs += "#{nt}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{nt}icon-position=\"left\"" if $scope.a.iconPosition
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.iconFlips     = ['horizontal','vertical','both']
		$scope.iconKinds     = ['save','sync','trash-alt']
		$scope.iconSources   = ['solid','brands']
		$scope.iconAnimation = ['burst','pulse','spin']
		$scope.kinds         = ['success','danger','warning','info','secondary','text']
		$scope.sizes         = ['small','big']
		$scope.types         = ['reset','submit']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				content: 'Button' # :string | html

		$scope.save = (e) ->
			console.log $scope.demoForm

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

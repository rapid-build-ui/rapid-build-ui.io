angular.module('rapid-build').controller 'rbButtonController', ['$scope', '$element',
	($scope, $element) ->

		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{s}type=\"#{$scope.a.type}\"" if $scope.a.type
			attrs += "#{s}icon=\"#{$scope.a.icon}\"" if $scope.a.icon
			attrs += "#{s}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{s}icon-position=\"#{$scope.a.iconPosition}\"" if $scope.a.iconPosition
			content = "#{nt}#{$scope.a.caption}#{n}" if $scope.a.caption

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.icons        = ['heart','user','github']
		$scope.iconSources  = ['solid','brands']
		$scope.kinds        = ['success','danger','warning','info']
		$scope.sizes        = ['small','big']
		$scope.types        = ['reset','submit']
		$scope.iconPosition = 'left'

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				caption: 'Button' # :string | html

		$scope.save = (e) ->
			console.log $scope.demoForm

		# Watches
		# =======
		markupWatch = $scope.$watch ->
			$scope.markup = createMarkup()

		# Event Testing
		# =============
		resetFrm = -> $scope.$apply $scope.reset
		resetBtn = $element[0].querySelector('[data-reset]')
		resetBtn = angular.element resetBtn
		# either way to add listner
		# resetBtn.addEventListener 'clicked', resetFrm
		resetBtn.on 'clicked', resetFrm

		# Init
		# ====
		$scope.reset()

		# Destroys
		# ========
		$scope.$on '$destroy', ->
			# resetBtn.removeEventListener 'clicked', resetFrm
			resetBtn.off 'clicked', resetFrm
			markupWatch()





]
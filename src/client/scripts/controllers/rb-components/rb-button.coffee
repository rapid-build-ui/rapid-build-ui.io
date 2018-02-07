angular.module('rapid-build').controller 'rbButtonController', ['$scope','typeService','heroNamesValue',
	($scope, typeService, heroNames) ->

		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{s}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{s}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{s}icon-position=\"#{$scope.a.iconPosition}\"" if $scope.a.iconPosition
			attrs += "#{s}type=\"#{$scope.a.type}\"" if $scope.a.type
			content = "#{nt}#{$scope.a.caption}#{n}" if $scope.a.caption

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.heroes = heroNames
		$scope.isType = typeService.get
		$scope.icons  = ['heart','github','user']
		$scope.iconSources = ['solid', 'light', 'branded']
		$scope.kinds  = ['success','danger','warning','info']
		$scope.sizes  = ['small','big']
		$scope.types  = ['button','reset']
		$scope.iconPosition = 'left'

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				caption: 'Button'  # :string | html

		$scope.save = ->
			console.log $scope.demoForm


		# Watches
		# =======
		markupWatch = $scope.$watch ->
			$scope.markup = createMarkup()

		# Init
		# ====
		$scope.reset()

		# Destroys
		# ========
		$scope.$on '$destroy', ->
			markupWatch()
]
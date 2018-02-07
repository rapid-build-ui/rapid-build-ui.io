angular.module('rapid-build').controller 'rbButtonController', ['$scope','typeService','heroNamesValue',
	($scope, typeService, heroNames) ->
		# Private
		# =======
		hasOptions = (obj) ->
			return false unless obj
			for key, val of obj
				return true if val isnt undefined
			false

		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{s}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{s}icon-position=\"#{$scope.a.iconPosition}\"" if $scope.a.iconPosition
			attrs += "#{s}icon-options='#{JSON.stringify($scope.a.iconOpts)}'" if hasOptions $scope.a.iconOpts
			attrs += "#{s}type=\"#{$scope.a.type}\"" if $scope.a.type
			content = "#{nt}#{$scope.a.caption}#{n}" if $scope.a.caption

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.heroes = heroNames
		$scope.isType = typeService.get
		$scope.icons  = ['heart','github','user']
		$scope.kinds  = ['success','danger','warning','info']
		$scope.sizes  = ['small','big']
		$scope.types  = ['button','reset']
		$scope.iconPosition = 'left'
		$scope.iconOpts =
			bold: false
			size: ['small','big']

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
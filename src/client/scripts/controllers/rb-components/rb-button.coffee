angular.module('rapid-build').controller 'rbButtonController', ['$scope',
	($scope) ->
		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind isnt 'default'
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size isnt 'default'
			attrs += "#{s}icon=\"#{$scope.a.icon}\"" if $scope.a.icon isnt 'nil'
			attrs += "#{s}icon-position=\"#{$scope.a.iconPosition}\"" if $scope.a.iconPosition isnt 'right'
			attrs += "#{s}icon-options=\"#{$scope.a.iconOpts}\"" if $scope.a.iconOpts
			attrs += "#{s}type=\"#{$scope.a.type}\"" if $scope.a.type isnt 'default'
			content = "#{nt}#{$scope.a.caption}#{n}" if $scope.a.caption

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.icons = ['nil','heart','github','user']
		$scope.kinds = ['default','success','danger','warning','info']
		$scope.sizes = ['default','small','big']
		$scope.iconPositions = ['right','left']
		$scope.types = ['default', 'button']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				disabled:     false     # :boolean
				caption:      'Button'  # :string | html
				icon:         'nil'     # :string
				iconOpts:     null      # :{}
				iconPosition: 'right'   # :string
				kind:         'default' # :string
				size:         'default' # :string
				type:         'default' # :string

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
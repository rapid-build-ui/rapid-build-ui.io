angular.module('rapid-build').controller 'rbButtonController', ['$scope','typeService',
	($scope, typeService) ->
		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind isnt 'nil'
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size isnt 'nil'
			attrs += "#{s}icon=\"#{$scope.a.icon}\"" if $scope.a.icon isnt 'nil'
			attrs += "#{s}icon-position=\"#{$scope.a.iconPosition}\"" if $scope.a.iconPosition isnt 'right'
			attrs += "#{s}icon-options='#{JSON.stringify($scope.a.iconOpts)}'" if $scope.a.iconOpts
			attrs += "#{s}type=\"#{$scope.a.type}\"" if $scope.a.type isnt 'submit'
			content = "#{nt}#{$scope.a.caption}#{n}" if $scope.a.caption

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.isType = typeService.get;
		$scope.icons  = ['nil','heart','github','user']
		$scope.kinds  = ['nil','success','danger','warning','info']
		$scope.sizes  = ['nil','small','big']
		$scope.types  = ['submit','button']
		$scope.iconPositions = ['right','left']
		$scope.iconOpts =
			bold: false
			size: ['nil','small','big']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				caption:      'Button' # :string | html
				disabled:     false    # :boolean
				icon:         'nil'    # :string
				iconOpts:     null       # :{}
				iconPosition: 'right'  # :string
				kind:         'nil'    # :string
				size:         'nil'    # :string
				type:         'submit' # :string

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
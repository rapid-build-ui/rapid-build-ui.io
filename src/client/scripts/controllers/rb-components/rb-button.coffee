angular.module('rapid-build').controller 'rbButtonController', ['$scope',
	($scope) ->
		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind isnt 'default'
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size isnt 'default'
			attrs += "#{s}icon=\"#{$scope.a.icon}\"" if $scope.a.icon isnt 'nil'
			attrs += "#{s}icon-options=\"#{$scope.a.iconOpts}\"" if $scope.a.iconOpts
			content = "#{nt}#{$scope.a.caption}#{n}" if $scope.a.caption

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.icons = ['nil','heart','github','user']
		$scope.kinds = ['default','success','danger','warning','info']
		$scope.sizes = ['default','small','big']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				caption:  'Button'  # :string | html
				icon:     'nil'     # :string
				iconOpts: null      # :{}
				kind:     'default' # :string
				size:     'default' # :string

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
angular.module('rapid-build').controller 'rbInputController', ['$scope', '$element', 'RB_INPUT_API',
	($scope, $element, RB_INPUT_API) ->
		$scope.api = RB_INPUT_API

		# Private
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{s}value=\"#{$scope.a.value}\"" if $scope.a.value
			attrs += "#{s}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{s}value=\"#{$scope.a.value}\"" if $scope.a.value
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}right" if $scope.a.right
			attrs += "#{s}validation='#{JSON.stringify($scope.validation)}\'" if $scope.a.validation
			# attrs += "#{s}validation=\"#{JSON.stringify($scope.a.validation).replace(/\"/g,'\\\'')}\"" if $scope.a.validation.length > 0
			"<rb-input#{attrs}></rb-input>"


		# Props
		# =====
		$scope.validation = [
			'required',
			'email',
			(value) ->
				console.log(value)
				true
			,

		]

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				label: 'My Input'
				subtext: 'My subtext'
				value: ""
				validation: false

		# Watches
		# =======
		markupWatch = $scope.$watch ->
			$scope.markup = createMarkup()

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

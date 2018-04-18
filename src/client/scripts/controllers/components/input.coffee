angular.module('rapid-build').controller 'rbInputController', ['$scope', '$element', 'typeService',
	($scope, $element, type) ->
		# Builder
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
			attrs += "#{s}validation='#{JSON.stringify($scope.a.validation, stringifyModifier, '\t')
											.replace(/\\n/g, '\n')
											.replace(/\\"/g, '"')
											.replace(/"function \(val\)/g, 'function(val)')
											.replace(/\}"/g, '}')}'" if $scope.a.validation.length
			"<rb-input#{attrs}></rb-input>"

		# Methods
		# =======
		stringifyModifier = (key, val) ->
			val = angular.copy val
			return val unless type.is.function val
			val.toString()

		customValidation = (val) ->
			valid: val is "rapid",
			message: "must be rapid"

		$scope.validations = [
			'required'
			'email'
			minLength: 2
			customValidation
		]

		$scope.reset = ->
			$scope.a =
				label: 'My Input'
				subtext: 'My subtext'
				value: ""
				validation: [
					# $scope.validations[0]
					# $scope.validations[1]
					# $scope.validations[2]
					# $scope.validations[3]
				]

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', ->
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

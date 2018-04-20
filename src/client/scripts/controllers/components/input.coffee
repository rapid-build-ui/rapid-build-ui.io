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
			attrs += "#{s}validation='#{buldValidationMarkup()}'" if $scope.a.validation.length
			"<rb-input#{attrs}></rb-input>"

		# Helpers
		# =======
		stringifyModifier = (key, val) ->
			val = angular.copy val
			return val unless type.is.function val
			val.toString()

		customValidation = (val) ->
			valid: val is "rapid",
			message: "must be rapid"

		customValidationPromise = (val) ->
			new Promise (resolve) ->
				setTimeout(
					resolve
					1500
					valid: val is "rapid",
					message: "must be rapid"
				)

		buldValidationMarkup = () ->
			validators = []
			for validator, i in $scope.a.validation
				switch validator
					when 'required'
						validators.push $scope.validations[0]
					when 'min length'
						validators.push $scope.validations[1]
					when 'range'
						validators.push $scope.validations[2]
					when 'custom'
						validators.push $scope.validations[3]

			JSON.stringify(validators, stringifyModifier, '\t')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/"function\s*\((.*)\)/g, 'function($1)')
				.replace(/\}"/g, '}')

		# Props
		# =======
		$scope.validationLabels = [
			'required',
			'min length'
			'range'
			'custom'
		]

		$scope.validations = [
			'required'
			minLength: 2
			{ range: min: 2, max: 9}
			customValidation
			# customValidationPromise
		]

		$scope.reset = ->
			$scope.a =
				label: 'My Input'
				subtext: 'My subtext'
				value: ""
				validation: [
					# $scope.validationLabels[0]
					# $scope.validationLabels[1]
					# $scope.validationLabels[2]
					# $scope.validationLabels[3]
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

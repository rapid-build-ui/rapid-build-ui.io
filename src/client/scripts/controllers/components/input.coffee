angular.module('rapid-build').controller 'rbInputController', ['$scope', '$element', 'typeService', 'evenListenerService',
	($scope, $element, type, evenListener) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{s}value=\"#{$scope.a.value}\"" if $scope.a.value
			attrs += "#{s}type=\"#{$scope.a.type}\"" if $scope.a.type?.length
			attrs += "#{s}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{s}placeholder=\"#{$scope.a.placeholder}\"" if $scope.a.placeholder
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}right" if $scope.a.right
			attrs += "#{s}inline" if $scope.a.inline
			attrs += "#{s}validation='#{buldValidationMarkup()}'" if $scope.a.validation?.length
			attrs += "#{s}icon=\"#{$scope.a.icon}\"" if $scope.a.icon
			attrs += "#{s}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{s}icon-position=\"#{$scope.a.iconPosition}\"" if $scope.a.iconPosition
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
					when 'minLength'
						validators.push $scope.validations[1]
					when 'minMaxLength'
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
		$scope.icons        = ['heart','user','github']
		$scope.iconSources  = ['solid','brands']
		$scope.iconPosition = 'left'
		$scope.validationLabels = [
			'required',
			'minLength'
			'minMaxLength'
			'custom'
		]
		$scope.types = ['number']

		$scope.validations = [
			'required'
			minLength: 2
			{ minMaxLength: min: 2, max: 5}
			customValidation
		]

		$scope.reset = ->
			$scope.a =
				label: 'First Name'

			evenListener.resetInputs $element, $scope.a


		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Input Listeners
		# ===============
		evenListener.addListenersToInputs $element


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
			evenListener.removeListenersToInputs $element
			markupWatch()
]

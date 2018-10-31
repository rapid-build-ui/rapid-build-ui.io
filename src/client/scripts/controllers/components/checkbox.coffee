angular.module('rapid-build').controller 'rbCheckboxController', ['$scope', '$element', 'typeService', 'rbEventService',
	($scope, $element, type, rbEvents) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			# attrs += "#{s}value=#{buldValueMarkup()}" if $scope.a.value  isnt 'object'
			attrs += "#{s}value='#{buldValueMarkup()}'" if $scope.a.value  isnt undefined
			attrs += "#{s}validation='#{buldValidationMarkup()}'" if $scope.a.validation?.length
			attrs += "#{nt}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{nt}disabled" if $scope.a.disabled
			attrs += "#{nt}inline" if $scope.a.inline
			attrs += "#{nt}horizontal" if $scope.a.horizontal
			attrs += "#{nt}right" if $scope.a.right
			attrs += "#{nt}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{nt}sublabel=\"#{$scope.a.sublabel}\"" if $scope.a.sublabel
			"<rb-checkbox#{attrs}>#{n}</rb-checkbox>"


		# Props
		# =====
		$scope.values = [
			false,
			'superman',
			10,
			{id: 2, name: 'superman'}
		]

		$scope.valueLabels = [
			'boolean',
			'string',
			'number',
			'object'
		]

		$scope.validationLabels = [
			'required'
		]
		$scope.validations = [
			'required'
		]

		# Helpers
		# =======
		stringifyModifier = (key, val) ->
			val = angular.copy val
			return val unless type.is.function val
			val.toString()


		# Methods
		# =======
		$scope.reset = ->
			# $scope.a = {}
			$scope.a =
				label:    'Superman'
				sublabel: 'Is Awesome?'
				value:    undefined
				# subtext:  'optional'
				# value:    true
				# disabled: true

		buldValueMarkup = () ->
			switch $scope.a.value
				when 'boolean'
					value = $scope.values[0]
				when 'string'
					value = $scope.values[1]
				when 'number'
					value = $scope.values[2]
				when 'object'
					value = $scope.values[3]

			return "\"#{value}\"" unless $scope.a.value is 'object'
			JSON.stringify(value, stringifyModifier, '\t')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/"function\s*\((.*)\)/g, 'function($1)')
				.replace(/\}"/g, '}')

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


		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Rb Eventing
		# ===========
		rbEvents.addListeners $element, 'rb-input', 'value-changed'
		rbEvents.addListeners $element, 'rb-radios', 'value-changed'
		rbEvents.addListeners $element, 'rb-checkbox', 'value-changed'

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

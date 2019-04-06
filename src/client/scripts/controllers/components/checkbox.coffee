angular.module('rapid-build').controller 'rbCheckboxController', ['$scope', '$element', 'typeService',
	($scope, $element, type) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{nt}dark" if $scope.a.dark # TODO
			attrs += "#{nt}right" if $scope.a.right
			attrs += "#{nt}inline" if $scope.a.inline
			attrs += "#{nt}disabled" if $scope.a.disabled
			attrs += "#{nt}horizontal" if $scope.a.horizontal
			attrs += "#{nt}value='#{buldValueMarkup()}'" if $scope.a.value isnt undefined and $scope.a.value is 'object'
			attrs += "#{nt}value=#{buldValueMarkup()}" if $scope.a.value isnt undefined and $scope.a.value isnt 'object'
			attrs += "#{nt}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{nt}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{nt}sublabel=\"#{$scope.a.sublabel}\"" if $scope.a.sublabel
			attrs += "#{nt}validation='#{buldValidationMarkup()}'" if $scope.a.validation?.length
			content = getPopoverSlot() if $scope.a.popover
			content = content or n

			"<rb-checkbox#{attrs}>#{content}</rb-checkbox>"

		# Helpers
		# =======
		getPopoverSlot = -> # :html
			'\n\t<rb-popover\n\t\tslot="popover"\n\t\tposition="top">\n\t\tmore info...\n\t</rb-popover>\n'

		stringifyModifier = (key, val) ->
			val = angular.copy val
			return val unless type.is.function val
			val.toString()

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

		# Props
		# =====
		$scope.values = [
			true,
			'superman',
			10,
			{ id: 2, name: 'superman' }
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

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				label:    'Superman'
				sublabel: 'is awesome'
				# value:    undefined
				# subtext:  'optional'
				# value:    true
				# disabled: true

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Event Handlers
		# ==============
		resetFrm = -> $scope.$apply $scope.reset
		resetBtn = $element[0].querySelector '[data-reset]'
		resetBtn.onclick = resetFrm

		# Init
		# ====
		$scope.reset()

		# Destroys
		# ========
		$scope.$on '$destroy', ->
			markupWatch()

]

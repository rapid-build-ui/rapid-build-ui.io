angular.module('rapid-build').controller 'rbInputController', ['$scope', '$element', 'typeService',
	($scope, $element, type) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{nt}right" if $scope.a.right
			attrs += "#{nt}inline" if $scope.a.inline
			attrs += "#{nt}disabled" if $scope.a.disabled
			attrs += "#{nt}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{nt}type=\"number\"" if $scope.a.type
			attrs += "#{nt}value=\"#{$scope.a.value}\"" if $scope.a.value
			attrs += "#{nt}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{nt}placeholder=\"#{$scope.a.placeholder}\"" if $scope.a.placeholder
			attrs += "#{nt}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{nt}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{nt}icon-position=\"left\"" if $scope.a.iconPosition
			attrs += "#{nt}validation='#{buldValidationMarkup()}'" if $scope.a.validation?.length
			content = getPopoverSlot() if $scope.a.popover
			content = content or n

			"<rb-input#{attrs}>#{content}</rb-input>"

		# Helpers
		# =======
		getPopoverSlot = -> # :html
			'\n\t<rb-popover\n\t\tslot="popover"\n\t\tposition="top">\n\t\tmore info...\n\t</rb-popover>\n'

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
		$scope.iconKinds    = ['heart','user','github']
		$scope.iconSources  = ['solid','brands']
		$scope.iconPosition = 'left'
		$scope.type 		= 'number'
		$scope.validationLabels = [
			'required'
			'minLength'
			'minMaxLength'
			'custom'
		]
		$scope.validations = [
			'required'
			minLength: 2
			{ minMaxLength: min: 2, max: 5}
			customValidation
		]

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				label: 'Name'
				validation: []
				# value: 'Superman'
				# placeholder: 'full name'
				# subtext: 'you favorite hero'

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
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

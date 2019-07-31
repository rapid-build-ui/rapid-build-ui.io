angular.module('rapid-build').controller 'rbInputController', ['$scope', '$element', 'typeService',
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
			attrs += "#{nt}readonly" if $scope.a.readonly
			attrs += "#{nt}icon-spin" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'spin'
			attrs += "#{nt}icon-burst" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'burst'
			attrs += "#{nt}icon-pulse" if $scope.a.iconAnimation and $scope.a.iconAnimation.includes 'pulse'
			attrs += "#{nt}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{nt}type=\"#{$scope.a.type}\"" if $scope.a.type
			attrs += "#{nt}value=\"#{$scope.a.value}\"" if $scope.a.value
			attrs += "#{nt}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{nt}placeholder=\"#{$scope.a.placeholder}\"" if $scope.a.placeholder
			attrs += "#{nt}icon-flip=\"#{$scope.a.iconFlip}\"" if $scope.a.iconFlip
			attrs += "#{nt}icon-kind=\"#{$scope.a.iconKind}\"" if $scope.a.iconKind
			attrs += "#{nt}icon-speed=\"#{$scope.a.iconSpeed}\"" if $scope.a.iconSpeed
			attrs += "#{nt}icon-rotate=\"#{$scope.a.iconRotate}\"" if $scope.a.iconRotate
			attrs += "#{nt}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{nt}icon-position=\"left\"" if $scope.a.iconPosition
			attrs += "#{nt}validation='#{buldValidationMarkup()}'" if $scope.a.validation?.length
			content = getPopoverSlot() if $scope.a.popover
			content = content or n

			"<rb-input#{attrs}>#{content}</rb-input>"

		# Helpers
		# =======
		getPopoverSlot = -> # :html
			'\n\t<rb-popover\n\t\tslot="popover">\n\t\tmore info...\n\t</rb-popover>\n'

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
		# =====
		$scope.iconFlips     = ['horizontal','vertical','both']
		$scope.iconKinds     = ['heart','spinner','github']
		$scope.iconSources   = ['solid','brands']
		$scope.iconAnimation = ['burst','pulse','spin']
		$scope.types         = ['email','number','password','url']
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

		# Elms and Global
		# ===============
		RB_ICONS    = window.showcase.icons
		ddIconKinds = $element[0].querySelector '[label="icon-kind"]';

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

		iconSourceWatch = $scope.$watch 'a.iconSource', (newIconSource, oldIconSource) ->
			newIconSource = 'regular' unless newIconSource
			ddIconKinds.data = RB_ICONS[newIconSource]
			return $scope.a.iconKind = 'github' if newIconSource is 'brands'
			return if RB_ICONS[newIconSource].includes $scope.a.iconKind
			$scope.a.iconKind = undefined

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
			iconSourceWatch();
			markupWatch()
]

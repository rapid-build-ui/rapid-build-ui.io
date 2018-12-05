angular.module('rapid-build').controller 'rbRadiosController', ['$scope', '$element', 'typeService',
	($scope, $element, type) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{nt}right" if $scope.a.right
			attrs += "#{nt}inline" if $scope.a.inline
			attrs += "#{nt}toggle" if $scope.a.toggle
			attrs += "#{nt}disabled" if $scope.a.disabled
			attrs += "#{nt}horizontal" if $scope.a.horizontal
			attrs += "#{nt}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{nt}value='#{$scope.a.value}'" if $scope.a.value
			attrs += "#{nt}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{nt}label-key='#{$scope.a.labelKey}'" if $scope.a.labelKey
			attrs += "#{nt}data='#{buldDataMarkup()}'" if $scope.a.data?.length
			attrs += "#{nt}validation='#{buldValidationMarkup()}'" if $scope.a.validation?.length
			"<rb-radios#{attrs}>#{n}</rb-radios>"

		# Props
		# =====
		$scope.data = [
			['batman', 'superman', 'wolverine']
			[
				{id: 1, name: 'batman'}
				{id: 2, name: 'superman'}
				{id: 3, name: 'wolverine'}
			]
		]
		$scope.dataLabels = [
			'array of strings',
			'array of objects'
		]
		$scope.labelKeys = ['name', 'id']
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
			$scope.a =
				label: 'Superheroes'
				data: 'array of strings'

		buldDataMarkup = () ->
			_data = []

			switch $scope.a.data
				when 'array of strings'
					_data = $scope.data[0]
				when 'array of objects'
					_data = $scope.data[1]

			JSON.stringify(_data, stringifyModifier, '\t')
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

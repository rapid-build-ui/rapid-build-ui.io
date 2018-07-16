angular.module('rapid-build').controller 'rbRadiosController', ['$scope', '$element', 'typeService', 'rbEventService',
	($scope, $element, type, rbEvents) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}label=\"#{$scope.a.label}\"" if $scope.a.label
			# attrs += "#{s}value='#{$scope.a.value}'" if $scope.a.value
			attrs += "#{s}value='#{$scope.a.value}'" if $scope.a.value
			attrs += "#{s}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}right" if $scope.a.right
			attrs += "#{s}inline" if $scope.a.inline
			attrs += "#{s}horizontal" if $scope.a.horizontal
			attrs += "#{s}stacked" if $scope.a.stacked
			attrs += "#{s}data='#{buldDataMarkup()}'" if $scope.a.data?.length
			attrs += "#{s}label-prop='#{$scope.a.labelProp}'" if $scope.a.labelProp
			"<rb-radios#{attrs}></rb-radios>"

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
		$scope.labelProps = ['name', 'id']

		# Helpers
		# =======
		stringifyModifier = (key, val) ->
			val = angular.copy val
			return val unless type.is.function val
			val.toString()

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

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				label: 'Superheroes'
				data: 'array of strings'

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Rb Eventing
		# ===========
		rbEvents.addListeners $element, 'rb-input', 'value-changed'
		rbEvents.addListeners $element, 'rb-radios', 'value-changed'

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

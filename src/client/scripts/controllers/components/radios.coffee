angular.module('rapid-build').controller 'rbRadiosController', ['$scope', '$element', 'typeService',
	($scope, $element, type) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}data='#{buldDataMarkup()}'" if $scope.a.data?.length

			"<rb-radios#{attrs}></rb-radios>"

		# Props
		# =====
		$scope.data = ['Batman', 'Superman', 'Wolverine'];

		# Helpers
		# =======
		stringifyModifier = (key, val) ->
			val = angular.copy val
			return val unless type.is.function val
			val.toString()

		buldDataMarkup = () ->
			JSON.stringify($scope.data, stringifyModifier, '\t')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/"function\s*\((.*)\)/g, 'function($1)')
				.replace(/\}"/g, '}')

		# Methods
		# =======
		$scope.reset = ->
			$scope.a = {}



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

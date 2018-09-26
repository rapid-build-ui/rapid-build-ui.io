angular.module('rapid-build').controller 'rbCheckboxController', ['$scope', '$element', 'typeService', 'rbEventService',
	($scope, $element, type, rbEvents) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{nt}disabled" if $scope.a.disabled
			attrs += "#{nt}value=\"#{$scope.a.value}\"" if $scope.a.value
			attrs += "#{nt}label=\"#{$scope.a.label}\"" if $scope.a.label
			attrs += "#{nt}subtext=\"#{$scope.a.subtext}\"" if $scope.a.subtext
			attrs += "#{nt}sublabel=\"#{$scope.a.sublabel}\"" if $scope.a.sublabel
			"<rb-checkbox#{attrs}>#{n}</rb-checkbox>"

		# Methods
		# =======
		$scope.reset = ->
			# $scope.a = {}
			$scope.a =
				label:    'Superman'
				sublabel: 'Is Awesome?'
				# subtext:  'optional'
				# value:    true
				# disabled: true

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Rb Eventing
		# ===========
		rbEvents.addListeners $element, 'rb-input', 'value-changed'
		rbEvents.addListeners $element, 'rb-radios', 'value-changed'
		# rbEvents.addListeners $element, 'rb-checkbox', 'value-changed'

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

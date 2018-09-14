angular.module('rapid-build').controller 'rbModalController', ['$scope', '$element', 'rbEventService',
	($scope, $element, rbEvents) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}center" if $scope.a.center
			attrs += "#{s}show=\"#{$scope.a.show}\"" if $scope.a.show
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}unclosable" if $scope.a.unclosable
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-modal#{attrs}>#{content}</rb-modal>"

		# Props
		# =====
		$scope.kinds = ['success','danger','warning','info']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				show: false
				content: 'Modal Content'

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

angular.module('rapid-build').controller 'rbAlertController', ['$scope', '$element', 'rbEventService',
	($scope, $element, rbEvents) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			attrs += "#{s}removable" if $scope.a.removable
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-alert#{attrs}>#{content}</rb-alert>"

		# Props
		# =====
		$scope.kinds = ['success','danger','warning','info']

		# Content
		# =======
		content = """
			Hello Gorgeous!
		"""

		# content = """
		# 	Alert
		# 	<hr>
		# 	Alina
		# """

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				# kind: 'success'
				# kind: 'danger'
				# kind: 'warning'
				# kind: 'info'
				content: content

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

angular.module('rapid-build').controller 'rbAlertController', ['$scope', '$element', 'RB_ALERT_API',
	($scope, $element, RB_ALERT_API) ->
		$scope.componentApi = RB_ALERT_API

		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}class=\"#{$scope.a.kind}\"" if $scope.a.kind
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-alert#{attrs}>#{content}</rb-alert>"

		# Props
		# =====
		$scope.kinds = ['default','success','danger','warning','info']

		# Content
		# =======
		content = """
			Alert
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
				kind: 'default'
				# kind: 'success'
				# kind: 'danger'
				# kind: 'warning'
				# kind: 'info'
				content: content

		# Watches
		# =======
		markupWatch = $scope.$watch ->
			$scope.markup = createMarkup()

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

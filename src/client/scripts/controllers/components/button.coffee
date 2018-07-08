angular.module('rapid-build').controller 'rbButtonController', ['$scope', '$element', 'rbEventService',
	($scope, $element, rbEvents) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t';
			attrs += "#{s}disabled" if $scope.a.disabled
			attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs += "#{s}size=\"#{$scope.a.size}\"" if $scope.a.size
			attrs += "#{s}type=\"#{$scope.a.type}\"" if $scope.a.type
			attrs += "#{s}icon=\"#{$scope.a.icon}\"" if $scope.a.icon
			attrs += "#{s}icon-source=\"#{$scope.a.iconSource}\"" if $scope.a.iconSource
			attrs += "#{s}icon-size=\"#{$scope.a.iconSize}\"" if $scope.a.iconSize
			attrs += "#{s}icon-position=\"#{$scope.a.iconPosition}\"" if $scope.a.iconPosition
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content

			"<rb-button#{attrs}>#{content}</rb-button>"

		# Props
		# =====
		$scope.icons        = ['heart','user','github']
		$scope.iconSources  = ['solid','brands']
		$scope.kinds        = ['success','danger','warning','info','text']
		$scope.sizes        = ['small','big']
		$scope.types        = ['reset','submit']
		$scope.iconPosition = 'left'

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				content: 'Button' # :string | html

		$scope.save = (e) ->
			console.log $scope.demoForm

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
		, true

		# Rb Eventing
		# ===========
		rbEvents.addListeners $element, 'rb-input', 'value-changed'

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

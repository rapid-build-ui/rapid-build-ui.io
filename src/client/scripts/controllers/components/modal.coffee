angular.module('rapid-build').controller 'rbModalController', ['$scope', '$element', '$timeout',
	($scope, $element, $timeout) ->
		# Builder
		# =======
		createMarkup = ->
			attrs   = ''
			header  = ''; content = ''; footer  = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t'; ntt = '\n\t\t';

			attrs  += "#{s}center" if $scope.a.center
			attrs  += "#{s}show=\"#{$scope.a.show}\"" if $scope.a.show
			# attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs  += "#{s}unclosable" if $scope.a.unclosable
			content = "#{nt}#{$scope.a.content}#{n}" if $scope.a.content
			header  = "#{n}" if $scope.a.header and !$scope.a.content
			footer  = "#{n}" if $scope.a.footer and !$scope.a.content and !$scope.a.header
			header  += "#{t}<div slot=\"header\">#{ntt}#{$scope.a.header}#{nt}</div>#{n}" if $scope.a.header
			footer  += "#{t}<div slot=\"footer\">#{ntt}#{$scope.a.footer}#{nt}</div>#{n}" if $scope.a.footer

			"<rb-modal#{attrs}>#{content}#{header}#{footer}</rb-modal>"

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
			showHelper newVal.show
		, true

		# Show Helper
		# ===========
		showHelper = (show) -> # needed for builder
			return unless show
			# console.log 'SHOW:', show

			updateShow = (evt) ->
				$scope.a.show = evt.detail.show
				$scope.$apply()
				$timeout.cancel timer
				@removeEventListener 'show-changed', updateShow

			timer = $timeout ->
				modal = $element[0].querySelector 'rb-modal[id^="built"]'
				modal.addEventListener 'show-changed', updateShow
			, 75

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

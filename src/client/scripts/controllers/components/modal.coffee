angular.module('rapid-build').controller 'rbModalController', ['$scope', '$element', '$timeout',
	($scope, $element, $timeout) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t'; ntt = '\n\t\t';

			attrs  += "#{s}center" if $scope.a.center
			attrs  += "#{s}no-backdrop" if $scope.a.noBackdrop
			attrs  += "#{s}unclosable" if $scope.a.unclosable
			attrs  += "#{s}show=\"#{$scope.a.show}\"" if $scope.a.show
			# attrs += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			content += "#{nt}#{$scope.a.content}" if $scope.a.content
			content += "#{nt}#{$scope.a.header}"  if $scope.a.header
			content += "#{nt}#{$scope.a.footer}"  if $scope.a.footer

			"<rb-modal#{attrs}>#{content}#{n}</rb-modal>"

		# Test Without Builder
		# ====================
		# $scope.links = [
		# 	href:    'home'
		# 	content: 'home'
		# ,
		# 	href:    'about'
		# 	content: 'about'
		# ,
		# 	href:    'contact'
		# 	content: 'contact <rb-icon kind="heart"></rb-icon></a>'
		# ]

		# linkCnt = 1
		# $element[0].querySelector('[data-add-link]').onclick = ->
		# 	newLink = "link#{linkCnt++}"
		# 	newLink = href: newLink, content: newLink
		# 	$scope.links.push newLink
		# 	$scope.$apply()
		# $element[0].querySelector('[data-remove-link]').onclick = ->
		# 	$scope.links.pop()
		# 	linkCnt--
		# 	$scope.$apply()

		# Props
		# =====
		$scope.kinds = ['success','danger','warning','info']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				show: false
				content: 'Easy peasy modal content!'
				header:  '<h5 slot="header">Modal Header</h5>'
				footer:  '<em slot="footer">Modal Footer</em>'

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
			updateShow = (evt) ->
				$scope.a.show = evt.detail.show
				$scope.$apply()
				@removeEventListener 'show-changed', updateShow
			timer = $timeout ->
				$timeout.cancel timer
				modal = $element[0].querySelector 'rb-modal'
				modal.addEventListener 'show-changed', updateShow
			, 75

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
			markupWatch()
]

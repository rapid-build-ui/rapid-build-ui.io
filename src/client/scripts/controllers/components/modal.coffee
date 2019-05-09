angular.module('rapid-build').controller 'rbModalController', ['$scope', '$element', '$timeout',
	($scope, $element, $timeout) ->
		# Builder
		# =======
		createMarkup = ->
			attrs = ''; content = '';
			s = ' '; t = '\t'; n = '\n'; nt = '\n\t'; ntt = '\n\t\t';

			attrs  += "#{s}center" if $scope.a.center
			attrs  += "#{s}open=\"#{$scope.a.open}\"" if $scope.a.open
			# attrs  += "#{s}kind=\"#{$scope.a.kind}\"" if $scope.a.kind
			attrs  += "#{s}backdrop=\"#{$scope.a.backdrop}\"" unless $scope.a.backdrop
			attrs  += "#{s}closable=\"#{$scope.a.closable}\"" unless $scope.a.closable
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

		# Open Helper
		# ===========
		openHelper = (open) -> # needed for builder
			return unless open
			updateOpen = (evt) ->
				$scope.a.open = evt.detail.open
				$scope.$apply()
				@removeEventListener 'open-changed', updateOpen
			timer = $timeout ->
				$timeout.cancel timer
				modal = $element[0].querySelector 'rb-modal'
				modal.addEventListener 'open-changed', updateOpen
			, 75

		# Props
		# =====
		$scope.kinds = ['danger','info','neutral','success','warning']

		# Methods
		# =======
		$scope.reset = ->
			$scope.a =
				# open: true
				backdrop: true
				closable: true
				content: 'Easy peasy modal content!'
				header:  '<h5 slot="header">Modal Header</h5>'
				footer:  '<em slot="footer">Modal Footer</em>'

		# Watches
		# =======
		markupWatch = $scope.$watch 'a', (newVal, oldVal) ->
			$scope.markup = createMarkup()
			openHelper newVal.open
		, true

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

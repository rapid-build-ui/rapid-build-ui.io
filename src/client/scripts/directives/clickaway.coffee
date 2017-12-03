angular.module('rapid-build').directive 'rbaClickaway', ['$rootElement', '$parse',
	($rootElement, $parse) ->
		# LINK
		# ====
		link = (scope, $elm, attrs) ->
			return unless !!attrs.rbaClickaway

			# clickaway (cw)
			# =========
			cw =
				active: null # :null | boolean
				fn: $parse attrs.rbaClickaway # expression to function

			# handlers
			# ========
			handlers =
				trigger: -> # fires before clickaway
					cw.active = false

				clickaway: (event) ->
					return if cw.active is null # trigger not clicked
					return cw.active = true unless cw.active # trigger clicked
					scope.$apply -> # fire clickaway
						cw.active = null # deactivate clickaway
						cw.fn scope, $event: event

			# listeners
			# =========
			$elm.on 'click touchstart', handlers.trigger
			$rootElement.on 'click touchstart', handlers.clickaway

			# destroy
			# =======
			scope.$on '$destroy', ->
				$elm.off 'click touchstart', handlers.trigger
				$rootElement.off 'click touchstart', handlers.clickaway

		# API
		# ===
		link: link
		restrict: 'A'
		# rba-clickaway: '&'
]
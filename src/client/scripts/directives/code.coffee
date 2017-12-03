# CODE WIDGET
# For editing or displaying code.
# TODO: add local storage support
# ===============================
angular.module('rapid-build').directive 'rbaCode', ['$timeout', 'Caret',
	($timeout, Caret) ->
		# link
		# ====
		link = (scope, iElement, iAttrs, controller) ->
			elmCaret = textarea = undefined

			timer = $timeout -> # textarea not registered since moving into template switch
				textarea = iElement.find('textarea')[0] if !!iAttrs.model and !scope.readOnly
				elmCaret = new Caret textarea if textarea

			# Multi Tab Support
			# =================
			scope.keydown = (e) ->
				# return if browser.is.ie # TODO: check ie (might be ok)
				keyCode = e.keyCode or e.which
				if keyCode is 9 # tab key
					e.preventDefault()
					caret   = elmCaret.get e
					isShift = e.shiftKey
					isMulti = caret.start isnt caret.end
					tabType = if isShift and isMulti then 'multi shift tab'
					else if isMulti then 'multi tab'
					else if isShift then 'shift tab'
					else 'tab'
					switch tabType
						when 'multi shift tab'
							val            = textarea.value
							sel            = caret.text
							sel            = sel.replace /\n\t/g, '\n'
							sel            = sel.replace /\t/, ''
							unselStart     = val.substring 0, caret.start
							unselEnd       = val.substring caret.end
							newVal         = unselStart + sel + unselEnd
							textarea.value = newVal
							caret.end      = sel.length + unselStart.length
							elmCaret.set caret
						when 'multi tab'
							val            = textarea.value
							sel            = caret.text
							sel            = sel.replace /\n/g, '\n\t'
							sel            = '\t' + sel
							unselStart     = val.substring 0, caret.start
							unselEnd       = val.substring caret.end
							newVal         = unselStart + sel + unselEnd
							textarea.value = newVal
							caret.end      = sel.length + unselStart.length
							elmCaret.set caret
						when 'shift tab'
							val            = textarea.value
							sel            = caret.text
							unselStart     = val.substring 0, caret.start
							lastNL         = unselStart.lastIndexOf '\n'
							lastTab        = unselStart.lastIndexOf '\t'
							return if lastNL >= lastTab
							extraVal       = val.substring lastTab + 1, caret.start # if shif tab in the line
							unselStart     = val.substring(0, lastTab) + extraVal
							unselEnd       = val.substring caret.end
							newVal         = unselStart + sel + unselEnd
							textarea.value = newVal
							caret.end      = sel.length + unselStart.length
							caret.start    = caret.end
							elmCaret.set caret
						when 'tab'
							val            = textarea.value
							sel            = '\t' + caret.text
							unselStart     = val.substring 0, caret.start
							unselEnd       = val.substring caret.end
							newVal         = unselStart + sel + unselEnd
							textarea.value = newVal
							caret.end      = sel.length + unselStart.length
							caret.start    = caret.end
							elmCaret.set caret
					caret = null # cleanup

			# Actions
			# =======
			if iAttrs.actions == 'clear'
				scope.clear = ->
					scope.model = ''
					textarea?.focus()

			# Destroys
			# ========
			x = scope.$on '$destroy', ->
				textarea = elmCaret = null
				$timeout.cancel timer if timer
				x()

		# API
		# ===
		link: link
		replace: true
		transclude: true
		restrict: 'E'
		templateUrl: '/views/directives/code.html'
		scope:
			bind: '='
			model: '='        # !!model.attr ? <textarea> : <pre>
			show: '='
			actions: '@'      # currently only clear
			addAction: '&'
			caption: '@'
			height: '@'       # teeny | tiny | mini | short | avg | tall | xtall
			kind: '@'         # minor | secondary
			# localStorage: '@' # local storage key or valueless (generated key)
			placeholder: '@'
			optional: '@'     # valueless attribute | html | text
			readOnly: '@'
			scroll: '@'       # valueless attribute
			size: '@'         # mini | small
]
# CODE WIDGET
# For editing or displaying code.
# TODO: add local storage support
# ===============================
angular.module('rapid-build').directive 'rbaCode', ['$timeout', 'Caret', 'preService',
	($timeout, Caret, preService) ->
		# COMPILE
		# =======
		Compile = (tElement, tAttrs, transclude) ->
			textarea      = tElement[0].querySelector 'textarea'
			bindPre       = tElement[0].querySelector '[ng-bind="bind"]'
			transcludePre = tElement[0].querySelector '[ng-transclude]'
			switch true
				when tAttrs.model != undefined
					bindPre.remove()
					transcludePre.remove()
				when tAttrs.bind != undefined
					textarea.remove()
					transcludePre.remove()
				else
					textarea.remove()
					bindPre.remove()
			return Link if tAttrs.model == undefined
			readonly = tAttrs.readonly isnt undefined
			textarea.removeAttribute 'ng-keydown'  if readonly
			textarea.removeAttribute 'readonly'    unless readonly
			textarea.removeAttribute 'placeholder' unless tAttrs.placeholder
			Link

		# LINK
		# ====
		Link = (scope, iElement, iAttrs, controller, transclude) ->
			elmCaret      = textarea = undefined
			isTransclude  = iAttrs.bind == undefined && iAttrs.model == undefined
			transcludePre = iElement[0].querySelector '[ng-transclude]'
			readonly      = iAttrs.readonly isnt undefined
			scope.hasModel = !!iAttrs.model

			timer = $timeout -> # textarea not registered since moving into template switch
				return unless scope.hasModel
				return if readonly
				textarea = iElement.find('textarea')[0]
				elmCaret = new Caret textarea if textarea

			# Multi Tab Support
			# =================
			scope.keydown = (e) ->
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
			if iAttrs.actions == 'clear' # TODO
				scope.clear = ->
					scope.model = ''
					textarea?.focus()

			if iAttrs.actions == 'copy'
				copiedMsg =
					_timer: null
					_isShowing: ->
						return true if !this._timer
						$timeout.cancel this._timer
						this._timer = null;
						false;
					hide: (trigger, delay) ->
						return if !this._isShowing()
						@_timer = $timeout =>
							trigger._hidden = true;
							@_timer = null
						, delay
				scope.copied = (e) ->
					copiedMsg.hide e.trigger, 1500
					e.clearSelection()

			# Format Transclude
			# =================
			if isTransclude
				transclude (clone) ->
					transcludePre.textContent = preService.get.text clone[0].textContent

			# Destroys
			# ========
			x = scope.$on '$destroy', ->
				textarea = elmCaret = null
				$timeout.cancel timer if timer
				x()

		# API
		# ===
		compile: Compile
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
			size: '@'         # mini | small
			# VALUELESS
			# =========
			optional: '@'     # html | text
			readonly: '@'
			scroll: '@'       # doesn't apply to model
			wrap: '@'         # doesn't apply to model
]
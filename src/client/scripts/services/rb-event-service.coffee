angular.module('rapid-build').service 'rbEventService', ['$filter', '$parse', ($filter, $parse) ->
	# Private
	# =======
	setElmAttr = (attr, val) -> # :void (rb element is @)
		return @removeAttribute attr if typeof val isnt 'string'
		@setAttribute attr, val

	watchElmScopeProp = (scope, evt) -> # :void (rb element is @)
		attr = evt.type.split('-').slice(0,-1).join('-') # ex: value-changed -> value
		prop = @getAttribute attr       # ex: a.kind
		prop = $filter('camelize') prop # ex: a.icon-size -> a.iconSize
		return unless prop
		@dataset.scopeProp = prop       # ex: a.kind
		val  = $parse(prop) scope       # ex: a.kind -> heart
		setElmAttr.bind(@, attr, val)()

		scopePropWatch = scope.$watch @dataset.scopeProp, (newVal, oldVal) =>
			return if newVal is oldVal
			setElmAttr.bind(@, attr, newVal)()

		scope.$on '$destroy', ->
			scopePropWatch()

	eventHandler = (evt) -> # :void (rb element is @)
		scope = angular.element(@).scope()
		return watchElmScopeProp.bind(this, scope, evt)() unless @dataset.scopeProp
		$parse(@dataset.scopeProp).assign scope, evt.detail.value
		scope.$apply()

	# Public
	# ======
	@addListeners = ($elmContainer, rbElmName, rbEvtName) -> # :void
		rbElms = $elmContainer[0].querySelectorAll rbElmName
		return unless rbElms.length

		for rbElm in rbElms
			rbElm.addEventListener rbEvtName, eventHandler

		$elmContainer.scope().$on '$destroy', ->
			for rbElm in rbElms
				rbElm.removeEventListener rbEvtName, eventHandler

	return
]
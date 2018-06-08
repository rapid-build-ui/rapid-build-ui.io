angular.module('rapid-build').service 'evenListenerService', [
	->
		camelize = (input) ->
			return input unless input
			input.replace /[^A-Za-z0-9]+(\w|$)/g, (_, letter) ->
				letter.toUpperCase()
			.replace /^(.)/, (_, letter)  ->
				letter.toLowerCase()

		eventListenerHandler = (e) ->
			key = e.target.getAttribute 'label'
			key = key.toLowerCase()
			key = camelize key
			inputScope = angular.element(e.target).scope()
			return if e.detail.value is inputScope.a[key]
			inputScope.a[key] = e.detail.value
			inputScope.$applyAsync()

		@addListenersToInputs = (element, scope) ->
			rbInputs = element[0].querySelectorAll 'rb-input'
			for input in rbInputs
				input.addEventListener 'value-changed', eventListenerHandler


		@removeListenersToInputs = (element) ->
			rbInputs = element[0].querySelectorAll 'rb-input'
			for input in rbInputs
				input.removeEventListener 'value-changed', eventListenerHandler

		@resetInputs = (element, defaults) ->
			rbInputs = element[0].querySelectorAll 'rb-input'
			for input in rbInputs
				continue if input.id.includes 'built'
				key = input.getAttribute 'label'
				key = key.toLowerCase()
				input.value = defaults[key]
		@
]
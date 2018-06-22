angular.module('rapid-build').service 'evenListenerService', [
	->
		regexModelProperty = /[^.]+\w/g;
		camelize = (input) ->
			return input unless input
			input.replace /[^A-Za-z0-9]+(\w|$)/g, (_, letter) ->
				letter.toUpperCase()
			.replace /^(.)/, (_, letter)  ->
				letter.toLowerCase()

		eventListenerHandler = (e, scope) ->
			key = e.target.getAttribute 'value'
			key = key.match(regexModelProperty)
			return if !key
			key = key[0]
			inputScope = angular.element(e.target).scope()
			return if e.detail.value is inputScope.a[key]
			inputScope.a[key] = e.detail.value
			inputScope.$applyAsync()

		@addListenersToInputs = (element) ->
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
				key = input.getAttribute 'value'
				key = key.match(regexModelProperty)
				return if !key
				key = key[0]
				key = key.toLowerCase()
				input.value = defaults[key]
		@
]
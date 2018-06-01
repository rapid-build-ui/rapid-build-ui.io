angular.module('rapid-build').service 'evenListenerService', [
	->
		eventListenerHandler = (e) ->
			key = e.target.getAttribute 'label'
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

		@resetInputs = (element, a) ->
			rbInputs = element[0].querySelectorAll 'rb-input'
			for input in rbInputs
				continue if input.id.includes 'built'
				key = input.getAttribute 'label'
				input.value = a[key]
		@
]
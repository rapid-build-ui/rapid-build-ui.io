do ->
	getTemplate = (tpl) ->
		"/views/layouts/#{tpl}.html"

	angular.module('rapid-build').constant 'LAYOUTS',
		'star-lord': getTemplate 'star-lord'
		superman:    getTemplate 'superman'
		wolverine:   getTemplate 'wolverine'
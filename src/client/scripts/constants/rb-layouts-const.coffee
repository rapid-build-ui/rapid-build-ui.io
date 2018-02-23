do ->
	template = (tpl) ->
		"/views/layouts/#{tpl}.html"

	angular.module('rapid-build').value 'RB_LAYOUTS',
		'star-lord': template 'star-lord'
		superman:    template 'superman'
		wolverine:   template 'wolverine'
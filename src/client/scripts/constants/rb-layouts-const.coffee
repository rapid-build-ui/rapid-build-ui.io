do ->
	template = (tpl) ->
		"/views/layouts/#{tpl}.html"

	angular.module('rapid-build').value 'RB_LAYOUTS',
		superman:  template 'superman'
		wolverine: template 'wolverine'
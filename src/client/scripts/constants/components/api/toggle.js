angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_TOGGLE_API',
[
	{
		attribute: 'action',
		description: `
			Action called on open.
			If action returns string or
			returns promise that resolves string,
			it will be used as content.
			<em class="info-sub">toggle
			opens after function completes</em>
			<em class="info-sub">if a promise
			is returned, toggle opens after promise
			is resolved</em>
		`,
		options: null,
		type: 'function',
		required: false
	},
	{
		attribute: 'cache',
		description: `
			Fire action once on open.
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'caption',
		description: `
			Text beside toggle icon.
		`,
		options: null,
		type: 'string',
		required: false
	},
	common.get('content'),
	// common.get('dark'),
	common.get('disabled'),
	common.get('inline'),
	common.get('kind'),
	{
		attribute: 'open',
		description: `
			<em class="info-heading">defaults to false</em>
			Open the toggle.
		`,
		options: 'true',
		type: `n/a | bool`,
		required: false
	},
	common.get('popover'),
	{
		attribute: 'template-url',
		description: `
			Path or url to html file.
			Will be used as content.
		`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'template-class',
		description: `
			Css class placed on content wrapper.
		`,
		options: null,
		type: 'string',
		required: false
	}
]
)}])
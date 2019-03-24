angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_TOGGLE_API',
[
	{
		attribute: 'action',
		description: `
			<em class="info-heading">toggle
			opens once function completes</em>
			Function to execute when opening
			toggle.
			<br>
			<em class="info-sub">if
			function returns a string or
			returns a promise that resolves a string,
			content will be set to that string</em>
		`,
		options: null,
		type: 'function',
		required: false
	},
	{
		attribute: 'cache',
		description: `
			Fire action the first time the
			toggle opens then never again.
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
	{
		attribute: 'icon-kind-closed',
		description: `Closed toggle icon.`,
		options: `<a href="/components/rb-icon">rb-icon kind</a>`,
		type: 'string',
		required: false
	},
	{
		attribute: 'icon-kind-open',
		description: `Open toggle icon.`,
		options: `<a href="/components/rb-icon">rb-icon kind</a>`,
		type: 'string',
		required: false
	},
	{
		attribute: 'icon-size-closed',
		description: `Closed toggle icon size.`,
		options: `
			<a href="/components/rb-icon">rb-icon size</a>
		`,
		type: 'number',
		required: false
	},
	{
		attribute: 'icon-size-open',
		description: `Open toggle icon size.`,
		options: `
			<a href="/components/rb-icon">rb-icon size</a>
		`,
		type: 'number',
		required: false
	},
	{
		attribute: 'icon-source-closed',
		description: `Refer to options.`,
		options: `<a href="/components/rb-icon">rb-icon source</a>`,
		type: 'string',
		required: false
	},
	{
		attribute: 'icon-source-open',
		description: `Refer to options.`,
		options: `<a href="/components/rb-icon">rb-icon source</a>`,
		type: 'string',
		required: false
	},
	common.get('inline'),
	common.get('kind'),
	{
		attribute: 'open',
		description: `
			<em class="info-heading">defaults to false</em>
			Opens the toggle.
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
			<em class="info-sub">content
			will be set to html file's
			contents</em>
		`,
		options: null,
		type: 'string',
		required: false
	}
]
)}])
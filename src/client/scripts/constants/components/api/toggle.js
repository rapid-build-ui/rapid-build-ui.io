angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_TOGGLE_API',
[
	{
		attribute: 'cache',
		description: `
			<em class="info-heading">defaults to true</em>
			If cache is true, onclick and fetch options will only
			fire the first time the toggle is opened.
		`,
		options: 'false',
		type: `bool`,
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
	/*{
		attribute: 'icon-kind-closed',
		description: `Closed toggle icon.`,
		options: `<a href="/components/rb-icon">rb-icon kind</a>`,
		type: 'string',
		required: false
	},*/
	/*{
		attribute: 'icon-kind-loading',
		description: `Loading icon.`,
		options: `<a href="/components/rb-icon">rb-icon kind</a>`,
		type: 'string',
		required: false
	},*/
	/*{
		attribute: 'icon-kind-open',
		description: `Open toggle icon.`,
		options: `<a href="/components/rb-icon">rb-icon kind</a>`,
		type: 'string',
		required: false
	},*/
	/*{
		attribute: 'icon-size-closed',
		description: `Closed toggle icon size.`,
		options: `
			<a href="/components/rb-icon">rb-icon size</a>
		`,
		type: 'number',
		required: false
	},*/
	/*{
		attribute: 'icon-size-loading',
		description: `Loading icon size.`,
		options: `
			<a href="/components/rb-icon">rb-icon size</a>
		`,
		type: 'number',
		required: false
	},*/
	/*{
		attribute: 'icon-size-open',
		description: `Open toggle icon size.`,
		options: `
			<a href="/components/rb-icon">rb-icon size</a>
		`,
		type: 'number',
		required: false
	},*/
	/*{
		attribute: 'icon-source-closed',
		description: `Refer to options.`,
		options: `<a href="/components/rb-icon">rb-icon source</a>`,
		type: 'string',
		required: false
	},*/
	/*{
		attribute: 'icon-source-loading',
		description: `Refer to options.`,
		options: `<a href="/components/rb-icon">rb-icon source</a>`,
		type: 'string',
		required: false
	},*/
	/*{
		attribute: 'icon-source-open',
		description: `Refer to options.`,
		options: `<a href="/components/rb-icon">rb-icon source</a>`,
		type: 'string',
		required: false
	},*/
	{
		attribute: 'fetch',
		description: `
			<em class="info-heading">sets content</em>
			Path or url to file.
			<ul>
				<li>
					<em class="info-sub no-parens">
						toggle opens once
						file is fetched
					</em>
				</li>
				<li>
					<em class="info-sub no-parens">
						content will be set
						to file's contents
					</em>
				</li>
			</ul>
		`,
		options: null,
		type: 'string',
		required: false
	},
	{
		attribute: 'fetch-opts',
		description: `
			<em class="info-heading">fetch option required</em>
			Options object for the request.
			<em class="info-sub">see options for more info</em>
		`,
		options: `
			<a target="_blank" title="Refer to init parameter." href="https://mzl.la/2Gcxp6R">options</a>
		`,
		type: 'object',
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
	common.get('onclick', {
		description: `
			<em class="info-heading">can set content</em>
			Function to execute when opening toggle.
			<ul>
				<li>
					<em class="info-sub no-parens">
						toggle opens once function completes
					</em>
				</li>
				<li>
					<em class="info-sub no-parens">
						if function returns a string or
						a promise that resolves a string,
						content will be set to that string
					</em>
				</li>
				<li>
					<em class="info-sub no-parens">
						you'll usually set this in javascript
					</em>
				</li>
			</ul>
		`
	}),
	// common.get('popover')
]
)}])
angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_CODE_API',
[
	{
		attribute: 'actions',
		description: `
			Adds clickable action icons in titlebar.
			<ul>
				<li>
					<strong>clear</strong>:
					<em class="info-sub-inline no-parens">
						clears code
					</em>
				</li>
				<li>
					<strong>copy</strong>:
					<em class="info-sub-inline no-parens">
						copies code to clipboard
					</em>
				</li>
			</ul>
		`,
		options: `clear | copy`,
		type: 'array',
		required: false
	},
	common.get('inline'),
	common.get('label'),
	{
		attribute: 'line-numbers',
		description: `
			Show line numbers to the left code.
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'mode',
		description: `
			<em class="info-heading">defaults to plain text</em>
			Language modes for syntax highlighting.
		`,
		options: `n/a | see demo`,
		type: 'string',
		required: false
	},
	common.get('name'),
	{
		attribute: 'nowrap',
		description: `
			<em class="info-heading">defaults to true</em>
			Set to false for line wrapping.
		`,
		options: 'false',
		type: `bool`,
		required: false
	},
	common.get('placeholder'),
	common.get('readonly'),
	common.get('right'),
	{
		attribute: 'theme',
		description: `
			Applies various color combinations to code.
		`,
		options: `n/a | see demo`,
		type: 'string',
		required: false
	},
	common.get('rows', {
		description: `
			Amount of lines to initially show.
			<em class="info-sub">code resizes
			to fit content unless scrollable
			option is set</em>
		`
	}),
	{
		attribute: 'scrollable',
		description: `
			<em class="info-heading">rows must be set</em>
			Applies fixed height relative to rows option
			then code scrolls.
		`,
		options: null,
		type: null,
		required: false
	},
	common.get('subtext'),
	common.get('value', {
		description: `
			<em class="info-heading">component's value</em>
			Set value via the value attribute or placing code
			inside tag. <em class="info-sub-inline">choose one</em>
			<h6 class="important">important</h6>
			If placing code inside tag, it must be wrapped
			in an <span class="tag">xmp</span> tag.
			<em class="info-sub-inline">see demo</em>
		`,
		type: 'string'
	}),
	common.get('validation')
]
)}])
angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_TEXTAREA_API',
[
	{
		attribute: 'auto-height',
		description: `Height is set based on the content.`,
		options: null,
		type: null,
		required: false
	},
	// common.get('dark'),
	common.get('disabled'),
	common.get('inline'),
	common.get('label'),
	common.get('name'),
	common.get('placeholder'),
	common.get('popover'),
	common.get('right'),
	{
		attribute: 'rows',
		description: `
			<em class="info-heading">defaults to 5</em>
			Sets textearea height.
		`,
		options: null,
		type: 'number',
		required: false
	},
	common.get('subtext'),
	common.get('value', {
		description: `
			Component's value.<br>
			Value can be set via the value
			attribute or the text content inside tag.
			<em class="info-sub">choose one or the other</em>
		`,
		type: 'string'
	}),
	common.get('validation')
]
)}])
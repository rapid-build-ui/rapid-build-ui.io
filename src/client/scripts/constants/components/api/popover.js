angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_POPOVER_API',
[
	{
		attribute: 'caption',
		description: `
			Styled component
			<a target="_blank" href="https://goo.gl/kLCstb">heading</a>.
		`,
		options: null,
		type: 'string',
		required: false
	},
	common.get('content'),
	// common.get('dark'),
	{
		attribute: 'fit-content',
		description: `Makes popover as wide as content.`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'hover',
		description: `Trigger popover via hover.`,
		options: null,
		type: null,
		required: false
	},
	common.get('kind', {
		options: 'info | danger | success | warning'
	}),
	common.get('icon-kind', {
		description: `
			<em class="info-heading">defaults to info-circle</em>
			Popover trigger.
		`
	}),
	common.get('icon-size'),
	common.get('icon-source'),
	common.get('icon-valign'),
	{
		attribute: 'pin',
		description: `Popover will only close when the trigger is clicked.`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'position',
		description: `
			<em class="info-heading">defaults to right</em>
			Position where popover opens. Will adjust if not in
			<a target="_blank" href="https://goo.gl/DwJ1ke">viewport</a>.
		`,
		options: 'bottom | left | top',
		type: 'string',
		required: false
	},
	{
		attribute: 'show-popover',
		description: `
			<em class="info-heading">defaults to false</em>
			Programmatically show or hide the popover.
		`,
		options: 'true',
		type: 'boolean',
		required: false
	},
	{
		attribute: 'unstyled',
		description: `
			Trigger color is
			<a target="_blank" href="https://goo.gl/bkoDwm">inherited</a>.
		`,
		options: null,
		type: null,
		required: false
	}
]
)}])
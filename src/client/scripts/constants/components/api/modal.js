angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_MODAL_API',
[
	{
		attribute: 'center',
		description: `
			Centers modal vertically.
		`,
		options: null,
		type: null,
		required: false
	},
	common.get('content', {
		description: `
			<em class="info-heading">not attribute</em>
			Content inside tag that isn't inside
			header or footer slot.
		`
	}),
	{
		attribute: 'footer',
		description: `
			<em class="info-heading">slot not attribute</em>
			Any html element inside tag with attribute slot="footer".
		`,
		options: null,
		type: 'html | string',
		required: false
	},
	{
		attribute: 'header',
		description: `
			<em class="info-heading">slot not attribute</em>
			Any html element inside tag with attribute slot="header".
		`,
		options: null,
		type: 'html | string',
		required: false
	},
	{
		attribute: 'no-backdrop',
		description: `
			Displays modal without backdrop.
		`,
		option: null,
		type: null,
		required: false
	},
	common.get('open', {
		description: `
			<em class="info-heading">defaults to false</em>
			Opens modal.
		`
	}),
	{
		attribute: 'unclosable',
		description: `
			Prevents the modal from being closed.
		`,
		option: null,
		type: null,
		required: false
	}
]
)}])
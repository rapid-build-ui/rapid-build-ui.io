angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_RADIOS_API',
[
	// common.get('dark'),
	common.get('data'),
	common.get('disabled'),
	common.get('horizontal', {
		description: `Displays radios horizontally.`
	}),
	common.get('inline'),
	common.get('label'),
	common.get('label-key'),
	common.get('name'),
	common.get('popover'),
	common.get('right'),
	common.get('subtext'),
	{
		attribute: 'toggle',
		description: `Adds ability to deselect a radio.`,
		options: null,
		type: null,
		required: false
	},
	common.get('value'),
	common.get('validation')
]
)}])
angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_CHECKBOXES_API',
[
	// common.get('dark'),
	common.get('data'),
	common.get('disabled'),
	common.get('horizontal', {
		description: `Displays checkboxes horizontally.`
	}),
	common.get('inline'),
	common.get('label'),
	common.get('label-key'),
	common.get('name'),
	common.get('popover'),
	common.get('right'),
	common.get('subtext'),
	common.get('value', {
		description: `
			Array of
			<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
			values or
			<a target="_blank" href="https://goo.gl/uZEoeU">objects</a>.
		`,
		type: 'array',
	}),
	common.get('validation')
]
)}])
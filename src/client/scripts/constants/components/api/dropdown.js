angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_DROPDOWN_API',
[
	// common.get('dark'),
	common.get('data'),
	common.get('disabled'),
	common.get('inline'),
	common.get('label'),
	common.get('label-key'),
	common.get('name'),
	common.get('placeholder', {
		description: `
			<em class="info-heading">adds ability to deselect a value</em>
			Placeholder text.<br>
			Displays in the input and as the
			first option in the dropdown list.
		`,
		type: `n/a | string`
	}),
	common.get('popover'),
	common.get('right'),
	common.get('subtext'),
	common.get('value'),
	common.get('validation')
]
)}])
angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_CHECKBOX_API',
[
	// common.get('dark'),
	common.get('disabled'),
	common.get('horizontal'),
	common.get('inline'),
	common.get('label'),
	common.get('name'),
	common.get('popover'),
	common.get('right'),
	common.get('sublabel'),
	common.get('subtext'),
	common.get('value'),
	common.get('validation')
]
)}])
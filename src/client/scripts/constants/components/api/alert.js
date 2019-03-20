angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_ALERT_API',
[
	common.get('content'),
	// common.get('dark'),
	common.get('kind'),
	{
		attribute: 'removable',
		description: 'Adds removable icon to display.',
		options: null,
		type: `n/a | bool`,
		required: false
	}
]
)}])
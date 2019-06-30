angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_CODE_API',
[
	common.get('content'),
	common.get('kind')
]
)}])
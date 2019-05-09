angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_TEXTCURVE_API',
[
	common.get('content'),
	// common.get('dark'),
	// common.get('inline'),
	common.get('kind', {
		options: `danger | info | neutral | primary | success | warning`
	}),
	common.get('subtext', {
		description: `
			<em class="info-heading">slot not attribute</em>
			Additional information.<br>
			Any html element inside tag with attribute slot="subtext".
		`,
		type: 'html | string'
	})
]
)}])
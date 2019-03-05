angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_BUTTON_API',
[
	common.get('content'),
	// common.get('dark'),
	common.get('disabled'),
	common.get('kind', {
		description: `
			Varies look of display.
			<em class="info-sub">kind 'text' unstyles button</em>
		`,
		options: `info | danger | secondary | success | warning | text`
	}),
	common.get('size'),
	common.get('type', {
		description: `
			<em class="info-heading">defaults to button</em>
			Additional <a target="_blank" href="https://goo.gl/bdwtDR">reference</a>.
		`,
		options: `reset | submit`
	}),
	common.get('icon-burst'),
	common.get('icon-flip'),
	common.get('icon-kind'),
	common.get('icon-position'),
	common.get('icon-pulse'),
	common.get('icon-rotate'),
	common.get('icon-size'),
	common.get('icon-speed'),
	common.get('icon-spin'),
	common.get('icon-source'),
	common.get('icon-valign')
]
)}])
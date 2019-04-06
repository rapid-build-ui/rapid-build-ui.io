angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_BUTTON_API',
[
	common.get('content'),
	// common.get('dark'),
	common.get('disabled'),
	common.get('icon-burst'),
	common.get('icon-flip'),
	common.get('icon-kind'),
	common.get('icon-pulse'),
	common.get('icon-right'),
	common.get('icon-rotate'),
	common.get('icon-size'),
	common.get('icon-speed'),
	common.get('icon-spin'),
	common.get('icon-source'),
	common.get('icon-valign'),
	common.get('kind', {
		options: `info | danger | neutral | success | warning`
	}),
	common.get('onclick', {
		description: `
			Function to execute onclick.
			<em class="info-sub no-parens">You'll
			usually set this in javascript, example:<br>
			rbButton.onclick = someFunction</em>
		`
	}),
	common.get('size'),
	{
		attribute: 'text',
		description: `
			Displays button as text.
			<em class="info-sub">to
				<a target="_blank" href="https://goo.gl/bkoDwm">inherit text color</a>
				use options
			object</em>
		`,
		options: `n/a | {inherit:'color'}`,
		type: `n/a | object`,
		required: false
	},
	common.get('type', {
		description: `
			<em class="info-heading">defaults to button</em>
			Additional <a target="_blank" href="https://goo.gl/bdwtDR">reference</a>.
		`,
		options: `reset | submit`
	})
]
)}])
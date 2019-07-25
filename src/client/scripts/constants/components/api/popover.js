angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_POPOVER_API',
[
	{
		attribute: 'caption',
		description: `
			Styled component
			<a target="_blank" href="https://goo.gl/kLCstb">heading</a>.
		`,
		options: null,
		type: 'string',
		required: false
	},
	common.get('content'),
	// common.get('dark'),
	{
		attribute: 'fit-content',
		description: `Makes popover as wide as content.`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'hover',
		description: `Trigger popover via hover.`,
		options: null,
		type: null,
		required: false
	},
	common.get('kind'),
	common.get('icon-burst'),
	common.get('icon-flip'),
	common.get('icon-kind', {
		description: `
			<em class="info-heading">defaults to info-circle</em>
			Popover trigger.
		`
	}),
	common.get('icon-pulse'),
	common.get('icon-rotate'),
	common.get('icon-size'),
	common.get('icon-speed'),
	common.get('icon-spin'),
	common.get('icon-source'),
	common.get('icon-valign'),
	{
		attribute: 'inherit-color',
		description: `
			Trigger color is
			<a target="_blank" href="https://goo.gl/bkoDwm">inherited</a>.
		`,
		options: null,
		type: null,
		required: false
	},
	common.get('onclick', {
		description: `
			Function to execute when opening popover via click.
			<ul>
				<li>
					<em class="info-sub no-parens">
						popover opens once function completes
						or promise resolves
					</em>
				</li>
				<li>
					<em class="info-sub no-parens">
						you'll usually set this in javascript
					</em>
				</li>
			</ul>
		`
	}),
	common.get('open', {
		description: `
			<em class="info-heading">defaults to false</em>
			Opens popover.
			<em class="info-sub">useful if you need to
			programmatically open or close popover</em>
		`
	}),
	{
		attribute: 'pin',
		description: `
			Popover will only close when trigger is clicked.
			<em class="info-sub">displays
			thumbtack icon when popover is open and pinned</em>
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'position',
		description: `
			<em class="info-heading">defaults to top</em>
			Position where popover opens. Will adjust if not in
			<a target="_blank" href="https://goo.gl/DwJ1ke">viewport</a>.
		`,
		options: 'bottom | left | right',
		type: 'string',
		required: false
	}
]
)}])
angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_NAV_API',
[
	common.get('content', {
		description: `
			<em class="info-heading">not attribute</em>
			Content inside tag.
			Must use the following html tags.
			<h6>In root of rb-nav:</h6>
			<ul>
				<li>
					<em class="tag">a</em> for links
				</li>
				<li>
					<em class="tag">h3</em> for optional headings
				</li>
			</ul>
		`,
		type: 'html',
		required: true
	}),
	common.get('dark'),
	{
		attribute: 'dividers',
		description: `Adds dividers between links.`,
		options: null,
		type: null,
		required: false
	},
	common.get('inline'),
	common.get('kind', {
		options: 'primary'
	}),
	{
		attribute: 'responsive',
		description: `
			Changes the look of the display to
			accommodate smaller screens when
			<a target="_blank" href="https://goo.gl/KAhrH5">viewport</a>
			width is less than or equal to 768px.
		`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'vertical',
		description: `Vertically aligns links.`,
		options: null,
		type: null,
		required: false
	},
	{
		attribute: 'active',
		description: `
			Visually indicates active link.
			By default clicking a link
			sets it to active.
			<h6>Active options:</h6>
			<ul>
				<li>
					<strong>false</strong><br>
					disables activity
				</li>
				<li>
					<strong>hash</strong><br>
					link's hash matches browser's
				</li>
				<li>
					<strong>path</strong><br>
					link's path matches browser's
				</li>
				<li>
					<strong>{ param: string }</strong><br>
					link's query string param matches browser's
				</li>
				<li>
					<strong>{ segment: int }</strong><br>
					link's <a target="_blank" href="https://goo.gl/aG8C2q">segment</a>
					matches browser's
				</li>
			</ul>
		`,
		options: `false | hash | path | {param:string} | {segment:int}`,
		type: `boolean | string | object`,
		required: false
	}
]
)}])
angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_NAV_API',
[
	common.get('content', {
		description: `
			<em class="info-heading">not attribute</em>
			Content inside tag.
			Must use the following html tags
			in the root of rb-nav.
			<ul>
				<li>
					<strong><em class="tag">a</em></strong> for links
				</li>
				<li>
					<strong><em class="tag">h3</em></strong> for optional headings
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
					<strong>false</strong>
					<em class="info-sub no-parens">
						disables activity
					</em>
				</li>
				<li>
					<strong>hash</strong>
					<em class="info-sub no-parens">
						link's hash matches browser's
					</em>
				</li>
				<li>
					<strong>path</strong>
					<em class="info-sub no-parens">
						link's path matches browser's
					</em>
				</li>
				<li>
					<strong>{ param: string }</strong>
					<em class="info-sub no-parens">
						link's query string param matches browser's
					</em>
				</li>
				<li>
					<strong>{ segment: int }</strong>
					<em class="info-sub no-parens">
						link's <a target="_blank" href="https://goo.gl/hjghkG">segment</a>
						matches browser's
					</em>
				</li>
			</ul>
		`,
		options: `false | hash | path | {param:string} | {segment:int}`,
		type: `bool | string | object`,
		required: false
	},
	{
		attribute: 'responsive',
		description: `
			Changes the display to accommodate smaller screens.
			<h6>Responsive options:</h6>
			<ul>
				<li>
					<strong>valueless</strong>
					<em class="info-sub no-parens">
						uses default options
					</em>
				</li>
				<li>
					<strong>options</strong>
					<pre>
					{
						at: int 768,
						show: bool false,
						enabled: bool true,
						dividers: bool false,
						closeOnClick: bool true
					}
					</pre>
					<ul>
						<li>
							<strong>at</strong>
							<em class="info-sub-inline">pixels</em>
							<em class="info-sub no-parens">
								change display when
								<a target="_blank" href="https://goo.gl/KAhrH5">viewport width</a>
								is less than or equal to at value
							</em>
						</li>
						<li>
							<strong>closeOnClick</strong>
							<em class="info-sub no-parens">
								close nav menu when clicking a link
							</em>
						</li>
						<li>
							<strong>dividers</strong>
							<em class="info-sub no-parens">
								adds dividers between links
							</em>
						</li>
						<li>
							<strong>enabled</strong>
							<em class="info-sub no-parens">
								programmatically enable
							</em>
						</li>
						<li>
							<strong>show</strong>
							<em class="info-sub no-parens">
								programmatically show or hide nav menu
							</em>
						</li>
					</ul>
				</li>
			</ul>
		`,
		options: `n/a | {option:mixed}`,
		type: `n/a | object`,
		required: false
	}
]
)}])
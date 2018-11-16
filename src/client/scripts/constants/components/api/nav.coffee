angular.module('rapid-build').constant 'RB_NAV_API', [
	attribute: 'content'
	description: '
		<em class="not-attr">not attribute</em>
		Content inside tag.
		Use the following html tags.
		<h6>In root of rb-nav:</h6>
		<ul>
			<li>
				<b class="tag">a</b> for links.
			</li>
			<li>
				<b class="tag">h3</b> for optional headings.
			</li>
		</ul>
	'
	options: null
	type: 'html'
	required: true
,
	attribute: 'dividers'
	description: 'Adds dividers between links.'
	options: null
	type: null
	required: false
,
	attribute: 'inline'
	description: '
		Sets display to
		<a target="_blank" href="https://goo.gl/fpGxpN">inline</a>.
	'
	options: null
	type: null
	required: false
,
	attribute: 'inverse'
	description: 'Changes styles for dark backgrounds.'
	options: null
	type: null
	required: false
,
	attribute: 'kind'
	description: 'Varies look of display.'
	options: 'primary'
	type: 'string'
	required: false
,
	attribute: 'responsive'
	description: '
		Changes the look of the display to accommodate smaller screens
		when <a target="_blank" href="https://goo.gl/KAhrH5">viewport</a>
		width is less than or equal to 768px.
	'
	options: null
	type: null
	required: false
,
	attribute: 'vertical'
	description: 'Vertically aligns links.'
	options: null
	type: null
	required: false
,
	attribute: 'active'
	description: '
		Visually indicates active link.
		By default clicking a link
		sets it to active.
		<h6>Active options:</h6>
		<ul>
			<li>
				false: disables activity
			</li>
			<li>
				hash:
				link\'s hash matches browser\'s
			</li>
			<li>
				path:
				link\'s path matches browser\'s
			</li>
			<li>
				{ param: string }:
				link\'s query string param matches browser\'s
			</li>
			<li>
				{ segment: int }:
				link\'s <a target="_blank" href="https://goo.gl/aG8C2q">segment</a>
				matches browser\'s
			</li>
		</ul>
	'
	options: 'false | hash | path | {param:string} | {segment:int}'
	type: 'boolean | string | object'
	required: false
]
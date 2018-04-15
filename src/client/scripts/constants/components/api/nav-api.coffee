angular.module('rapid-build').constant 'RB_NAV_API', [
	attribute: 'content'
	description: '
		<em class="rb-content">not attribute</em>
		Content inside tag.<br>
		Use the following html tags
		in <em>root of rb-nav</em>:<br>
		&lt;a&gt; to create links.<br>
		&lt;h3&gt; to optionally create headings.
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
		Visually indicates active link.<br>
		By default clicking a link
		sets it to active.<br>

		<strong>Active options:</strong><br>
		• false: disables activity<br>

		• \'hash\':
		link\'s hash matches browser\'s<br>

		• \'path\':
		link\'s path matches browser\'s<br>

		• { param: string }:
		link\'s query string param matches browser\'s<br>

		• { segment: int }:
		link\'s <a target="_blank" href="https://goo.gl/aG8C2q">segment</a>
		matches browser\'s
	'
	options: 'false | hash | path | {param:string} | {segment:int}'
	type: 'boolean | string | object'
	required: false
]
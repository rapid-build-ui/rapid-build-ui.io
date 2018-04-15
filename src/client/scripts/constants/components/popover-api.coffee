angular.module('rapid-build').constant 'RB_POPOVER_API', [
	attribute: 'caption'
	description: '
		Styled component
		<a target="_blank" href="https://goo.gl/kLCstb">heading</a>.
	'
	options: null
	type: 'string'
	required: false
,
	attribute: 'content'
	description: '
		<em class="rb-content">not attribute</em>
		Content inside tag.
	'
	options: null
	type: 'html | string'
	required: false
,
	attribute: 'hover'
	description: 'Trigger popover via hover.'
	options: null
	type: null
	required: false
,
	attribute: 'kind'
	description: 'Varies look of display.'
	options: 'info | danger | success | warning'
	type: 'string'
	required: false
,
	attribute: 'position'
	description: '
		Defaults to <em class="rb-default">right</em>.
		Position where popover opens. Will adjust if not in
		<a target="_blank" href="https://goo.gl/DwJ1ke">viewport</a>.
	'
	options: 'bottom | left | top'
	type: 'string'
	required: false
]
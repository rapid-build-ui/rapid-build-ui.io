angular.module('rapid-build').constant 'RB_POPOVER_API', [
	name: 'caption'
	description: '
		Styled component
		<a target="_blank" href="https://goo.gl/kLCstb">heading</a>.
	'
	options: null
	type: 'string'
	required: false
,
	name: 'content'
	description: 'Content inside tag.'
	options: null
	type: 'html | string'
	required: false
,
	name: 'hover'
	description: 'Trigger popover via hover.'
	options: null
	type: 'void'
	required: false
,
	name: 'kind'
	description: 'Varies look of display.'
	options: 'info | danger | success | warning'
	type: 'string'
	required: false
,
	name: 'position'
	description: '
		Defaults to <em class="rb-default">right</em>.
		Position where popover opens. Will adjust if not in
		<a target="_blank" href="https://goo.gl/DwJ1ke">viewport</a>.
	'
	options: 'bottom | left | top'
	type: 'string'
	required: false
]
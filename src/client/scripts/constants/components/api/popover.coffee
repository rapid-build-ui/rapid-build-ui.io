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
		<em class="not-attr">not attribute</em>
		Content inside tag.
	'
	options: null
	type: 'html | string'
	required: false
,
	attribute: 'fit-content'
	description: 'Makes popover as wide as content.'
	options: null
	type: null
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
	attribute: 'icon-kind'
	description: '
		<em class="default-val">defaults to <b>info-circle</b></em>
		Popover trigger.
	'
	options: '<a href="/components/rb-icon">rb-icon kind</a>'
	type: 'string'
	required: false
,
	attribute: 'icon-size'
	description: 'Refer to options.'
	options: '<a href="/components/rb-icon">rb-icon size</a>'
	type: 'number'
	required: false
,
	attribute: 'icon-source'
	description: 'Refer to options.'
	options: '<a href="/components/rb-icon">rb-icon source</a>'
	type: 'string'
	required: false
,
	attribute: 'icon-valign'
	description: '
		Vertically aligns icon.
	'
	options: '<a href="/components/rb-icon">rb-icon valign</a>'
	type: 'string'
	required: false
,
	attribute: 'pin'
	description: '
		Popover only closes by clicking the trigger.
	'
	options: null
	type: null
	required: false
,
	attribute: 'position'
	description: '
		<em class="default-val">defaults to <b>right</b></em>
		Position where popover opens. Will adjust if not in
		<a target="_blank" href="https://goo.gl/DwJ1ke">viewport</a>.
	'
	options: 'bottom | left | top'
	type: 'string'
	required: false
,
	attribute: 'show-popover'
	description: '
		<em class="default-val">defaults to <b>false</b></em>
		Programmatically show or hide the popover.
	'
	options: 'true'
	type: 'boolean'
	required: false
,
	attribute: 'unstyled'
	description: 'Removes trigger styles.'
	options: null
	type: null
	required: false
]
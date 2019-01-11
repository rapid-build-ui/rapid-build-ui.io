angular.module('rapid-build').constant 'RB_DROPDOWN_API', [
	attribute: 'data'
	description: '
		Supports an array of
		<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
		values and an array of
		<a target="_blank" href="https://goo.gl/X5D796">objects</a>.<br>
		<b class="sub">(array of objects, see label-key)</b>
	'
	options: null
	type: 'array'
	required: true
,
	attribute: 'disabled'
	description: 'Disables component.'
	options: null
	type: null
	required: false
,
	attribute: 'inline'
	description: 'Displays component inline.'
	options: null
	type: null
	required: false
,
	attribute: 'label'
	description: 'Label text.'
	options: null
	type: 'string'
	required: false
,
	attribute: 'label-key'
	description: '
		Property name used for dropdown labels.
		<b class="sub">(data must be array of objects)</b>
	'
	options: null
	type: 'string'
	required: false
,
	attribute: 'name'
	description: '
		Required when doing a native browser
		form submit to submit the value.
	'
	options: null
	type: 'string'
	required: false
,
	attribute: 'placeholder'
	description: 'Placeholder text.'
	options: null
	type: 'string'
	required: false
,
	attribute: 'popover'
	description: '
		<em class="not-attr">not attribute</em>
		Add <a href="/components/rb-popover">rb-popover</a>
		with slot attribute equals popover.
	'
	options: null
	type: 'html'
	required: false
,
	attribute: 'right'
	description: 'Align\'s component right.'
	options: null
	type: null
	required: false
,
	attribute: 'subtext'
	description: '
		Additional information.
	'
	options: null
	type: 'string'
	required: false
,
	attribute: 'value'
	description: '
		Dropdown value supports
		<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
		values and
		<a target="_blank" href="https://goo.gl/X5D796">objects</a>.
	'
	options: null
	type: 'primitives | objects'
	required: false
,
	attribute: 'validation'
	description: """
		See
		<a target= "_blank" href="/components/rb-input">rb-input validation</a>.
	"""
	options: null
	type: 'array'
	required: false
]
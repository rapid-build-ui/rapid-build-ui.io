angular.module('rapid-build').constant 'RB_CHECKBOXES_API', [
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
	attribute: 'horizontal'
	description: 'Displays checkboxes horizontally.'
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
		Property name used for checkboxes labels.
		<b class="sub">(data must be array of objects)</b>
	'
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
		Array of
		<a target="_blank" href="https://goo.gl/d9wizE">primitives</a>
		or
		<a target="_blank" href="https://goo.gl/X5D796">objects</a>.<br>
		<b class="sub">(array of objects, see label-key)</b>
	'
	options: null
	type: 'array'
	required: false
,
	attribute: 'validation'
	description: """
		See
		<a href="/components/rb-input">rb-input validation</a>.
	"""
	options: null
	type: 'array'
	required: false
]
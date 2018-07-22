angular.module('rapid-build').constant 'RB_RADIOS_API', [
	attribute: 'data'
	description: '
		Currently only supports an array of
		<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
		values, array of
		<a target="_blank" href="https://goo.gl/X5D796">objects</a>
		support coming soon.
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
	description: 'Displays radios horizontally.'
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
	attribute: 'toggle'
	description: 'Adds ability to deselect a radio.'
	options: null
	type: null
	required: false
,
	attribute: 'value'
	description: '
		Radios value.<br>
		Currently only supports
		<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
		values,
		<a target="_blank" href="https://goo.gl/X5D796">object</a>
		support coming soon.
	'
	options: null
	type: '
		<a target="_blank" href="https://goo.gl/d9wizE">primitives</a>
	'
	required: false
,
	attribute: 'validation'
	description: """
		Coming soon, will most likely be the same as
		<a target= "_blank" href="/components/rb-input">rb-input validation</a>.
	"""
	options: null
	type: 'array'
	required: false
]
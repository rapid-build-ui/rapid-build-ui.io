angular.module('rapid-build').constant 'RB_INPUT_API', [
	attribute: 'disabled'
	description: 'Disables component.'
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
	attribute: 'value'
	description: 'Input value.'
	options: null
	type: 'string'
	required: false
,
	attribute: 'validation'
	description: '
		Input validation.<br>
		More info coming soon...
	'
	options: null
	type: 'array'
	required: false
]
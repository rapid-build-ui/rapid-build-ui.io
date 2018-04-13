angular.module('rapid-build').constant 'RB_INPUT_API', [
	name: 'disabled'
	description: 'Disables component.'
	options: null
	type: 'void'
	required: false
,
	name: 'label'
	description: 'Label text.'
	options: null
	type: 'string'
	required: false
,
	name: 'right'
	description: 'Align\'s component right.'
	options: null
	type: 'void'
	required: false
,
	name: 'subtext'
	description: '
		Additional information.
	'
	options: null
	type: 'string'
	required: false
,
	name: 'value'
	description: 'Input value.'
	options: null
	type: 'string'
	required: false
,
	name: 'validation'
	description: '
		Input validation.<br>
		More info coming soon...
	'
	options: null
	type: 'array'
	required: false
]
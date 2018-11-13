angular.module('rapid-build').constant 'RB_CHECKBOX_API', [
	attribute: 'disabled'
	description: 'Disables component.'
	options: null
	type: null
	required: false
,
	attribute: 'horizontal'
	description: 'Displays component horizontally.'
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
	attribute: 'sublabel'
	description: 'Sublabel text.'
	options: null
	type: 'string'
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
		Checkbox value supports
		<a target="_blank" href="https://goo.gl/d9wizE">primitive</a>
		values and
		<a target="_blank" href="https://goo.gl/X5D796">objects</a>.
	'
	options: null
	type: 'primitives | objects'
	required: false
]
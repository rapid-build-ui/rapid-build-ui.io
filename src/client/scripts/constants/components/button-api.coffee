angular.module('rapid-build').constant 'RB_BUTTON_API', [
	name: 'content'
	description: 'Content inside tag.'
	options: null
	type: 'html | string'
	required: false
,
	name: 'disabled'
	description: 'Disables component.'
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
	name: 'size'
	description: 'Changes the size.'
	options: 'big | small'
	type: 'string'
	required: false
,
	name: 'type'
	description: '
		Defaults to <em class="rb-default">button</em>.
		Additional <a target="_blank" href="https://goo.gl/bdwtDR">reference</a>.
	'
	options: 'reset | submit'
	type: 'string'
	required: false
,
	name: 'icon'
	description: 'Adds icon to component.'
	options: 'rb-icon <a target= "_blank" href="/components/rb-icon">kind</a>'
	type: 'string'
	required: false
,
	name: 'icon-position'
	description: 'Positions icon left.'
	options: 'left'
	type: 'string'
	required: false
,
	name: 'icon-size'
	description: 'Refer to options.'
	options: 'rb-icon <a target= "_blank" href="/components/rb-icon">size</a>'
	type: 'number'
	required: false
,
	name: 'icon-source'
	description: 'Refer to options.'
	options: 'rb-icon <a target= "_blank" href="/components/rb-icon">source</a>'
	type: 'string'
	required: false
]
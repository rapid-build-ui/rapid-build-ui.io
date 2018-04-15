angular.module('rapid-build').constant 'RB_BUTTON_API', [
	attribute: 'content'
	description: '
		<em class="rb-content">not attribute</em>
		Content inside tag.
	'
	options: null
	type: 'html | string'
	required: false
,
	attribute: 'disabled'
	description: 'Disables component.'
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
	attribute: 'size'
	description: 'Changes the size.'
	options: 'big | small'
	type: 'string'
	required: false
,
	attribute: 'type'
	description: '
		Defaults to <em class="rb-default">button</em>.
		Additional <a target="_blank" href="https://goo.gl/bdwtDR">reference</a>.
	'
	options: 'reset | submit'
	type: 'string'
	required: false
,
	attribute: 'icon'
	description: 'Adds icon to component.'
	options: 'rb-icon <a target= "_blank" href="/components/rb-icon">kind</a>'
	type: 'string'
	required: false
,
	attribute: 'icon-position'
	description: 'Positions icon left.'
	options: 'left'
	type: 'string'
	required: false
,
	attribute: 'icon-size'
	description: 'Refer to options.'
	options: 'rb-icon <a target= "_blank" href="/components/rb-icon">size</a>'
	type: 'number'
	required: false
,
	attribute: 'icon-source'
	description: 'Refer to options.'
	options: 'rb-icon <a target= "_blank" href="/components/rb-icon">source</a>'
	type: 'string'
	required: false
]
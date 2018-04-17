angular.module('rapid-build').constant 'RB_BUTTON_API', [
	attribute: 'content'
	description: '
		<em class="not-attr">not attribute</em>
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
	description: '
		Varies look of display.<br>
		(kind \'text\' unstyles button)
	'
	options: 'info | danger | success | warning | text'
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
		<em class="default-val">defaults to <b>button</b></em>
		Additional <a target="_blank" href="https://goo.gl/bdwtDR">reference</a>.
	'
	options: 'reset | submit'
	type: 'string'
	required: false
,
	attribute: 'icon'
	description: 'Adds icon to component.'
	options: '<a target= "_blank" href="/components/rb-icon">rb-icon kind</a>'
	type: 'string'
	required: false
,
	attribute: 'icon-position'
	description: '
		<em class="default-val">defaults to <b>right</b></em>
		Icon position.
	'
	options: 'left'
	type: 'string'
	required: false
,
	attribute: 'icon-size'
	description: 'Refer to options.'
	options: '<a target= "_blank" href="/components/rb-icon">rb-icon size</a>'
	type: 'number'
	required: false
,
	attribute: 'icon-source'
	description: 'Refer to options.'
	options: '<a target= "_blank" href="/components/rb-icon">rb-icon source</a>'
	type: 'string'
	required: false
]
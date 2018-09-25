angular.module('rapid-build').constant 'RB_ICON_API', [
	attribute: 'kind'
	description: '
		Name of any free
		<a target="_blank" href="https://goo.gl/oJ2iTy">font awesome icon</a>.
		Font awesome icon style must match icon source.
	'
	options: '
		<a target="_blank" href="https://goo.gl/oJ2iTy">options</a>
	'
	type: 'string'
	required: true
,
	attribute: 'size'
	description: 'Changes the size.'
	options: null
	type: 'number'
	required: false
,
	attribute: 'source'
	description: '
		<em class="default-val">defaults to <b>regular</b></em>
		Source refers to font awesome\'s icon styles.
	'
	options: 'brands | solid'
	type: 'string'
	required: false
,
	attribute: 'v-align'
	description: '
		<em class="default-val">defaults to <b>baseline</b></em>
		Vertically aligns icon.
	'
	options: '<a target= "_blank" href="https://goo.gl/84rLYX">options</a>'
	type: 'string'
	required: false
]
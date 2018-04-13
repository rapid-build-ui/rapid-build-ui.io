angular.module('rapid-build').constant 'RB_ICON_API', [
	name: 'kind'
	description: '
		Name of any free
		<a target="_blank" href="https://goo.gl/oJ2iTy">font awesome icon</a>.
		Font awesome icon style must match icon source.
	'
	options: '
		<a target="_blank" href="https://goo.gl/oJ2iTy">reference</a>
	'
	type: 'string'
	required: true
,
	name: 'size'
	description: 'Changes the size.'
	options: null
	type: 'number'
	required: false
,
	name: 'source'
	description: '
		Defaults to <em class="rb-default">regular</em>.
		Source refers to font awesome\'s icon styles.
	'
	options: 'brands | solid'
	type: 'string'
	required: false
]
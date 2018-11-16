angular.module('rapid-build').constant 'RB_ALERT_API', [
	attribute: 'content'
	description: '
		<em class="not-attr">not attribute</em>
		Content inside tag.
	'
	options: null
	type: 'html | string'
	required: false
,
	attribute: 'kind'
	description: 'Varies look of display.'
	options: 'info | danger | success | warning'
	type: 'string'
	required: false
,
	attribute: 'removable'
	description: 'Adds removable option to display.'
	options: null
	type: null
	required: false
]
angular.module('rapid-build').constant 'RB_ALERT_API', [
	name: 'content'
	description: 'Content inside tag.'
	options: null
	type: 'html | string'
	required: false
,
	name: 'kind'
	description: 'Varies look of display.'
	options: 'info | danger | success | warning'
	type: 'string'
	required: false
,
	name: 'removable'
	description: 'Adds removable option to display.'
	options: null
	type: 'void'
	required: false
]
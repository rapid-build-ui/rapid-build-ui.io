angular.module('rapid-build').constant 'RB_MODAL_API', [
	attribute: 'kind'
	description: 'Varies look of display.'
	options: 'info | danger | success | warning'
	type: 'string'
	required: false
,
	attribute: 'show'
	description: '
		<em class="default-val">defaults to <b>false</b></em>
		Show or hide the modal.
		Can be programmatically set.
	'
	options: 'true'
	type: 'boolean'
	required: false
]
angular.module('rapid-build').constant 'RB_MODAL_API', [
	attribute: 'content'
	description: '
		<em class="not-attr">not attribute</em>
		Content inside tag.
	'
	options: null
	type: 'html | string'
	required: false
,
	attribute: 'header'
	description: '
		Add content in the header using slot attribute equals header.
	'
	options: null
	type: 'html | string'
	required: false
,
	attribute: 'footer'
	description: '
		Add content in the footer using slot attribute equals footer.
	'
	options: null
	type: 'html | string'
	required: false
,
	attribute: 'center'
	description: 'Vertically centers modal.'
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
	attribute: 'show'
	description: '
		<em class="default-val">defaults to <b>false</b></em>
		Show or hide the modal.
		Can be programmatically set.
	'
	options: 'true'
	type: 'boolean'
	required: false
,
	attribute: 'unclosable'
	description: 'It prevents the modal from being closed'
	option: null
	type: null
	required: false
]

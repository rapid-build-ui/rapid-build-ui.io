angular.module('rapid-build').constant 'RB_INPUT_API', [
	attribute: 'disabled'
	description: 'Disables component.'
	options: null
	type: null
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
	attribute: 'icon-source'
	description: 'Refer to options.'
	options: '<a target= "_blank" href="/components/rb-icon">rb-icon source</a>'
	type: 'string'
	required: false
,
	attribute: 'inline'
	description: 'Displays input inline'
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
	attribute: 'placeholder'
	description: 'Input placeholder.'
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
	attribute: 'subtext'
	description: '
		Additional information.
	'
	options: null
	type: 'string'
	required: false
,
	attribute: 'type'
	description: '
		<em class="default-val"><b>text</b> - defult</em>
		Input type attribute.
	'
	options: 'number'
	type: 'string'
	required: false
,
	attribute: 'value'
	description: 'Input value.'
	options: null
	type: 'string'
	required: false
,
	attribute: 'validation'
	description: '
		Collection of one or more validations
		that will be triggered in the provided sequence.

		<h6>options:</h6>
		<ul>
			<li>
				<em>string</em><br>
				See demo above for <strong>required</strong>.
			</li>
			<li>
				<em>object</em>: {key:value}<br>
				See demo above for <strong>minLength</strong>
			</li>
			<li>
				<em>nested object</em>:<br>
				<pre>
				{<br>
					&#9 key: {key1: value, key2: value ...}
				<br>
				}
				</pre>
				See demo above for <strong>minMaxLength</strong>
			</li>
			<li>
				<em>function:</em><br>
				Custom function which takes one value parameter and should return an object with two properties:
				<pre>
					&#9 {valid: bool, message: string}
				</pre>
				See demo above for <strong>custom</strong>
			</li>
		</ul>
	'
	options: null
	type: 'array'
	required: false
]
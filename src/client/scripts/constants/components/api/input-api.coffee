angular.module('rapid-build').constant 'RB_INPUT_API', [
	attribute: 'disabled'
	description: 'Disables component.'
	options: null
	type: null
	required: false
,
	attribute: 'icon-kind'
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
	description: 'Displays component inline.'
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
		<em class="default-val">defaults to <b>text</b></em>
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
	description: """
		Collection of one or more validations
		that will be triggered in the provided sequence.
		<h6>Validation options:</h6>
		<ul>
			<li>
				<strong>string</strong>
				<b class="sub">(see demo required)</b>
			</li>
			<li>
				<strong>object</strong>
				<b class="sub">(see demo minLength)</b>
				<pre>
				{
					key: value
				}
				</pre>
			</li>
			<li>
				<strong>nested object</strong>
				<b class="sub">(see demo minMaxLength)</b>
				<pre>
				{
					key: {
						key: value[, key: value]
					}
				}
				</pre>
			</li>
			<li>
				<strong>function</strong>
				<b class="sub">(see demo custom)</b><br>
				Custom function takes one
				value parameter and must return
				an object with two properties:
				<pre>
				{
					valid: bool,
					message: string
				}
				</pre>
			</li>
		</ul>
	"""
	options: null
	type: 'array'
	required: false
]
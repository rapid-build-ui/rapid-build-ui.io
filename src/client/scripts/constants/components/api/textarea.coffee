angular.module('rapid-build').constant 'RB_TEXTAREA_API', [
	attribute: 'auto-height'
	description: 'Height is set based on the content.'
	options: null
	type: null
	required: false
,
	attribute: 'disabled'
	description: 'Disables component.'
	options: null
	type: null
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
	attribute: 'popover'
	description: '
		<em class="not-attr">not attribute</em>
		Add <a href="/components/rb-popover">rb-popover</a>
		with slot attribute equals popover.
	'
	options: null
	type: 'html'
	required: false
,
	attribute: 'right'
	description: 'Align\'s component right.'
	options: null
	type: null
	required: false
,
	attribute: 'rows'
	description: '
		<em class="default-val">defaults to 5</em>
		Sets textearea rows attribute'
	options: null
	type: 'number'
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
	attribute: 'value'
	description: 'Textarea content.'
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
						{key: value}
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
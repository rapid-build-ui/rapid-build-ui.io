angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_INPUT_API',
[
	// common.get('dark'),
	common.get('disabled'),
	common.get('icon-kind'),
	common.get('icon-position'),
	common.get('icon-source'),
	common.get('inline'),
	common.get('label'),
	common.get('name'),
	common.get('placeholder'),
	common.get('popover'),
	common.get('right'),
	common.get('subtext'),
	common.get('type', {
		options: 'email | number | password | url',
	}),
	common.get('value', {
		description: `Component's value.`,
		type: 'string'
	}),
	common.get('validation', {
		description: `
			<em class="info-heading">form tag not required</em>
			Array of one or more validations.
			Validations trigger when the component's
			value is modified or on form submit.
			Validation sequence is the order of the
			array stopping at the first invalid.
			<h6>Validation options:</h6>
			<ul>
				<li>
					<strong>string</strong>
					<em class="info-sub-inline">see demo required</em>
				</li>
				<li>
					<strong>object</strong>
					<em class="info-sub-inline">see demo minLength</em>
					<pre>
					{
						key: value
					}
					</pre>
				</li>
				<li>
					<strong>nested object</strong>
					<em class="info-sub-inline">see demo minMaxLength</em>
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
					<em class="info-sub-inline">see demo custom</em><br>
					Custom function takes one
					argument (which is the value) and
					must return an object with two properties:
					<pre>
					{
						valid: bool,
						message: string
					}
					</pre>
				</li>
			</ul>
		`
	})
]
)}])
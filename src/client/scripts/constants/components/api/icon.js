angular.module('rapid-build').config(['$provide', 'RB_COMMON_API', (p, common) => {
p.constant('RB_ICON_API',
[
	// common.get('dark'),
	common.get('kind', {
		description: `
			Name of any free
			<a target="_blank" href="https://goo.gl/oJ2iTy">font awesome icon</a>.
			Font awesome icon style must match icon source.
		`,
		options: `<a target="_blank" href="https://goo.gl/oJ2iTy">options</a>`,
		type: 'string',
		required: true
	}),
	// {
	// 	attribute: 'library',
	// 	description: `
	// 		<em class="info-heading">defaults to fa</em>
	// 		Choose between one of the two icon libraries:
	// 		<ul>
	// 			<li>
	// 				<a target="_blank" href="https://goo.gl/oJ2iTy">font awesome</a>
	// 			</li>
	// 			<li>
	// 				<a target="_blank" href="https://goo.gl/V1rZqm">material</a>
	// 			</li>
	// 		</ul>
	// 	`,
	// 	options: 'material',
	// 	type: 'string',
	// 	required: false
	// },
	common.get('size', {
		options: null,
		type: 'number',
		required: false
	}),
	{
		attribute: 'source',
		description: `
			<em class="info-heading">defaults to regular</em>
			Source refers to font awesome's icon styles.
		`,
		options: 'brands | solid',
		type: 'string',
		required: false
	},
	{
		attribute: 'valign',
		description: `
			<em class="info-heading">defaults to baseline</em>
			Vertically aligns icon.
		`,
		options: `<a target= "_blank" href="https://goo.gl/84rLYX">options</a>`,
		type: 'string',
		required: false
	}
]
)}])
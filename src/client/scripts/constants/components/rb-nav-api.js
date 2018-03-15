angular.module('rapid-build').constant('RB_NAV_API', [
	{
		name: 'kind',
		description: `Changes the look of the display.`
	},
	{
		name: 'active',
		description: `
			false - This is awesome<br>
			hash - This is super awesome<br>
			path - This is super, super awesome<br>
			{"param":"name"} - This is super, super, super awesome<br>
			{"segment":2} - This is soooooooo awesome
		`
	},
	{
		name: 'caption',
		description: `For captions use h3(s) in the content.`
	},
	{
		name: 'inline',
		description: `Aligns the navigation links in a horizontal line.`
	},
	{
		name: 'inverse',
		description: `Changes the style to look appropriate on a dark background.`
	},
	{
		name: 'vertical',
		description: `Aligns the navigation links vertically.`
	},
	{
		name: 'dividers',
		description: `Divides, adds a right border to the navigation links while horizontally aligned.`
	},
	{
		name: 'responsive',
		description: `Changes the look of the display to be more suitable for smaller screens.`
	}
]);

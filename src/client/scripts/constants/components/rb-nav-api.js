angular.module('rapid-build').constant('RB_NAV_API', [
	{
		name: "kind",
		description: `The tabs option changes the display of the
			nav links from lower case to capital letters
			and adds a separating border for each one of them.`
	},
	{
		name: "active",
		description: `false - This is awesome<br>
			hash - This is super awesome<br>
			path - This is super, super awesome<br>
			{"param":"name"} - This is super, super, super awesome<br>
			{"segment":2} - This is soooooooo awesome`
	},
	{
		name: "caption",
		description: `For captions use h3(s) in the content.`
	},
	{
		name: "inline",
		description: `It aligns the navigation links in a horizontal line.`
	},
	{
		name: "inverse",
		description: `It changes the style to look appropriate on a dark background.`
	},
	{
		name: "vertical",
		description: `It aligns the navigation links vertically.`
	},
	{
		name: "dividers",
		description: `It divides, adds a right border to the navigation links while horizontally aligned.`
	},
	{
		name: "responsive",
		description: `Coming soon...`
	}
]);

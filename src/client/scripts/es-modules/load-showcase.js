/*******************************************
 * LOAD AND PREP RB OPTIONS FOR SHOWCASE
 * ----------------------------------------
 * First:
 * - create showcase namespace on window
 * Then attach:
 * - rb-icons (ex: rb-button showcase page)
 * - rb-code modes and themes
 *******************************************/
import RB_ICONS        from '/node_modules/@rapid-build-ui/rb-icon/scripts/icons.js';
// import RB_CODE_HEIGHTS from '/node_modules/@rapid-build-ui/rb-code/scripts/heights.js';
// import RB_CODE_MODES   from '/node_modules/@rapid-build-ui/rb-code/scripts/modes.js';
// import RB_CODE_THEMES  from '/node_modules/@rapid-build-ui/rb-code/scripts/themes.js';

const Showcase = {
	/* Props
	 ********/
	// code: {
	// 	get heights() { // :string[] (readonly)
	// 		return RB_CODE_HEIGHTS;
	// 	},
	// 	get modes() { // :string[] (readonly)
	// 		return Object.keys(RB_CODE_MODES);
	// 	},
	// 	get themes() { // :string[] (readonly)
	// 		const themes = { ...RB_CODE_THEMES }; // clone object
	// 		delete themes['default']; // default theme
	// 		return Object.keys(themes);
	// 	}
	// },
	icons: {
		get arrayOfObjects() { // :object<object[]> (readonly)
			const rbIcons = {};
			for (const [source, icons] of Object.entries(RB_ICONS.fa)) {
				rbIcons[source] = [];
				for (const [name, val] of Object.entries(icons))
					rbIcons[source].push(Object.assign({ name }, val));
			}
			return rbIcons;
		},
		get arrayOfStrings() { // :object<string[]> (readonly)
			const rbIcons = {};
			for (const [source, icons] of Object.entries(RB_ICONS.fa)) {
				rbIcons[source] = [];
				for (const name in icons)
					rbIcons[source].push(name);
			}
			return rbIcons;
		}
	},
	/* Methods
	 **********/
	init(win) {
		if (win.showcase) return;
		win.showcase = {
			icons: this.icons.arrayOfStrings,
			code: {
				// heights: this.code.heights,
				// modes:   this.code.modes,
				// themes:  this.code.themes
			}
		};
	}
};

/* Init
 *******/
Showcase.init(window);
// console.log(window.showcase.icons);
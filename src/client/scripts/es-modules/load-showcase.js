/*******************************************
 * LOAD AND PREP RB OPTIONS FOR SHOWCASE
 * ----------------------------------------
 * First:
 * - create showcase namespace on window
 * Then attach:
 * - rb-icons (ex: rb-button showcase page)
 * - rb-code modes and themes
 *******************************************/
import RB_ICONS       from '/node_modules/@rapid-build-ui/rb-icon/scripts/generated/icon-names.js';
import RB_CODE_MODES  from '/node_modules/@rapid-build-ui/rb-code/scripts/modes.js';
import RB_CODE_THEMES from '/node_modules/@rapid-build-ui/rb-code/scripts/themes.js';

const Showcase = {
	/* Props
	 ********/
	code: {
		get modes() { // :string[] (readonly)
			const modes = { ...RB_CODE_MODES }; // clone object
			delete modes['text']; // default mode
			return Object.keys(modes);
		},
		get themes() { // :string[] (readonly)
			return RB_CODE_THEMES;
		}
	},

	/* Methods
	 **********/
	init(win) {
		if (win.showcase) return;
		win.showcase = {
			icons: RB_ICONS.fa, // :{ src: string[] }
			code: {
				modes:  this.code.modes,
				themes: this.code.themes
			}
		};
	}
};

/* Init
 *******/
Showcase.init(window);
// console.log(window.showcase.icons);
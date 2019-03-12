/**************************************
 * LOAD AND PREP RB-ICONS FOR SHOWCASE
 * Convert to array of strings for
 * rb-dropdown on showcase pages.
 **************************************/
import RB_ICONS from '/node_modules/@rapid-build-ui/rb-icon/scripts/icons.js';
// console.log(RB_ICONS);

/* Helpers
 **********/
const RbIcons = {
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
}

window.rbIcons = RbIcons.arrayOfStrings;
// console.log(window.rbIcons);
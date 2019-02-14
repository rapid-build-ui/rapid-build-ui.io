/*********************
 * CURRENTLY ONLY FOR (component api table)
 *********************/
angular.module('rapid-build').filter('optionize', () => {
	return val => {
		if (!val) return val;
		if (typeof val !== 'string') return val;
		if (val.indexOf('|') === -1) return val;
		val = val.trim().split('|').map(item => {
			item = item.trim();
			const cssClass = item === 'n/a' ? ' class="na"' : '';
			return `<b${cssClass}>${item}</b>`;
		}).join(' ');
		val = `<b class="optionize">${val}</b>`;
		return val;
	};
});
/* STRING POLYFILLS
 *******************/
// SOURCE: custom
String.prototype.toTitleCase = function() {
	return this.replace(/\w\S*/g, txt => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};
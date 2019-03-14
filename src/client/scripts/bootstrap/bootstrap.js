/************************
 * BOOTSTRAP ANGULAR APP
 ************************/
angular.element(() => {
	angular.bootstrap(document, ['rapid-build'], {
		strictDi: false
	});
});
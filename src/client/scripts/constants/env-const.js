/******************************************
 * ENVIRONMENT CONSTANT
 * IIFE to perform upfront work.
 * Should also cover heroku app names.
 * ex: rapid-build-ui-io-dev.herokuapp.com
 ******************************************/
angular.module('rapid-build').constant('ENV', ((win) => { // :object
	const { port, hostname } = win.location;
	const local   = !!port;
	const dev     = hostname.includes('dev') || local;
	const staging = hostname.includes('staging');
	const prod    = hostname.indexOf('rapid') === 0 && !dev && !staging;
	return {
		is: {
			local,
			dev,
			staging,
			prod
		}
	};
})(window));
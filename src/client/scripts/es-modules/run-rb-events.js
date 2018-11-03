import awaitSelector from '/scripts/es-modules/await-selector.js';

angular.module('rapid-build').run(['rbEventService', rbEvents => {
	const callback = (err, elms) => {
		if (err) return;
		rbEvents.addListeners(elms, 'value-changed');
	}
	const BIND = '[rb-ng-bind]';
	awaitSelector(`rb-input${BIND}`,    callback);
	awaitSelector(`rb-radios${BIND}`,   callback);
	awaitSelector(`rb-checkbox${BIND}`, callback);
}]);
import awaitSelector from '/scripts/es-modules/await-selector.js';

angular.module('rapid-build').run(['rbEventService', rbEvents => {
	const callback = (err, elms) => {
		if (err) return;
		rbEvents.addListeners(elms);
	}
	const BIND = '[rb-bind]';
	awaitSelector(`rb-code${BIND}`,       callback);
	awaitSelector(`rb-dropdown${BIND}`,   callback);
	awaitSelector(`rb-input${BIND}`,      callback);
	awaitSelector(`rb-radios${BIND}`,     callback);
	awaitSelector(`rb-checkbox${BIND}`,   callback);
	awaitSelector(`rb-checkboxes${BIND}`, callback);
	awaitSelector(`rb-textarea${BIND}`,   callback);
}]);
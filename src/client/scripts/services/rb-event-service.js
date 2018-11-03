/*******************
 * RB EVENT SERVICE
 *******************/
angular.module('rapid-build').service('rbEventService', ['$filter', '$parse', function($filter, $parse) {
	/* Private Props
	 ****************/
	const SCOPE_PROP = 'rbNgScopeProp'; // utilizes element dataset

	/* Private Methods
	 ******************/
	const setElmAttr = function(attr, val) { // :void (rb element is this)
		if (typeof val !== 'string')
			return this.removeAttribute(attr);
		this.setAttribute(attr, val);
	}

	const watchElmScopeProp = function(scope, evt) { // :void (rb element is this)
		const attr = evt.type.split('-').slice(0,-1).join('-'); // ex: value-changed -> value
		let prop = this.getAttribute(attr);   // ex: a.kind
			prop = $filter('camelize')(prop); // ex: a.icon-size -> a.iconSize
		if (!prop) return;

		this.dataset[SCOPE_PROP] = prop;        // ex: a.kind
		const val = $parse(prop)(scope);      // ex: a.kind -> heart
		setElmAttr.bind(this, attr, val)();

		const scopePropWatch = scope.$watch(this.dataset[SCOPE_PROP], (newVal, oldVal) => {
			if (newVal === oldVal) return;
			setElmAttr.bind(this, attr, newVal)();
		});
		scope.$on('$destroy', () => {
			scopePropWatch();
		});
	}

	const eventHandler = function(evt) { // :void (rb element is this)
		const scope = angular.element(this).scope();
		if (!this.dataset[SCOPE_PROP])
			return watchElmScopeProp.bind(this, scope, evt)();
		$parse(this.dataset[SCOPE_PROP]).assign(scope, evt.detail.value);
		scope.$apply();
	}

	const manageEvents = (rbElms, rbEvtName) => { // :void
		for (const rbElm of rbElms) {
			rbElm.addEventListener(rbEvtName, eventHandler);
			angular.element(rbElm).scope().$on('$destroy', () => {
				rbElm.removeEventListener(rbEvtName, eventHandler);
			});
		}
	}

	/* Public
	 *********/
	this.addListeners = (rbElms, rbEvtName) => { // :void
		manageEvents(rbElms, rbEvtName);
	}

	this.addListenersFind = ($elmContainer, rbElmName, rbEvtName) => { // :void
		const rbElms = $elmContainer.querySelectorAll(rbElmName);
		manageEvents(rbElms, rbEvtName);
	}
}]);
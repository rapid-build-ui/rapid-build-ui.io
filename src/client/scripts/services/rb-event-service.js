/*******************
 * RB EVENT SERVICE
 *******************/
angular.module('rapid-build').service('rbEventService', ['$parse', 'typeService', '$timeout',
	function($parse, type, $timeout) {
		/* Private
		 **********/
		const camelize = txt => { // :string | any (could be improved)
			if (!txt) return txt;
			return txt
				.replace(/[\s|_|-](.)/g, $1 => $1.toUpperCase())
				.replace(/[\s|_|-]/g, '')
				.replace(/^(.)/, $1 => $1.toLowerCase());
		}
		const getAttrFromEvt = evtType => { // :string | any
			if (!evtType) return evtType;
			return evtType.split('-').slice(0,-1).join('-');
		}
		const getPropFromAttr = rbAttr => { // :string | any
			if (!rbAttr) return rbAttr;
			return camelize(rbAttr);
		}
		const getScope = function(ngElm) { // :scope<object> (this is rb elm)
			return ngElm.data('scope');
		}
		const hasUpdatedFrom = (updatedFrom, ngElm, rbAttr) => { // :boolean (prevent double update)
			updatedFrom += 'Fired'; // ex: watchFired
			if (ngElm.data(updatedFrom) !== rbAttr) return false;
			ngElm.removeData(updatedFrom);
			return true;
		}
		const getBindings = function() { // :object | null (this is rb elm)
			const ngElm  = angular.element(this);
			const cached = ngElm.data('rbBindings');
			if (!type.is.undefined(cached)) return cached;
			let rbBindings = this.getAttribute('rb-bind');
			if (type.is.string(rbBindings)) rbBindings = rbBindings.trim();
			if (!rbBindings) return null;
			try      { rbBindings = JSON.parse(rbBindings); } // native array
			catch(e) { rbBindings = rbBindings.split(/[ ,]+/); } // string array
			if (!rbBindings.length) return null;
			let map = {};
			for (const rbBinding of rbBindings) {
				let attr = this.getAttribute(rbBinding);
				if (type.is.string(attr)) attr = attr.trim();
				if (!attr) continue;
				map[rbBinding] = attr;
				this.removeAttribute(rbBinding);
			}
			if (!Object.keys(map).length) map = null;
			ngElm.data('rbBindings', map);
			return map;
		}
		const watchScopeProps = function() { // :void (this is rb elm)
			const ngElm    = angular.element(this);
			const scope    = getScope.bind(this, ngElm)();
			const bindings = getBindings.bind(this)();
			const watches  = [];
			for (const [rbAttr, scopeProp] of Object.entries(bindings)) {
				watches.push(scope.$watch(scopeProp, (newVal, oldVal) => {
					const rbProp = getPropFromAttr(rbAttr);
					if (newVal === oldVal || newVal === this[rbProp]) return;
					// console.log('WATCH:', this.localName, rbAttr, newVal, oldVal);
					ngElm.data('watchFired', rbAttr);
					this[rbProp] = newVal;
				}));
			}
			ngElm.on('$destroy', () => {
				for (const watch of watches) watch();
			});
		}
		const eventHandler = function(evt) { // :void (this is rb elm)
			const ngElm     = angular.element(this);
			const rbAttr    = getAttrFromEvt(evt.type);
			if (hasUpdatedFrom('watch', ngElm, rbAttr)) return;
			const scope     = getScope.bind(this, ngElm)();
			const bindings  = getBindings.bind(this)();
			const scopeProp = bindings[rbAttr];
			const evtValue  = evt.detail.value;
			// console.log('EVENT:', this.localName, rbAttr, evtValue);
			$parse(scopeProp).assign(scope, evtValue);
			scope.$apply(); // updates scope prop which in turn fires watchScopeProps
		}
		const addEventListeners = function() { // :void (this is rb elm)
			const ngElm    = angular.element(this);
			const bindings = getBindings.bind(this)();
			for (const [rbAttr, scopeProp] of Object.entries(bindings)) {
				const evtType = `${rbAttr}-changed`;
				this.addEventListener(evtType, eventHandler);
				ngElm.on('$destroy', () => {
					this.removeEventListener(evtType, eventHandler);
				});
			}
		}
		const initScopeProps = function() { // :void (this is rb elm)
			const ngElm    = angular.element(this);
			const scope    = getScope.bind(this, ngElm)();
			const bindings = getBindings.bind(this)();
			for (const [rbAttr, scopeProp] of Object.entries(bindings)) {
				const parser = $parse(scopeProp);
				let scopeVal = parser(scope);
				const rbProp = getPropFromAttr(rbAttr);
				// use prop on scope if set
				if (!type.is.undefined(scopeVal)) {
					this[rbProp] = scopeVal;
					continue;
				}
				// else place prop on scope and
				// set equal to component prop
				parser.assign(scope, this[rbProp]);
			}
		}
		const manageEvents = rbElms => { // :void
			$timeout(); // so watch's new and old value is correct
			for (const rbElm of rbElms) {
				const bindings = getBindings.bind(rbElm)();
				if (type.is.null(bindings)) continue;
				initScopeProps.bind(rbElm)();
				watchScopeProps.bind(rbElm)();
				addEventListeners.bind(rbElm)();
			}
		}
		/* Public
		 *********/
		this.addListeners = rbElms => { // :void
			manageEvents(rbElms);
		}
		this.addListenersFind = ($elmContainer, rbElmName) => { // :void
			const rbElms = $elmContainer.querySelectorAll(rbElmName);
			manageEvents(rbElms);
		}
}]);
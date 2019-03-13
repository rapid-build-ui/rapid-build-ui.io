/*******************
 * RB EVENT SERVICE
 *******************/
angular.module('rapid-build').service('rbEventService', ['$parse', 'typeService',
	function($parse, type) {
		/* Private
		 **********/
		const camelize = txt => { // :string | any
			if (!txt) return txt;
			return txt
				.replace(/[\s|_|-](.)/g, $1 => $1.toUpperCase())
				.replace(/[\s|_|-]/g, '')
				.replace(/^(.)/, $1 => $1.toLowerCase());
		}
		const getRbAttrFromEvent = evt => { // :string | any
			const attr = evt.type;
			if (!attr) return attr;
			return attr.split('-').slice(0,-1).join('-');
		}
		const getScopeProp = function(rbAttr) { // :string | any (this is rb elm)
			if (!rbAttr) return rbAttr;
			return camelize(this.getAttribute(rbAttr));
		}
		const setRbElmAttr = function(attr, val) { // :void (this is rb elm)
			if (val === void 0)
				return this.removeAttribute(attr);
			if (type.is.object(val) || type.is.array(val))
				val = JSON.stringify(val);
			this.setAttribute(attr, val);
		}
		const createBinding = function(ngElm, scope, evt) { // :void (runs once) (this is rb elm)
			const rbAttr    = getRbAttrFromEvent(evt);           // ex: icon-kind-changed -> icon-kind
			const scopeProp = getScopeProp.bind(this, rbAttr)(); // ex: a.icon-kind -> a.iconKind
			if (!scopeProp) return;
			ngElm.data('rbBindTo', scopeProp) // stores the scope prop name (ex: a.iconKind)
			const scopeVal = $parse(scopeProp)(scope); // ex: a.iconKind -> heart
			setRbElmAttr.bind(this, rbAttr, scopeVal)();

			const scopePropWatch = scope.$watch(scopeProp, (newVal, oldVal) => {
				if (newVal === oldVal) return;
				setRbElmAttr.bind(this, rbAttr, newVal)(); // updates rb component
			});
			ngElm.on('$destroy', () => {
				scopePropWatch();
			});
		}
		const eventHandler = function(evt) { // :void (this is rb elm)
			const ngElm    = angular.element(this);
			const scope    = ngElm.data('scope');
			const rbBindTo = ngElm.data('rbBindTo');
			if (!rbBindTo) return createBinding.bind(this, ngElm, scope, evt)();
			$parse(rbBindTo).assign(scope, evt.detail.value);
			scope.$apply(); // updates scope prop which in turn fires scopePropWatch
		}
		const manageEvents = (rbElms, rbEvtName) => { // :void
			for (const rbElm of rbElms) {
				rbElm.addEventListener(rbEvtName, eventHandler);
				angular.element(rbElm).on('$destroy', function() {
					this.removeEventListener(rbEvtName, eventHandler); // this is rb elm
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
angular.module('rapid-build').directive('rbaRadio', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('.caption').remove();
		if (typeof tAttrs.subCaption === 'undefined')
			tElement[0].querySelector('.sub-caption').remove();
		if (typeof tAttrs.radios !== 'undefined')
			tElement[0].querySelector('input[for="radio"]').remove();
		else
			tElement[0].querySelector('input[for="radios"]').remove();
		return Link;
	}

	/* LINK (only for rb-radio)
	 ***************************/
	var Link = (scope, iElement, iAttrs) => {
		if (typeof iAttrs.radios !== 'undefined') return;
		scope.name = scope.name || iAttrs.model;
		var toggle = iAttrs.toggle !== undefined; // togglable
		if (iAttrs.value === undefined) scope.value = true; // default value

		/* Methods
		 **********/
		scope.select = (item) => {
			if (!toggle) return scope.model = item;
			scope.model = scope.model === item ? undefined : item;
		}
	}

	/* API
	 ******/
	return {
		compile: Compile,
		restrict: 'E',
		templateUrl: '/views/directives/controls/radio.html',
		scope: {
			model:      '=',  // :any (radio only)
			checked:    '=',  // :boolean (radios only)
			name:       '@?', // :string | *attrs.model (radio only)
			caption:    '@?', // :string
			subCaption: '@?', // :string
			click:      '&?', // :function
			value:      '=?', // :any | *true (radio only)
			/* VALUELESS
			 ************/
			inline:   '@?',
			toggle:   '@?', // (radio only)
			vertical: '@?'
		}
	};
}]);
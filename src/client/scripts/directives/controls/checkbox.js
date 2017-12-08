angular.module('rapid-build').directive('rbaCheckbox', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		var input = tElement[0].querySelector('input');
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('.caption').remove();
		if (typeof tAttrs.subCaption === 'undefined')
			tElement[0].querySelector('.sub-caption').remove();
		if (typeof tAttrs.checkboxes !== 'undefined')
			tElement[0].querySelector('input[for="checkbox"]').remove();
		else
			tElement[0].querySelector('input[for="checkboxes"]').remove();
		return Link;
	}

	/* LINK (only for rb-checkbox)
	 ******************************/
	var Link = (scope, iElement, iAttrs) => {
		if (typeof iAttrs.checkboxes !== 'undefined') return;
		scope.name = scope.name || iAttrs.model;

		/* Methods
		 **********/
		scope.getTrueValue = (val) => {
			if (val === undefined) return true;
			if (val.hasOwnProperty('true')) return val.true;
			if (!val.hasOwnProperty('false')) return val;
			return true; // case where value only specified { false }
		}

		scope.getFalseValue = (val) => {
			if (val === undefined) return false;
			return val.hasOwnProperty('false') ? val.false : false;
		}

		scope.select = (value) => {
			var trueValue = scope.getTrueValue(value);
			if (scope.model === trueValue)
				scope.model = scope.getFalseValue(value);
			else
				scope.model = trueValue;
		}
	}

	/* API
	 ******/
	return {
		compile: Compile,
		restrict: 'E',
		templateUrl: '/views/directives/controls/checkbox.html',
		scope: {
			model:      '=',  // :any (checkbox only)
			checked:    '=',  // :boolean (checkboxes only)
			name:       '@?', // :string | *attrs.model (checkbox only)
			caption:    '@?', // :string
			subCaption: '@?', // :string
			click:      '&?', // :function
			value:      '=?', // :any | *true (checkbox only)
			/* VALUELESS
			 ************/
			inline:   '@?',
			vertical: '@?'
		}
	};
}]);
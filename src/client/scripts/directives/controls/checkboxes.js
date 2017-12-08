angular.module('rapid-build').directive('rbaCheckboxes', [() => {
	/* COMPILE
	 **********/
	var Compile = function(tElement, tAttrs, transclude) {
		if (typeof tAttrs.caption === 'undefined')
			tElement[0].querySelector('.caption').remove();
		return Link;
	}

	/* LINK
	 *******/
	var Link = (scope, iElement, iAttrs) => {
		scope.name = scope.name || iAttrs.model;
		if (!Array.isArray(scope.model)) scope.model = []; // if model value isn't defined

		/* Methods
		 **********/
		scope.select = (item, dataIndex) => {
			var modelIndex = scope.model.indexOf(item),
				hasModel   = modelIndex !== -1;
			if (hasModel)
				scope.model.splice(modelIndex, 1);
			else
				scope.model.splice(dataIndex, 0, item);
		}
	}

	/* API
	 ******/
	return {
		compile: Compile,
		restrict: 'E',
		templateUrl: '/views/directives/controls/checkboxes.html',
		scope: {
			model:    '=',  // :any
			data:     '=',  // :[any]
			name:     '@?', // :string | *attrs.model
			caption:  '@?', // :string
			/* VALUELESS
			 ************/
			inline:   '@?',
			stacked:  '@?',
			vertical: '@?'
		}
	};
}]);
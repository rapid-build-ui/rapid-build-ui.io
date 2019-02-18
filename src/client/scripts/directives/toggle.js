/*******************
 * TOGGLE DIRECTIVE
 *******************/
angular.module('rapid-build').directive('rbaToggle', [() => {
	/* COMPILE
	 **********/
	const Compile = function(tElement, tAttrs, transclude) {
		if (tAttrs.template === undefined)
			tElement[0].querySelector('ng-include').remove();

		if (tAttrs.templateFromAction === undefined)
			tElement[0].querySelector('[data-html-template]').remove();

		if (tAttrs.template !== undefined ||
			tAttrs.templateFromAction !== undefined)
			tElement[0].querySelector('ng-transclude').remove();

		if (tAttrs.textCurve === undefined)
			tElement[0].querySelector('.trigger').removeAttribute('rba-text-curve');

		return Link;
	}

	/* LINK
	 *******/
	const Link = (scope, iElement, iAttrs) => {
		/* Valueless Opts
		 *****************/
		const templateFromAction = typeof iAttrs.templateFromAction === 'string';

		/* Scope Default Opts
		 *********************/
		if (typeof iAttrs.cache !== 'string') scope.cache = true;

		/* Private Vars
		 ***************/
		let cached        = false; // technique to call action once
		let actionRunning = false; // technique to prevent multiple action calls from multiple clicks

		/* Private Funcs
		 ****************/
		const init = async () => { // :void
			if (!scope.show) return scope.initted = true;
			await scope.toggleAction(true);
			scope.initted = true;
			scope.$apply();
		}
		const setShow = () => { // :void
			scope.show = !scope.show;
		}
		const runAction = async () => { // :void
			if (scope.cache && cached) return;
			if (templateFromAction) scope.template = await scope.action();
			else await scope.action();
			if (scope.cache) cached = true;
		}

		/* Scope Methods
		 ****************/
		scope.toggleAction = async (init = false) => { // :void
			if (init && !scope.action) return; // because show is true
			if (!init && (!scope.action || scope.show)) return setShow(); // prevent calling action on close
			if (actionRunning) return;
			actionRunning = true;
			await runAction();
			actionRunning = false;
			if (!init) setShow(); // because show is true
			scope.$apply();
		};

		/* Init
		 *******/
		init();
	}

	/* API
	 ******/
	return {
		compile: Compile,
		restrict: 'E',
		transclude: true,
		templateUrl: '/views/directives/toggle.html',
		scope: {
			action:        '&?',
			cache:         '=?',
			caption:       '@?',
			data:          '=?',
			popover:       '@?',
			show:          '=?',
			template:      '@?', // path to template
			templateClass: '@?'  // css class(s)
			/* VALUELESS
			 ************/
			// text-curve: '=?'
			// templateFromAction: '=?' // action() :template<string>
		}
	};
}]);

/*********************
 * CSS VARS DIRECTIVE
 *********************/
angular.module('rapid-build').directive('rbaCssVars', ['cssVarsService', 'typeService',
	(cssVarsService, Type) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			const toggle = iElement[0].querySelector('rb-toggle');
			const search = iElement[0].querySelector('[data-search]');

			/* Scope Props
			 **************/
			switch(scope.theme) {
				case 'light':
					scope.caption = 'CSS LIGHT VARIABLES';
					scope.popover = 'Light theme variables. Light is the default theme.';
					break;
				case 'dark':
					scope.caption = 'CSS DARK VARIABLES';
					scope.popover = 'Dark theme variables.';
					break;
				case 'common':
					scope.caption = 'CSS COMMON VARIABLES';
					scope.popover = 'Common variables for light and dark themes.';
					break;
				default: // components without themes
					scope.caption = 'CSS VARIABLES';
			}

			/* RB TOGGLE EVENTS
			 *******************/
			const ontoggle = evt =>
				search.toggleAttribute('hidden');

			toggle.addEventListener('toggled', ontoggle);

			toggle.onclick = () =>
				cssVarsService.get(scope.component, scope.theme).then(cssVarObj => {
					const cssVars = [];
					for (const [name, value] of Object.entries(cssVarObj))
						cssVars.push({name, value});
					scope.cssVars = cssVars;
				}).catch(error => {
					scope.error = error.data.message;
				});

			/* Init
			 *******/
			toggle.open = !Type.is.undefined(iAttrs.open);

			/* Destroy
			 **********/
			const destroy = scope.$on('$destroy', () => {
				toggle.removeEventListener('toggled', ontoggle);
				destroy();
			});
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/css-vars.html',
			scope: {
				component: '@',
				theme: '@?'
				/* VALUELESS
				 ************/
				// open: '@?'
			}
		};
	}
]);

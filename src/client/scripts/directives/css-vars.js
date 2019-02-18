/*********************
 * CSS VARS DIRECTIVE
 *********************/
angular.module('rapid-build').directive('rbaCssVars', ['cssVarsService',
	(cssVarsService) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
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

			/* Methods
			 **********/
			scope.getCssVars = (component, theme) => { // :void
				return cssVarsService.get(component, theme).then(cssVars => {
					scope.cssVars = cssVars;
				});
			};
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
			}
		};
	}
]);

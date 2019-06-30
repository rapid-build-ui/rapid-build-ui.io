/**********************************************
 * POPOVER VALUE DIRECTIVE
 * For displaying the value of a rb-component.
 * TODO:
 * - make awaiter opts a scope option
 * - allow multiple rb-components
 * - currently limited to one builder
 * - fix setting rb-component value to null
 **********************************************/
angular.module('rapid-build').directive('rbaPopoverValue', ['AwaitSelector',
	(AwaitSelector) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			/* Prep Work
			 ************/
			const selector = scope.selector || '[id^="built"]';
			const builder  = document.querySelector('[rba-builder]');
			if (!builder) return;

			/* Event Handlers (rb-component is this)
			 ****************/
			const Events = {
				valueChanged(evt) { // :void
					// console.log('VALUE CHANGED:', evt.detail.value);
					scope.value = evt.detail.value;
					scope.$applyAsync();
				},
				elmDestroyed(evt) { // :void
					// console.log('DESTROYED:', this);
					this.removeEventListener('value-changed', Events.valueChanged);
				}
			}

			/* Awaiter
			 **********/
			const awaiterOpts = {
				root: builder.parentElement
			};

			const Awaiter = AwaitSelector(`${selector}`, (err, elms) => { // :void
				const component = elms[0];
				scope.$applyAsync(() => {
					scope.value = component.value;
					component.addEventListener('value-changed', Events.valueChanged);
					angular.element(component).on('$destroy', Events.elmDestroyed);
				});
			}, awaiterOpts);

			/* Destroy
			 **********/
			const destroy = scope.$on('$destroy', () => {
				Awaiter.destroy();
				destroy();
			});
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			replace: true,
			templateUrl: '/views/directives/popover-value.html',
			scope: {
				selector: '@?'
			}
		};
	}
]);

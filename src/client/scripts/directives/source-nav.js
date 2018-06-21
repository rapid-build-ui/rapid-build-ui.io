angular.module('rapid-build').directive('rbaSourceNav', ['componentService', '$timeout',
	(componentService, $timeout) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			// required to copy popover content
			// tElement.append('<div style="height:0;"><br></div>');
			return Link;
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			const source = componentService.getConstant(scope.src, 'rb', 'nav');
			const copiedMsg = {
				_timer: null,
				_isShowing() {
					if (!this._timer) return true;
					$timeout.cancel(this._timer);
					this._timer = null;
					return false;
				},
				hide(trigger, delay) {
					if (!this._isShowing()) return;
					this._timer = $timeout(() => {
						trigger.click();
						this._timer = null;
					}, delay);
				}
			}

			/* Props
			 ********/
			scope.source = source;

			/* Methods
			 **********/
			scope.copied = e => {
				copiedMsg.hide(e.trigger, 2000);
			};
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'E',
			templateUrl: '/views/directives/source-nav.html',
			scope: {
				src: '@source'
			}
		};
	}
]);

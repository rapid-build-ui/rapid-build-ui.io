angular.module('rapid-build').directive('rbaSourceNav', ['componentService', '$timeout',
	(componentService, $timeout) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
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
						trigger._hidden = true;
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
				copiedMsg.hide(e.trigger, 1500);
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

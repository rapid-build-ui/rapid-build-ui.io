angular.module('rapid-build').directive('rbaCopy', ['$timeout', $timeout => {
	/* COMPILE
	 **********/
	const Compile = function(tElement, tAttrs, transclude) {
		return Link;
	}

	/* LINK
	 *******/
	const Link = (scope, iElement, iAttrs) => {
		const popover = iElement[0].querySelector('rb-popover rb-popover');

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
					trigger.open = false;
					this._timer = null;
				}, delay);
			}
		}

		/* Methods
		 **********/
		scope.copied = e => {
			copiedMsg.hide(e.trigger, 1500);
			e.clearSelection();
		};
	}

	/* API
	 ******/
	return {
		compile: Compile,
		transclude: true,
		restrict: 'E',
		templateUrl: '/views/directives/copy.html',
		scope: {
			iconSize: '@?'
		}
	};
}]);

angular.module('rapid-build').directive('rbaCopy', ['$timeout', $timeout => {
	/* COMPILE
	 **********/
	const Compile = function(tElement, tAttrs, transclude) {
		return Link;
	}

	/* LINK
	 *******/
	const Link = (scope, iElement, iAttrs) => {
		const copyTrigger = iElement[0].querySelector('[data-copy-trigger]');
		const copyTarget  = iElement[0].querySelector('[data-copy-target]');

		const copiedMsg = {
			_timer: null,
			_trimmed: false,
			_copy() {
				const selection = window.getSelection();
				const range     = document.createRange();
				copiedMsg._trimTarget(); // TODO: find better solution
				range.selectNodeContents(copyTarget);
				selection.removeAllRanges();
				selection.addRange(range);
				document.execCommand('copy');
				selection.removeAllRanges();
			},
			_trimTarget() {
				if (copiedMsg._trimmed) return;
				copyTarget.textContent = copyTarget.textContent.trim();
				copiedMsg._trimmed = true;
			},
			_isShowing() {
				if (!copiedMsg._timer) return true;
				$timeout.cancel(copiedMsg._timer);
				copiedMsg._timer = null;
				return false;
			},
			hide(evt) {
				if (!copiedMsg._isShowing()) return;
				copiedMsg._copy();
				copiedMsg._timer = $timeout(() => {
					copyTrigger.open = false;
					copiedMsg._timer = null;
				}, 1500);
			}
		}

		/* Attach Event
		 ***************/
		copyTrigger.onclick = copiedMsg.hide;
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

/*****************
 * CODE DIRECTIVE
 *****************/
angular.module('rapid-build').directive('rbaEditor', ['$timeout', 'preService', 'Editor',
	($timeout, preService, Editor) => {
	/* COMPILE
	 **********/
	const Compile = function(tElement, tAttrs) {
		if (tAttrs.actions === undefined)
			tElement[0].querySelector('.actions').remove();

		return { pre: Link } // must be pre for editor
	};

	/* LINK
	 *******/
	const Link = (scope, iElement, iAttrs, controller, transclude) => {
		const readonly = !!scope.readonly;
		const textarea = iElement[0].querySelector('textarea');
		const popover  = iElement[0].querySelector('rb-popover');
		const editor   = new Editor(scope);

		/* Helpers
		 **********/
		const formatTransclude = transclude => { // :void
			transclude(clone => {
				const textContent = preService.get.text(clone[0].textContent);
				if (!textContent.length) return; // no transclude
				scope.model = textContent;
				modelWatch();
			});
		}

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
					this._timer         = null;
					trigger.showPopover = false;
				}, delay);
			},
			updateTextarea(evt) {
				editor.code.save(); // needed with model option
			},
			addEvents() {
				if (!popover) return;
				popover.addEventListener('click', this.updateTextarea, true);
			},
			removeEvents() {
				if (!popover) return;
				popover.removeEventListener('click', this.updateTextarea, true);
			}
		};

		/* Actions
		 **********/
		scope.clear = () => { // :void (TODO)
			if (iAttrs.actions !== 'clear') return;
			scope.model = '';
		};
		scope.copied = evt => { // :void
			if (iAttrs.actions !== 'copy') return;
			copiedMsg.hide(evt.trigger, 1500);
			evt.clearSelection()
		};

		/* Watches
		 **********/
		const modelWatch = scope.$watch('model', (newVal, oldVal) => {
			scope.model = preService.get.text(newVal); // format model
			modelWatch(); // only watch once
		});

		/* Init
		 *******/
		scope.editorOpts = editor.opts;
		copiedMsg.addEvents();
		formatTransclude(transclude);

		/* Destroy
		 **********/
		const destroy = scope.$on('$destroy', () => {
			editor.destroy();
			copiedMsg.removeEvents();
			if (modelWatch) modelWatch();
			destroy();
		});

	}

	/* API
	 ******/
	return {
		compile: Compile,
		replace: true,
		transclude: true,
		restrict: 'A',
		templateUrl: '/views/directives/editor.html',
		scope: {
			model:        '=?', // !!model.attr ? ng-model : ng-transclude
			show:         '=?',
			actions:      '@?', // currently only copy
			caption:      '@?',
			height:       '@?', // teeny | tiny | mini | short | avg | tall | xtall
			placeholder:  '@?',
			mode:         '@?', // *html | bash | css | js | json | sass
			theme:        '@?', // currently only one-dark
			/* VALUELESS
			 ************/
			lineNumbers: '@?', // *false
			lineNowrap:  '@?', // *false
			readonly:    '@?', // *false
			scroll:      '@?'  // *false
		}
	};
}]);
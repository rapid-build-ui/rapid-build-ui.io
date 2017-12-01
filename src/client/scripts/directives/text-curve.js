angular.module('rapid-build').directive('rbTextCurve', ['$window',
	($window) => {
		var win = angular.element($window);

		/* LINK
		 *******/
		var Link = (scope, iElement, iAttrs) => {
			/* Init
			 *******/
			iElement.addClass('rb-text-curve');

			/* Elements
			 ***********/
			var Elms = {
				container: iElement[0]
			};
			Elms.content  = Elms.container.querySelector('b.content');
			Elms.caption  = Elms.container.querySelector('b.caption'); // caption elm has curve (see text-curve.scss)
			Elms.iContent = angular.element(Elms.content);

			/* Helpers
			 **********/
			var Help = {
				setCaptionWidth: () => {
					var wContainer = Elms.container.offsetWidth,
						wContent   = Elms.content.offsetWidth,
						wCaption   = (wContainer - wContent) - 32; // curve is 31w (set in text-curve.scss)
					Elms.caption.style.width = `${wCaption}px`;
				},
				transcludeChange: () => {
					return Elms.content.offsetWidth;
				}
			};

			/* Events
			 *********/
			win.on('resize', Help.setCaptionWidth);

			/* Watches
			 **********/
			var Watches = {};

			Watches.optionsWatch = scope.$watchCollection('rbTextCurve', (newVal, oldVal) => {
				if (!!newVal && newVal.display) {
					iElement.toggleClass('display-inline', newVal.display == 'inline');
					if (newVal.display != 'inline') Help.setCaptionWidth();
				}
			});

			scope.$$postDigest(() => { // ensures transclude content has been interpolated
				Watches.transcludeWatch = scope.$watch(Help.transcludeChange, (newVal, oldVal) => {
					Help.setCaptionWidth();
				});
				Help.setCaptionWidth();
			});

			/* Destroy
			 **********/
			var destroy = scope.$on('$destroy', () => {
				if (typeof Watches.optionsWatch    === 'function') Watches.optionsWatch();
				if (typeof Watches.transcludeWatch === 'function') Watches.transcludeWatch();
				if (typeof Help.setCaptionWidth    === 'function') win.off('resize', Help.setCaptionWidth);
				return destroy();
			});
		}

		/* COMPILE
		 **********/
		var Compile = function(tElement, tAttrs, transclude) {
			if (!!tAttrs.rbTextCurve) return Link; // has options
			tElement[0].querySelector('b.caption').removeAttribute('rb-compile');
			return Link;
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'A',
			templateUrl: '/views/directives/text-curve.html',
			transclude: true,
			scope: {
				rbTextCurve: '=?'
				/* OPTIONS (via attribute object):
				 * caption: '@' // right side text
				 * display: '@' // *block | inline
				 * kind:    '@' // *standard | critical | info | success | warning
				 * spacing: '@' // *standard | small
				 ******************************************************************/
			}
		};
	}
]);

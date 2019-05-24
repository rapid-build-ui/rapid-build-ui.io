angular.module('rapid-build').controller('rbCodeController', ['$scope', '$element', 'preService', 'typeService',
	function($scope, $element, preService, type) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = content = component = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)              attrs += `${nt}dark`; // TODO
			if ($scope.a.readonly)          attrs += `${nt}readonly`;
			if ($scope.a.kind)              attrs += `${nt}kind="${$scope.a.kind}"`;
			if ($scope.a.mode)              attrs += `${nt}mode="${$scope.a.mode}"`;
			if ($scope.a.theme)             attrs += `${nt}theme="${$scope.a.theme}"`;
			if ($scope.a.height !== 'tall') attrs += `${nt}height="${$scope.a.height}"`;
			if (!$scope.a.scrollable)       attrs += `${nt}scrollable="${$scope.a.scrollable}"`;
			if ($scope.a.caption)           attrs += `${nt}caption="${$scope.a.caption}"`;

			content += get.content.content();
			component = `<rb-code${attrs}>${content}${n}</rb-code>`;

			return component;
		}

		/* Builder Helpers
		 ******************/
		const get = {
			attr: {},
			content: {
				content() { // :string
					let { content } = $scope.a;
					if (type.is.string(content)) content = content.trim();
					if (!content) return '';
					return preService.get.text(content).replace(/^|\n/g,'\n\t');
				}
			}
		}

		/* Global RB Code Options
		 *************************/
		const RB_CODE_OPTS = window.showcase.code;

		/* Props
		 ********/
		// $scope.kinds   = ['danger','info','neutral','success','warning']
		$scope.modes   = RB_CODE_OPTS.modes;
		$scope.themes  = RB_CODE_OPTS.themes;
		$scope.heights = RB_CODE_OPTS.heights;

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				// content: 'rb-code',
				content: '<div>rb-code</div>',
				height: 'tall',
				mode: 'html',
				scrollable: true
			};
		};

		/* Watches
		 **********/
		const markupWatch = $scope.$watch('a', (newVal, oldVal) => {
			$scope.markup = createMarkup();
		}, true);

		/* Event Handlers
		 *****************/
		const resetFrm = () => $scope.$apply($scope.reset);
		const resetBtn = $element[0].querySelector('[data-reset]');
		resetBtn.onclick = resetFrm;

		/* Testing
		 **********/
		// ...

		/* Init
		 *******/
		$scope.reset();

		/* Destroy
		 **********/
		$scope.$on('$destroy', () => {
			markupWatch();
		});
	}
]);

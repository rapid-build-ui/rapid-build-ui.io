angular.module('rapid-build').controller('rbTextcurveController', ['$scope', '$element', 'preService', 'typeService',
	function($scope, $element, preService, type) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = content = component = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)     attrs += `${nt}dark`; // TODO
			// if ($scope.a.inline)   attrs += `${nt}inline`;
			if ($scope.a.kind)     attrs += `${nt}kind="${$scope.a.kind}"`;

			content += get.content.content();
			content += get.content.subtext();
			component = `<rb-textcurve${attrs}>${content}${n}</rb-textcurve>`;

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
				},
				subtext() { // :slot<string>
					let { subtext } = $scope.a;
					if (type.is.string(subtext)) subtext = subtext.trim();
					if (!subtext) return '';
					let slot = `
						<span slot="subtext">
							${subtext}
						</span>`
					return preService.get.text(slot).replace(/^|\n/g,'\n\t');
				}
			}
		}

		/* Props
		 ********/
		$scope.kinds = ['danger','info','neutral','primary','success','warning']

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				content: 'elegant',
				subtext: ''
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

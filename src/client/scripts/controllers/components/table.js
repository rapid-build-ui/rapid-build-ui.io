angular.module('rapid-build').controller('rbTableController', ['$scope', '$element', 'preService', 'typeService',
	function($scope, $element, preService, type) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = content = component = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark) attrs += `${nt}dark`; // TODO
			if ($scope.a.kind) attrs += `${nt}kind="${$scope.a.kind}"`;

			content += get.content.content();
			component = `<rb-table${attrs}>${content}${n}</rb-table>`;

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

		/* Props
		 ********/
		$scope.kinds = ['danger','info','neutral','success','warning']

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				content: 'rb-table'
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

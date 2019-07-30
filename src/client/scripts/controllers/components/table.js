angular.module('rapid-build').controller('rbTableController', ['$scope', '$element', 'preService', 'typeService',
	async function($scope, $element, preService, type) {
		/* Builder
		 **********/
		const createMarkup = () => {
			let attrs = content = component = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark) attrs += `${nt}dark`; // TODO
			if ($scope.a.kind) attrs += `${nt}kind="${$scope.a.kind}"`;
			attrs += `${nt}data='${buldDataMarkup()}'`;


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

		const buldDataMarkup = () => {
			const data = [
					{id: 1, name: 'Thor', age: 18, description: 'Lorem ipsum dolor sit amet, eu vix nominavi luptatum intellegat. At est voluptua invenire facilisis, '},
					{id: 2, name: 'Batman', age: 24, description: 'Lorem ipsum dolor sit amet, eu vix nominavi luptatum intellegat. At est voluptua invenire facilisis, '},
					{id: 3, name: 'Superman', age: 19, description: 'Lorem ipsum dolor sit amet, eu vix nominavi luptatum intellegat. At est voluptua invenire facilisis, '}
				];
			// return JSON.stringify(data, null, '\t');
			return JSON.stringify(data);
		};

		/* Props
		 ********/
		$scope.kinds = ['danger','info','neutral','success','warning']

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				content:
`<column key="id" caption="Id" width="50px"></column>
<column key="name" caption="Name" sort width="2fr"></column>
<column key="age" caption="Age" sort></column>
<column key="description" caption="description" width="40%"></column>`
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

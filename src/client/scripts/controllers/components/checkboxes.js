angular.module('rapid-build').controller('rbCheckboxesController', ['$scope', '$element', 'typeService',
	($scope, $element, type) => {
		/* Builder
		 **********/
		const createMarkup = () => { // :string
			let attrs = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';
			// const { is } = type;
			const { data } = $scope;
			const { disabled, horizontal, inline, label, right, subtext, validation, value } = $scope.a;

			if (disabled)   attrs += `${s}disabled`;
			if (horizontal) attrs += `${s}horizontal`;
			if (inline)     attrs += `${s}inline`;
			if (right)      attrs += `${s}right`;
			if (label)      attrs += `${s}label="${label}"`;
			if (subtext)    attrs += `${s}subtext="${subtext}"`;
			if (value)      attrs += `${s}value='${JSON.stringify(value)}'`;
			if (data)       attrs += `${s}data='${JSON.stringify(data)}'`;
			if (validation && validation.length) attrs += `${s}value='${JSON.stringify(validation)}'`;

			return `<rb-checkboxes${attrs}></rb-checkboxes>`;
		};

		/* Public Props
		 ***************/
		$scope.data = ['hulk', 'storm', 'thor'];
		$scope.dataLabels = [
			'array of strings',
			'array of objects'
		]
		$scope.validationLabels = ['required'];

		/* Public Methods
		 *****************/
		$scope.reset = () => {
			$scope.a = {
				label: 'Superheroes',
				value: ['hulk', 'storm'],
				data: 'array of strings'
			};
		};

		/* Watches
		 **********/
		const markupWatch = $scope.$watch('a', (newVal, oldVal) => {
			$scope.markup = createMarkup();
		}, true);

		/* Event Handlers
		 *****************/
		const resetFrm = () => {
			$scope.$apply($scope.reset);
		};
		const resetBtn = $element[0].querySelector('[data-reset]');
		resetBtn.addEventListener('clicked', resetFrm);

		/* Init
		 *******/
		$scope.reset();

		/* Destroy
		 **********/
		$scope.$on('$destroy', () => {
			resetBtn.removeEventListener('clicked', resetFrm);
			markupWatch();
		});

}]);
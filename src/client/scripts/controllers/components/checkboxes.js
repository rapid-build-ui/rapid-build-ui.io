angular.module('rapid-build').controller('rbCheckboxesController', ['$scope', '$element', 'typeService',
	($scope, $element, type) => {
		/* Builder
		 **********/
		const createMarkup = () => { // :string
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)       attrs += `${nt}dark`; // TODO
			if ($scope.a.right)      attrs += `${nt}right`;
			if ($scope.a.inline)     attrs += `${nt}inline`;
			if ($scope.a.disabled)   attrs += `${nt}disabled`;
			if ($scope.a.horizontal) attrs += `${nt}horizontal`;
			if ($scope.a.label)      attrs += `${nt}label="${$scope.a.label}"`;
			if ($scope.a.subtext)    attrs += `${nt}subtext="${$scope.a.subtext}"`;
			if ($scope.a.labelKey)   attrs += `${nt}label-key="${$scope.a.labelKey}"`;
			if ($scope.a.value)      attrs += `${nt}value='${getValue($scope.a.value)}'`;
			if ($scope.a.data)       attrs += `${nt}data='${buldDataMarkup()}'`;
			if ($scope.a.validation && $scope.a.validation.length) attrs += `${nt}validation='${buldValidationMarkup()}'`;
			if ($scope.a.popover) content += getPopoverSlot();
			if (!content) content = n;

			return `<rb-checkboxes${attrs}>${content}</rb-checkboxes>`;
		};

		/* Helpers
		 **********/
		const getPopoverSlot = () => {
			return '\n\t<rb-popover\n\t\tslot="popover">\n\t\tmore info...\n\t</rb-popover>\n';
		}

		const getValue = val => { // TODO: fix!
			try {
				val = val
					.replace(/"\[/g, '[')
					.replace(/\\n/g, '\n')
					.replace(/\\'/g, `"`)
					.replace(/'/g, `"`)
					.replace(/\\"/g, `"`)
					.replace(/\]"/g, ']');
				val = JSON.parse(val);
				val = JSON.stringify(val, stringifyModifier, '\t');
			} catch(err) {
				val = JSON.stringify([]);
			}
			return val;
		}

		const stringifyModifier = (key, val) => {
			val = angular.copy(val);
			if (!type.is.function(val)) { return val; }
			val = val.toString().replace(/\t/g, '  ');
			return val;
		}

		const buldValidationMarkup = () => {
			const validators = [];

			for (validator of $scope.a.validation)
				validators.push(validations[validator]);

			return JSON.stringify(validators, stringifyModifier, '\t')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/"function\s*\((.*)\)/g, 'function($1)')
				.replace(/\}"/g, '}');
		};

		const buldDataMarkup = () => {
			let _data = [];
			switch ($scope.a.data) {
				case 'array of strings':
					_data = $scope.data[0];
					break;
				case 'array of objects':
					_data = $scope.data[1];
					break;
			}
			return JSON.stringify(_data, stringifyModifier, '\t')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/"function\s*\((.*)\)/g, 'function($1)')
				.replace(/\}"/g, '}');
		};

		/* Validations
		 **************/
		const validations = {
			required:     'required',
			// minLength:    { minLength: 2 },
			// minMaxLength: { minMaxLength: { min: 2, max: 5 } },
			// custom:       customValidation
		};

		/* Props
		 ********/
		$scope.labelKeys = ['id', 'name'];
		$scope.validationLabels = Object.keys(validations);
		$scope.data = [
			['batman', 'superman', 'wolverine'],
			[
				{id: 1, name: 'batman'},
				{id: 2, name: 'superman'},
				{id: 3, name: 'wolverine'}
			]
		]
		$scope.dataLabels = [
			'array of strings',
			'array of objects'
		]

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				label: 'Superheroes',
				data: 'array of strings'
			};
			// TODO: fix getValue() then we won't have to do this.
			// demo checkboxes: needed to update popover value
			const checkboxes = $element[0].querySelector('[id^="built"]');
			if (!checkboxes) return;
			checkboxes.value = [];
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

		/* Init
		 *******/
		$scope.reset();

		/* Destroy
		 **********/
		$scope.$on('$destroy', () => {
			markupWatch();
		});

}]);
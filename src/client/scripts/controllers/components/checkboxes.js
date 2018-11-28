angular.module('rapid-build').controller('rbCheckboxesController', ['$scope', '$element', 'typeService',
	($scope, $element, type) => {
		/* Builder
		 **********/
		const createMarkup = () => { // :string
			let attrs = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';
			// const { is } = type;
			const { data } = $scope;
			const { disabled, horizontal, inline, label, labelKey, right, subtext, validation, value } = $scope.a;

			// attrs += `${s}rb-bind`;
			if (disabled)   attrs += `${s}disabled`;
			if (horizontal) attrs += `${s}horizontal`;
			if (inline)     attrs += `${s}inline`;
			if (right)      attrs += `${s}right`;
			if (label)      attrs += `${s}label="${label}"`;
			if (subtext)    attrs += `${s}subtext="${subtext}"`;
			if (value)      attrs += `${s}value='${JSON.stringify(value)}'`;
			if (data)       attrs += `${n}data='${buldDataMarkup()}'`;
			if (validation && validation.length) attrs += `${n}validation='${buldValidationMarkup()}'`;
			if (labelKey)   attrs += `${n}label-key="${labelKey}"`;

			return `<rb-checkboxes${attrs}></rb-checkboxes>`;
		};

		/* Public Props
		 ***************/
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
		$scope.labelKeys = ['name', 'id'];
		$scope.validationLabels = ['required'];
		$scope.validations = [
			'required'
		]

		/* Public Methods
		 *****************/
		$scope.reset = () => {
			$scope.a = {
				label: 'Superheroes',
				value: ['batman', 'superman'],
				data: 'array of strings',
				// validation: $scope.validations
			};
		};

		/* Methods
		 *********/
		const stringifyModifier = function(key, val) {
			val = angular.copy(val);
			if (!type.is.function(val)) { return val; }
			return val.toString();
		};

		const buldValidationMarkup = function() {
			const validators = [];
			for (let i = 0; i < $scope.a.validation.length; i++) {
				const validator = $scope.a.validation[i];
				switch (validator) {
					case 'required':
						validators.push($scope.validations[0]);
						break;
					case 'minLength':
						validators.push($scope.validations[1]);
						break;
					case 'minMaxLength':
						validators.push($scope.validations[2]);
						break;
					case 'custom':
						validators.push($scope.validations[3]);
						break;
				}
			}

			return JSON.stringify(validators, stringifyModifier, '\t')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/"function\s*\((.*)\)/g, 'function($1)')
				.replace(/\}"/g, '}');
		};

		const buldDataMarkup = function() {
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
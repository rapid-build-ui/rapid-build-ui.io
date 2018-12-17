angular.module('rapid-build').controller('rbTextareaController', ['$scope', '$element', 'typeService',
	($scope, $element, type) => {
		/* Builder
		 **********/
		const createMarkup = () => { // :string
			let attrs = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';
			const { data } = $scope;
			const { autoHeight, disabled, horizontal, inline, label, labelKey, placeholder, right, subtext, validation, value } = $scope.a;

			// attrs += `${s}rb-bind`;
			if (right)       attrs += `${nt}right`;
			if (inline)      attrs += `${nt}inline`;
			if (disabled)    attrs += `${nt}disabled`;
			if (autoHeight)  attrs += `${nt}auto-height`;
			if (label)       attrs += `${nt}label="${label}"`;
			if (placeholder) attrs += `${nt}placeholder="${placeholder}"`;
			if (subtext)     attrs += `${nt}subtext="${subtext}"`;
			if (value)       attrs += `${nt}value='${value}'`;
			if (validation && validation.length) attrs += `${nt}validation='${buldValidationMarkup()}'`;

			return `<rb-textarea${attrs}>${n}</rb-textarea>`;
		};

		/* Public Methods
		 *****************/
		$scope.reset = () => {
			$scope.a = {
				label: 'Message',
				validation: []
			};
		};

		/* Methods
		 *********/

		const customValidation = function(val) {
			return {
				valid: val === "rapid",
				message: "must be rapid"
			};
		}

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


		/* Props
		 *******/
		$scope.validationLabels = [
			'required',
			'minLength',
			'minMaxLength',
			'custom'
		];


		$scope.validations = [
			'required',
			{minLength: 2},
			{ minMaxLength: {min: 2, max: 5}},
			customValidation
		];

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
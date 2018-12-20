angular.module('rapid-build').controller('rbTextareaController', ['$scope', '$element', 'typeService',
	($scope, $element, type) => {
		/* Builder
		 **********/
		const createMarkup = () => { // :string
			let attrs = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';
			let { value } = $scope.a;
			const { autoHeight, disabled, horizontal, inline, label, labelKey, placeholder, right, rows,subtext, validation } = $scope.a;

			if (right)       attrs += `${nt}right`;
			if (inline)      attrs += `${nt}inline`;
			if (disabled)    attrs += `${nt}disabled`;
			if (autoHeight)  attrs += `${nt}auto-height`;
			if (rows)        attrs += `${nt}rows="${rows}"`;
			if (label)       attrs += `${nt}label="${label}"`;
			if (placeholder) attrs += `${nt}placeholder="${placeholder}"`;
			if (subtext)     attrs += `${nt}subtext="${subtext}"`;
			// if (value)       attrs += `${nt}value='${value}'`;
			value = value == undefined ? '' : value;
			if (validation && validation.length) attrs += `${nt}validation='${buldValidationMarkup()}'`;

			return `<rb-textarea${attrs}>${value}</rb-textarea>`;
		};

		/* Public Methods
		 *****************/
		$scope.reset = () => {
			$scope.a = {
				label: 'Message',
				value: '', // currently needed for rb-bind on rb-textarea
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
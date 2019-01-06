angular.module('rapid-build').controller('rbTextareaController', ['$scope', '$element', 'typeService',
	($scope, $element, type) => {
		/* Builder
		 **********/
		const createMarkup = () => { // :string
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';
			const { autoHeight, disabled, horizontal, inline, label, labelKey, placeholder, popover, right, rows, subtext, validation, value } = $scope.a;

			if (right)       attrs += `${nt}right`;
			if (inline)      attrs += `${nt}inline`;
			if (disabled)    attrs += `${nt}disabled`;
			if (autoHeight)  attrs += `${nt}auto-height`;
			if (rows)        attrs += `${nt}rows="${rows}"`;
			if (label)       attrs += `${nt}label="${label}"`;
			if (placeholder) attrs += `${nt}placeholder="${placeholder}"`;
			if (subtext)     attrs += `${nt}subtext="${subtext}"`;
			if (validation && validation.length) attrs += `${nt}validation='${buldValidationMarkup()}'`;
			if (value !== undefined) content += value;
			if (popover) content += getPopoverSlot(); // TODO: fix, must be after value

			return `<rb-textarea${attrs}>${content}</rb-textarea>`;
		};

		/* Helpers
		 **********/
		const getPopoverSlot = () => {
			return ' <rb-popover slot="popover">more info</rb-popover>';
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

		/* Validations
		 **************/
		const customValidation = function(val) {
			return {
				valid: val === "rapid",
				message: "must be rapid"
			};
		}
		const validations = {
			required:     'required',
			minLength:    { minLength: 2 },
			minMaxLength: { minMaxLength: { min: 2, max: 5 } },
			custom:       customValidation
		};

		/* Props
		 ********/
		$scope.validationLabels = Object.keys(validations);

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				label: 'Message',
				value: '', // currently needed for rb-bind on rb-textarea
				validation: []
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
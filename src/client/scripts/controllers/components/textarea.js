angular.module('rapid-build').controller('rbTextareaController', ['$scope', '$element', 'typeService',
	($scope, $element, type) => {
		/* Builder
		 **********/
		const createMarkup = () => { // :string
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)        attrs += `${nt}dark`; // TODO
			if ($scope.a.right)       attrs += `${nt}right`;
			if ($scope.a.inline)      attrs += `${nt}inline`;
			if ($scope.a.disabled)    attrs += `${nt}disabled`;
			if ($scope.a.autoHeight)  attrs += `${nt}auto-height`;
			if ($scope.a.rows)        attrs += `${nt}rows="${$scope.a.rows}"`;
			if ($scope.a.label)       attrs += `${nt}label="${$scope.a.label}"`;
			if ($scope.a.subtext)     attrs += `${nt}subtext="${$scope.a.subtext}"`;
			if ($scope.a.placeholder) attrs += `${nt}placeholder="${$scope.a.placeholder}"`;
			if ($scope.a.validation && $scope.a.validation.length) attrs += `${nt}validation='${buldValidationMarkup()}'`;
			if ($scope.a.value !== undefined) content += $scope.a.value;
			if ($scope.a.popover) content += getPopoverSlot(); // TODO: fix, must be after value

			return `<rb-textarea${attrs}>${content}</rb-textarea>`;
		};

		/* Helpers
		 **********/
		const getPopoverSlot = () => {
			return ' <rb-popover slot="popover" position="top">more info...</rb-popover>';
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
angular.module('rapid-build').controller('rbDropdownController', ['$scope', '$element', 'typeService', 'usaStatesValue',
	function($scope, $element, type, usaStatesValue) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)        attrs += `${nt}dark`; // TODO
			if ($scope.a.right)       attrs += `${nt}right`;
			if ($scope.a.inline)      attrs += `${nt}inline`;
			if ($scope.a.disabled)    attrs += `${nt}disabled`;
			if ($scope.a.placeholder) attrs += `${nt}${getPlaceholder()}`;
			if ($scope.a.label)       attrs += `${nt}label=\"${$scope.a.label}\"`;
			if ($scope.a.value)       attrs += `${nt}value='${$scope.a.value}'`;
			if ($scope.a.subtext)     attrs += `${nt}subtext=\"${$scope.a.subtext}\"`;
			if ($scope.a.labelKey)    attrs += `${nt}label-key='${$scope.a.labelKey}'`;
			if ($scope.a.valueKey)    attrs += `${nt}value-key='${$scope.a.valueKey}'`;
			if ($scope.a.data)        attrs += `${nt}data='${buldDataMarkup()}'`;
			if ($scope.a.validation && $scope.a.validation.length) attrs += `${nt}validation='${buldValidationMarkup()}'`;
			if ($scope.a.popover) content += getPopoverSlot();
			if (!content) content = n;

			return `<rb-dropdown${attrs}>${content}</rb-dropdown>`;
		};

		/* Helpers
		 **********/
		const getPopoverSlot = () => { // :string
			return '\n\t<rb-popover\n\t\tslot="popover"\n\t\tposition="top">\n\t\tmore info...\n\t</rb-popover>\n';
		}
		const getPlaceholder = () => { // :string
			let { placeholder } = $scope.a;
			placeholder = placeholder.trim();
			if (!placeholder) return 'placeholder';
			return `placeholder="${placeholder}"`;
		}

		const stringifyModifier = (key, val) => {
			val = angular.copy(val);
			if (!type.is.function(val)) { return val; }
			return val.toString();
		};

		const buldDataMarkup = () => {
			let _data = [];

			switch ($scope.a.data) {
				case 'array of strings':
					_data = getUsaStateNames();
					break;
				case 'array of objects':
					_data = usaStatesValue;
					break;
			}

			return JSON.stringify(_data, stringifyModifier, '\t')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/"function\s*\((.*)\)/g, 'function($1)')
				.replace(/\}"/g, '}');
		};

		const buldValidationMarkup = () => {
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
		 ********/
		// console.log(usaStatesValue);
		const getUsaStateNames = () => {
			const states = [];
			for (const state of usaStatesValue)
				states.push(state.name);

			return states;
		}

		$scope.dataLabels = [
			'array of strings',
			'array of objects'
		];
		$scope.labelKeys = ['name', 'abbreviation'];
		$scope.validationLabels = [
			'required'
		];
		$scope.validations = [
			'required'
		];

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				label: 'US States',
				// placeholder: 'select a state',
				// labelKey: 'name',
				// valueKey: 'abbreviation',
				// data: 'array of objects'
				data: 'array of strings',
				// value: 'District Of Columbia'
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
	}

]);

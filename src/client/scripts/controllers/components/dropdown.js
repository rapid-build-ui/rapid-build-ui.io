angular.module('rapid-build').controller('rbDropdownController', ['$scope', '$element', 'typeService',
	function($scope, $element, type) {
		// Builder
		// =======
		const createMarkup = function() {
			let attrs = ''; const content = '';
			const s = ' '; const t = '\t'; const n = '\n'; const nt = '\n\t';
			if ($scope.a.right) { attrs += `${nt}right`; }
			if ($scope.a.inline) { attrs += `${nt}inline`; }
			if ($scope.a.disabled) { attrs += `${nt}disabled`; }
			if ($scope.a.label) { attrs += `${nt}label=\"${$scope.a.label}\"`; }
			if ($scope.a.value) { attrs += `${nt}value='${$scope.a.value}'`; }
			if ($scope.a.subtext) { attrs += `${nt}subtext=\"${$scope.a.subtext}\"`; }
			if ($scope.a.labelKey) { attrs += `${nt}label-key='${$scope.a.labelKey}'`; }
			if ($scope.a.data != null ? $scope.a.data.length : undefined) { attrs += `${nt}data='${buldDataMarkup()}'`; }
			if ($scope.a.validation != null ? $scope.a.validation.length : undefined) { attrs += `${nt}validation='${buldValidationMarkup()}'`; }
			return `<rb-dropdown${attrs}>${n}</rb-dropdown>`;
		};

		// Props
		// =====
		$scope.data = [
			['batman', 'superman', 'spiderman', 'wolverine'],
			[
				{id: 1, name: 'batman'},
				{id: 2, name: 'superman'},
				{id: 3, name: 'spiderman'},
				{id: 4, name: 'wolverine'}
			]
		];
		$scope.dataLabels = [
			'array of strings',
			'array of objects'
		];
		$scope.labelKeys = ['name', 'id'];
		$scope.validationLabels = [
			'required'
		];
		$scope.validations = [
			'required'
		];

		// Helpers
		// =======
		const stringifyModifier = function(key, val) {
			val = angular.copy(val);
			if (!type.is.function(val)) { return val; }
			return val.toString();
		};


		// Methods
		// =======
		$scope.reset = () =>
			$scope.a = {
				label: 'Superheroes',
				data: 'array of strings'
			}
		;

		var buldDataMarkup = function() {
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

		var buldValidationMarkup = function() {
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


		// Watches
		// =======
		const markupWatch = $scope.$watch('a', (newVal, oldVal) => $scope.markup = createMarkup()
		, true);

		// Event Handlers
		// ==============
		const resetFrm = () => $scope.$apply($scope.reset);
		const resetBtn = $element[0].querySelector('[data-reset]');
		resetBtn.addEventListener('clicked', resetFrm);

		// Init
		// ====
		$scope.reset();

		// Destroys
		// ========
		return $scope.$on('$destroy', function() {
			resetBtn.removeEventListener('clicked', resetFrm);
			return markupWatch();
		});
	}

]);

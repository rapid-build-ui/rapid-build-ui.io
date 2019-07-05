angular.module('rapid-build').controller('rbCodeController', ['$scope', '$element', 'preService', 'typeService', 'RB_CODE_SNIPPETS',
	function($scope, $element, preService, type, snippets) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = content = component = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';
			const { actions, validation } = $scope.a;

			if ($scope.a.right)        attrs += `${nt}right`;
			if ($scope.a.inline)       attrs += `${nt}inline`;
			if ($scope.a.readonly)     attrs += `${nt}readonly`;
			if ($scope.a.scrollable)   attrs += `${nt}scrollable`;
			if ($scope.a.lineNumbers)  attrs += `${nt}line-numbers`;
			if ($scope.a.rows)         attrs += `${nt}rows="${$scope.a.rows}"`;
			if (!$scope.a.nowrap)      attrs += `${nt}nowrap="false"`;
			if ($scope.a.label)        attrs += `${nt}${get.attr.label()}`;
			// if ($scope.a.kind)         attrs += `${nt}kind="${$scope.a.kind}"`;
			if ($scope.a.theme)        attrs += `${nt}theme="${$scope.a.theme}"`;
			if ($scope.a.mode)         attrs += `${nt}mode="${$scope.a.mode}"`;
			if ($scope.a.subtext)      attrs += `${nt}subtext="${$scope.a.subtext}"`;
			if ($scope.a.placeholder)  attrs += `${nt}placeholder="${$scope.a.placeholder}"`;
			if (actions && actions.length)       attrs += `${nt}${get.attr.actions()}`;
			if (validation && validation.length) attrs += `${nt}validation='${buldValidationMarkup()}'`;
			// if ($scope.a.value)        attrs += `${nt}value="${$scope.a.value}"`;
			if ($scope.a.value !== undefined) content += `<xmp>${n}${$scope.a.value}${n}</xmp>`;

			component = `<rb-code${attrs}>${content}</rb-code>`;
			// console.log(component);
			return component;
		}

		/* Builder Helpers
		 ******************/
		const get = {
			attr: {
				actions() { // :attr<string>
					let { actions } = $scope.a;
					actions = JSON.stringify(actions);
					return `actions='${actions}'`;
				},
				label() { // :attr<string>
					let { label } = $scope.a;
					label = label.trim();
					if (!label) return 'label';
					return `label="${label}"`;
				}
			}
		}

		/* Helpers
		 **********/
		const formatValue = val => { // :string
			if (type.is.undefined(val)) return val;
			val = preService.get.text(val);
			val = val.replace(/^/,'\t').replace(/\n/g,'\n\t');
			return val;
		}

		/* Validations
		 **************/
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
		const customValidation = function(val) {
			return {
				valid: val === "rapid",
				message: "must be rapid"
			};
		}
		const validations = {
			required:     'required',
			// minLength:    { minLength: 2 },
			// minMaxLength: { minMaxLength: { min: 2, max: 5 } },
			// custom:       customValidation
		};

		/* Props
		 ********/
		const RB_CODE_OPTS = window.showcase.code;
		$scope.modes  = RB_CODE_OPTS.modes;
		$scope.themes = RB_CODE_OPTS.themes;
		$scope.actionLabels = ['clear','copy'];
		$scope.validationLabels = Object.keys(validations);

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				nowrap: true, // default
				mode: 'javascript',
				theme: 'one-dark',
				value: formatValue(snippets['javascript']),
				lineNumbers: true,
				actions: ['clear','copy'],
				rows: 11,
				// theme: 'rapid',
				// label: 'content',
				// mode: 'html',
				// value: formatValue(snippets['html']),
				// actions: ['clear','copy'],
				// dark: true,
				// rows: 5,
				// readonly: true,
				// scrollable: true,
				// lineNumbers: true,
				// subtext: 'Hello World!',
				// placeholder: 'Build it...',
				// validation: [$scope.validationLabels[0]],
			};
		};

		/* Watches
		 **********/
		const markupWatch = $scope.$watch('a', (newVal, oldVal) => {
			$scope.markup = createMarkup();
		}, true);

		const modeWatch = $scope.$watch('a.mode', (newVal, oldVal) => {
			if (newVal === oldVal) return;
			const val = snippets[newVal] || snippets['text'];
			$scope.a.value = formatValue(val);
		});

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
			modeWatch();
		});
	}
]);

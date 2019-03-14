/*****************************************************
 * CODEMIRROR DIRECTIVE
 * TODO: cleanup code...
 * npm pkg: ui-codemirror
 * Binds a CodeMirror widget to a <textarea> element.
 *****************************************************/
angular.module('rapid-build').constant('rbaCodemirrorConfig', {}); // not sure what this is??
angular.module('rapid-build').directive('rbaCodemirror', ['$timeout', 'typeService', 'rbaCodemirrorConfig',
	($timeout, type, rbaCodemirrorConfig) => {
		/* COMPILE
		 **********/
		const Compile = function(tElement, tAttrs, transclude) {
			if (type.is.undefined(window.CodeMirror))
				throw new Error('rba-codemirror needs CodeMirror to work...');

			return Link;
		}

		/* Helpers
		 **********/
		const Help = {
			newCodemirrorEditor(iElement, codemirrorOptions) { // :codemirrot<object>
				let codemirrot;
				if (iElement[0].tagName.toLowerCase() === 'textarea') // might bug but still ... ??
					return codemirrot = window.CodeMirror.fromTextArea(iElement[0], codemirrorOptions);
				iElement.html('');
				codemirrot = new window.CodeMirror(function(cm_el) {
					iElement.append(cm_el);
				}, codemirrorOptions);

				return codemirrot;
			},

			configOptionsWatcher(codemirrot, rbaCodemirrorAttr, scope) { // :void
				if (!rbaCodemirrorAttr) return;
				const codemirrorDefaultsKeys = Object.keys(window.CodeMirror.defaults);
				const updateOptions = (newValues, oldValue) => {
					if (!type.is.object(newValues)) return;
					codemirrorDefaultsKeys.forEach(key => {
						if (newValues.hasOwnProperty(key)) {
							if (oldValue && newValues[key] === oldValue[key]) return;
							codemirrot.setOption(key, newValues[key]);
						}
					});
				}
				scope.$watch(rbaCodemirrorAttr, updateOptions, true);
			},

			configNgModelLink(codemirror, ngModel, scope) { // :void
				if (!ngModel) return;
				// CodeMirror expects a string, so make sure it gets one.
				ngModel.$formatters.push(value => { // this does not change the model
					if (type.is.undefined(value) || value === null)
						return '';
					if (type.is.object(value) || type.is.array(value))
						throw new Error('rba-codemirror cannot use an object or an array as a model');
					return value;
				});
				// Override the ngModelController $render method,
				// which is what gets called when the model is updated.
				// This takes care of the synchronizing the codeMirror
				// element with the underlying model, in the case that
				// it is changed by something else.
				ngModel.$render = function() {
					// Code mirror expects a string so make sure it gets one.
					// Although the formatter have already done this, it can
					// be possible that another formatter returns undefined
					// (for example the required directive)
					const safeViewValue = ngModel.$viewValue || '';
					codemirror.setValue(safeViewValue);
				};
				// Keep the ngModel in sync with changes from CodeMirror
				codemirror.on('change', instance => {
					const newValue = instance.getValue();
					if (newValue === ngModel.$viewValue) return;
					scope.$evalAsync(() => {
						ngModel.$setViewValue(newValue);
					});
				});
			},

			configRefreshAttr(codeMirror, refreshAttr, scope) { // :void
				if (!refreshAttr) return;
				scope.$watch(refreshAttr, (newVal, oldVal) => {
					if (newVal === oldVal) return; // skip initial watch firing
					$timeout(() => {
						codeMirror.refresh();
					});
				});
			}
		}

		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs, ngModel) => {
			const codemirrorOptions = angular.extend(
				{ value: iElement.text() },
				rbaCodemirrorConfig.codemirror || {},
				scope.$eval(iAttrs.rbaCodemirror),
				scope.$eval(iAttrs.rbaCodemirrorOpts)
			);

			const codemirror        = Help.newCodemirrorEditor(iElement, codemirrorOptions);
			const rbaCodemirrorAttr = iAttrs.rbaCodemirror || iAttrs.rbaCodemirrorOpts;
			const refreshAttr       = iAttrs.codemirrorRefresh;

			Help.configOptionsWatcher(codemirror, rbaCodemirrorAttr, scope);
			Help.configNgModelLink(codemirror, ngModel, scope);
			Help.configRefreshAttr(codemirror, refreshAttr, scope);

			// Allow access to the CodeMirror instance through a broadcasted event
			// eg: $broadcast('CodeMirror', function(cm){...});
			scope.$on('CodeMirror', (event, callback) => {
				if (type.is.function(callback)) return callback(codemirror);
				throw new Error('the CodeMirror event requires a callback function');

			});

			// onLoad callback
			if (type.is.function(codemirrorOptions.onLoad))
				codemirrorOptions.onLoad(codemirror);
		}

		/* API
		 ******/
		return {
			compile: Compile,
			restrict: 'EA',
			require: '?ngModel'
		};
	}
]);

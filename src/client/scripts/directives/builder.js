angular.module('rapid-build').directive('rbaBuilder', ['$compile', 'idService', '$timeout',
	($compile, idService, $timeout) => {
		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs, controller) => {
			const buildStr = iAttrs.rbaBuilder;
			if (!buildStr) return;

			const id = `built___${idService.next()}`;
			let timer      = null;
			let oldScope   = null;
			let canDestroy = false;
			let debounce   = null;

			const clearDebounce = () => {
				if (!debounce) return;
				$timeout.cancel(debounce);
				debounce = null;
			}

			const builder = (newVal, oldVal) => {
				clearDebounce();
				let elmBuilt = document.getElementById(id);
				if (elmBuilt) angular.element(elmBuilt).replaceWith(iElement);

				let template = newVal.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
					template = `<div id="${id}">${template}</div>`;
				let elmTemplate = angular.element(template);
				let elmChildren = elmTemplate[0].childNodes;
				if (elmChildren.length === 1 && elmChildren[0].nodeType === 1)
					template = elmTemplate.children().eq(0).attr('id', id)[0].outerHTML;

				elmBuilt = elmTemplate = elmChildren = null; // cleanup

				const quotationMarks = template.match(/"/g);
				const isValid        = !!quotationMarks && quotationMarks.length % 2 === 0;
				if (isValid === false) return;

				const compileScope = !angular.isUndefined(iAttrs.newScope) ? scope.$new() : scope;
				$compile(template)(compileScope, elm => {
					if (iElement.children().eq(0)) iElement.children().eq(0).remove();
					iElement.replaceWith(elm);
					if (oldScope && oldScope.$destroy && canDestroy) {
						oldScope.$destroy();
						oldScope = null;
					}
					timer = $timeout(() => {
						oldScope   = elm.isolateScope() || elm.scope();
						canDestroy = oldScope && scope.$id !== oldScope.$id;
					});
				});
			}

			const builderWatch = scope.$watch(buildStr, (newVal, oldVal) => {
				clearDebounce();
				if (newVal === void 0) return;
				if (newVal === oldVal) return builder(newVal, oldVal);
				debounce = $timeout(builder, 50, false, newVal, oldVal);
			});

			const destroy = scope.$on('$destroy', () => {
				if (timer) $timeout.cancel(timer);
				clearDebounce();
				builderWatch();
				destroy();
			});
		};

		/* API
		 ******/
		return {
			link: Link,
			restrict: 'A'
		};
	}
]);

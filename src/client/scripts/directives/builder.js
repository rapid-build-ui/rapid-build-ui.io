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

			const builderWatch = scope.$watch(buildStr, (newVal, oldVal) => {
				if (newVal === void 0) return;

				let elmBuilt = document.getElementById(id);
				if (elmBuilt) angular.element(elmBuilt).replaceWith(iElement);

				let template = newVal.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
					template = `<div id="${id}">${template}</div>`;

				let elmTemplate = angular.element(template);
				let elmChild    = elmTemplate.children().eq(0);
				let elmChildren = elmTemplate[0].childNodes;
				if (elmChildren.length === 1 && elmChildren[0].nodeType === 1)
					elmChild.attr('id', id);

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

				elmBuilt = elmTemplate = elmChild = elmChildren = null;
			});

			const destroy = scope.$on('$destroy', () => {
				if (timer) $timeout.cancel(timer);
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

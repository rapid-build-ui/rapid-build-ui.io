angular.module('rapid-build').directive('rbaBuilder', ['$compile', 'idService',
	($compile, idService) => {
		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			const buildStr = iAttrs.rbaBuilder;
			if (!buildStr) return;

			const id = `built___${idService.next()}`;
			let oldScope = null;

			const destroyOldScope = () => { // :void
				if (!oldScope) return;
				if (!oldScope.$destroy) return;
				oldScope.$destroy();
				oldScope = null;
			}

			const buildIt = (markup) => {
				let elmBuilt = document.getElementById(id);
				if (elmBuilt) angular.element(elmBuilt).replaceWith(iElement);

				let template = markup.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
					template = `<div id="${id}">${template}</div>`;

				let elmTemplate = angular.element(template);
				let elmChildren = elmTemplate[0].childNodes;

				const hasOneChildElm = elmChildren.length === 1 && elmChildren[0].nodeType === 1; // 1 = Elm Node
				if (hasOneChildElm)
					template = elmTemplate.children().eq(0).attr('id', id)[0].outerHTML;

				elmBuilt = elmTemplate = elmChildren = null; // cleanup

				const quotationMarks = template.match(/"/g);
				const valid          = !!quotationMarks && quotationMarks.length % 2 === 0;
				if (!valid) return;

				$compile(template)(scope.$new(), (elm, newScope) => {
					iElement.empty().replaceWith(elm);
					destroyOldScope();
					oldScope = newScope;
				});
			}

			const builderWatch = scope.$watch(buildStr, (newVal, oldVal) => {
				if (typeof newVal !== 'string') return;
				if (newVal === oldVal && oldScope) return;
				buildIt(newVal);
			});

			const destroy = scope.$on('$destroy', () => {
				destroyOldScope();
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

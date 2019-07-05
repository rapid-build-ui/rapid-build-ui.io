angular.module('rapid-build').directive('rbaBuilder', ['idService',
	(idService) => {
		/* LINK
		 *******/
		const Link = (scope, iElement, iAttrs) => {
			const buildString = iAttrs.rbaBuilder;
			if (!buildString) return;
			const ID = `built___${idService.next()}`;

			const buildIt = markup => {
				// previously built element or initiated element
				let curElm = document.getElementById(ID) || iElement;

				// build element (converts markup string to html)
				let newElm = document.createElement('div');
				newElm.innerHTML = markup;

				// if only one built element use it
				const cnt = newElm.children.length;
				if (cnt === 1) newElm = newElm.children[0];
				newElm.id = ID; // needed to locate previously built element

				// replace current element with new one
				angular.element(curElm).replaceWith(newElm);

				// cleanup (not sure if this is necessary)
				curElm = newElm = null;
			}

			const builderWatch = scope.$watch(buildString, (newVal, oldVal) => {
				if (typeof newVal !== 'string') return;
				buildIt(newVal);
			});

			const destroy = scope.$on('$destroy', () => {
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

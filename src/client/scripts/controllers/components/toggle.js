angular.module('rapid-build').controller('rbToggleController', ['$scope', '$element', 'preService',
	function($scope, $element, preService) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)     attrs += `${nt}dark`; // TODO
			if ($scope.a.open)     attrs += `${nt}open`;
			if ($scope.a.inline)   attrs += `${nt}inline`;
			if ($scope.a.disabled) attrs += `${nt}disabled`;
			if ($scope.a.kind)     attrs += `${nt}kind="${$scope.a.kind}"`;
			if (!$scope.a.cache)   attrs += `${nt}cache="false"`;
			if ($scope.a.caption)  attrs += `${nt}caption="${$scope.a.caption}"`;
			if ($scope.a.fetch)    attrs += `${nt}fetch="/examples/toggle"`;
			if ($scope.a.onclick)  attrs += `${nt}${getOnclick()}`;
			if ($scope.a.popover) content += getPopoverSlot();
			if ($scope.a.content) content += `${nt}${$scope.a.content}${n}`;

			return `<rb-toggle${attrs}>${content}</rb-toggle>`;
		}

		/* Helpers
		 **********/
		const getPopoverSlot = () => { // :string
			return '\n\t<rb-popover\n\t\tslot="popover"\n\t\tposition="top">\n\t\tmore info...\n\t</rb-popover>\n';
		}

		const getOnclick = () => { // :string<function>
			let onclick = `
				!function() {
					console.log('toggled');
				}()
			`;
			// return new Promise(resolve => setTimeout(resolve, 3000));
			onclick = preService.get.text(onclick);
			return `onclick="${onclick}"`;
		}

		/* Props
		 ********/
		$scope.kinds = ['danger','info','neutral','success','warning']

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				caption: 'Toggle',
				content: 'Content...',
				cache: true
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

		/* Testing
		 **********/
		// const toggle = () => {
		// 	return new Promise((resolve, reject) => {
		// 		setTimeout(() => {
		// 			resolve('<strong>Elementary, My Dear Watson</strong>');
		// 		}, 2500);
		// 	});
		// }
		// const rbToggle = $element[0].querySelector('rb-toggle');
		// rbToggle.onclick = toggle;

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

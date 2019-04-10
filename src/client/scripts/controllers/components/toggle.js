angular.module('rapid-build').controller('rbToggleController', ['$scope', '$element', 'preService',
	function($scope, $element, preService) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';
			const { contentAlts } = $scope.a;

			if ($scope.a.dark)     attrs += `${nt}dark`; // TODO
			if ($scope.a.open)     attrs += `${nt}open`;
			if ($scope.a.inline)   attrs += `${nt}inline`;
			if ($scope.a.disabled) attrs += `${nt}disabled`;
			if ($scope.a.kind)     attrs += `${nt}kind="${$scope.a.kind}"`;
			if (!$scope.a.cache)   attrs += `${nt}cache="false"`;
			if ($scope.a.caption)  attrs += `${nt}caption="${$scope.a.caption}"`;
			if (contentAlts && contentAlts.includes('fetch'))   attrs += `${nt}fetch="/examples/toggle"`;
			if ($scope.a.fetchOpts) attrs += `${nt}fetch-opts='{"method":"post"}'`;
			if (contentAlts && contentAlts.includes('onclick')) attrs += `${nt}${getOnclick()}`;
			// if ($scope.a.popover) content += getPopoverSlot();
			if ($scope.a.content) content += `${nt}${$scope.a.content}${n}`;

			return `<rb-toggle${attrs}>${content}</rb-toggle>`;
		}

		/* Helpers
		 **********/
		// const getPopoverSlot = () => { // :string
		// 	return '\n\t<rb-popover\n\t\tslot="popover"\n\t\tposition="top">\n\t\tmore info...\n\t</rb-popover>';
		// }

		const getOnclick = () => { // :string<function>
			let onclick = `
				return (() => {
					return 'Piece of Cake!';
				})()
			`;
			onclick = preService.get.text(onclick);
			return `onclick="${onclick}"`;
		}

		/* Props
		 ********/
		$scope.kinds = ['danger','info','neutral','success','warning']
		$scope.contentAlts = ['fetch','onclick']

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				caption: 'Toggle',
				content: 'Elementary my dear Watson',
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
		resetBtn.onclick = resetFrm;

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
			markupWatch();
		});
	}

]);

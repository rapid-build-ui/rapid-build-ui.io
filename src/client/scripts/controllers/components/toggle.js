angular.module('rapid-build').controller('rbToggleController', ['$scope', '$element', 'preService', 'typeService',
	function($scope, $element, preService, type) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)          attrs += `${nt}dark`; // TODO
			if ($scope.a.open)          attrs += `${nt}open`;
			if ($scope.a.cache)         attrs += `${nt}cache`;
			if ($scope.a.inline)        attrs += `${nt}inline`;
			if ($scope.a.disabled)      attrs += `${nt}disabled`;
			if ($scope.a.kind)          attrs += `${nt}kind=\"${$scope.a.kind}\"`;
			if ($scope.a.caption)       attrs += `${nt}caption=\"${$scope.a.caption}\"`;
			if ($scope.a.templateUrl)   attrs += `${nt}template-url=\"${$scope.a.templateUrl}\"`;
			if ($scope.a.templateClass) attrs += `${nt}template-class=\"${$scope.a.templateClass}\"`;
			if ($scope.a.action)        attrs += `${nt}${getAction()}`;
			if ($scope.a.popover) content += getPopoverSlot();
			if ($scope.a.content) content += `${nt}${$scope.a.content}${n}`;

			return `<rb-toggle${attrs}>${content}</rb-toggle>`;
		}

		/* Helpers
		 **********/
		const getPopoverSlot = () => { // :string
			return '\n\t<rb-popover\n\t\tslot="popover"\n\t\tposition="top">\n\t\tmore info...\n\t</rb-popover>\n';
		}

		const getAction = () => { // :string<function>
			let action = `
				function() {
					console.log('TOGGLED');
				}
			`;
			// return new Promise(resolve => setTimeout(resolve, 3000));
			action = preService.get.text(action);
			return `action="${action}"`;
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

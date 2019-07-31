angular.module('rapid-build').controller('rbPopoverController', ['$scope', '$element', 'preService',
	function($scope, $element, preService) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = content = '';
			const s = ' '; t = '\t'; n = '\n'; nt = '\n\t';

			if ($scope.a.pin)   attrs += `${nt}pin`;
			if ($scope.a.dark)  attrs += `${nt}dark`; // TODO
			if ($scope.a.hover) attrs += `${nt}hover`;
			if ($scope.a.iconAnimation && $scope.a.iconAnimation.includes('spin')) attrs += `${nt}icon-spin`;
			if ($scope.a.iconAnimation && $scope.a.iconAnimation.includes('burst')) attrs += `${nt}icon-burst`;
			if ($scope.a.iconAnimation && $scope.a.iconAnimation.includes('pulse')) attrs += `${nt}icon-pulse`;
			if ($scope.a.fitContent)   attrs += `${nt}fit-content`;
			if ($scope.a.inheritColor) attrs += `${nt}inherit-color`;
			if ($scope.a.open)         attrs += `${nt}open="${$scope.a.open}"`;
			if ($scope.a.kind)         attrs += `${nt}kind="${$scope.a.kind}"`;
			if ($scope.a.position)     attrs += `${nt}position="${$scope.a.position}"`;
			if ($scope.a.iconFlip)     attrs += `${nt}icon-flip="${$scope.a.iconFlip}"`;
			if ($scope.a.iconSize)     attrs += `${nt}icon-size="${$scope.a.iconSize}"`;
			if ($scope.a.iconKind)     attrs += `${nt}icon-kind="${$scope.a.iconKind}"`;
			if ($scope.a.iconSpeed)    attrs += `${nt}icon-speed="${$scope.a.iconSpeed}"`;
			if ($scope.a.iconRotate)   attrs += `${nt}icon-rotate="${$scope.a.iconRotate}"`;
			if ($scope.a.iconSource)   attrs += `${nt}icon-source="${$scope.a.iconSource}"`;
			if ($scope.a.caption)      attrs += `${nt}caption="${$scope.a.caption}"`;
			attrs += get.attr.onclick(nt);
			if ($scope.a.content) content = `${nt}${$scope.a.content}${n}`;

			return `<rb-popover${attrs}>${content}</rb-popover>`;
		}

		/* Builder Helpers
		 ******************/
		const get = {
			attr: {
				onclick(fmt) { // :attr<function>
					if (!$scope.a.onclick) return '';
					let onclick = `
						(() => {
							this.caption = 'Snappy';
						})()
					`;
					onclick = preService.get.text(onclick);
					return `${fmt}onclick="${onclick}"`;
				}
			},
			content: {
				content() { // :string
					const { content } = $scope.a;
					if (!content) return '';
					return preService.get.text(content).replace(/^|\n/g,'\n\t');
				}
			}
		}

		/* Props
		 ********/
		$scope.kinds         = ['danger','info','neutral','success','warning'];
		$scope.positions     = ['bottom','left','right'];
		$scope.iconFlips     = ['horizontal','vertical','both'];
		$scope.iconKinds     = ['question-circle','download','github'];
		$scope.iconSources   = ['solid','brands'];
		$scope.iconAnimation = ['burst','pulse','spin'];

		/* Global RB Icons
		 ******************/
		const RB_ICONS    = window.showcase.icons;
		const ddIconKinds = $element[0].querySelector(`[label='icon-kind']`);

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				caption: 'hello world',
				content: 'Now that\'s poppin!'
			};
		};

		/* Watches
		 **********/
		const markupWatch = $scope.$watch('a', (newVal, oldVal) => {
			$scope.markup = createMarkup();
		}, true);

		const iconSourceWatch = $scope.$watch('a.iconSource', (newIconSource, oldIconSource) => {
			if (!newIconSource) newIconSource = 'regular';
			ddIconKinds.data = RB_ICONS[newIconSource];
			const { a } = $scope;
			if (newIconSource === 'brands') return a.iconKind = 'github';
			if (RB_ICONS[newIconSource].includes(a.iconKind)) return;
			a.iconKind = undefined;
		});

		/* Event Handlers
		 *****************/
		const resetFrm = () => $scope.$apply($scope.reset);
		const resetBtn = $element[0].querySelector('[data-reset]');
		resetBtn.onclick = resetFrm;

		/* Testing
		 **********/
		// const openFunc = () => {
		// 	return new Promise((resolve, reject) => {
		// 		setTimeout(() => {
		// 			console.log('Open Sesame!');
		// 			resolve('<strong>Snappy</strong>');
		// 		}, 2500);
		// 	});
		// }
		// const rbPopover = $element[0].querySelector('rb-popover');
		// rbPopover.onclick = openFunc;

		/* Init
		 *******/
		$scope.reset();

		/* Destroy
		 **********/
		$scope.$on('$destroy', () => {
			iconSourceWatch();
			markupWatch();
		});
	}

]);

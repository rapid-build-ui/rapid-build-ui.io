angular.module('rapid-build').controller('rbButtonController', ['$scope', '$element', 'preService', 'typeService',
	function($scope, $element, preService, type) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = ''; let content = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)          attrs += `${nt}dark`; // TODO
			if ($scope.a.text)          attrs += `${getAttr.text(nt,0)}`;
			if ($scope.a.disabled)      attrs += `${nt}disabled`;
			if ($scope.a.iconAnimation) attrs += `${getAttr.icon.animation(nt,'spin')}`;
			if ($scope.a.iconAnimation) attrs += `${getAttr.icon.animation(nt,'burst')}`;
			if ($scope.a.iconAnimation) attrs += `${getAttr.icon.animation(nt,'pulse')}`;
			if ($scope.a.iconRight)     attrs += `${nt}icon-right`;
			if ($scope.a.size)          attrs += `${nt}size="${$scope.a.size}"`;
			if ($scope.a.type)          attrs += `${nt}type="${$scope.a.type}"`;
			if ($scope.a.kind)          attrs += `${nt}kind="${$scope.a.kind}"`;
			if ($scope.a.iconFlip)      attrs += `${nt}icon-flip="${$scope.a.iconFlip}"`;
			if ($scope.a.iconSize)      attrs += `${nt}icon-size="${$scope.a.iconSize}"`;
			if ($scope.a.iconKind)      attrs += `${nt}icon-kind="${$scope.a.iconKind}"`;
			if ($scope.a.iconSpeed)     attrs += `${nt}icon-speed="${$scope.a.iconSpeed}"`;
			if ($scope.a.iconRotate)    attrs += `${nt}icon-rotate="${$scope.a.iconRotate}"`;
			if ($scope.a.iconSource)    attrs += `${nt}icon-source="${$scope.a.iconSource}"`;
			if ($scope.a.text)          attrs += `${getAttr.text(nt,1)}`;
			if ($scope.a.onclick)       attrs += `${getAttr.onclick(nt)}`;
			if ($scope.a.content) content += `${nt}${$scope.a.content}${n}`;

			return `<rb-button${attrs}>${content}</rb-button>`;
		}

		/* Attr Helpers
		 ***************/
		const getAttr = {
			onclick(fmt) { // :attr<function>
				let onclick = `
					!function() {
						console.log('clicked');
					}()
				`;
				onclick = preService.get.text(onclick);
				return `${fmt}onclick="${onclick}"`;
			},
			text(fmt, index) { // :attr | attr<object> | string<empty>
				if ($scope.a.text !== $scope.textOpts[index]) return '';
				let attr = `${fmt}text`;
				if (index === 0) return attr;
				return attr += `='${JSON.stringify(textOpts, null, '\t')}'`;
			},
			icon: {
				animation(fmt, type) { // :attr | string<empty>
					if (!$scope.a.iconAnimation.includes(type)) return '';
					return `${fmt}icon-${type}`;
				}
			}
		}

		/* Local
		 ********/
		const textOpts = {
			inherit: 'color'
		}

		/* Props
		 ********/
		$scope.iconFlips     = ['horizontal','vertical','both'];
		$scope.iconKinds     = ['save','sync','trash-alt'];
		$scope.iconSources   = ['solid','brands'];
		$scope.iconAnimation = ['burst','pulse','spin'];
		$scope.kinds         = ['danger','info','neutral','success','warning'];
		$scope.sizes         = ['small','big'];
		$scope.types         = ['reset','submit'];
		$scope.textOpts      = ['enable','inherit color'];

		/* Global RB Icons
		 ******************/
		const RB_ICONS    = window.rbIcons;
		const ddIconKinds = $element[0].querySelector(`[label='icon-kind']`);

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				content: 'Button',
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
		// const updateIconBtn = $element[0].querySelector('[data-update-icon]');
		// updateIconBtn.onclick = () => {
		// 	const rbBtn = $element[0].querySelector('[id^="built__"]');
		// 	if (!type.is.undefined(rbBtn.iconSpin))  rbBtn.iconSpin  = !rbBtn.iconSpin;
		// 	if (!type.is.undefined(rbBtn.iconBurst)) rbBtn.iconBurst = !rbBtn.iconBurst;
		// 	if (!type.is.undefined(rbBtn.iconPulse)) rbBtn.iconPulse = !rbBtn.iconPulse;
		// 	rbBtn.iconFlip = 'both';
		// };

		// $scope.save = evt => {
		// 	console.log('SAVE:', $scope.demoForm);
		// };

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

angular.module('rapid-build').controller('rbToggleController', ['$scope', '$element', 'preService',
	function($scope, $element, preService) {
		/* Builder
		 **********/
		const createMarkup = function() {
			let attrs = content = component = '';
			const s = ' ', t = '\t', n = '\n', nt = '\n\t';

			if ($scope.a.dark)     attrs += `${nt}dark`; // TODO
			if ($scope.a.open)     attrs += `${nt}open`;
			if ($scope.a.inline)   attrs += `${nt}inline`;
			if ($scope.a.disabled) attrs += `${nt}disabled`;
			if ($scope.a.kind)     attrs += `${nt}kind="${$scope.a.kind}"`;
			if (!$scope.a.cache)   attrs += `${nt}cache="false"`;
			if ($scope.a.caption)  attrs += `${nt}caption="${$scope.a.caption}"`;
			attrs += get.attr.target(nt);
			attrs += get.attr.targetRoot(nt);
			attrs += get.attr.fetch(nt);
			if ($scope.a.fetchOpts) attrs += `${nt}fetch-opts='{"method":"post"}'`;
			attrs += get.attr.onclick(nt);

			content += get.content.content();
			// content += get.content.popover(); // TODO: maybe
			component = `<rb-toggle${attrs}>${content}${n}</rb-toggle>`;
			component = get.component.target(component, content);
			component = get.component.targetRoot(component);

			return component;
		}

		/* Builder Helpers
		 ******************/
		const get = {
			attr: {
				onclick(fmt) { // :attr<function>
					const { contentAlts: alts } = $scope.a;
					if (!alts || !alts.includes('onclick')) return '';
					let onclick = `
						return (() => {
							return 'Piece of Cake!';
						})()
					`;
					onclick = preService.get.text(onclick);
					return `${fmt}onclick="${onclick}"`;
				},
				fetch(fmt) { // :attr<string>
					const { contentAlts: alts } = $scope.a;
					if (!alts || !alts.includes('fetch')) return '';
					return `${fmt}fetch="/examples/toggle"`;
				},
				target(fmt) { // :attr<string>
					const { contentAlts: alts } = $scope.a;
					if (!alts || !alts.includes('target')) return '';
					return `${fmt}target="#example"`;
				},
				targetRoot(fmt) { // :attr<string>
					const { contentAlts: alts } = $scope.a;
					if (!alts || !alts.includes('target') || !alts.includes('target-root')) return '';
					return `${fmt}target-root="div"`;
				}
			},
			content: {
				content() { // :string
					const { content } = $scope.a;
					if (!content) return '';
					return preService.get.text(content).replace(/^|\n/g,'\n\t');
				},
				popover() { // :slot<string> (todo: maybe)
					if (!$scope.a.popover) return '';
					let popover = `
						<rb-popover
							slot="popover"
							position="top">
							more info...
						</rb-popover>`
					return preService.get.text(popover).replace(/^|\n/g,'\n\t');
				}
			},
			component: {
				target(component, content) { // :string
					const { contentAlts: alts } = $scope.a;
					if (!alts || !alts.includes('target')) return component;
					const idAttr = `id="example"`;
					component = component.replace(content,'');
					content   = content.trim();
					let target = `
						<span id="example">
							${content}
						</span>`;
					target = preService.get.text(target).replace(/^/g,'\n');
					component += target;
					return component;
				},
				targetRoot(component) { // :string
					const { contentAlts: alts } = $scope.a;
					if (!alts || !alts.includes('target') || !alts.includes('target-root')) return component;
					component = component
						.replace(`#example`,'span')
						.replace(` id="example"`,'')
						.replace(/^|\n/g,'\n\t')
						.concat('\n');
					return `<div>${component}</div>`;
				}
			}
		}

		/* Props
		 ********/
		$scope.kinds = ['danger','info','neutral','success','warning']
		$scope.contentAlts = ['fetch','onclick','target','target-root']

		/* Methods
		 **********/
		$scope.reset = () => {
			$scope.a = {
				caption: 'Toggle',
				content: 'Easy Breezy',
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

angular.module('rapid-build').controller('themesExController', ['$scope', '$element', 'ENV',
	($scope, $element, ENV) => {
		/* Private Vars
		 ***************/
		const radios = $element[0].querySelector('rb-radios');

		/* Scope Props
		 **************/
		$scope.themes = [
			{ name: 'lavender', cssClass: 'lavender-theme' }
		];

		/* Helpers
		 **********/
		const Themes = {
			init() { // :void
				if (ENV.is.local)
					$scope.themes.push({ name: 'testing', cssClass: 'testing-theme' });

				for (const [i, theme] of Object.entries($scope.themes)) {
					if (!document.body.classList.contains(theme.cssClass)) continue;
					radios.value = $scope.themes[i];
					break;
				}
			},
			add(theme) { // :void
				document.body.classList.add(theme);
			},
			remove() { // :void
				for (const theme of $scope.themes)
					document.body.classList.remove(theme.cssClass);
			}
		};

		/* Event Handlers
		 *****************/
		const applyTheme = evt => {
			Themes.remove();
			const { value: theme } = evt.detail;
			if (!theme) return;
			Themes.add(theme.cssClass);
		};

		/* Init
		 *******/
		radios.addEventListener('value-changed', applyTheme);
		Themes.init();

		/* Destroy
		 **********/
		$scope.$on('$destroy', () => {
			radios.removeEventListener('value-changed', applyTheme);
		});
}]);
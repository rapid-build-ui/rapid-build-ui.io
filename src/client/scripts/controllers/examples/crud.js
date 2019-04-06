angular.module('rapid-build').controller('crudController', ['$scope', '$element', '$timeout', 'Superhero',
	($scope, $element, $timeout, Superhero) => {
		/* Private
		 **********/
		const form          = $element[0].querySelector('form');
		const newHeroBtn    = $element[0].querySelector('[data-new-hero]');
		const deleteHeroBtn = $element[0].querySelector('[data-delete-hero]');

		const findHeroIndex = hero => // :number
			$scope.superheroes.findIndex(_hero => _hero.id === hero.id)

		/* Public
		 *********/
		$scope.crud = {
			create() { // :void
				$scope.superhero.$save(hero => {
					$scope.superheroes.unshift(angular.copy(hero));
				});
			},
			delete() { // :void
				return $scope.superhero.$delete(hero => {
					const index = findHeroIndex(hero);
					$scope.superheroes.splice(index, 1);
					$scope.newHero();
				});
			},
			update() { // :void
				$scope.superhero.$update(hero => {
					const index = findHeroIndex(hero);
					$scope.superheroes[index] = angular.copy(hero);
				});
			},
			read(id) { // :void
				$scope.superhero = Superhero.get({ id });
				form.rb.setPristine();
			}
		}

		$scope.save = async evt => { // :void
			await $timeout(); // ensures rb's form submit has fired
			const form  = evt.target;
			const valid = form.checkValidity();
			// console.log('FORM VALID:', valid);
			if (!valid) return;
			const action = !!$scope.superhero.id ? 'update' : 'create';
			$scope.crud[action]();
		}

		$scope.newHero = evt => { // :void
			$scope.superhero = new Superhero();
			form.rb && form.rb.setPristine();
			if (!evt) return;
			$scope.$apply();
		}

		/* Events
		 *********/
		newHeroBtn.onclick    = $scope.newHero;
		deleteHeroBtn.onclick = $scope.crud.delete;

		/* Init
		 *******/
		$scope.genders     = ['Male', 'Female'];
		$scope.superheroes = Superhero.query();
		$scope.newHero();

}]);
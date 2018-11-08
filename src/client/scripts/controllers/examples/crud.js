angular.module('rapid-build').controller('crudController', ['$scope', '$timeout', 'Superhero',
	($scope, $timeout, Superhero) => {
		/* Private
		 **********/
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
				$scope.superhero.$delete(hero => {
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
			read(id) {
				$scope.superhero = Superhero.get({ id });
			}
		}

		$scope.save = async evt => { // :void
			await $timeout(); // ensures rb's form submit has fired
			const form  = evt.target;
			const valid = form.checkValidity();
			if (!valid) return;
			const action = !!$scope.superhero.id ? 'update' : 'create';
			$scope.crud[action]();
		}

		$scope.newHero = () => { // :void
			$scope.superhero = new Superhero();
		}

		/* Init
		 *******/
		$scope.genders     = ['Male', 'Female'];
		$scope.superheroes = Superhero.query();
		$scope.newHero();

}]);
angular.module('rapid-build').controller('formValidationController', ['$scope', $scope => {
	/* Builder
	 **********/
	$scope.markup = `
<form action>
	<rb-input
		name="hero"
		label="Superhero"
		validation='["required"]'>
	</rb-input>
	<rb-checkbox
		name="awesome"
		label="Superman"
		sublabel="is awesome"
		validation='["required"]'>
	</rb-checkbox>
	<rb-checkboxes
		name="favs"
		label="Your Favs"
		validation='["required"]'
		data='["batman","superman","wolverine"]'>
	</rb-checkboxes>
	<rb-radios
		toggle
		name="best"
		label-key="name"
		label="The Best"
		validation='["required"]'
		data='[
			{ "id": 1, "name": "batman" },
			{ "id": 2, "name": "superman" },
			{ "id": 3, "name": "wolverine" }
		]'>
	</rb-radios>
	<rb-button type="submit">
		Submit
	</rb-button>
</form>
		`.trim();
}]);
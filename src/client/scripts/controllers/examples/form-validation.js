angular.module('rapid-build').controller('formValidationController', ['$scope', '$element', 'rbEventService',
	($scope, $element, rbEvents) => {
		// Builder
		// =======
		$scope.markup = `
<form action>
	<rb-input
		name="name"
		label="Name"
		validation='["required"]'>
	</rb-input>
	<rb-radios
		toggle
		name="heroes"
		label-prop="name"
		label="Superheroes"
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
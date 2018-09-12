angular.module('rapid-build').controller('formValidationController', ['$scope', '$element', 'rbEventService',
	($scope, $element, rbEvents) => {
		// Builder
		// =======
		$scope.markup = `
<form action>
	<rb-input
		name="name"
		label="Name"
		validation='[
			"required"
		]'>
	</rb-input>
	<rb-button
		size="small"
		type="submit">
		Submit
	</rb-button>
</form>
		`.trim();
}]);